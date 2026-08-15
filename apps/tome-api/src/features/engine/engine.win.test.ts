import { describe, expect, test } from 'bun:test';

import { CardSlug } from '../card/card.db';
import { createGameBoard } from './engine.board';
import { GameSettings, GameState, SIDES, Side, SpellColor, getGameWinner, initialiseGame } from './engine.game';
import { handleTurn } from './engine.turn';

describe('getGameWinner', () => {
	const gameWithHp = (hpA: number, hpB: number): GameState => {
		const game = initialiseGame(createGameBoard({ decks: { sideA: [], sideB: [] } }));
		game.board.players.sideA.hp = hpA;
		game.board.players.sideB.hp = hpB;
		return game;
	};

	test('no winner while both players are alive', () => {
		expect(getGameWinner(gameWithHp(100, 100))).toBeNull();
		expect(getGameWinner(gameWithHp(1, 1))).toBeNull();
	});

	test('the player at 0 HP loses, the other wins', () => {
		expect(getGameWinner(gameWithHp(50, 0))).toBe('sideA');
		expect(getGameWinner(gameWithHp(0, 50))).toBe('sideB');
	});

	test('overkill (negative HP) still resolves the winner', () => {
		expect(getGameWinner(gameWithHp(20, -15))).toBe('sideA');
	});

	test('both players down is a draw', () => {
		expect(getGameWinner(gameWithHp(0, 0))).toBe('draw');
		expect(getGameWinner(gameWithHp(-5, -1))).toBe('draw');
	});
});

const settings: GameSettings = {
	castTimeoutMs: 100_000,
	spellTimeoutMs: 100_000,
	startingCards: 0,
	emptySlotAttack: 10,
	phaseDelayMs: 0,
	effectHighlightMs: 0,
};

/**
 * Drives a game to completion by auto-answering player actions:
 * `prepare` picks the given side's first hand card, `attack` picks the given stack.
 */
const driveGame = async (
	game: GameState,
	iter: AsyncGenerator<unknown>,
	choices: {
		prepare: (side: Side) => number[];
		attack: (side: Side) => SpellColor;
	},
) => {
	const submitted = new WeakSet<object>();
	let res = await iter.next();
	let guard = 0;
	while (!res.done && !game.winner && guard++ < 1000) {
		for (const side of SIDES) {
			const action = game.actions[side];
			if (!action || submitted.has(action)) continue;
			submitted.add(action);
			if (action.type === 'select_from_hand') {
				for await (const _ of action.submit({ side, cardKeys: choices.prepare(side) })) void 0;
			} else if (action.type === 'select_spell_stack') {
				for await (const _ of action.submit({ side, stacks: [choices.attack(side)] })) void 0;
			}
		}
		res = await iter.next();
	}
	return guard;
};

describe('win condition (end to end)', () => {
	test('a player reaching 0 HP ends the game and declares the opponent the winner', async () => {
		// sideA has a lone Fireball (red, 11 attack); sideB has nothing to play.
		const decks: Record<Side, CardSlug[]> = { sideA: ['fireball'], sideB: [] };
		const game = initialiseGame(createGameBoard({ decks }));
		// Put sideB within lethal range of a single Fireball.
		game.board.players.sideB.hp = 8;

		const iter = handleTurn({ game, settings });

		const guard = await driveGame(game, iter, {
			// sideA prepares the card it drew (Fireball); sideB prepares nothing.
			prepare: side => (side === 'sideA' ? [game.board.players.sideA.hand[0]?.key].filter(k => k !== undefined) : []),
			// Red beats green, so sideA (red) beats sideB's empty green slot.
			attack: side => (side === 'sideA' ? 'red' : 'green'),
		});

		expect(guard).toBeLessThan(1000); // did not loop forever
		expect(game.winner).toBe('sideA');
		expect(game.board.players.sideB.hp).toBeLessThanOrEqual(0);
		expect(game.finishedTurns.length).toBe(1);
	});
});
