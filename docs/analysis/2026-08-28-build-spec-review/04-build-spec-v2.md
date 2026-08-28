# Tome TCG — Build Spec

> **What this is.** The complete, self-contained brief to build the first real, playable version of
> Tome TCG in a **fresh Unity + C# repo**. It inlines every rule, the architecture, the coding
> standards, a provisional test-card set, and a milestone plan. **Build from this file alone** and
> reach a playable Milestone 1 without inventing a rule. Anything marked **LOCKED** is settled —
> implement it faithfully. Anything marked **PROVISIONAL** (all specific numbers, the sample cards)
> is placeholder-for-tuning — implement it as a **config constant**, never a magic literal, so the
> owner can tune it. Anything marked **OPEN** is undecided — leave a clean seam and **ask** rather
> than finalise it.
>
> **How to kick off.** Add this file to the repo as `docs/BUILD-SPEC.md`, then: *"Implement Tome TCG
> per `docs/BUILD-SPEC.md`. Start at **Milestone 1**, stop at its Definition of Done for review. Do
> not invent design where the spec marks something PROVISIONAL or OPEN — ask."*

---

## 0. Product requirements (LOCKED, non-negotiable)

1. **The game is the owner's vision.** Design decisions route to the owner.
2. **Mobile-first, vertical-first.** Phone held upright. **PC playable = bonus. No console.**
3. **Premium native-iPhone feel everywhere.** Bar = *Pokémon Pocket on iPhone*. Not a website in a
   wrapper, not an Android-feeling port. 60fps, safe-area aware, gestural, haptic, no jank.

**Stack (LOCKED):** Unity + C# end-to-end. The **rules engine is one deterministic C# library**
shared by (a) a lightweight **C# authoritative server** and (b) the **Unity client** (same library
for local prediction / solo-vs-AI). See §5.

---

## 1. The game in one paragraph

A two-player **simultaneous colour-RPS duel** on a persistent spellbook board. Each turn both
players lock a single hidden commitment, then reveal together. You attack in one **colour**
(🔴 Red > 🟢 Green > 🔵 Blue > 🔴 Red); **only the clash winner connects** for full damage; a same-
colour **tie** deals mutual **chip** damage. Damage = your **Power** (a character level that ramps
via Quests) **+** the **Potency** of the spell you cast. Instead of a stack, each colour is a
**Tome**: a persistent, face-up spellbook you build one spell at a time — opponents see your
**range** but never your **pick**. Counterplay is **denial, not destruction** (Seal / Lock /
Dampen / Bounce / Bury, with rare Destroy). No graveyard. Deck = **13 spells + 7 quests = 20**,
singleton. Deck-out is not a loss. First to 0 Health is **knocked out**.

---

## 2. Vocabulary (LOCKED — use these exact terms in code and card text)

| Term | Meaning |
|---|---|
| **Health / HP** | Life total. **Caps at the starting max** (PROVISIONAL 80); Heal never overheals past it. At 0 you're **knocked out** (game over). "Below half Health" = current HP < half of the fixed max. |
| **Power** | Character stat / level. **Starts at 10.** Permanent; raised **only** by quests. Power *is* the level. **No card may grant or raise Power.** |
| **Potency** | A spell's damage modifier (`+8`, `+0`, `−4`, or a scaling clause). **Damage on connect = Power + Potency**, floored at 0. May be printed negative. |
| **Shield** | Persistent damage buffer; absorbs **before** HP; persists until consumed. **Capped per player** at a flat PROVISIONAL **20**. |
| **Heal** | Restore HP now (never above max). |
| **Tome** | A per-colour (🔴🟢🔵) persistent, face-up spellbook pile. Three per player. **Ordered by recency** (has a designated top). |
| **active spell** | The **top** spell of a tome. Only the active spell's `Aura:` is live. |
| **Prepare** | Turn beat + keyword: put a spell from hand into its colour's tome; re-tops it. `Prepare:` fires at reveal. |
| **Cast** | Turn beat: choose a colour + a spell in that tome to throw into the clash; re-tops it (even on a loss). |
| **Clash** | The RPS resolution. |
| **Deck** (in-world *Bundle*) | Your 13 battle spells (singleton). |
| **Collection** (in-world *Library*) | Everything you own; you build a Deck from it. |
| **Quest** / **Objectives** | The ramp card and its ordered steps. |
| **Quest Deck** (in-world *Quest Journey*) | Your separate 7-quest line. |

### Effect keyword tabs (LOCKED)

| Keyword | Fires | Notes |
|---|---|---|
| **`Prepare:`** | when the spell enters a tome (at reveal) | e.g. `Prepare: draw 1, return 1.` |
| **`Clash Win:`** | after damage, if this spell **won** the clash | winner's fire first |
| **`Clash Lose:`** | after damage, if this spell **lost** the clash | loser's fire after winner's |
| **`Tie:`** | after chip, on a same-colour **tie** | **few** cards carry it; most blank |
| **`Aura:`** | continuously, **only while active (top)** of its tome | re-topping toggles which auras are live |

### Denial ladder (LOCKED)

| Keyword | Effect | Frequency |
|---|---|---|
| **`Seal:`** | lock a specific **spell** from being cast, for a **card-specified** duration (1/2/X turns). Does not block Prepare. | common |
| **`Lock:`** | lock a **colour** from being cast at all next turn (removes an RPS option). | **rare, gated** — breaks RPS elegance |
| **`Dampen:`** | cap/reduce a target spell's **Potency to +0** for a duration. | common |
| **`Bounce:`** | return a prepared spell to its owner's **hand** (resets any grown state & multi-colour choice). | common |
| **`Bury:`** | return a prepared spell to its owner's **deck** (shuffled, seeded). | rarer/stronger |
| **`Destroy`** | permanently remove a prepared spell. | **rare, gated** (quest capstone / self-cost) |

Note: "Burn" is reserved for fire *flavour* only — permanent removal is always `Destroy`.

---

## 3. The canonical turn (LOCKED) — implement exactly this order

Both players act through **one combined hidden commitment** per turn; the engine takes both
commitments and resolves deterministically.

1. **Draw** — each player draws 1 from their spell deck (**including turn 1**). Deck-out is NOT a
   loss — you stop drawing; tomes remain. Quests are a separate deck (§4).
2. **Commit** *(simultaneous, hidden)* — each player locks a single submission containing:
   - a **Prepare choice** — one of: **Prepare** one spell from hand into a colour's tome (choosing
     the colour, incl. which colour for a multi-colour spell); **Abandon** the active quest (swaps
     for the next — consumes the Prepare); or **nothing** (a legal pass); **and**
   - a **Cast choice** — a **colour** (mandatory) and optionally **which spell** in that tome to
     cast (no spell / empty tome / sealed spell → **Power only** in that colour).
3. **Reveal** — both commitments flip at once. **`Prepare:` effects resolve now** (both players',
   simultaneous window — see §4 *Simultaneity*).
4. **Clash** — wheel resolves (Red>Green>Blue>Red).
5. **Damage** —
   - **Win/Lose:** winner deals **Power + chosen spell's Potency** (+ live auras), applied to
     **Shield first, then HP**, floored at 0. Loser deals nothing.
   - **Tie (same colour):** each player deals **chip = `floor(ownPower × 0.10)`** to the opponent
     (Power-based, ignores Potency), Shield-then-HP. Double-knockout is possible.
6. **Clash effects** — resolve the **winner's `Clash Win:`** then the **loser's `Clash Lose:`**;
   on a tie, resolve **both players' `Tie:`** clauses (simultaneous window). Effects resolve
   **after** damage, never before.
7. **Quest** — for the active quest, cash in **every** objective whose condition was met **this
   turn**, in order (no per-turn cap). A quest completed here draws the next quest, but that new
   quest's objectives are **not** checkable until next turn. Resolved after clash effects so
   nothing loops.
8. **End** — any player at ≤0 HP is knocked out; both ≤0 = draw.

**Invariants to enforce in tests:**
- No effect may reference "a quest completed this turn" (quests resolve step 7, after effects
  step 6). Cards read *past* state only.
- On-lose Shields/Heals and growth-on-connect protect the **future**, not the current hit (damage
  is step 5; effects/growth are step 6).
- **Casting re-tops even on a loss.**

---

## 4. Board & rules detail (LOCKED)

**The Tome.** Three per player, one per colour, **ordered by recency with a designated top**.
`Prepare` adds a spell to the top without burying anything; every prepared spell stays castable all
game. `Cast` may throw **any** castable spell in the chosen colour and re-tops it. Face-up to both
(range public, pick hidden). **When the top leaves** (Bounce/Bury/Destroy) the **previous top is
re-exposed** and its Aura relights. **No tome size cap.**

**Active spell / auras.** Only the top spell's `Aura:` is live. Auras are **read at the moment they
matter** (e.g. during damage calc), so mid-turn re-topping is naturally respected. Sum contributions
from each tome's active spell.

**The number model.** Power starts **10**, permanent, raised only by quests. Spells are **Potency**
modifiers. Cast with no spell / empty / sealed → **Power only**. Because Power ramps, the whole
book scales with your level.

**Multi-colour spells (starter feature).** A spell may carry 2–3 colours **and a distinct
Potency/effect profile per colour**. It is multi-colour only in hand/deck; **on Prepare the owner
picks one colour**, and from then on it is **that colour only** for every in-play purpose (tome
membership, depth counts, Aura, clash/damage). **Bounce/Bury resets the colour choice** (multi-
colour again in hand). Engine: `SpellDef` holds per-colour variants; the prepared colour selects
one.

**Class.** A **printed list of class tags (0..n)** on each spell; **some effects read it.** Starter
content is **0-or-1 class per card** (multi-class is expansion; ship one throwaway 2-class card to
prove the list). Most starter cards are **classless**. The seven starting schools and their
intended identities are in **Appendix A** (ideation only — not required to build M1).

**Singleton (LOCKED).** One copy per card. **No spell strictly better than another in its colour** —
every spell earns its slot with a situational angle. #1 card-design rule.

**Quests (the ramp).** Face-up card with **ordered Objectives**; advancing does **not** cost your
Prepare. Objectives complete **in order**, no time limit; **Objective 1 is always trivially
completable**. Rewards are **arbitrary/varied** (usually +Power, sometimes a perk/capstone
haymaker; PROVISIONAL curve +2/+3/+5). A finished quest greys out. **Exactly one active at a time.**
Separate **7-card deck**: opener = **deal 3, choose 1** (LOCKED); **the 2 unchosen shuffle back**;
the deck is **random (seeded)**; completing draws the next. **Abandon** swaps active for next,
costs your Prepare; with an empty deck you simply have no active quest thereafter. Seed **1–2
loser-completable** objectives per deck (e.g. *lose 15+ HP*) as the comeback valve. "OR" escape
hatches are **rare, only when thematically earned**.

**Objective/scaling predicates — open menu.** The engine tracks whatever the M1 cards/quests need
behind one extensible interface, and grows: clashes won (total & by colour), HP lost (total),
tome sizes, turn number, Power, colour-cast counts, spells prepared, streak/momentum, last cast,
sealed state, opponent tome contents, HP totals. Don't pre-trim; add trackers as cards want them.

**Counterplay** = the denial ladder (§2). Keep on-lose Shield/Heal **small** and paired with **low
Potency**. `Lock` and `Destroy` are **rare and gated**.

**Simultaneity & determinism (LOCKED).**
- **Deterministic & seeded:** same inputs + seed ⇒ identical match. Store the seed.
- **No first player.** The only truly-simultaneous windows are **both players' `Prepare:`** and
  **both players' `Tie:`** (clash Win-vs-Lose is winner-first).
- **Reads use the pre-window snapshot** (a `+X per spell in their tome` card sees pre-write state).
- **Targeting locks at snapshot; a target that has left its zone → the effect FIZZLES.**
- **Conflicting moves on the same spell resolve by permanence precedence:**
  `Destroy > Bury > Bounce > Seal/Dampen`. Most-permanent wins; weaker fizzles.
- **Deterministic tie-breaks for targeted picks** ("highest-Potency spell"…): highest value →
  most-recently-topped → lowest tome index.
- **Growth-on-connect** stores per-instance grown Potency on the tome entry, applies **after
  damage (future only)**, and **resets** if the spell leaves the tome.

**Starting values (PROVISIONAL — config constants):** Health **80** (cap, no overheal), Power
**10**, **opening hand 3** then draw 1 each turn incl. turn 1, **mulligan-to-N**, Shield cap **20**,
chip **floor(Power×0.10)**, no hand cap, no turn cap.

---

## 5. Why an authoritative server is mandatory (LOCKED)

Simultaneous hidden-commit means **no client may adjudicate a clash**: a client that learned the
opponent's pick before locking kills the bluff; a client that computed its own damage could cheat.
A **neutral referee** (the server, running the shared rules library) holds both commitments and
reveals + resolves only when **both are locked**. Engine-agnostic — a sealed-envelope problem.

**Multiplayer model (PROVISIONAL-leaning):** ship **async-turn** first ("take your turn, opponent
notified"). Real-time later on the same engine. **OPEN:** backend hosting/netcode (managed vs custom
.NET) — decide at M2.

---

## 6. Architecture & repo layout

```
/rules        C# class library — deterministic engine. NO I/O, NO animation, NO delays.
              Pure functions over GameState; emits typed events. Single source of truth.
/rules.tests  xUnit/NUnit — the rules are proven here, not in Unity.
/harness      C# console app on /rules — play a full match in the terminal (human-vs-bot,
              bot-vs-bot). The fast "test the game" loop, no art.
/server       C# authoritative match service on /rules (M2). Holds hidden commits, reveals on
              both-locked, persists match state. Async-turn first.
/unity        Unity project on /rules (M3). Vertical-first mobile client; runs /rules locally for
              prediction; server is truth for PvP.
/content      Data-driven card & quest definitions (M4) — sets are content, not code.
/docs         This spec, plus any design notes you add as you build.
```

### Engine design rules (LOCKED)

1. **Pure & deterministic.** Seed all shuffles/draws; any match reproducible from its seed.
2. **Never sleeps, never animates.** Compute state transitions + emit typed events
   (`ClashResolved`, `TieChip`, `DamageDealt`, `ShieldGained`, `Sealed`, `Locked`, `Dampened`,
   `Bounced`, `Buried`, `Destroyed`, `SpellPreparedToTop`, `Retop`, `QuestObjectiveCashedIn`,
   `PowerRaised`, `Knockout`…). **All timing/pacing/animation lives in the client.**
3. **Takes committed actions, never reveals early.** The turn API accepts *both* players' locked
   `Commit { Prepare, Cast }` and only then resolves. The *server* enforces hidden-until-both-in.
4. **Card behaviour is code, keyed by card id, behind a small hook interface** (below). A
   data-driven JSON DSL is an M4 evolution — don't over-engineer day one.

### Card hook interface (sketch — adapt idiomatically)

```csharp
enum Colour { Red, Green, Blue }
enum Trigger { Prepare, ClashWin, ClashLose, Tie }   // Aura is continuous, handled separately

// A spell may be multi-colour: one profile per colour it can be prepared as.
record SpellDef(string Id, string Name, IReadOnlyList<string> Classes,  // 0..n; starter 0-or-1
                IReadOnlyDictionary<Colour, SpellProfile> Profiles);    // 1 key = single-colour

record SpellProfile(
    Func<Ctx,int> Potency,                 // flat: _ => 10 ; scaling: reads Ctx
    IReadOnlyList<Effect> Effects,         // Prepare/ClashWin/ClashLose/Tie clauses
    AuraDef? Aura);                        // non-null only for aura cards

record Effect(Trigger When, Action<Ctx> Apply);
record AuraDef(Action<AuraCtx> Contribute);

// Per-instance runtime state (growth etc.) lives on the tome entry, NOT the def; resets on leave.
class SpellInstance { SpellDef Def; Colour PreparedAs; int GrownPotency; /* ... */ }

// Ctx exposes readable state (the open predicate/scaling menu), safe mutators, an event sink.
// NEVER expose the opponent's hidden pick before reveal.
interface Ctx {
    GameState Game; Side Owner; Side Opponent; SpellInstance This;
    void Deal(int); void GainShield(int); void Heal(int);
    void Seal(SpellRef,int turns); void Lock(Side,Colour,int turns); void Dampen(SpellRef,int turns);
    void Bounce(SpellRef); void Bury(SpellRef); void Destroy(SpellRef);
    void Emit(GameEvent e);
    int OwnPower { get; } int TomeCount(Side,Colour); bool OwnBelowHalfHp { get; }
    bool AttackedWithPowerOnly { get; } /* Somomancer */  /* ...open menu... */
}
```

Aura resolution: sum each tome's **active spell** `Aura:` at the moment it matters (damage calc,
etc.), so re-topping mid-turn is respected. Simultaneous-window writes follow §4 (snapshot reads,
fizzle-on-gone, permanence precedence).

---

## 7. PROVISIONAL test content (for tuning — NOT final; owner has authority)

**All numbers spitball.** Two parts: a **legal 13-card deck** for playing matches, and a small set
of **extra coverage cards** to unit-test the rarer primitives. Build the feature each card needs,
test-first.

### 7a. The 13-card deck (a legal singleton deck; ~5🔴/4🟢/4🔵 incl. one multi-colour)

| # | Name | 🎨 | Class | Potency | Effect | Exercises |
|---|---|---|---|---|---|---|
| 1 | Fireball | 🔴 | — | +10 | — | baseline damage, classless |
| 2 | Ember Bite | 🔴 | Pyromancer | +3 | `Clash Win: deal 3.` | class-tagged, burn |
| 3 | Flame Ward | 🔴 | — | +0 | `Clash Lose: gain 8 Shield.` | on-lose Shield, Shield cap |
| 4 | Rising Flame | 🔴 | — | +2 | *Gains +2 Potency each clash it wins (resets if it leaves the tome).* | per-instance growth, reset-on-leave |
| 5 | Frostbind | 🔵 | Cryomancer | +4 | `Clash Win: Dampen the opponent's active spell 2 turns.` | Dampen + class |
| 6 | Frostfire Bolt | 🔴/🔵 | — | 🔴 +8 / 🔵 +5 | 🔴 `Clash Win: deal 2.` · 🔵 `Clash Lose: gain 6 Shield.` | **multi-colour, per-colour profile** |
| 7 | Kindling | 🟢 | — | +2 | `Aura: your red spells deal +3 Potency.` | aura / top-of-tome |
| 8 | Stoneskin | 🟢 | Geomancer | +1 | `Aura: your Clash Lose spells gain +5 Shield.` | class aura + Shield |
| 9 | Last Stand | 🟢 | — | +6 | *+15 instead while below half Health.* | HP-scaling / comeback |
| 10 | Gale | 🔵 | Airomancer | +5 | `Clash Win: Bounce the opponent's active spell, then draw 1 and return 1.` | Bounce + net-neutral draw + class |
| 11 | Tidecaller | 🔵 | Hydromancer | +3 | `Prepare: draw 1, then return a card to your deck.` `Clash Lose: Heal 8.` | Heal + net-neutral draw + class |
| 12 | Iron Stance | 🟢 | Somomancer | +0 | `Aura: your Power-only attacks deal +6.` (never grants Power) | Somo aura, Power-only reward |
| 13 | Star Chart | 🔵 | Astromancer | +3 per spell in the opponent's most-stocked tome | — | reads opponent's public tomes, scaling |

### 7b. Extra coverage cards (unit-test the rare/remaining primitives; not in the everyday deck)

| Name | 🎨 | Class | Potency | Effect | Exercises |
|---|---|---|---|---|---|
| Silence Rune | 🔵 | Cryomancer | +2 | `Clash Win: Seal the opponent's highest-Potency spell 1 turn.` | **`Seal:`** (spell lock) + targeted tie-break |
| Eclipse | 🔵 | Cryomancer | +0 | `Clash Win: Lock the opponent's red next turn.` *(rare/gated)* | **`Lock:`** (colour lock) |
| Immolating Page | 🔴 | — | +0 | `Clash Win: Destroy the opponent's active blue spell, then Destroy this spell.` | **`Destroy`** + self-cost, gated |
| Even Footing | 🟢 | — | +2 | `Tie: draw 1 and return 1.` | **`Tie:`** tab |
| Frost-Ember Twin | 🔴/🟢 | Pyromancer + Cryomancer | 🔴 +6 / 🟢 +4 | 🔴 `Clash Win: deal 2.` · 🟢 `Clash Win: Dampen 1.` | **throwaway multi-class** (engine seam only) |

*Coverage matrix (every engine path M1 must prove):* baseline damage · Power+Potency · Shield
(cap, on-lose) · Heal (no overheal) · growth (+reset) · Dampen · Seal · Lock · Bounce (+aura
disruption) · Bury · Destroy (+self-cost) · Aura (top-of-tome, re-topping, class-conditional) ·
multi-colour (per-colour profile, prepare-choice, reset) · class read · multi-class list ·
Power-only aura (Somo) · opponent-tome scaling (Astro) · HP-scaling · Tie (chip + `Tie:` tab) ·
net-neutral draw · quest cash-in (no cap) · simultaneity (snapshot, fizzle-on-gone, permanence
precedence).

### 7c. Quests (5 of a 7-card deck — PROVISIONAL; +Power curve is spitball)

| Quest | Objective 1 (trivial) | Objective 2 | Objective 3 (capstone) |
|---|---|---|---|
| **First Blood** | land any hit → **+2 Power** | win 3 clashes total → **+3 Power** | win a clash with 🔴 → **+5 Power** |
| **Trial by Fire** *(comeback)* | lose any Health → **+2 Power** | lose 15+ Health total → **draw 2** | be below half Health → **+5 Power & 10 Shield** |
| **Deep Study** | Prepare a spell → **+2 Power** | have 3+ spells in one tome → **+3 Power** | have 5+ spells across tomes → **one-time: Destroy any one opponent active spell** |
| **Tide Mastery** *(colour-locked, self-cost)* | cast a 🔵 spell → **+2 Power** | win a clash with 🔵 → **+3 Power** | win 2 clashes with 🔵 **or** lose 20 Health → **+5 Power** |
| **Opening Gambit** | survive to turn 3 → **+2 Power** | all three tomes non-empty → **+3 Power** | Power ≥ 20 → **draw 2** |

*(Owner designs the remaining 2 quests + retunes everything in playtesting. Note the **draw
guardrail** below — one-time quest draws are lower-risk than repeatable spell draw, but tune with
care.)*

### 7d. Content laws to enforce while writing cards
- **Draw guardrail:** no pure card advantage. Repeatable spell draw must be ~net-neutral
  (`draw 1 return 1`, `bury 1 draw 1`); a rare +1 net at most. **Never** `Clash Win: draw 2` on a
  spell.
- **Power is sacred:** no card grants/raises Power (Somomancer included).
- **No strictly-better spells** within a colour.
- **`Lock` and `Destroy` are rare & gated.** On-lose mitigation stays small + low-Potency.

---

## 8. Milestones (build in order; stop at each DoD)

**M0 — Skeleton.** Solution with `/rules`, `/rules.tests`, `/harness` wired; CI runs tests.
*DoD:* `dotnet test` green on an empty engine; console prints "hello board".

**M1 — Playable headless engine.** ⭐ *The "let it cook / test stuff" target.* Implement §3 turn
loop, §4 rules, the §6 hooks, and the §7 content. Deterministic, seeded. A simple AI (picks a
colour + best legal spell; some Seal/Lock/Dampen awareness). Console harness plays a **full match**
(human-vs-bot, bot-vs-bot), printing the board, both tomes (with tops), HP/Power/Shield, and each
turn's events. *DoD:* play a complete match to a knockout in the terminal; **every card in §7a/§7b
works**; unit tests cover the whole §7b coverage matrix — clash resolution, tie chip + `Tie:`,
damage-before-effects ordering, the step-6/7 invariants, aura re-topping, growth (+reset), multi-
colour prepare/profile/reset, Seal/Lock/Dampen/Bounce/Bury/Destroy(+self-cost), permanence
precedence + fizzle-on-gone, snapshot reads, quest cash-in (no cap, not-same-turn-as-draw),
mulligan, and Power-only/opponent-tome/HP scaling.

**M2 — Authoritative server.** Thin C# service; async-turn; holds hidden commits; reveals on both-
locked; persists match state. *DoD:* a full networked match between two terminal clients; server
never leaks a pick pre-reveal (test it).

**M3 — Unity vertical slice.** One match on a **phone, vertical**, driven by the same rules library
(local prediction) against the server. Card/tome/quest views; the reveal, damage, a tie, and one
aura visibly working. Hold the **feel guardrails** (§0.3): 60fps, safe areas, gestural cast
(drag/flick), haptics on reveal/damage, eased motion. *DoD:* the owner can play a match on an
iPhone and it *feels* good.

**M4 — Content pipeline & scale.** Move card/quest defs to `/content` data (JSON/ScriptableObjects);
add authoring + a balance/sim harness (N bot-vs-bot games, dump stats). *DoD:* a card can be
added/edited as data without touching engine code.

---

## 9. Guardrails for whoever builds this

- **Don't finalise OPEN design** (final class rosters, final numbers, the 2 missing quests, backend
  choice). Leave seams; surface questions to the owner.
- **Keep `/rules` pure** — no `Console`, no `UnityEngine`, no timers, no network.
- **Prove rules in `/rules.tests`, not by eyeballing Unity.** The engine is the crown jewel.
- **Everything the client shows is a replay of engine events** + the client's own timing.
- **Determinism is sacred** — seed RNG, store the seed, make matches reproducible.
- **PROVISIONAL numbers are config constants**, never magic literals in logic.
- When something is genuinely unspecified, **ask** rather than invent.

---

## Appendix A — the seven starting classes (ideation only)

**Not an archetype build and not required for M1.** Captured so the `class` field has real material
to test against and future card design has a north star. Every class spans all three colours
(reflavoured). **Design law: most starter cards are classless** — a basic spell any wizard knows
(e.g. a plain Fireball) has no class; a card earns a class only when it expresses a school's
*specialisation*.

| Class | Identity | Core mechanics | Sample specialisation card (spitball) |
|---|---|---|---|
| **Pyromancer** | Aggro / burn | fast, extra chip on top of the hit | *"Clash Win: deal 3."* |
| **Cryomancer** | Freeze = **denial** | the `Seal:` / `Lock:` / `Dampen:` school (there is no "slow" mechanic — freeze *means* denial) | *"Clash Win: Dampen the opponent's active spell 2 turns."* |
| **Geomancer** | Defense / walls | Shield generation + Bury; resilience | *"Aura: your Clash Lose spells gain +5 Shield."* |
| **Airomancer** | Tempo / bounce | Bounce (opponent **and self**) + net-neutral draw; re-topping tricks | *"Clash Win: Bounce the opponent's active spell, then draw 1, return 1."* |
| **Hydromancer** | Flow / heal / adapt | Heal + net-neutral draw; natural home for multi-colour | *"Prepare: draw 1, return 1. Clash Lose: Heal 8."* |
| **Somomancer** | Physical / body | Auras that reward **Power-only attacks** (no spell). **Never grants Power.** | *"Aura: your Power-only attacks deal +6."* |
| **Astromancer** | Cosmic / scaling / foresight | reads the board (opponent tome, momentum, HP, streaks); late payoff | *"+3 Potency per spell in the opponent's most-stocked tome."* |

Nothing here is balanced or final — it is the inspiration board for the eventual starter set.
