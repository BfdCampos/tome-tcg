# The one-action-per-turn rule

## What the engine actually does

From `engine.turn.ts`, each turn is:

1. **Draw** — both players draw 1 (`actions.draw`).
2. **Prepare** — a `select_from_hand` with `min: 0, max: 1`. You commit **at most
   one** card, into one stack (or, previously, the field).
3. **Cast-spell** — you pick **which stack attacks**. Crucially this is a *separate*
   choice from prepare, and **an empty stack still attacks for 10**
   (`settings.emptySlotAttack`).

So the card economy per turn is: **+1 card in, ≤1 card committed, and you can deal
damage while committing nothing.**

## Why it clogs

Two independent leaks compound:

- **Draw ≥ play.** You gain a card every turn and spend at most one. Over a game the
  hand only grows.
- **Commitment is optional and often *incorrect*.** Because an empty stack hits for
  10 and only the clash *winner* connects, "hold everything, attack from whatever
  colour wins the read" is frequently the best line. The rule that was meant to
  *focus* decisions instead rewards *not deciding*.

The result is the feel the brief describes: a fat hand of cards you're never
pressured to play, and turns where the "elegant" choice is to do nothing but pick a
colour. That's RPS with a card backlog, not a card game.

## What the rule is *right* about (don't throw it out)

The one-*prepare*-per-turn cap is load-bearing for the game's identity:

- It **creates the tempo fork** — "which single colour do I develop?" — that makes
  stacks a slow-burn engine instead of a dump.
- It **keeps the board legible on a phone** (P2): one commit, one attack, done.
- It **protects the bluff** (P3): if you could flood all three stacks, the colour
  read collapses.

So the fix is **not** "let players commit more spells per turn." That trades the
game's spine for a short-term relief valve.

## The real fix: give the hand a *second outlet*, not a second commit

The clog isn't "you commit too little" — it's "committed-to-a-stack is the *only*
thing a card can do." Add a **different verb** for cards so a bloated hand drains
without touching the prepare fork. Options, roughly in order of preference:

### Option A — Reactive cards played *outside* the prepare (recommended)

The new card type in **doc 04** is held in hand and revealed *during the clash*,
**without** using your once-per-turn prepare. This is the cleanest fix: excess
cards become reactions, the prepare fork is untouched, and — bonus — it's also the
answer to "combat is just RPS." One mechanic, two problems solved. See doc 04.

### Option B — "Channel": discard-a-card-for-effect

Any spell can be **channelled** from hand for a one-shot burst (small burn, a peek,
a heal, a stack nudge) and then discarded — an alternative to preparing it. Turns
dead cards into fuel. Risk: it's a second full decision each turn (P1/P2 cost) and
can outshine the stack game. Keep the effects *small* if we do this.

### Option C — Discard-as-cost on the reactions (a knob, not a standalone)

Make the doc-04 reactions **cost a card from hand** to fire ("tear a page to power
the ward"). This directly converts clog into a resource and self-limits reaction
spam. Strong candidate to *combine* with Option A.

### Option D — Tune the leak at the source

Cheapest to ship, weakest on its own:

- **Draw less / play the draw.** e.g. don't draw on the turn you prepare, or draw 1
  only if your hand is below a cap.
- **Hand cap with discard.** A max hand size forces spending. Blunt but standard.
- **Nerf the empty-stack attack.** If an empty stack hit for *less* than a committed
  card (or 0), "commit nothing" stops being free and the prepare gets used. This is
  a one-number change (`emptySlotAttack`) with big behavioural leverage — worth
  testing regardless of what else we do.

## Recommendation

- **Keep** one *prepare* per turn (P1/P2/P3 all depend on it).
- **Adopt Option A** (reactions outside the prepare) as the primary outlet, and
  seriously consider **layering Option C** (discard-to-fire) so the clog literally
  becomes reaction fuel.
- **Independently, tune `emptySlotAttack` down** and test — it's a free lever that
  makes preparing matter again no matter what else we choose.

Deck size (doc 05) interacts here: a smaller deck + a real draw/play balance is
part of the same knob-set. Decide them together.
