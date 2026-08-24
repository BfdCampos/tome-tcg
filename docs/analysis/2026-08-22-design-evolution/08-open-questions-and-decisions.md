# Decisions, evaluation & open questions

The running ledger. Updated as the session converges. Supersedes the earlier
"inconsistencies in the brief" framing — most of those are now resolved by the
tome/quest redesign.

## Decided (locked this session)

- **The Tome** — persistent, face-up per-colour spellbooks; choose colour **and**
  learned spell on attack. (docs 04, 09)
- **Base attack + modifiers** — base starts **10**, only quests raise it; spells are
  `+X` modifiers; only the **clash winner** connects. (docs 04, 09)
- **Quests** — the ramp, as **ordered-task Sagas** granting permanent base attack;
  **separate 7-card quest deck**, one active, complete→draw-next, **abandon costs
  your prepare**; loser-completable tasks + "OR" escape hatches. (doc 10)
- **Colour × Class** — colour = RPS (all three in most decks); class = archetype,
  spans colours, **printed type** with synergy. (doc 12)
- **Counterplay tiers** — Seal (temporary denial) / `Lose:` Shield+Heal (mitigation)
  / Burn (rare gated destruction). **No graveyard-as-resource.** (doc 11)
- **Keywords** — MTG-style short keywords + tap-to-expand reminder text; working set
  Learn / Hit / Lose / Seal / Forget, plus Shield & Heal resources. **Never**
  Yu-Gi-Oh essays. (doc 11)
- **Turn order** — Draw → Prepare → Choose attack → Reveal → Clash → Damage → Spell
  effects → Quest → End. Effects resolve **after** damage; quests **last**. (doc 04)
- **Format** — **13 singleton spells + 7 quests = 20**; **deck-out is not a loss**.
  (doc 05)
- **Fields removed**; weather/omen niche parked. (doc 03)
- **Rarity = cosmetic only**; every playable card craftable. (doc 07)
- **Singleton** spells. (docs 05, 09)

## Re-evaluation (2026-08-17 baseline → redesigned)

| Dimension | Base | New | Why |
|---|--:|--:|---|
| **Originality** | 82 | **90** | Persistent spellbook + quest-leveling + colour×class RPS is a combination found nowhere. |
| **Decision density** | 58 | **74** | Per turn: which spell to learn, quest/task planning, which colour **and** which learned spell to cast. |
| **Mind-game / bluff** | 76 | **82** | Visible tome = read a **range**, not guess a card. Deeper, still a read. |
| **Complexity / barrier** | 34 | **48** | More to learn (tome, quests, ramp, classes). Keywords keep it far below Yu-Gi-Oh. The number to **watch**. |
| **Elegance** | 80 | **70** | Two resource systems + reordered timing. Keywords + the clean two-axis model limit the damage. |
| **Mobile fit** | 85 | **72** | More on screen (tomes, quest tracks, class tags) and more taps (pick a spell from a fan). Still workable. |
| **Snowball / comeback** | 45 | **~55** | Ramp is positive feedback, but **only-winner-connects** + **loser-completable quests** + on-`Lose` mitigation fight it. Tuning-dependent. |

Net: **deeper and far more original, at a real cost in elegance and mobile
cleanliness** — a trade we're taking deliberately.

## Still open (need decisions or playtest)

**The next things to nail (top of the pile)**
- [ ] **Spell-effect taxonomy & Continuous effects.** Confirm the four timings —
      Learn / Hit / Lose / **Continuous** (aura) — and that we **include Continuous**
      rather than going super-simple (Learn/Hit/Lose only). Design brief wants auras
      like *Kindling*; we're leaning include, gated to top-of-tome. (doc 11)
- [ ] **Top-of-tome rule.** Continuous effects are active **only while the spell is on
      top of its colour tome**. Confirm the setter rule: "**learning and attacking
      both re-top**" (recommended) vs "only attacking" vs "only learning". (doc 09)
- [ ] **Unlearn / Bounce** as the control primitive — return a learned spell to
      hand/deck; works on your own tome (utility) or the opponent's (control); can
      knock an aura off top. Confirm it's in, and hand-vs-deck strength. (docs 09, 11)
- [ ] **Nail a starter card set for playtesting** — a small, concrete batch of spells
      (across all three colours, a couple of Continuous auras, a couple of
      Seal/Bounce/defensive cards, some vanilla hitters) **plus ~7 quests**, so we can
      actually play turns and tune numbers. This is the gate to everything numeric.

**Naming / vocabulary**
- [ ] Final **keyword names** (in-world) for Learn / Hit / Lose / Seal / Forget /
      Continuous / Unlearn.
- [ ] **Classes evolve with the cards — no upfront list.** Spell **classes** (the
      archetype/type axis, doc 12) are added and refined *as we design cards*, not
      planned as a fixed roster. Don't spend effort on a "divinities"/class list up
      front; let archetypes emerge from the starter set and grow.
- [ ] Species & peoples names (doc 06): **Tomelings**? **Emberkin/Thornkin/Tidekin**?

**Rules knobs**
- [ ] **Seal duration** — 1 turn (leaning) vs "until you next win a clash".
- [ ] **One quest task cash-in per turn** (leaning) vs cascading.
- [ ] **Opening quest** — random from your 7 (leaning) vs chosen.
- [ ] **Class synergy weight** — light vs medium (leaning light-to-medium).
- [ ] **Shield** details — stacking, any cap, does it persist indefinitely.

**Numbers (playtest-only)**
- [ ] Base attack (10?), spell modifier band, ramp curve (+2/+3/+5?), starting HP
      (test 80?), starting hand size, mulligan.

**Economy (doc 07)**
- [ ] **Rarity-tier count** — brief wants the full 6 (common→legendary), all
      **cosmetic**; earlier doc-07 note leaned 4 at launch. Reconcile.
- [ ] Loot pool contents (runes + reagents), craft costs, coin floors.

## Engine deltas this implies (for when we build)

Not a to-do yet — just the shape of the code change, so we remember the blast radius:

- **`card.db.ts`** — spells become `base-modifier` + `class` + keyworded effects;
  fields removed/retired; **quests** are a new card type with ordered tasks.
- **`deck.schemas.ts`** — from `30 / max-2` to **13 singleton spells + 7 quests**
  (two lists).
- **`engine.board.ts`** — stacks become **tomes** (no burying); add **base attack**,
  **shield**, and **active-quest** state per side; add a **quest deck**.
- **`engine.turn.ts`** — new fixed order; attack step selects **colour + specific
  learned spell**; effects resolve **post-damage**; **quest resolution** step; remove
  field clash.
- **`engine.game.ts`** — keep the wheel (`red>green>blue`); combat value = **base +
  modifier**; **deck-out ≠ loss**.
- **New: Seal / Shield / Burn / Forget** primitives and the **keyword** effect
  framework.

## Suggested build sequence (once naming/knobs land)

1. **Tome + base-attack + modifier combat** — the keystone; everything needs it.
2. **Quests + ramp** (separate deck, tasks, abandon) — the second engine.
3. **Keyword framework + Seal/Shield/Lose/Forget** — counterplay.
4. **Colour × Class tags + a first class** — deckbuilding identity.
5. **Re-card the DB** into the new model; retire fields.
6. **Then** economy/story/live-ops (docs 06, 07).

## Notes for future edits

This is a **living design bible**, edited in place as decisions land (unlike the
`2026-08-17` snapshot). When the core is built, write a fresh dated **review** of the
game as-shipped and freeze this folder as the record of how we designed it.
