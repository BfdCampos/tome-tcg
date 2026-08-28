# HANDOFF — read me first (2026-08-27 session)

**Purpose.** Entry point for whoever picks up next. Where we are, how we work, what to nail
next. **Update this file as you make progress** so it always reflects the frontier.

> **Convention:** the **latest** `docs/analysis/<date-slug>/` folder holds the live
> `HANDOFF.md`. A **new session/agent starts a new dated folder** (this one) and carries a
> fresh HANDOFF into it. Earlier folders are the **frozen record** of their session; this
> folder **supersedes them on anything it restates**. Don't edit earlier folders in place —
> record the delta here.

## Where the prior state lives (read these first)

- **Design bible** (the full game): [`../2026-08-22-design-evolution/`](../2026-08-22-design-evolution/HANDOFF.md),
  docs `01`–`12`; decisions ledger + engine deltas in its doc `08`.
- **Prior session** (proficiency/scaling, quest deltas, the naming pass, first engine memo):
  [`../2026-08-24-proficiency-and-scaling/`](../2026-08-24-proficiency-and-scaling/HANDOFF.md).
  Its **doc 03** is the base word-ledger; its **doc 04** is the first platform memo.

**Refs here:** a bare "doc 04" = the 2026-08-24 platform memo; "bible doc 09/10/11/12" = the
2026-08-22 folder; docs numbered *here* (01, 02…) are this session's.

## The game in one breath

A simultaneous **colour-RPS** duel (Red > Green > Blue > Red; only the clash winner connects)
on four pillars: **the Tome** (persistent face-up spellbooks, top-of-tome auras), **Quests**
(ramp as RPG leveling, separate 7-quest deck), **Colour × Class**, **counterplay by denial**
(Seal → Bounce → Shield/Heal-on-Lose → rare Burn; no graveyard). Damage on connect =
**Power + Potency**. Format **13 spells + 7 quests = 20**; deck-out ≠ loss.

## Product requirements — LOCKED, non-negotiable (2026-08-27)

The user's "100%, not budging" constraints. **Do not re-litigate; design and build to these.**
1. **The game is the user's vision** — design authority is the user's.
2. **Mobile-first, vertical-first.** PC playable = bonus. **No console.**
3. **Premium native-iPhone feel everywhere.** Bar = *Pokémon Pocket on iPhone*. Explicitly
   **no** website-wrapped-in-app, **no** Android-feel-on-iPhone. (Drove the stack decision, doc 03.)

## Done this session (2026-08-27)

- ✅ **Spell damage modifier LOCKED = `Potency`.** Damage on connect = **Power + Potency**.
  (Delta doc: **`02-naming-deltas.md`**, superseding 2026-08-24 doc 03 §6 item 2.)
- ✅ **Clash-outcome pair LOCKED = `Clash Win:` / `Clash Lose:`.** After the whole search came
  up empty, we went literal. This **closes the last open card-vocab word** — no `⛔` items left.
  Bonus: matches the engine's `onClashWin` / `onClashLose` hooks. (Full note in
  **`02-naming-deltas.md`**.)
- 🔒 **STACK DECISION MADE → `03-stack-decision.md`** (NEW). Against three non-negotiable user
  requirements — (1) user's vision, (2) **mobile-first / vertical-first**, PC bonus, no console,
  (3) **premium native-iPhone feel**, *explicitly no website-wrapped-in-app and no
  Android-feel-on-iPhone*, bar = Pokémon Pocket on iPhone — the call is **Unity, end-to-end,
  C#**. Rules = **one deterministic C# library** shared by a **lightweight C# authoritative
  server** (holds hidden picks, reveals on both-locked) **and** the **Unity client** (same
  library for local prediction / solo-AI). Lands as a **fresh Unity-native repo**; the current
  TS engine becomes **reference, not foundation**. Async-turn multiplayer is the pragmatic
  default. **This supersedes both `01-engine-and-unity.md` (TS-brain hybrid) and doc 04
  (web-wrap).** *Documentation only — nothing built; the user said "don't action anything" on
  the build.*
- 📄 **Prior exploration kept as the record** → **`01-engine-and-unity.md`**: the Unity
  cost/benefit + the finding that doc 04 undersold the repo (a working async-generator TS
  engine + Pixi juice pipeline exist, but encode the *old* design). Its recommendation (TS
  brain + Unity client) is now **superseded by doc 03**; read it for context, not the decision.

## ⭐ NEXT SESSION likely starts here

**Stack is decided (doc 03): Unity + C# end-to-end.** Build is **not** started — the user said
"don't action anything" on code. When the user says go, the build track is:
1. **Deterministic C# rules library** for the **new four-pillar design** (Tomes,
   active-spell/Aura, Prepare·Cast·Clash, Seal/Bounce/Bury/Destroy, Quests-as-ramp,
   Power+Potency, proficiency scaling), pure + unit-tested. Its *shape* can start ahead of final
   card content; content follows the starter set.
2. **Thin C# authoritative match service** referencing that library (hidden-commit reveal;
   async-turn first). **Backend hosting/netcode choice** is an open build-time item (doc 03).
3. **Unity project** — vertical-first mobile scenes + the juice layer, same rules library for
   local prediction. Hold to the **feel guardrails** in doc 03.
4. **Data-driven card/quest content pipeline** (content, not code).

Design work that still gates the engine content (independent of the build decision):
- **Classes** — "let classes emerge from named material" (bible doc 12); material now exists.
  How many, names/identities, synergy weight (lean light-to-medium), neutral glue cards y/n.
- **Lower priority:** scaling-pattern internal names (never printed), wider-world naming
  (bible doc 06: species/`-kin`/in-world book name).

## What to nail next (priority order)

1. **Classes** — the last big design block before a starter set is buildable.
2. **The concrete starter set** — the real gate to all numbers. **NOT YET** (user wants a few
   more things settled first). When we do: ~13 singleton spells + ~7 quests; design law — no
   spell strictly-better than another in its colour.
3. **Tune numbers** by playing: Power 10?, Potency band, ramp curve, starting HP (test 80?),
   hand size, mulligan, Seal duration (lean 1).
4. **Economy** later — loot/craft/packs and the **cosmetic** rarity tiers (WoW-style labels).

## Don't re-litigate (see bible doc 08)

Tome, quests-as-ramp, colour×class, Power+Potency combat, only-winner-connects,
denial-not-graveyard, singleton, 13+7=20, deck-out≠loss, keyword system, fixed turn order.
Reopen only with a reason in chat.
