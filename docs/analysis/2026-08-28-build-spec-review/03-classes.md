# Starting classes — ideation log (2026-08-28)

> **Ideation and inspiration only — NOT an archetype build.** Captured so the engine's `class`
> field has real material to test against and future card design has a north star. The concrete
> archetypes are designed later, with the starter set. Refs to keywords use this session's ledger
> (see [`02-decisions.md`](./02-decisions.md)).

## The shared law

Every class here spans all three colours (reflavoured), per bible doc 12. But the important law
the owner restated: **most starting-set cards are CLASSLESS.** A basic spell any witch or wizard
would know — a plain **Fireball** — carries **no class**. A card earns a class only when it
expresses a school's **specialisation**. So class is a *sparse, printed* tag: nullable, a list in
the engine (0..n), but 0-or-1 on every starter card. Multi-class is an expansion feature; one
throwaway multiclass card exists in M1 purely to exercise the engine seam.

## The seven starting classes

| Class | Identity | Core mechanics | Sample specialisation card (spitball) |
|---|---|---|---|
| **Pyromancer** | Aggro / burn | Fast, extra chip on top of the hit; damage-over-time feel | *"Clash Win: deal 3."* — aggressive, quick |
| **Cryomancer** | Freeze = **denial** | The `Seal:` / `Lock:` / `Dampen:` school. **NB: "slow" is not a mechanic in this game** — freeze *means* denial | *"Clash Win: Dampen the opponent's active spell 2 turns."* |
| **Geomancer** | Defense / walls | **Shield** generation + **Bury** (earth buries); resilience, deep foundations | *"Aura: your Clash Lose spells gain +5 Shield."* |
| **Airomancer** | Tempo / bounce + draw | **Bounce** (opponent **and self**) + net-neutral draw; re-topping tricks | *"Clash Win: Bounce the opponent's active spell, then draw 1 (return 1)."* |
| **Hydromancer** | Flow / heal / adapt | **Heal** + **net-neutral draw**; the natural home for **multi-colour** (water takes any shape) | *"Prepare: draw 1, return 1. Clash Lose: Heal 8."* |
| **Somomancer** | Physical / body | **Auras that reward Power-only attacks** (attacking with **no spell**). **Never grants Power** | *"Aura: your Power-only attacks deal +6."* |
| **Astromancer** | Cosmic / scaling / foresight | The **proficiency/board-reading** school — reads the opponent's tome, momentum, HP, streaks; late payoff | *"+3 Potency per spell in the opponent's most-stocked tome."* |

## Signature notes from the owner

- **Cryomancer.** "Slow" was rejected — there's no slow in the game. Freeze is **denial**; Cryo is
  where the `Seal` / `Lock` / `Dampen` family lives.
- **Airomancer.** Bounce works on **your own** spells too. The signature combo the owner wants:
  self-Bounce a **multi-colour** spell and re-Prepare it as its **other** colour to **swap its
  effect profile** — a tempo/flexibility engine. (Leans on multi-colour, which *is* a starter
  feature.)
- **Hydromancer.** Draw is powerful in a game of few cards and few actions — see the **draw
  guardrail** (doc 02 #36). Hydro draws **net-neutral** (`draw 1 return 1`, `bury 1 draw 1`),
  never pure card advantage.
- **Somomancer.** Rewards casting **no spell** (raw-Power attacks). It **must never touch Power** —
  Power comes only from quests (doc 02 #37). Its payoffs are damage/shield/utility gated on
  "you attacked with Power only."
- **Astromancer.** The face of the proficiency/scaling system — the board-reading, growth, and
  streak/momentum cards.

## Engine implications

- `class` is a **list of strings** on `SpellDef`, empty for classless cards. Starter content:
  **0 or 1** entry per card.
- M1 must include **a few class-reading cards** (e.g. a Pyromancer count payoff) so the
  class-conditional path is built and tested, plus **one throwaway 2-class card** to prove the
  list works.
- Nothing here is balanced or final — it's the inspiration board for the eventual starter set.
