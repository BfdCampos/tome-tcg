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

## Decisions locked in this session

The debate has since **converged on a substantially new game**. The headline
outcome: we didn't add a reaction to the RPS — we **changed what the board is**.

| # | Topic | **Decided** |
|---|---|---|
| 04, 09 | The board | **The Tome.** Preparing a spell no longer buries the card under it; each colour becomes a **persistent, face-up spellbook**. On attack you choose the colour **and which learned spell** to cast. Opponent sees your *range*, not your *pick*. This is the "more than RPS" answer. |
| 04, 10 | New card type + ramp | **Quests.** Saga-like cards with **ordered tasks** that permanently raise your **base attack** — the game's ramp, reframed as **RPG leveling**. Separate **7-card quest deck**; one active at a time; complete → draw next; **abandon costs your prepare**. |
| 04, 12 | Deckbuilding axes | **Colour × Class.** Colour (🔴🟢🔵) is the RPS tag — **most decks run all three**. Class (Pyromancer, …) is the archetype/synergy tag and **spans all colours**, reflavoured to theme. Class is a **printed type** some effects care about. |
| 04, 11 | Combat model | **Base attack (starts 10) + spell modifier**, only the **clash winner** connects. Effects resolve **after damage**, then quests. **Keyword system** (MTG-style, tap-to-expand — *never* Yu-Gi-Oh essays). |
| 11 | Counterplay | **Three tiers, no graveyard:** **Seal** (temporary denial — the everyday answer) · **Shield/Heal on `Lose`** (mitigation for the player losing the read) · **Burn** (rare, gated permanent destruction). |
| 05 | Format | **13 spells (singleton) + 7 quests = 20.** **Deck-out is *not* a loss** — it just caps your growth (you keep your tome). |
| 03 | Fields | **Removed.** Optional non-clashing "weather/omen" niche parked for later. |
| 07 | Economy | **Rarity = cosmetic only** (full-art/animation chase; every playable card craftable). Alchemy-flavoured disenchant→scribe loop; coins from wins, loot always. (Rarity-tier count still open.) |

## Still open (see doc 08)

- Final **keyword vocabulary** (in-world names for Learn/Hit/Lose/Seal/Forget).
- **Class list** (how many, names, how heavy the synergy).
- **Scaling numbers** (base, modifiers, ramp curve, HP) — playtest-only.
- Seal **duration** (leaning 1 turn), one-task-per-turn, random vs chosen opening quest.
- Economy **rarity-tier count** (was leaning 4; user wants the 6-tier ladder — cosmetic).

## The one idea that ties it together

We spend some of the game's two best scores — **elegance** and **mobile
simplicity** — to buy **depth** and **originality**, then claw elegance back through
a disciplined **keyword system** and the clean **two-axis (colour × class)** model.
The Tome is the keystone: it makes combat a *read of a visible range* instead of a
blind throw, and everything else (quests as leveling, seals as denial, singleton
collection) hangs off it.
