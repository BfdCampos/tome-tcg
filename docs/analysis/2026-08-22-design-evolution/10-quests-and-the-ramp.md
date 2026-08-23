# Quests & the ramp

The game's ramp system — its answer to MTG land / Pokémon energy — reframed as
**RPG leveling**. This is the new card type.

## The shape (Sagas, but untimed)

- A **quest card** sits face-up on your side and has **multiple ordered tasks**
  (think MTG Sagas). It exists **outside the fight** — activating/advancing it does
  **not** cost your one prepare.
- Tasks complete **in order**: task 2 can't be cashed before task 1. There's **no
  time limit** — you "cash in" a task whenever you finally meet its condition.
- **Task 1 is always trivially completable** (e.g. *land any hit*, *lose any HP*), so
  a quest is never dead on arrival.
- Completing a task grants its **reward** — most often a **permanent base-attack
  increase** (+2 / +3 / +5 as a starting curve), sometimes a perk (draw a card, etc.).
- When **all tasks are done**, the quest stays on the board **greyed out** (a trophy;
  no more to give).
- **Exactly one quest is active at a time.**
- **Quests resolve last in the turn** (step 8, doc 04) — deliberately, so no effect
  can loop through a quest mid-turn.

## The quest deck (separate line — the elegant fix for "ramp screw")

Ramp must never be left to random draw (that's MTG mana screw/flood, the genre's
worst feel). So quests are a **separate deck**:

- In deckbuilding you choose your **7 quests** (13 spells + 7 quests = a clean
  **20-card** loadout total; see doc 05).
- Game start: you're dealt **1 random quest** from your 7 as your active quest.
- **Complete it → draw the next** quest from your quest deck. Finishing a quest hands
  you the next lead — thematically perfect and self-pacing. Since only ~2–4 quests
  resolve per game, 7 never runs out.

## Abandoning (the "stuck" escape hatch)

You can get stuck if a task's condition is unreachable in a matchup. So:

- You may **abandon** your active quest at any time — but it **costs your prepare that
  turn** (you forgo learning a spell to chase a new lead). You discard the active
  quest and draw the next; the new quest starts fresh at its task 1.
- The prepare-cost is deliberate: it makes abandoning a real decision and **stops
  abandon-spam** (otherwise players would churn task-1s for free base attack).
- Backstop design rule: harder tasks carry an **"OR" escape hatch**, usually a
  self-cost — e.g. *"Win a clash with red **or** lose 15 HP."* There's always a path
  forward; the *better* path rewards the plan. Between the escape hatch and
  abandon-with-cost, you're never hard-locked, and skipping is never free.

## Balance levers (the good part)

- **Loser-completable tasks are the comeback valve.** Tasks like *lose 10+ HP* or
  *discard a card* can only be completed by a player taking a beating — so a behind
  player still **levels up**. Seed every quest deck with 1–2 of these on purpose.
- **Colour-locked tasks are a self-imposed cost.** A quest that demands *win a clash
  with blue* makes you **predictable** — the opponent can Seal or out-read blue and
  starve your ramp (this emerged naturally in the 4-turn sim, doc 08). Great, legible
  strategic tension for free.
- **Total ramp per game is the number to watch**, not the per-task values. At ~2–4
  quests completed, base climbs roughly **+15 to +25** over a game (base 10 → ~30),
  which guarantees games *close* rather than stall. Tune the curve to game length;
  exact numbers are playtest-only.

## Open sub-questions

- **One task cash-in per turn** (recommended, for pacing) or allow cascading multiple
  in a turn if conditions stack? Leaning one-per-turn.
- Do a few **capstone tasks** grant non-ramp haymakers (e.g. the **Burn** in doc 11)?
  Leaning yes — the rare, earned, build-around payoff.
- Is the starting quest **random from your 7** (current assumption) or do you **choose**
  your opener? Random adds variance/replay; choosing adds consistency. Leaning random.
