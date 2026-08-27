# Vocabulary & keywords — the naming pass

> The naming pass the prior HANDOFF flagged as ⭐ next. This doc is the **word ledger**:
> the **Actual** term (what the UI and card text actually say) and, where one exists, the
> **In-world** term (used only in PvE / story / lore / marketing — never required to play).
> Refs like "doc 09/11" point to the 2026-08-22 design bible.

## How the two columns work

- **Actual** is law: it's what a player reads on a card, a tab, or a UI label. Descriptive
  and simple beats thematic — a kid should never have to ask why a word means what it means.
- **In-world** is flavour: the embellished word we use when *speaking* about the game in
  lore/story. **Most terms have no in-world variant** — they're just the actual word.
  Every term always has an actual one; it may or may not be in theme.
- Where this doc and the bible disagree, **this doc wins** (later session). The bible still
  says `Learn:` / "base attack" / `Continuous` / Tear-Burn in places — all superseded here;
  they'll be reconciled when the core is built and the bible is refrozen.

---

## 1. Effect keywords (the printed `Keyword:` tabs on cards)

| Mechanic | **Actual** | In-world | Notes |
|---|---|---|---|
| Spell enters a tome (the act **and** the trigger) | **`Prepare:`** | — | Replaces the old `Learn:`. See the Learn/Prepare split below. |
| Aura, live only while this is the **active spell** on top of its tome | **`Aura:`** | — | Replaces the codey "Continuous". |
| Won the clash / lost the clash | ⛔ **UNDECIDED** | — | The two-tab pair. **Not chosen — see §6.** |
| Temporary lockout of a colour or spell next turn | **`Seal:`** | — | Quality bar was always "Seal"; kept. |
| Return a prepared spell to its owner's **hand** (soft) | **`Bounce:`** | — | Tempo tax; can knock an Aura off the top. |
| Return a prepared spell to its owner's **deck** (harder — must redraw) | **`Bury:`** | — | The deeper, stronger version of Bounce. |
| Permanently remove a prepared spell | **`Destroy`** | — | Replaces Tear/Burn. Keeps **Burn** free for fire-archetype *flavour*. Rare, gated (doc 11, Tier 3). |

**"Forget" is killed.** "A spell removes itself" was never its own concept — it's just a
reflexive target:
- removes itself permanently → **`Destroy this spell`**
- returns itself to hand to re-trigger its `Prepare:` → **`Bounce this spell`**

**Learn vs Prepare (the split that retired `Learn:`).** *Learn* now means **acquiring a page
into your collection at all** — a meta / PvE verb (you learn a spell by finding it in the
world). *Prepare* is **readying a known spell into a tome mid-battle**, like preparing spells
in D&D: you can prepare it this game and not the next (you never "un-learn" it). "Prepare"
also signals *something imminent* — a clash is coming. So the on-enter-tome keyword is
**`Prepare:`**, and `Learn:` is gone from card text.

---

## 2. Resources & combat numbers

| Thing | **Actual** | In-world | Notes |
|---|---|---|---|
| Persistent damage buffer (absorbs before HP) | **Shield** | — | "Ward" rejected — magic can shield too; keep it simple. |
| Restore health now | **Heal** | — | |
| Life total | **Health** (UI shorthand **HP**) | knocked out (not death) | **Never** "health points". At 0 HP you're **knocked out**, Pokémon-style — it's a cute game. |
| Character stat (starts 10, raised only by quests) | **Power** | "grows in power" | Locked. The character *grows in power* / *uses its power to attack*. There is no separate level counter — Power **is** the level. |
| A spell's damage modifier (`+8`, `+0`, or a scaling clause) | **Potency** | — | **LOCKED (2026-08-27).** "Power + 8 Potency" is card-facing law. |
| Damage on connect | **Power + [the modifier above]** | — | |

---

## 3. Zones & structure

| Thing | **Actual** | In-world | Notes |
|---|---|---|---|
| A single card | **Card** | **Page** | A deck is a deck and a card is a card — no "library"-style renaming of the obvious. |
| A spell card | **Spell** | Page / spell | |
| Your battle deck | **Deck** | **Bundle** | A *bundle of spell pages* you carry on your adventure, ready to prepare and cast. |
| Everything you own (all pages found) | **Collection** | **Library** | Kept "at home"; you pick a Deck (Bundle) from it to take adventuring. |
| A per-colour board pile (🔴🟢🔵) | **Tome** (Red / Green / Blue Tome) | Tome | The star mechanic; keeps the game's name. Persistent, face-up, fully accessible (doc 09). |
| The top / live spell of a tome | **active spell** | open page | Only the active spell's `Aura:` is live. Preparing **or** casting a spell makes it that colour's active spell. ("open page" is rare, story-only.) |
| All three tomes together | *(no umbrella term — by design)* | — | See the lore note below. It's **three separate tomes**, not one collection with a name. |

**Three-tomes lore (bank this).** The little creatures found that spells of different colours
**won't share a tome**. The vanished wizard was powerful enough to cast a spell that let the
colours coexist in one book — but you're just a regular little guy, so you carry **three
tomes**, one per colour, and keep them apart. Character-design hook: **three little books on
the belt, on a chain.** Cute, and it *teaches the mechanic* (colours don't mix).

---

## 4. Quests

| Thing | **Actual** | In-world | Notes |
|---|---|---|---|
| The saga-like leveling card | **Quest** | Quest | |
| The ordered steps inside a quest | **Objectives** | — | Complete an objective → get its reward. **No trophies** — a finished objective just pays out. |
| Swap your active quest for the next | **Abandon** | — | Costs your Prepare that turn (doc 10). |
| The separate 7-card quest line | **Quest Deck** | **Quest Journey** | |

---

## 5. Actions / turn beats

| Thing | **Actual** | Notes |
|---|---|---|
| Draw step | **Draw** | Find a page. |
| Prepare step | **Prepare** | Ready a spell into a tome (see the Learn/Prepare split, §1). |
| Choose colour + spell and throw it | **Cast** | |
| The RPS resolution | **Clash** | |
| Winner deals damage | *(no keyword)* | Prose only: "wins the clash and deals damage." "Connect" / "land" both rejected. |

**The casting fantasy needs no extra mechanic.** Draw (find the page) → Prepare (ready it into
a tome) → Cast (throw it in the clash) **is** the casting arc. No WoW-style cast-timer.

---

## 6. ⛔ Still undecided (do NOT invent a placeholder and move on)

1. **The clash-outcome verb pair** — the two tabs for *won the clash* / *lost the clash*.
   Nothing has passed yet. **Rejected lanes (don't re-pitch these):**
   - `win` / `lose` — too grand; a single clash shouldn't invoke winning the *game*.
   - same-root inflections (`best`/`bested`, `strike`/`struck`, `counter`/`countered`,
     `outdo`/`outdone`, `bonk`/`bonked`) — read robotic, "1984 newspeak".
   - spatial pairs (`up`/`down`, `over`/`under`, `rise`/`fall`, `ahead`/`behind`) — too vague.
   - `hit`/`miss` family — "you didn't miss, you *lost the clash*".
   - cute-silly (`spark`/`fizzle`, `flare`/`fizzle`, `snap`/`slip`, `tag`/`zap`) — too silly.
   The target is narrow: **two genuinely different, natural words** (not a word + its past
   tense), **clash-scoped not match-scoped**, simple enough for a kid, neither too grand nor
   too cutesy.
   **Update 2026-08-27 — pole chosen: `plain-and-clear`** (not evocative-magical). Still not
   solved *within* that pole. Fresh plain candidates pitched and **rejected** this session
   (don't re-pitch): `Deal:`/`Take:`, `Beat:`/`Yield:`, `Best:`/`Fold:` — user: "these are
   bad." So `Deal:`/`Take:` (the long-standing plain favourite) is now **also rejected**, not
   just unchosen. The plain lane is proving thin; the winner tab must read naturally whether it
   hands out *damage* **or** a *good-on-lose* effect (heal/shield-on-lose). Next move: keep
   generating **plain** pairs only — but widen past the action-verb framing (try
   state/status/role words, e.g. tabs read as a condition the card is in, not an action it
   takes) before considering a pole change.

2. ~~**The spell damage modifier**~~ — **RESOLVED (2026-08-27): locked as `Potency`.** Damage
   on connect = **Power + Potency**. (Rejected alternatives, for the record: Force, Kick, Juice,
   Muscle, Impact, Charge, Bite, Edge, Punch, Damage.)

---

## 7. What's left over (for the next agent)

Naming is *mostly* done. Outstanding, roughly in priority:

1. **Close the two ⛔ words above** (clash pair, spell modifier) — the only gaps in the
   card-facing vocabulary. Everything else here is locked.
2. **Classes** — the plan was always "let classes emerge from named material" (bible doc 12).
   The material now exists. Open: how many at launch, their names/identities, how heavy the
   synergy is (leaning light-to-medium), and whether neutral/classless "glue" cards exist.
3. **Scaling / proficiency pattern names** — *internal design labels only*, never printed
   (doc 01). We dislike Rank / Mastery / Overpower. Optional in-world names for our notes;
   low priority since players never see them.
4. **Wider world naming (bible doc 06), still open** — species name (Tomelings?), the peoples'
   suffix (`-kin`: Emberkin / Thornkin / Tidekin), and whether the in-world book gets a name
   distinct from the app "Tome". Out of scope for this card-vocab pass but unresolved.
5. **Then the frontier from the prior HANDOFF is unchanged:** the concrete **starter set**
   (still gated — build cards only when the user's ready), then **tune numbers** by playing,
   then **economy**. See `HANDOFF.md` and `../2026-08-22-design-evolution/HANDOFF.md`.
