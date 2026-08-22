# Design evolution — goals & summary

**Status: living document.** Unlike the `2026-08-17` review (a fixed snapshot of
the game *as built*), this folder is a **working design session**. It captures a
direction we're actively deciding on and will keep editing as we lock choices.
Where it proposes changes, those changes are **not yet in the engine** — this is
design, not documentation of code.

## Why this session exists

The `2026-08-17` review concluded the core is genuinely original and elegant
(double colour-RPS + persistent per-colour stacks) and that the distance to launch
is mostly *production*, not *design*. Playing it more has surfaced four **design**
frictions that the review didn't feel because it was reading code, not simulating
matches:

1. **The one-action-per-turn rule clogs your hand.** You draw ~1/turn but commit
   ≤1/turn, and you can attack from an *empty* stack for 10, so you never *need* to
   spend a card. Hands bloat with cards you can't meaningfully use. It also makes
   turns feel passive — "not playing" is often correct, which reads as inelegant.
2. **Field cards are clunky.** Playing one costs your single action, then it has to
   *win a clash* to even land, and if it lands the opponent can wipe it next turn —
   so you routinely pay your whole turn for zero effect. **Decision: remove fields
   for now.**
3. **The 30-card deck may be too big** for a game meant to be fast. 20 is on the
   table.
4. **Combat is "just rock-paper-scissors."** Fun, but the same way RPS is fun —
   blind, simultaneous, no in-the-moment interaction. We want **more
   interactivity without much more complexity**, via a **new, in-world card type**.

Plus a whole product layer to design: the **world/theme** (creatures need a name),
a **story mode**, and an **RPG-flavoured economy** (packs, rarities, crafting,
loot) that is explicitly **not pay-to-win**.

## Design pillars (the lens for every decision below)

These are the constraints every proposal in this folder is measured against:

- **P1 — Elegance / rules-to-depth.** The game's best quality (rated 80). One wheel
  drives everything. Don't bolt on subsystems that don't pay for their complexity.
- **P2 — Native mobile, one-thumb.** 3 stacks + a single commit maps to a vertical
  tap UI (rated 85). Any new interaction must survive on a phone in seconds.
- **P3 — The mind-game is the point.** Bluff/read depth (rated 76) is the standout.
  Changes should *deepen* the read, not replace it with solitaire.
- **P4 — Not pay-to-win.** Skill and play-time, not wallet, decide matches. Money
  buys speed and cosmetics, never power you can't otherwise earn.
- **P5 — RPG feel.** The fantasy is *becoming a wizard*. Systems (card types,
  crafting, progression) should read as an RPG, not a spreadsheet.

## Summary of recommendations

Each row links to the doc that argues it. Nothing here is final — this is the
starting position for the session.

| # | Topic | Working recommendation |
|---|---|---|
| 02 | One-action rule | Keep **one *prepare* per turn** (protects the RPS fork), but give hand cards a **second outlet** so they stop clogging — ideally the new reactive type (04), which is played *outside* the prepare. |
| 03 | Fields | **Remove.** Preserve only the *ambient-effect* niche as optional **"weather/omen"** cards that **don't clash** and **self-expire** — impermanence by design, not by losing a clash. |
| 04 | Interactive layer (new type) | Add a **reactive card type** ("Wards/Glyphs" — reveal during the clash without spending your prepare). Fixes the clog (02) *and* the RPS-only problem (04) with one mechanic. **You have your own idea here — this doc sets the criteria to judge it, and holds a slot for it.** |
| 05 | Deck size | Lean **20**, but decide it *together with* the draw/play rate and whether deck-out becomes a real clock. |
| 06 | World & naming | A consistent in-world lexicon (deck = tome, cards = pages, crafting = scribing). Shortlists for the creature/tribe names. |
| 07 | Economy | Cosmetic-first rarities (**start with 4 tiers, not 6**), a Hearthstone-style disenchant→craft loop themed as alchemy, small recycled loot pool, coins from wins, loot always. Anti-P2W guardrails made explicit. |
| 08 | Open questions | The decisions we still need you to make, and the **inconsistencies** spotted in the brief. |

## The one idea that ties it together

The single highest-leverage move is the **new card type in doc 04**. If it's a
**reaction you play from hand during the clash, for free (or by discarding
another card as fuel)**, it solves *two* of the four problems at once:

- **Problem 1 (clog):** excess hand cards finally have somewhere to go.
- **Problem 4 (RPS-only):** the clash gains a second, layered read — *"do they
  have a ward? do I bait it or play around it?"*

That's the thread to pull. Everything else (deck size, economy, theme) is
supporting structure around that core combat question.
