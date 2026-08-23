# Combat, keywords & counterplay

How effects are written (keywords), when they fire (timing), and how players answer
each other (the three tiers of denial).

## Keyword philosophy — MTG, never Yu-Gi-Oh

Card text is **short keywords with tap-to-expand reminder text**, never a paragraph
essay in the box. It's a phone game: a new player taps a keyword to see what it
means; a veteran reads it at a glance. Keywords must be **descriptive and in-theme**,
not codey. **Names below are working placeholders — we'll finalise the in-world
vocabulary later**; the mechanics are what's locked.

### The keyword set (working names)

| Keyword | When it fires | Example |
|---|---|---|
| **Learn** | When the spell enters your tome (Prepare step) | *Learn: draw a card.* |
| **Hit** | When this spell **wins the clash and deals damage** | *Hit: Seal opponent's blue next turn.* |
| **Lose** | When this spell **loses the clash** | *Lose: gain +5 Shield.* |
| **Seal** *(rider)* | A denial clause, usually inside a Hit | *Seal: opponent cannot cast blue spells next turn.* |
| **Forget** *(rider)* | The spell **removes itself** from your tome after resolving | *…then Forget this spell.* |

Two resources referenced by effects:

- **Shield** — a persistent buffer that absorbs incoming damage **before HP**;
  persists across turns until consumed. Gained mainly via **Lose** clauses.
- **Heal** — restores HP now.

> We are **not** adding a keyword for "on hit" as prose — `Hit:` **is** the keyword.
> Same for `Lose:`, `Learn:`. That's the whole point.

## Timing (from the canonical order, doc 04)

- **Damage always resolves first** (step 6), **then** spell effects (step 7), **then**
  quests (step 8).
- So **`Learn`** fires at Prepare; **`Hit`** and **`Lose`** both fire *after* damage.
- **`Lose: +Shield/+Heal` protects the future, not the current hit.** You still take
  this turn's damage in full; the Shield/Heal lands after. Picking a defensive spell
  is a **proactive read** that you'll lose exchanges — not a reactive save. Keep these
  numbers **small**, and only on *some* spells, so they never dull the sting of losing
  the read (that sting is the game).

## The three tiers of counterplay

**This framing is documentation, not printed on cards** — every card just states its
own concrete effect. But every "answer" card should fall into one of these tiers, and
we design deliberately across them.

### Tier 1 — Seal (the everyday answer)

Temporary denial. *"Seal: opponent cannot cast blue spells next turn."* Because
effects resolve after damage, a Seal naturally lands on the **following** turn's
selection — fully telegraphed, still simultaneous, no timing break. Variants:

- Deny a **colour** (collapses their range, makes them readable).
- Deny their **strongest / a specific learned spell**.
- **Cap** their modifier — *"opponent's chosen spell is +0 next turn."*

Seals are the heart of interaction: they **deepen the RPS** (a sealed colour is a
removed option) instead of sidestepping it, and they respect singleton — **nothing is
lost**. Mobile-clean: tap the opponent's colour → locked.

> **Duration decision (leaning 1 turn):** Seals last **one turn**. Telegraphed and
> mild keeps pace and readability. (Alternative considered: "until you next win a
> clash" — stickier but swingier. Parked.)

### Tier 2 — Shield / Heal on Lose (agency for the player losing the read)

The clash loser normally does nothing. **`Lose:` clauses** give the losing pick
value — *Lose: +5 Shield*, *Lose: heal 10*. This is how a behind player "deals with"
an opponent's power: **mitigation, not removal**. The cost is built in — a defensive
spell carries a low attack modifier (e.g. `+0`), so choosing it sacrifices offense.
That tradeoff is what keeps it fair.

### Tier 3 — Burn (rare, crazy, earned)

**Permanent destruction** of a learned spell. Singleton makes this a **haymaker**, so
it must be rare and gated behind wild conditions — a **quest capstone** (doc 10) or a
self-immolating spell. Example of the flavour:

> **`+0` · Hit: destroy the top spell of the opponent's blue tome, then Forget this
> spell.** *(A one-shot: you spend your own page to tear out one of theirs.)*

Never put Burn on a common, cheap spell. It exists so the game *has* a nuclear option,
not so it has a default one.

## Design guardrails (recap)

- Counterplay is **denial-first** (Tier 1), **mitigation-second** (Tier 2),
  **destruction-last-and-rare** (Tier 3). No graveyard-as-resource, ever — you play
  what you can see.
- On-lose mitigation stays **small** and **costed** (low modifier).
- Burn is **rare and conditional**; Forget is its honest price (you spend your own
  card).
