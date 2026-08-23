# The core redesign — from RPS duel to spellbook RPG

> **This doc replaces the earlier "interactive layer / Wards" proposal, which is
> dead.** Reactive "quick spells" assumed a your-turn/my-turn game; ours is
> simultaneous, so there's no response window to play into. The real answer to
> *"make it more than RPS"* turned out to be much better: don't add a reaction —
> **change what the board is.** Details live in docs 09–12; this is the overview.

## The four new pillars

1. **The Tome (doc 09).** Preparing a spell no longer buries the one below it.
   Each colour stack becomes a **persistent, face-up spellbook**. When you attack,
   you pick the colour **and** which learned spell in that colour to cast. You never
   lose a spell by preparing over it — you're *building a grimoire*. This is what
   makes combat more than RPS: the opponent sees your **range** but not your **pick**.
2. **Quests = the ramp (doc 10).** Every TCG needs a ramp (MTG land, Pokémon
   energy). Ours is **RPG leveling**. Saga-like quest cards with **ordered tasks**
   permanently raise your **base attack** (and other perks) as you complete them.
   Quests live in a **separate 7-card quest deck**; you always have exactly one
   active.
3. **Colour × Class (doc 12).** Two independent axes. **Colour** (🔴🟢🔵) is your
   RPS identity and is the *only* thing the clash cares about — so **most decks run
   all three colours** (you can't refuse to be able to throw "rock"). **Class**
   (Pyromancer, Warlock, …) is the archetype/synergy axis and **spans all three
   colours**, reflavoured to the theme (a fire deck's green is *kindling*, its blue
   is *oil*). Deckbuilding lives on the class axis; RPS coverage lives on the colour
   axis.
4. **Counterplay by denial, not destruction (doc 11).** No graveyard-as-second-hand.
   Answers are **Seals** (temporary lockouts), **Shields/Heals** (on-lose
   mitigation), and — rarely — **Burn** (permanent destruction, gated behind crazy
   conditions / quest capstones). Singleton stays safe because the everyday answer
   never removes a card forever.

## What stays exactly as it was

- **Simultaneous, blind commitment.** Both players choose at once, reveal together.
- **The colour wheel: Red > Green > Blue > Red.** "Beat" = **won the RPS = your spell
  connects**. Lose the clash and your spell does nothing (bar its `Lose` effect).
- **Only the winner deals damage.** Ties (same colour) cancel. This is the
  anti-snowball: no amount of ramp matters on a turn you lose the read.
- **Same starting HP; you can win by pure reading**, casting no spells at all (you
  still deal base attack and can still complete no-cost quest tasks).
- **One meaningful commit per turn** (now "learn one spell", see below).

## The canonical turn order

Every turn follows this fixed chronology (both players simultaneous where noted).
**This changes when some current effects fire — that's expected and intended.**

1. **Draw** — draw 1 from your spell deck. (Deck-out is **not** a loss — you simply
   stop learning new spells; your tome remains. Quests are drawn separately, see
   doc 10.)
2. **Prepare** *(simultaneous, hidden, optional)* — do one of:
   - **Learn** one spell from hand into its colour's tome, or
   - **Abandon** your active quest (swap it for the next — **this uses your
     prepare**, doc 10), or
   - nothing (a legal, sometimes-correct pass).
3. **Choose attack** *(simultaneous, hidden)* — pick a **colour** and **which learned
   spell** in that colour's tome to cast (or no spell / empty tome → **base attack
   only**).
4. **Reveal** — both flip their colour + chosen spell.
5. **Clash** — the wheel resolves; the winner connects.
6. **Damage** — winner deals **base attack + spell modifier**. It hits **Shields
   first, then HP** (doc 11). The loser deals nothing.
7. **Spell effects** — resolve the winner's **Hit** effects, then the loser's **Lose**
   effects (seal / shield / heal / burn / forget). *(Effects resolve here, after
   damage — never before.)*
8. **Quest** — check the active quest's current task; if its condition was met this
   turn, **cash in** the reward (permanent base-attack up, draw, etc.). One task per
   turn, in order. Resolved last, on purpose, so nothing loops.
9. **End** — if a player is at ≤0 HP, the game ends.

Two rules fall out of this order and matter for card design:

- **No spell may reference "a quest you completed this turn"** — quests resolve in
  step 8, *after* spell effects in step 7. Design spells against *past* state only.
- **On-lose Shields/Heals protect the future, not the current hit** — damage is step
  6, the Shield is granted in step 7. Picking a defensive spell is a *proactive*
  read that you'll lose exchanges, not a reactive save. (Keep these small; see
  doc 11.)

## Why this scores better than the old game

Re-rated against the `2026-08-17` baseline (full table in doc 08):

- **Originality** and **decision density** jump (spellbook-building + quest-leveling
  + colour×class is a combination that exists nowhere).
- **Elegance** and **mobile fit** take a hit from more moving parts — but the
  **keyword system** (doc 11: short MTG-style keywords with tap-to-expand reminder
  text, *never* Yu-Gi-Oh essays) buys much of it back.
- **Snowball/comeback** improves *if* we seed loser-completable quest tasks and keep
  on-lose mitigation modest — the RPS read layer remains the great equalizer.

The bet: we spend some of the game's two best scores (elegance, mobile) to buy depth
and originality, and claw elegance back through disciplined keywords and the clean
two-axis colour×class model.
