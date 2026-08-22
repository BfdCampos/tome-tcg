# Removing fields, and the ambient-effect niche

## Decision: fields are out (for now)

**Why they're clunky — confirmed in the code.** In `engine.turn.ts` the field path
is brutal:

1. Casting a field **uses your one prepare** (`min:0, max:1`) — it competes directly
   with developing a spell.
2. It then has to **survive `resolveFieldClash`** on the colour wheel
   (`engine.game.ts:111`). If the opponent also prepared a field and yours loses the
   wheel, it's **discarded before doing anything** (`actions.discard(loserCard)`).
   Two neutral fields? *Both* discarded. A tie? *Both* discarded.
3. If it *does* land, it sits as the single global `board.field`, where the next
   field overwrites it and cards like **Stomp** (`on damage: remove the top field`)
   delete it outright.

So the expected value of a field play is often: *spend your whole turn, win a second
RPS, and still get wiped next turn.* That's three gates for one effect. It
correctly feels awful. The double-RPS the `2026-08-17` review celebrated (field
clash **and** spell clash) is exactly the part that makes fields not worth playing.

There are **38 field cards** in `card.db.ts` (vs 110 spells). Removing the *type*
doesn't mean deleting the *ideas* — many are good effects trapped in a bad frame.
We'll re-home the worthwhile ones (see below and doc 04).

## The contradiction to resolve

The brief says two things that look opposed:

> "I also don't like the field spells… we're throwing that out."

> "The field cards don't make sense if they change the field, but they could've
> been like 'rain' and it's a field effect, that's ok."

These reconcile once you separate **the mechanic** from **the niche**:

- What's bad is the **mechanic**: clash-to-land + terrain metaphor + costs-your-turn
  + wiped-next-turn.
- What's fine is the **niche**: a *global, ambient effect that colours a few turns*
  — rain, drought, eclipse, a lingering hex. "Weather," not "terrain."

So we're not killing global effects. We're killing the **clash-gated, permanent,
terrain-framed** version of them.

## The clean replacement: "Weather / Omens" (optional, non-clashing)

If we want to keep an ambient layer, redesign it so every clunk-point above is
inverted:

| Field (old, clunky) | Weather/Omen (proposed) |
|---|---|
| Must **win a clash** to land | **No clash.** It just resolves. |
| **Permanent** until removed/overwritten | **Self-expires** after N turns (e.g. 3). Impermanence is the *design*, not a punishment. |
| Opponent can hard-remove it (Stomp) | Nothing to remove — it's already fading. Fewer "remove the field" cards needed. |
| One global slot, newest overwrites silently | One global "sky." Newest weather **replaces** the old cleanly and visibly. |
| "Changes the terrain/field" | Themed as **weather/omens**: Rain, Drought, Eclipse, Blood Moon, Still Air. |

The key reframe: the brief's complaint *"it might be gone next turn anyway and you
didn't even play the effect"* is solved by making the effect **guaranteed on cast**
and **guaranteed to last a few turns**. You always get what you paid for; it always
leaves on schedule.

### The one trap to avoid

If Weather is still cast via the **one prepare**, it *re-creates the field problem*
(it competes with developing a spell). Two ways out:

- **Make it clearly worth a whole turn:** strong, uncontested, multi-turn effect —
  now spending a prepare on it is a real, positive tempo choice, not a coin-flip.
- **Or give it a different cast path** so it doesn't tax the prepare fork at all
  (e.g. it's a rarer "event" you play off a separate trigger). More design surface;
  probably later.

## What happens to the 38 existing field cards

Triage them into three buckets:

- **Becomes Weather/Omen** — genuinely ambient, multi-turn effects (Hailstorm,
  Spreading Fire, Healing Rain, Tsunami, Drought-likes). Re-skin as weather, drop
  the clash.
- **Becomes a Ward/Glyph (doc 04)** — effects that are really *reactions* or
  *one-shots* (Mirror Shield, Inverse Field, Back to Square One, Void Space). These
  fit the new interactive type far better than a persistent field.
- **Retire** — effects that only made sense *because* fields clashed on the wheel
  (Double/Triple Down Field, field-vs-field synergies). Park them.

We don't need to do this triage now — but it means "removing fields" is mostly a
**re-homing** exercise, not lost work.

## Recommendation

- **Remove the field type and its clash** from the core loop.
- Treat the **ambient/weather niche as optional and separable** from the main combat
  question (doc 04). Ship the interactive layer first; add Weather/Omens only if the
  game wants an ambient texture after that.
- When we do add Weather: **no clash, self-expiring, guaranteed-on-cast**, and
  either clearly-worth-a-prepare or off a separate cast path.
