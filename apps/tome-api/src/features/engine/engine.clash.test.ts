import { describe, expect, test } from 'bun:test';

import { FieldCard, SpellAttack, SpellColor, resolveFieldClash, resolveSpellClash } from './engine.game';

const field = (color: SpellColor | null): FieldCard => ({
	key: 1,
	id: 'test-field',
	name: 'Test Field',
	description: '',
	type: 'field',
	color,
	effects: {},
});

const attack = (slot: SpellColor): SpellAttack => ({ slot, card: null });

// The colour wheel: red beats green, green beats blue, blue beats red.
const beats: Array<[SpellColor, SpellColor]> = [
	['red', 'green'],
	['green', 'blue'],
	['blue', 'red'],
];

describe('resolveFieldClash', () => {
	test.each(beats)('%s field beats %s field', (winner, loser) => {
		// sideA is winner
		expect(resolveFieldClash({ cardA: field(winner), cardB: field(loser) }).won).toBe('sideA');
		// sideB is winner (order swapped)
		expect(resolveFieldClash({ cardA: field(loser), cardB: field(winner) }).won).toBe('sideB');
	});

	test('same colour is a draw', () => {
		for (const color of ['red', 'green', 'blue'] as const) {
			expect(resolveFieldClash({ cardA: field(color), cardB: field(color) }).won).toBeNull();
		}
	});

	test('a coloured field beats a neutral field', () => {
		expect(resolveFieldClash({ cardA: field('red'), cardB: field(null) }).won).toBe('sideA');
		expect(resolveFieldClash({ cardA: field(null), cardB: field('blue') }).won).toBe('sideB');
	});

	test('two neutral fields draw', () => {
		expect(resolveFieldClash({ cardA: field(null), cardB: field(null) }).won).toBeNull();
	});

	test('an uncontested field wins', () => {
		expect(resolveFieldClash({ cardA: field('green'), cardB: undefined }).won).toBe('sideA');
		expect(resolveFieldClash({ cardA: undefined, cardB: field('green') }).won).toBe('sideB');
		expect(resolveFieldClash({ cardA: undefined, cardB: undefined }).won).toBeNull();
	});
});

describe('resolveSpellClash', () => {
	test.each(beats)('%s spell beats %s spell', (winner, loser) => {
		expect(resolveSpellClash({ spellA: attack(winner), spellB: attack(loser) }).won).toBe('sideA');
		expect(resolveSpellClash({ spellA: attack(loser), spellB: attack(winner) }).won).toBe('sideB');
	});

	test('same colour cancels out', () => {
		for (const color of ['red', 'green', 'blue'] as const) {
			expect(resolveSpellClash({ spellA: attack(color), spellB: attack(color) }).won).toBeNull();
		}
	});

	test('an uncontested attack wins', () => {
		expect(resolveSpellClash({ spellA: attack('red'), spellB: undefined }).won).toBe('sideA');
		expect(resolveSpellClash({ spellA: undefined, spellB: attack('red') }).won).toBe('sideB');
		expect(resolveSpellClash({ spellA: undefined, spellB: undefined }).won).toBeNull();
	});

	test('field and spell clashes agree on the wheel direction', () => {
		for (const [winner, loser] of beats) {
			const fieldWinner = resolveFieldClash({ cardA: field(winner), cardB: field(loser) }).won;
			const spellWinner = resolveSpellClash({ spellA: attack(winner), spellB: attack(loser) }).won;
			expect(spellWinner).toBe(fieldWinner);
		}
	});
});
