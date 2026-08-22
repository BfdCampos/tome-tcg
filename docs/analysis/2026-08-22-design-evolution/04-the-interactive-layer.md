# The interactive layer — a new card type

This is the centre of the session. The brief:

> "Simulating the game… is entirely just a rock-paper-scissors mechanic. Fun but in
> the same way rps is in real life. I want a little more interactivity but without
> increasing the complexity too much… a different type of card… in-theme… I have
> one already in mind but I don't want to bias you."

So: **brainstorm freely, set criteria, hold a slot for your idea.** I've kept my own
recommendation clearly separable from your idea so it doesn't bias the comparison.

## Why combat is "just RPS" right now

Look at what a clash actually consumes as input (`resolveSpellClash`,
`engine.turn.ts`):

- Each player **blindly, simultaneously** names one colour.
- The wheel decides. The winner's **pre-existing** top card deals its number.
- There is **no information revealed mid-clash**, and **no decision after any
  reveal**. Nothing you hold in hand can change a clash you're currently losing.

That's textbook RPS: simultaneous, blind, no in-the-moment agency. The stacks add
*preparation* depth across turns, but the *moment of combat* is inert. We want to
put a **decision inside the clash**.

## Five criteria (how we'll judge any candidate — including yours)

1. **Deepens the read (P3)** — adds a *second* layer to the mind-game, doesn't
   replace the colour read with solitaire or with pure math.
2. **Cheap to learn (P1)** — explainable in one sentence; a new player groks it in
   one match.
3. **One-thumb, seconds-fast (P2)** — at most one extra tap in the clash window.
4. **In-world (P5)** — reads as wizard-kit, not "modifier token #3."
5. **Helps the clog (bonus)** — if it also drains the hand (doc 02), it's doing
   double duty.

## The candidate menu

### C1 — Reactions / "Wards & Glyphs" *(my recommendation)*

Held in hand; revealed in a **short response window during the clash**, **without
spending your prepare**. A small verb set:

- **Shield/Ward** — negate or halve the damage you're about to take.
- **Counter** — if you lose the clash, punish anyway (chip back, discard their top,
  redirect a chunk).
- **Break** — bend the wheel for this clash only (your Red also beats Blue this
  turn) — see C2, which folds into this.

Why it wins on the criteria:

- **Read (1):** creates the "does he have a ward?" layer. You can bait it, play
  around it, or hold your own. This is the Yomi/Flesh-and-Blood second guess.
- **Learn (2):** "you may flip one ward during a clash." One sentence.
- **Thumb (3):** one optional tap after colours reveal.
- **World (4):** counterspells, warding glyphs, protective sigils — *pure* wizard.
- **Clog (5):** **yes** — this is the hand's second outlet from doc 02. Add
  "discard a card to fire" (doc 02, Option C) and clog literally becomes ammo.

Guardrails so it doesn't bloat complexity: **one reaction per player per clash**,
tiny verb set, effects legible at a glance. The engine is *already shaped for this*
— `onClashWin` / `onClashLose` / `beforeDamage` hooks exist (`engine.hooks.ts`),
and the `playerAction` machinery can open a timed response window exactly like it
already does for prepare and attack.

### C2 — Runes: face-down wheel-benders

Before the clash, each player may **set a face-down rune** on a stack; it reveals
with the colours and modifies *that* clash (+attack, or "this colour beats the one
that normally beats it"). Great bluff (P3) and very thematic. Downside: a *second*
simultaneous commitment can muddy the core colour read and adds a face-down-state
concept. **Mostly subsumed by C1's "Break" verb** — keep runes in the back pocket.

### C3 — Rituals / charges (telegraphed power)

A card you commit that **charges over turns** and releases a big effect on turn N.
Opponent sees it charging → tension and counterplay. Strong RPG flavour. But this is
an **engine/tempo** layer, not *combat* interactivity — it doesn't put a decision
*inside* the clash. Good *later* as an archetype, not the answer to "RPS-only."

### C4 — Prediction / call-out

Before the clash you may **secretly call your opponent's colour**; if right, a
bonus. Adds a bluff layer with **zero new cards**. Cheap and elegant, but thin on
its own and not really a "card type." Good as a *keyword* on some cards, not the
headline.

### C5 — Break simultaneity (attacker declares, defender responds)

Let one side commit first and the other respond with full information. Maximum
interactivity, but it **guts the simultaneous RPS** that is the game's identity, and
invites first-mover swings. **Rejected** as a global rule; fine as a rare card
effect.

## Scorecard

| Candidate | Read (P3) | Learn (P1) | Thumb (P2) | World (P5) | Clog | Verdict |
|---|:--:|:--:|:--:|:--:|:--:|---|
| **C1 Wards/Glyphs** | ●●● | ●●● | ●●● | ●●● | ●●● | **Recommend** |
| C2 Runes | ●●● | ●● | ●● | ●●● | ● | Fold "Break" into C1 |
| C3 Rituals | ● | ●● | ●●● | ●●● | ○ | Later, as an archetype |
| C4 Prediction | ●● | ●●● | ●●● | ●● | ○ | Use as a keyword |
| C5 Sequential | ●●● | ●● | ●● | ●● | ○ | Reject as a rule |

## Recommendation

Adopt **C1 — Wards/Glyphs**, a reactive card type played from hand during the clash
window, **outside** the one-per-turn prepare, with **one reaction per clash** and
(strongly consider) **discard-a-card-to-fire**. It is the only candidate that scores
top marks on all five criteria and it **also fixes the clog** (doc 02). Fold C2's
wheel-bending in as one of its verbs; keep C3/C4 as future archetype/keyword
material.

## Your idea — slot to fill

You said you already have a card type in mind. Drop it in and we'll run it through
the five criteria above, side-by-side with C1. Specifically, tell me:

- **When is it played?** (on your turn via prepare / reactively in the clash / a
  separate cast path) — this decides whether it competes with the prepare fork or
  relieves it.
- **What does it do — persist, or one-shot?** (a lingering modifier vs a reaction)
- **Does it touch the clash directly?** (the thing that makes it *more than RPS*)
- **What's the in-world fantasy?** (the name tells us how players will reason about
  it)

If your idea *is* a reaction-style card, we're aligned and this becomes one shared
design. If it's something else (a persistent modifier, a ritual, a summon), we can
likely run **both** — C1 for the combat read, yours for the archetype texture —
as long as only one of them lives *inside* the clash so we don't double the
mid-combat decision (P1/P2).
