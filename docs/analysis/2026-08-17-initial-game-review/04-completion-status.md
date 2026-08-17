# Completion status

How far from a launchable, mobile-friendly card game. Each dimension scored
**/100**, where 100 = ready to launch.

| Dimension | Score | Why |
|---|---:|---|
| **Core rules engine** | **72** | Turn loop, phases, clashes, hooks, combat-value resolution all work and are tested. Missing: no enforced **win condition** (engine recurses forever, never checks HP≤0 or deck-out), and a **colour-wheel bug** (see findings). |
| **Card content — design** | **60** | ~148 cards *designed* (81 in the live DB + 67 in a `notImplementedCards` block), spanning ~8 archetypes (Orbs, Blast/Eldritch, Potions/Phials, Dull weapons, Tarot, Familiars, Syphon, damage-parity). Rich for a demo, light for launch. |
| **Card content — implemented** | **40** | Only ~56 of the 81 live cards have coded effects; ~25 are vanilla and ~14 are tagged "NOT IMPLEMENTED". Several designed archetypes (Tarot, Familiars, shuffles) have **no logic yet**. |
| **Art / assets** | **25** | 37 card illustrations for ~148 designs (~25%). Board, VFX canvas, particles are in. |
| **Client / feature set (mobile, 1-thumb, 3-slot)** | **55** | Deck builder, game board, hand, action timer, turn-phase meter, VFX, chat, onboarding guide all exist as React routes. It's a web app, not yet a packaged mobile app. |
| **Backend / multiplayer infra** | **65** | Real-time WebSocket pub/sub, auth, DB migrations (Drizzle), Fly.io Docker deploy. Human-vs-human works. |
| **Single-player / AI** | **5** | No bot/AI opponent — you must supply an `opponentId`. Biggest gap for a Pokémon-Pocket-style solo-friendly launch. |
| **Balance & testing** | **20** | A few unit tests for hooks/actions; no balance data, no playtesting telemetry, HP/attack values look hand-tuned not data-tuned. |
| **Store launch readiness (App/Play Store)** | **10** | No native shell (Capacitor/RN/PWA-to-store), no store listings, IAP, privacy wiring, age rating, push, or mobile build pipeline. Terms page exists. |
| **Live-ops / monetization** | **5** | No packs, economy, collection/ownership, ranked/matchmaking, or progression. |
| **Onboarding / tutorial** | **30** | A guide component exists; no interactive tutorial teaching the RPS layers (the hard part to learn). |

**Rough overall completeness: ~40/100** — a strong, playable *vertical slice* with
a real engine and real multiplayer, but far from a shippable product mainly due to
**AI opponent, mobile packaging, content implementation/art, and
monetization/live-ops**.

## Two concrete engine findings (at time of writing)

> Both of these have since been addressed — see "Addressed since" in
> [`docs/README.md`](../../README.md). Kept here as part of the original snapshot.

1. **Colour-wheel is inverted between the two clash functions.**
   `resolveFieldClash` and `resolveSpellClash` read `winnerColorMap` in opposite
   directions (`engine.game.ts:117-118` vs `138-139`). Field clashes resolved one
   way, spell clashes the reverse — combat rewarded the "wrong" colour.
   *(Fixed in PR #1; intended wheel is red > green > blue > red.)*
2. **No win/lose check.** `handleTurn` recursed unconditionally; nothing ended the
   game at 0 HP or on deck-out. *(Fixed in PR #2.)*

## How many cards should a fresh TCG have?

Launch-set reference points: **MTG Alpha 295, Pokémon Base 102, Yu-Gi-Oh LOB 126,
Hearthstone ~133, Lorcana Ch.1 204, Flesh and Blood ~225, Pokémon Pocket ~226
unique.**

For a **30-card / 2-copy** deck, a legal deck needs ≥15 distinct cards, so the
collection must comfortably support several *different* 15-card cores.

**Recommendation for a v1 launch: ~120–150 fully-implemented, arted unique cards
across 5–6 coherent archetypes**, with ~30–40 "glue"/neutral cards. The game has
*designed* roughly enough (~148) — the remaining work is **implementing +
illustrating + balancing** them, not inventing more. Consider freezing new-card
*design* until the existing backlog is coded and arted.

### Current content at a glance

- **81** cards in the playable DB (~**56** with coded effects, ~25 vanilla).
- **67** more designed-but-not-implemented (`notImplementedCards` + "NOT
  IMPLEMENTED" tags).
- **~148** total designed concepts; **37** have art (~25%).
