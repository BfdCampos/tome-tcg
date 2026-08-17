# How the game works

The rules the engine enforces (from `engine.turn.ts`, `engine.game.ts`,
`card.db.ts`):

- **2 players, 100 HP each.** Decks are **exactly 30 cards, max 2 copies** of any
  card (`deck.schemas.ts`).
- **Three colours** — 🔴 Red, 🟢 Green, 🔵 Blue — each player has a **stack per
  colour** plus a shared **field**.
- **Colour wheel:** 🔴 Red beats 🔵 Blue, 🔵 Blue beats 🟢 Green, 🟢 Green beats
  🔴 Red.
  > ⚠️ **Correction (post-analysis):** this direction was taken from the
  > `winnerColorMap`/field-clash code at the time and was a **bug**. The intended
  > wheel is **🔴 Red beats 🟢 Green, 🟢 Green beats 🔵 Blue, 🔵 Blue beats 🔴
  > Red**, fixed in PR #1. The rest of this document is unaffected.
- **Cards are Spells** (go into a colour stack, have `attack` and optional `heal`)
  or **Fields** (global effects; have a colour or are neutral).
- **You may prepare only ONE card per turn** (`min:0, max:1`). So every turn is a
  fork: *develop a field, or develop one spell into a stack.*
- **Stacks accumulate.** Only the **top card of a stack is "active"** (its effect
  fires and it's the one that attacks). Cards underneath still matter for scaling
  effects (e.g. "6× cards in this stack").
- **Only the clash winner deals damage.** Each turn at most one player takes
  damage; ties cancel entirely.

## Turn phases

Each turn, both players act simultaneously where relevant:

1. **Draw** — `beforeDraw` effects fire, both draw 1.
2. **Prepare** — each secretly picks ≤1 card. Mono-colour spells auto-slot;
   multi/neutral cards you assign a stack; fields go to field-casting.
3. **Reveal** — cards flip; `onReveal` effects fire (spells first, then fields).
4. **Field clash** — the two prepared fields fight on the colour wheel; winner's
   field becomes the active field, loser is discarded (tie → both discarded;
   colour beats neutral; uncontested field just lands).
5. Spells move from casting into their colour stacks.
6. **Cast-spell** — each player picks **one of their three stacks to attack from**
   (the top card is the attacker; an empty stack attacks for **10**).
7. **Spell clash** — the two chosen colours clash on the wheel. Winner's card
   deals `attack` (+`heal`); loser does nothing; same colour/both-empty → cancel.
8. **Damage** — `beforeDamage` field/stack buffs apply, damage/heal resolves,
   `onDealDamage` fires, then `afterDamage`.

The two simultaneous mind-games each turn are **which field to commit** and
**which colour to attack from** — a double rock-paper-scissors.
