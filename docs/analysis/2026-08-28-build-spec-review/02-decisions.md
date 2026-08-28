# Decisions locked — 2026-08-28 build-spec review

> The authoritative ledger of every decision made in this session's back-and-forth. Where this
> doc and any earlier doc (incl. the 2026-08-27 build spec) disagree, **this doc wins** — it is
> the latest session. All of it is folded into [`04-build-spec-v2.md`](./04-build-spec-v2.md).
> "Provisional" numbers are owner-tunable; the **rule** they sit in is locked.

## Setup & draw
1. **Opening hand = 3 cards** (changed from 5). Then **Draw 1 at the start of every turn,
   including turn 1** (→ 4 in hand before the first Prepare).
2. **Mulligan = mulligan-to-N (Hearthstone style):** pick which of the opening cards to toss,
   redraw only those (seeded).
3. **Quest opener** = deal 3 of your 7, choose 1 (LOCKED prior). The **2 unchosen shuffle back**;
   the **Quest Deck is random (seeded) order**; completing a quest draws the next one.
4. **No maximum hand size.**
5. **No first player / no priority token.** The game is symmetric and simultaneous.

## Turn submission & timing
6. **One combined hidden commit per turn:** each player locks their Prepare choice **and** their
   Cast (colour + spell) together in a single submission, then both reveal. Ideal for async
   mobile.
7. **`Prepare:` effects resolve at reveal** (not at hidden commit).
8. **Casting AND preparing both re-top** a colour (locked prior); **casting re-tops even on a
   clash loss** (you readied and cast it).

## Clash, damage, ties
9. **Damage = Power + Potency**, applied **Shield first, then HP**. **Floored at 0**; a hit never
   heals the opponent. **Potency may be printed negative** (a "−" spell can exist).
10. **Tie (same colour): mutual chip damage** = each player deals `floor(ownPower × 0.10)` to the
    opponent (Power-based, **ignores Potency**; hits Shield-then-HP). At Power 10 → 1; at Power
    20 → 2. **Double-knockout is possible.**
11. **New third clash-outcome tab `Tie:`** — fires on a colour tie. **Few** cards carry it (most
    blank). Sits beside `Clash Win:` / `Clash Lose:`.
12. **Clash effect order:** winner's `Clash Win:` resolves fully, **then** loser's `Clash Lose:`
    (locked prior). On a tie, both players' `Tie:` clauses fire in the same simultaneous window
    (see #23).

## Health & shield
13. **Health caps at the starting max** (provisional 80); **Heal cannot overheal past it**.
    **"Below half Health" = current HP < half of the fixed starting max** (e.g. < 40).
14. **Shield is capped per player** at a **flat, small, provisional value (~20)**; stacks up to
    the cap; **persists across turns until consumed.**

## The Tome
15. **After the active (top) spell leaves** a tome (Bounce/Bury/Destroy), the **previous top is
    re-exposed** and becomes active (its Aura relights). The tome is an **ordered pile by
    recency** — store the full order.
16. **Removal target scope is card-specified:** cards may say "the top card of the blue tome"
    **or** "a spell in the green tome" (any). Engine supports both.
17. **No tome size cap** (deck size bounds it).

## Denial ladder & keyword ledger (this session's changes)
18. **`Seal:` = SPELL lock** — a specific prepared spell cannot be chosen/cast. Duration is
    **card-specified (1, 2, or X turns)**, not a fixed 1. Does **not** block Prepare.
19. **`Lock:` (NEW) = COLOUR lock** — the opponent may not choose that colour to Cast at all next
    turn. **Rare & gated** — it breaks RPS elegance, so it is a haymaker, never a common tool.
20. **`Dampen:` (NEW) = Potency cap** — sets/reduces a targeted spell's Potency to +0 for a
    duration. **Not rare** — a normal, liked tool.
21. **`Bounce:`** → return a prepared spell to hand. **`Bury:`** → return it to deck (shuffled,
    seeded). **`Destroy`** → permanent removal, **rare & gated** (quest capstone or self-cost).
22. **Growth-on-connect resets on leaving the tome:** a spell Bounced/Buried/Destroyed loses any
    accumulated grown Potency; re-preparing starts fresh at printed value.

## Simultaneity & determinism
23. **Truly-simultaneous windows** are only: **both players' `Prepare:`** effects (at reveal) and
    **both players' `Tie:`** effects. (Clash Win vs Clash Lose is already winner-first, #12.)
24. **Reads use a pre-window snapshot:** a card reading "X per spell in the opponent's tome" sees
    the state as it was before this window's writes, so it never depends on resolution order.
25. **Targeting is locked at snapshot; a target that has already left its zone → the effect
    FIZZLES** (no re-targeting).
26. **Conflicting writes/moves on the same spell resolve by PERMANENCE PRECEDENCE (no first
    player):** `Destroy > Bury > Bounce > Seal/Dampen`. The most-permanent effect resolves; the
    weaker fizzles. Deterministic and symmetric.
27. **Growth-on-connect applies after damage (future only)** — the winning hit deals current
    Potency; the increment lands for future turns (parallels on-lose Shield protecting the
    future).
28. **Deterministic tie-breaks for targeted picks** ("highest-Potency spell", etc.): resolve by
    (highest value → most-recently-topped → lowest tome index) so any match is reproducible.

## Quests
29. **No per-turn objective cap** — every objective whose condition was met **this turn** cashes
    in (in order). Overrules build-spec §3's "one per turn."
30. **A freshly-drawn quest's Objective 1 is NOT checkable the same turn** it's drawn (it becomes
    live from the next turn) — prevents same-turn cascades across quests.
31. **Objective conditions are an OPEN, growing predicate menu:** the engine ships trackers for
    exactly what the M1 cards/quests need (clashes won total & by colour, HP lost total, tome
    sizes, turn number, Power, colour-cast counts, spells prepared…), behind one extensible
    interface, and grows as cards want. Same philosophy as the scaling read-axes.
32. **Abandon** costs your Prepare (locked prior). **Abandon with an empty Quest Deck:** you lose
    the active quest and simply have **no active quest** thereafter (nothing to draw).

## Colour & class
33. **Multi-COLOUR spells ARE in the starter set** (not expansion). A spell is only multi-colour
    while in hand/deck; **on Prepare you MUST choose one of its colours**, and from then on it is
    that colour ONLY for every in-play purpose (tome, depth counts, Aura, clash/damage). It may
    print a **different Potency/effect profile per colour**. **Bounce/Bury resets the colour
    choice** (multi-colour again in hand).
34. **Multi-CLASS is expansion-only.** The engine supports a **class list (0..n)**; **all starter
    cards are 0-or-1 class.** Add **one throwaway multiclass test card** in M1 to exercise the
    seam.
35. **Class design law:** most starter cards are **classless**; a card earns a class only at the
    **specialisation** layer (a basic Fireball is classless). **Add a few class-reading cards** in
    M1 so class-conditional logic is built and tested.

## Global content laws (owner)
36. **Draw guardrail:** few cards, few actions ⇒ card advantage is powerful. **No pure
    card-advantage spells.** Repeatable draw must be ~net-neutral (`draw 1 return 1`,
    `bury 1 draw 1`); a rare +1 net at most. **Never** `Clash Win: draw 2` on a spell. (One-time
    quest draws are lower-risk but still tuned with care.)
37. **Power is sacred:** Power is raised **only** by quests. **No card — Somomancer included — may
    grant or raise Power.** Somomancer rewards Power-only attacks with damage/shield/etc., never
    with Power.

## Format (unchanged, restated)
- **Deck = exactly 13 spells + 7 quests, all singleton** (7 unique quests). **No colour-
  distribution requirement** — mono-colour is legal but RPS-suicidal.
- **Deck-out is not a loss.** First to 0 HP is knocked out; both at ≤0 in one turn = draw.
- **No turn cap / stalemate timer** — ramp + only-winner-connects close games.
