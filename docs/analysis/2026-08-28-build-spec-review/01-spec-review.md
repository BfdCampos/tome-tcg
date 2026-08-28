# Build-spec review — is `04-build-spec.md` ready for a fresh agent?

> **2026-08-28 session, doc 01.** A judgment of the 2026-08-27 build spec
> ([`../2026-08-27-engine-and-client/04-build-spec.md`](../2026-08-27-engine-and-client/04-build-spec.md),
> "doc 04" below) as a **hand-off sheet for a fresh agent in a fresh repo**. Verdict, then the
> gaps found. Every gap here was taken to the owner in chat and **closed** — the decisions live
> in [`02-decisions.md`](./02-decisions.md) and are folded into the ready-to-ship
> [`04-build-spec-v2.md`](./04-build-spec-v2.md). Classes ideation is in
> [`03-classes.md`](./03-classes.md).

## Verdict

**Strong — one of the better hand-off specs — but not decision-closed.** Doc 04 inlines the
locked rules, the vocabulary with an old→new mapping, the turn chronology, the C#/Unity
architecture, the engine-purity laws, a feature-exercising test set, and a milestone plan with
Definitions of Done. An engineer could build *a* game from it.

The problem is precisely the thing the owner wanted to avoid: as written, doc 04 would force
the builder to **invent ~25–30 rules** that materially change how the game plays — and its own
preamble tells them to "ask rather than invent," which guarantees a round-trip of questions (or,
worse, silent guesses baked into the engine). This review found the gaps and the owner closed
them, so the v2 spec can be handed off cold.

## What doc 04 gets right (keep verbatim)

- The **four-pillar rules** (Tome, Quests-as-ramp, Colour×Class, denial-not-destruction) and the
  **canonical turn order** are faithfully captured and correctly marked LOCKED.
- The **engine-purity discipline** (pure/deterministic `/rules`, no I/O, events-not-animation,
  server holds hidden commits) is exactly right and is the crown-jewel guidance.
- The **repo layout** and **milestone ladder** (M0 skeleton → M1 headless playable → M2 server
  → M3 Unity slice → M4 content pipeline) are sound and correctly sequenced.
- The **card hook interface sketch** is a good starting shape.
- The instinct to **exercise every engine feature with a provisional test set** is the right one
  (it just needs the gaps below to actually cover everything).

## The gaps (all now closed — see doc 02)

Grouped by cluster. Each is a rule a builder would otherwise have had to invent.

### A. Game start
- **Mulligan** was never locked (docs "lean yes", doc 04 silent). → **Mulligan-to-N.**
- **Opening hand / first draw** unspecified. → **Owner changed it: start with 3 cards, draw 1 at
  every turn start incl. turn 1.**
- **First-player / priority** concept absent but needed for determinism. → **No first player;
  snapshot-then-apply with permanence precedence** (cluster F).
- **Quest opener** ("deal 3-of-7, choose 1") never said what happens to the 2 unchosen or the
  deck order. → **Unchosen reshuffle in; Quest Deck random (seeded).**

### B. Seal / denial — the biggest ambiguity
- Doc 04's `Seal:` conflated **colour-locking** and **spell-locking**, and never fixed duration.
  The owner **split the vocabulary**: `Seal:` = lock a specific **spell**; new `Lock:` = lock a
  **colour** (rare, RPS-breaking); new `Dampen:` = cap a spell's **Potency** to +0. Durations are
  card-specified (1/2/X turns), not a fixed 1.

### C. Quests
- **Direct contradiction:** doc 04 §3 says "one objective per turn" and lists it as a tested
  invariant; the 2026-08-24 ledger says "no cap." → **No cap** (all completed objectives cash in).
- **No canonical list of trackable predicates** for objective conditions. → **Open, growing
  menu**, seeded from the M1 cards.
- Cascading, freshly-drawn-quest-same-turn, empty-deck abandon — all undefined. → specified in v2.

### D. Tome
- **What becomes the active spell after the top is removed?** → **Previous top re-exposed**
  (ordered pile by recency).
- **Bounce/Bury/Destroy target scope** (top only vs any). → **Card-specified.**
- **Does per-instance growth survive Bounce/Bury?** → **No — resets to printed.**
- Tome cap → none (deck size bounds it), already fine.

### E. Combat edges
- **Damage floor / negative Potency.** → **Floor at 0; Potency may be negative.**
- **Max HP / overheal / what "half Health" means.** → **Cap at starting max; half = half of the
  fixed max.**
- **Shield cap / stacking.** → **Capped (flat ~20, provisional).**
- **Do Clash Win/Clash Lose fire on a tie?** → **New answer: ties get mutual chip damage
  (`floor(Power×0.10)`) + an optional new `Tie:` tab** on a few cards.

### F. Timing & determinism (the engine's spine)
- **How is a turn submitted?** → **One combined hidden commit** (Prepare + Cast together).
- **When do `Prepare:` effects resolve?** → **At reveal.**
- **Resolution order for truly-simultaneous effects.** → clash tabs are winner-first;
  same-window (both `Prepare:`, both `Tie:`) use **snapshot reads + permanence precedence
  (Destroy > Bury > Bounce > Seal/Dampen)**, targets fizzle if already gone. **No first player.**
- **Growth-on-connect timing.** → **After damage (future only).**

### G. Content / format / scope
- **One colour per spell?** The reference engine stored an array. → **Multi-colour IS in the
  starter set**; colour chosen and **locked at Prepare**, may carry a **different profile per
  colour**, resets on Bounce/Bury.
- **Multi-class?** → **Expansion only**; engine supports a class *list*; starter cards are 0-or-1
  class; add **one throwaway multiclass test card** for coverage.
- **Deck-legality validator.** → **Exactly 13 spells + 7 quests, all singleton, colours free.**
- **No test card exercised the Class field.** → **Add a few class-reading cards** in M1.
- **Draw guardrail** (owner, new law): few cards/actions ⇒ **no pure card-advantage** — draw must
  be ~net-neutral (`draw 1 return 1`, `bury 1 draw 1`), never `Clash Win: draw 2` on a spell.
- **Somomancer must never grant Power** — Power comes only from quests.
- **Stalemate/turn cap.** → **None** (ramp + only-winner-connects trusted to close games).

## Bottom line

Doc 04 was a **B+ spec**: complete in structure, open in the details that decide the game. With
the ~35 decisions in doc 02 folded in, [`04-build-spec-v2.md`](./04-build-spec-v2.md) is the
**hand-it-cold** version — the fresh agent should build from v2 and never need to invent a rule
or ask the owner a design question to reach a playable M1.
