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

## Done this session (2026-08-27)

- ✅ **Spell damage modifier LOCKED = `Potency`.** Damage on connect = **Power + Potency**.
  (Delta doc: **`02-naming-deltas.md`**, superseding 2026-08-24 doc 03 §6 item 2.)
- 🟡 **Clash-outcome pair: pole chosen = `plain-and-clear`; words still open.** `Deal:`/`Take:`,
  `Beat:`/`Yield:`, `Best:`/`Fold:` all **rejected** by the user. Plain action-verb lane is
  thin — next try **state/condition words**, and remember the winner tab must also read for
  *good-on-lose* effects. (Full note in **`02-naming-deltas.md`**.)
- 📄 **Unity vs. the web client — full cost/benefit** → **`01-engine-and-unity.md`** (NEW).
  Driver: premium juice. Key finding: doc 04 **undersold the repo** — a **working
  server-authoritative TS engine** (async-generator `state | vfx | log` stream over
  WebSockets) + a **Pixi 8 juice pipeline** already run, but they encode the *old* design, so
  the rules get rewritten on **every** path. Recommendation: **build the new-design rules once
  as a clean TS `packages/engine`**, keep a **disciplined serialised client↔server event
  protocol**, keep pushing juice in **Pixi** — which makes **Path A (Unity client + TS brain)**
  a cheap swap *later* if the juice bar proves it. **Don't** take Path B (all-in C#). Cheap
  tiebreaker proposed: a one-card-sequence **Pixi-vs-Unity juice spike**. **Not locked —
  awaiting the user.**

## ⭐ NEXT SESSION likely starts here

1. **Engine/client decision (doc 01).** Open user questions: is the **two-language tax**
   (Path A) acceptable later, or is single-language a hard rule? Is **console/Switch** ever a
   goal (the one strong thumb on the scale for Unity)? Want the **juice spike**?
2. **Highest-value technical step regardless of that call:** extract/rewrite the rules as a
   clean, I/O-free, unit-tested TS **`packages/engine`** against the **new four-pillar design**
   (Tomes, active-spell/Aura, Prepare·Cast·Clash, Seal/Bounce/Bury/Destroy, Quests-as-ramp,
   Power+Potency, proficiency scaling). Its *shape* can start now; card content fills in with
   the starter set. Also **freeze the client↔server event protocol** as an explicit versioned
   contract — that's what keeps Path A cheap.
3. **Finish the last card-vocab word:** the clash-outcome pair (see `02-naming-deltas.md`).
4. **Classes** — "let classes emerge from named material" (bible doc 12); material now exists.
   How many, names/identities, synergy weight (lean light-to-medium), neutral glue cards y/n.
5. **Lower priority:** scaling-pattern internal names (never printed), wider-world naming
   (bible doc 06: species/`-kin`/in-world book name).

## What to nail next (priority order)

1. **Engine track** — items 1–2 above (decision, then the `packages/engine` rewrite). This
   is now the live thrust alongside naming.
2. **Finish naming** — the clash pair, then classes.
3. **The concrete starter set** — the real gate to all numbers. **NOT YET** (user wants a few
   more things settled first). When we do: ~13 singleton spells + ~7 quests; design law — no
   spell strictly-better than another in its colour.
4. **Tune numbers** by playing: Power 10?, Potency band, ramp curve, starting HP (test 80?),
   hand size, mulligan, Seal duration (lean 1).
5. **Economy** later — loot/craft/packs and the **cosmetic** rarity tiers (WoW-style labels).

## Don't re-litigate (see bible doc 08)

Tome, quests-as-ramp, colour×class, Power+Potency combat, only-winner-connects,
denial-not-graveyard, singleton, 13+7=20, deck-out≠loss, keyword system, fixed turn order.
Reopen only with a reason in chat.
