# Tome TCG — Build Spec (engineer hand-off / agent prompt)

> **What this is.** A self-contained brief to build the first real, playable version of Tome
> TCG in the **new Unity + C# repo**. It inlines every rule, the architecture, coding
> standards, a provisional test-card set, and a milestone plan. A fresh engineer — human or a
> Fable/Claude session — should be able to start from this file **and nothing else**.
>
> **How to use it.** Drop this file into the new repo as `docs/BUILD-SPEC.md`, then kick off
> the agent with: *"Implement Tome TCG per `docs/BUILD-SPEC.md`. Start at **Milestone 1** and
> stop at its Definition of Done for review. Do not invent final design where the spec marks
> something PROVISIONAL or OPEN — ask."* (You can also paste this whole file as the first
> message.)
>
> **Design authority.** The game is the owner's vision. Rules marked **LOCKED** are settled —
> implement them faithfully. Anything marked **PROVISIONAL** (all specific numbers, the sample
> cards) is placeholder-for-testing and the owner will tune it. Anything marked **OPEN** is
> undecided design — do **not** finalise it; leave a clean seam and ask.

---

## 0. Product requirements (LOCKED, non-negotiable)

1. **The game is the owner's vision.** Design decisions route to the owner.
2. **Mobile-first, vertical-first.** Designed for a phone held upright. **PC playable = bonus.
   No console.**
3. **Premium native-iPhone feel everywhere.** Bar = *Pokémon Pocket on iPhone*. Explicitly
   **not** a website wrapped in an app, and **not** something that feels like an Android app
   on an iPhone. 60fps, respects safe areas / notch, gestural, haptic, no jank.

**Stack (LOCKED):** Unity + C# end-to-end. The **rules engine is one deterministic C#
library** shared by (a) a lightweight **C# authoritative server** and (b) the **Unity client**
(same library for local prediction / solo-vs-AI). See §5 for why the server must exist.

---

## 1. The game in one paragraph

A two-player **simultaneous colour-RPS duel** on a persistent spellbook board. Each turn both
players secretly commit, then reveal together. You attack in one **colour** (🔴 Red > 🟢 Green
> 🔵 Blue > 🔴 Red); **only the clash winner connects** and deals damage; ties (same colour)
cancel. Damage = your **Power** (a character level that ramps via Quests) **+** the **Potency**
of the spell you cast. Instead of a stack, each colour is a **Tome**: a persistent, face-up
spellbook you build one spell at a time — the opponent sees your **range** but never your
**pick**. Counterplay is **denial, not destruction** (Seal → Bounce/Bury → Shield/Heal-on-lose
→ rare Destroy). No graveyard. Deck = **13 spells + 7 quests = 20**, singleton. Deck-out is not
a loss. First to 0 Health is **knocked out**.

---

## 2. Vocabulary (LOCKED — use these exact terms in code and card text)

| Term | Meaning |
|---|---|
| **Health / HP** | Life total. At 0 you're **knocked out** (game over). |
| **Power** | Character stat / level. **Starts at 10.** Permanent; raised **only** by quests. There is no separate level counter — Power *is* the level. |
| **Potency** | A spell's damage modifier (`+8`, `+0`, or a scaling clause). **Damage on connect = Power + Potency.** |
| **Shield** | Persistent damage buffer; absorbs **before** HP; persists across turns until consumed. |
| **Heal** | Restore HP now. |
| **Tome** | A per-colour (🔴🟢🔵) persistent, face-up spellbook pile. Three per player. |
| **active spell** | The **top** spell of a tome. Only the active spell's `Aura:` is live. |
| **Prepare** | Turn beat + keyword: put a spell from hand into its colour's tome. `Prepare:` fires then. |
| **Cast** | Turn beat: choose a colour + a spell in that tome to throw into the clash. |
| **Clash** | The RPS resolution. |
| **Deck** (in-world *Bundle*) | Your 13 battle spells. |
| **Collection** (in-world *Library*) | Everything you own; you build a Deck from it. |
| **Quest** / **Objectives** | The ramp card and its ordered steps. |
| **Quest Deck** (in-world *Quest Journey*) | Your separate 7-quest line. |

**Effect keyword tabs (LOCKED):**

| Keyword | Fires | Example |
|---|---|---|
| **`Prepare:`** | when the spell enters a tome | `Prepare: draw a card.` |
| **`Clash Win:`** | when this spell **wins the clash** (after damage) | `Clash Win: Seal opponent's blue next turn.` |
| **`Clash Lose:`** | when this spell **loses the clash** (after damage) | `Clash Lose: gain 8 Shield.` |
| **`Aura:`** | continuously, **only while this is the active spell (top) of its tome** | `Aura: your red spells deal +3 Potency.` |
| **`Seal:`** *(rider)* | denial clause, usually inside `Clash Win:` | `Seal: opponent can't cast blue next turn.` |
| **`Bounce:`** | return a prepared spell to its owner's **hand** | soft tempo tax; can knock an aura off top |
| **`Bury:`** | return a prepared spell to its owner's **deck** | harder — they must redraw |
| **`Destroy`** | permanently remove a prepared spell | rare, gated (Tier 3) |

**Old-doc → locked mapping** (older design docs use retired words; translate on sight):
`Learn:`→`Prepare:`, `Hit:`→`Clash Win:`, `Lose:`→`Clash Lose:`, `Continuous`→`Aura:`,
`base attack`→`Power`, `spell modifier`→`Potency`, `Forget`→`Destroy this spell` (or
`Bounce this spell` if it returns to hand), `Unlearn/Bounce`→`Bounce:`(hand)/`Bury:`(deck),
old `Burn`→`Destroy` (the word "Burn" is reserved for fire flavour only).

---

## 3. The canonical turn (LOCKED) — implement exactly this order

Every turn, in this fixed chronology (simultaneous where noted):

1. **Draw** — each player draws 1 from their spell deck. *(Deck-out is NOT a loss — you just
   stop drawing; your tomes remain. Quests are a separate deck, see §4.)*
2. **Prepare** *(simultaneous, hidden, optional)* — each player does **one** of:
   - **Prepare** one spell from hand into its colour's tome (fires its `Prepare:`), **or**
   - **Abandon** the active quest (swap for the next — **this consumes your Prepare**), **or**
   - **nothing** (a legal pass).
3. **Cast** *(simultaneous, hidden)* — each picks a **colour** and **which spell** in that
   colour's tome to cast (or no spell / empty tome → **Power only**).
4. **Reveal** — both commitments flip at once.
5. **Clash** — wheel resolves (Red>Green>Blue>Red). Same colour = tie = both cancel, no damage.
   Winner connects.
6. **Damage** — winner deals **Power + chosen spell's Potency**, applied to **Shield first,
   then HP**. Loser deals nothing.
7. **Spell effects** — resolve the **winner's `Clash Win:`** then the **loser's `Clash Lose:`**
   (seal / shield / heal / bounce / bury / destroy). *(Effects resolve AFTER damage — never
   before.)*
8. **Quest** — check the active quest's current objective; if its condition was met **this
   turn**, cash in its reward (permanent Power up, draw, etc.). **One objective per turn, in
   order.** Resolved last so nothing loops.
9. **End** — if a player is at ≤0 HP, the game ends (both down = draw).

**Two invariants that fall out of this order (enforce in tests):**
- No effect may reference "a quest completed this turn" — quests resolve in step 8, after
  effects in step 7. Cards read *past* state only.
- On-lose Shields/Heals protect the **future**, not the current hit (damage is step 6, the
  shield lands in step 7). Choosing a defensive spell is a *proactive* read, not a reactive save.

---

## 4. The board & rules detail (LOCKED unless noted)

**The Tome.** Three per player, one per colour. `Prepare` adds a spell to the top **without
burying anything** — every spell you prepare stays castable all game. On `Cast` you may throw
**any** spell in the chosen colour's tome. Face-up to both players (range public, pick hidden).

**Top-of-tome / active spell.** Both **preparing** a spell **and casting** a spell make it that
colour's **active spell** (re-top). Only the active spell's `Aura:` is live. You attack one
colour per turn, so you juggle three tops with one lever a turn.

**The number model.** Power starts **10**, permanent, raised only by quests. Spells are
**Potency** modifiers (`+10`, `+0`, or a scaling clause). Cast with no spell / empty tome =
**Power only**. Because Power ramps, your whole book scales with your level.

**Singleton (LOCKED).** One copy per card in a deck. **No spell may be strictly better than
another in its colour** — every spell earns its slot with a situational angle (a Seal rider, a
`Clash Lose:` clause, a conditional/scaling bonus, utility). This is the #1 card-design rule.

**Quests (the ramp).** A quest is a face-up card with **ordered Objectives**; advancing it does
**not** cost your Prepare. Objectives complete **in order**, no time limit; **Objective 1 is
always trivially completable** (e.g. *land any hit*). Reward is usually **+Power** (a starting
curve of +2/+3/+5, PROVISIONAL) or a perk (draw). A finished quest greys out. **Exactly one
quest active at a time.** Quests are a **separate 7-card deck**: at game start you're dealt
**3 of your 7 and choose 1** as your opener (**choose-1-of-3 LOCKED**); completing a quest draws
the next. **Abandon** swaps the active quest for the next but costs your Prepare that turn.
Seed **1–2 loser-completable** objectives per quest deck (e.g. *lose 15+ HP*) as the comeback
valve. "OR" escape hatches on hard objectives are **rare, only when thematically earned**.

**Counterplay ladder (denial, not attrition):**
- **Seal** — temporary lockout (a colour, a specific spell, or cap a spell to +0 Potency) for
  **next turn** (duration **1 turn**, PROVISIONAL-leaning-locked). Nothing moves; deepens RPS.
- **Bounce / Bury** — return a prepared spell to hand (`Bounce:`) or deck (`Bury:`). Tempo tax;
  can knock an aura off the top. Works on your own tome (utility) or opponent's (control). Bury
  is the rarer/stronger version.
- **Shield / Heal on `Clash Lose:`** — mitigation for the player who lost the read. Keep
  numbers **small** and pair with a **low Potency** on that spell.
- **Destroy** — permanent removal. **Rare, gated** (a quest capstone or a self-immolating spell
  that Destroys itself as its cost). Never on a common spell.

**Colour × Class (LOCKED shape, class list OPEN).** Two independent axes on every spell:
**Colour** (🔴🟢🔵, the only thing the clash cares about — most decks run all three) and
**Class** (archetype/synergy tag spanning all colours, e.g. Pyromancer; reflavours off-colours
— a fire deck's green is *kindling*, blue is *oil*). Class is a **real printed field** some
effects care about. **OPEN:** the class list, synergy weight (lean light-to-medium), and whether
neutral/classless "glue" cards exist (lean yes). For the first build, treat `class` as a
nullable string tag; ship mostly neutral + a couple Pyromancer cards to exercise synergy.

**Proficiency / scaling (LOCKED system, all numbers PROVISIONAL).** *Some* cards bend their own
effect around **one** live game value (stated in the card's own words); most cards are flat.
**No printed "rank" badge** — scaling is invisible until a card uses it. The engine exposes a
**menu of readable values**; a scaling card composes exactly **one**:
- its own **grown value** (e.g. gains +2 Potency each time it wins a clash — needs per-instance
  state), colour **depth** (spells in a tome), your **Power**, the **opponent's tome** (public),
  **HP totals** (comeback/execute), **recent history** (last cast), **momentum** (clash streak),
  **denial state** (what's sealed), **sacrifice** (spend a page for value).
- **One read per card, one clause.** Growth-on-connect only pays when you **win** the clash;
  momentum resets on a loss; depth costs RPS coverage — all self-limiting by construction.

---

## 5. Why an authoritative server is mandatory (LOCKED constraint)

The game is **simultaneous hidden-commit**: both players lock blind, reveal together. Therefore
**no client may adjudicate a clash** — if a client learned the opponent's pick before locking,
the bluff is dead; if a client computed its own damage, it could cheat. A **neutral referee**
that isn't either player's device must hold both commitments and only reveal + resolve once
**both are locked**. That referee is the server running the shared rules library. (This is
engine-agnostic — it's a "someone must hold the sealed envelope" problem, not a C# problem.)

**Multiplayer model (PROVISIONAL-leaning):** ship **async-turn** first ("take your turn,
opponent is notified") — cheapest and most mobile-natural, and a perfect fit for a turn-based
card game. Real-time live matches can come later on the same engine. **OPEN:** backend hosting
and netcode choice (managed match service vs. custom .NET) — decide at Milestone 2.

---

## 6. Architecture & repo layout

```
/rules      C# class library — the deterministic engine. NO I/O, NO animation, NO delays.
            Pure functions over GameState. This is the single source of truth. Heavily unit-tested.
/rules.tests  xUnit (or NUnit) tests for /rules. The rules are proven here, not in Unity.
/harness    C# console app referencing /rules — play a full match in the terminal
            (human-vs-bot and bot-vs-bot). This is the fast "test the game" loop, no art.
/server     C# authoritative match service referencing /rules (Milestone 2). Holds hidden
            picks, reveals on both-locked, persists match state. Async-turn first.
/unity      Unity project referencing /rules (Milestone 3). Vertical-first mobile client;
            runs /rules locally for prediction; server is truth for PvP.
/content    Data-driven card & quest definitions (Milestone 4) so sets are content, not code.
/docs       This spec + carried-over design docs.
```

### Engine design rules (LOCKED — these are the lessons that make or break it)

1. **The engine is pure and deterministic.** Same inputs + same RNG seed ⇒ identical match.
   Seed all shuffles/draws from a stored seed so any match is reproducible in a test.
2. **The engine never sleeps and never animates.** It computes state transitions and **emits a
   list of typed events** (`ClashResolved`, `DamageDealt`, `ShieldGained`, `Sealed`,
   `Bounced`, `QuestCashedIn`, `SpellPreparedToTop`, …). **All timing/animation/pacing lives in
   the client.** (The previous TS prototype baked `delay()` calls into the engine — do **not**
   repeat that; it couples rules to presentation and can't be reused headless.)
3. **The engine takes committed actions, never reveals early.** Its turn API accepts *both*
   players' committed `PrepareChoice` and `CastChoice` and only then resolves. The *server*
   enforces that neither commitment is visible until both are in.
4. **Card behaviour is code, keyed by card id, behind a small hook interface** (below) for the
   first build. A fully data-driven JSON DSL is a Milestone-4 evolution once the effect
   vocabulary has stabilised — don't over-engineer it on day one.

### The card hook interface (sketch — adapt idiomatically)

```csharp
enum Colour { Red, Green, Blue }
enum Trigger { Prepare, ClashWin, ClashLose } // Aura is continuous, handled separately

// Static definition (one per card id). Potency may be flat or a reader over live state.
record SpellDef(
    string Id, string Name, Colour Colour, string? Class,
    Func<Ctx, int> Potency,               // flat cards: _ => 10 ; scaling cards read Ctx
    IReadOnlyList<Effect> Effects,        // Prepare/ClashWin/ClashLose clauses
    AuraDef? Aura                         // non-null only for aura cards
);

record Effect(Trigger When, Action<Ctx> Apply); // Apply mutates state via Ctx-provided ops
record AuraDef(Action<AuraCtx> Contribute);     // e.g. add +3 Potency to owner's red spells

// Runtime per-instance state (growth-on-connect etc.) lives on the tome entry, NOT the def:
class SpellInstance { SpellDef Def; int GrownPotency; /* ... */ }

// Ctx exposes readable state + safe mutators + an event sink. NEVER expose the opponent's
// hidden pick before reveal. Readers back the §4 "menu of readable values".
interface Ctx {
    GameState Game; Side Owner; Side Opponent; SpellInstance This;
    void Deal(...); void GainShield(int); void Heal(int);
    void Seal(Side, SealSpec); void Bounce(...); void Bury(...); void Destroy(...);
    void Emit(GameEvent e);
    int OwnPower { get; } int OppTomeCount(Colour c); bool OwnBelowHalfHp { get; } /* ... */
}
```

Aura resolution: when computing a spell's Potency or a damage step, sum contributions from each
tome's **active spell** `Aura:` only. Read auras **at the moment they matter** (e.g. during
damage calc), so re-topping mid-turn is naturally respected.

---

## 7. PROVISIONAL test card set (for tuning — NOT final; owner has authority)

Purpose: exercise every engine feature. **All numbers are spitball.** Mostly neutral + a couple
Pyromancer-flavoured. Build the engine feature each card needs, test-first.

### Spells (13 — a legal singleton deck, ~5🔴/4🟢/4🔵)

| # | Name | 🎨 | Potency | Effect (locked vocab) | Exercises |
|---|---|---|---|---|---|
| 1 | Fireball | 🔴 | +10 | — (vanilla hitter, *Pyromancer*) | baseline damage |
| 2 | Ember Jab | 🔴 | +4 | `Clash Win: Seal opponent's blue next turn.` | Seal a colour |
| 3 | Flame Ward | 🔴 | +0 | `Clash Lose: gain 8 Shield.` | Shield-on-lose, low Potency |
| 4 | Rising Flame | 🔴 | +2 | *Gains +2 Potency each time it wins a clash (permanent).* | per-instance growth state |
| 5 | Immolating Page | 🔴 | +0 | `Clash Win: Destroy the opponent's active blue spell, then Destroy this spell.` | Tier-3 Destroy + self-cost |
| 6 | Thornlash | 🟢 | +9 | — (vanilla hitter) | baseline |
| 7 | Kindling | 🟢 | +2 | `Aura: your red spells deal +3 Potency.` | aura / top-of-tome |
| 8 | Entangle | 🟢 | +3 | `Clash Win: Seal the opponent's highest-Potency spell next turn.` | targeted Seal |
| 9 | Last Stand | 🟢 | +6 | *+15 instead while you are below half Health.* | HP-scaling / comeback |
| 10 | Riptide | 🔵 | +9 | — (vanilla hitter) | baseline |
| 11 | Undertow | 🔵 | +5 | `Clash Win: Bounce the opponent's active spell (to hand).` | Bounce, aura disruption |
| 12 | Soothing Rain | 🔵 | +0 | `Clash Lose: Heal 10.` | Heal-on-lose |
| 13 | Study the Foe | 🔵 | +3 per spell in the opponent's blue tome | — | reads opponent's public tome |

### Quests (5 shown of a 7-card deck — PROVISIONAL; +Power curve is spitball)

| Quest | Objective 1 (trivial) | Objective 2 | Objective 3 (capstone) |
|---|---|---|---|
| **First Blood** | land any hit → **+2 Power** | win 3 clashes total → **+3 Power** | win a clash with 🔴 → **+5 Power** |
| **Trial by Fire** *(comeback)* | lose any Health → **+2 Power** | lose 15+ Health total → **draw 2** | be below half Health → **+5 Power & 10 Shield** |
| **Deep Study** | Prepare a spell → **+2 Power** | have 3+ spells in one tome → **+3 Power** | have 5+ spells across tomes → **one-time: Destroy any one opponent active spell** |
| **Tide Mastery** *(colour-locked, self-cost)* | cast a 🔵 spell → **+2 Power** | win a clash with 🔵 → **+3 Power** | win 2 clashes with 🔵 **or** lose 20 Health → **+5 Power** |
| **Opening Gambit** | survive to turn 3 → **+2 Power** | have all three tomes non-empty → **+3 Power** | Power ≥ 20 → **draw 2** |

*(The owner will design the remaining 2 quests + retune everything during playtesting.)*

### Starting values to wire (PROVISIONAL)
Starting HP **80** (test target), Power **10**, opening hand **5**, Seal duration **1 turn**,
one objective cash-in per turn. All owner-tunable.

---

## 8. Milestones (build in this order; stop at each DoD for review)

**M0 — Skeleton.** Solution with `/rules`, `/rules.tests`, `/harness` projects wired; CI runs
tests. *DoD:* `dotnet test` green on an empty engine; console app prints "hello board".

**M1 — Playable headless engine.** ⭐ *This is the "let it cook and test stuff" target.*
Implement §3 turn loop, §4 rules, the §6 hook interface, and the §7 card set. Deterministic,
seeded. A simple AI (picks a colour + best legal spell, some Seal awareness). Console harness
plays a **full match**: human-vs-bot and bot-vs-bot, printing the board, both tomes, HP/Power/
Shield, and each turn's events. *DoD:* you can play a complete match to a knockout in the
terminal; every §7 card works; unit tests cover clash resolution, damage-before-effects
ordering, the two step-7/8 invariants, aura re-topping, growth-on-connect, Seal, Bounce,
Destroy+self-cost, and quest cash-in.

**M2 — Authoritative server.** Thin C# service hosting matches, async-turn, holding hidden
commits and revealing on both-locked, persisting match state. Two harness clients can play a
match through the server. *DoD:* a full networked match between two terminal clients; server
never leaks a pick pre-reveal (test it).

**M3 — Unity vertical slice.** One match playable on a **phone, vertical**, driven by the same
rules library (local prediction) against the server. Card/tome/quest views, the clash reveal,
damage, and one aura visibly working. Hold the **feel guardrails** (§0.3): 60fps, safe areas,
gestural cast (drag/flick), haptics on reveal/damage, eased motion. *DoD:* the owner can play a
match on an iPhone and it *feels* good, not clunky.

**M4 — Content pipeline & scale.** Move card/quest defs to `/content` data (JSON/Scriptable
Objects), add authoring + a balance/sim harness (run N bot-vs-bot games, dump stats) to support
tuning. *DoD:* a card can be added/edited as data without touching engine code.

---

## 9. Guardrails for whoever builds this

- **Don't finalise OPEN design** (class list, final numbers, the 2 missing quests). Leave seams
  and surface questions to the owner.
- **Keep `/rules` pure** — no `Console`, no `UnityEngine`, no timers, no network. If you're
  importing those into the engine, stop.
- **Prove rules in `/rules.tests`, not by eyeballing Unity.** The engine is the crown jewel.
- **Everything the client shows is a replay of engine events** + the client's own timing. The
  engine decides *what* happened; the client decides *how pretty and how fast*.
- **Determinism is sacred** — seed RNG, store the seed, make matches reproducible.
- When old design docs and this spec disagree on a **word**, this spec's §2 wins; on a **rule**,
  §3–§4 win. When something's genuinely unspecified, ask rather than invent.
