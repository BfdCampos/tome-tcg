# Proficiency & scaling — spells that grow and read the board

> Refs like "doc 09/10/11" point to the 2026-08-22 design bible.

The RPG "you can't wield the greatsword to full effect on day one" fantasy, done
without a mana system, without a cost economy, and **without printing rules on the
card frame**. This is the layer that gives the game its skill ceiling while the
baseline stays pure RPS.

## Two principles first

1. **Gate at *use*, never at *access*.** A powerful spell is always learnable and
   always castable — it just starts **weak** and earns its power. We do **not** gate
   *learning* (no "you may not learn this until…"), because a card stuck dead in hand
   is exactly the MTG mana-screw / Pokémon prize-lock feel we're killing, and it
   breaks the Tome's promise (doc 09) that nothing you prepare is ever lost.
2. **Scaling is a *feature of specific cards*, not a keyword.** There is **no printed
   "Rank/Mastery" badge**. Most cards are **flat** and read nothing. A *few* cards
   bend their own effect around one live game value, stated in the card's own plain
   words. The mechanic is invisible until a card uses it — so a new player never has
   to learn it to play.

## The real primitive: cards can read live game-state

The engine exposes a **menu of readable values**. Any card may compose **one** of them
into its own concrete effect. That's the whole system — near-infinite design space,
tiny rules footprint.

| Reads from | RPG fantasy | Illustrative card *(numbers are spitball, ignore balance)* |
|---|---|---|
| **Its own grown value** | *use it until it bites* | `+0 · gains +1 each time it connects; at +5 Attack it also Seals` |
| **Colour depth** (spells in a tome) | *deep study of a school* | `aura: gain 2 Shield end of turn if you have 3+ blue spells` |
| **Your Power** (character stat) | *strong enough to wield it* | `+0 · Hit: destroy the top blue spell if your Power ≥ 20` |
| **The opponent's book** (public range) | *read your enemy* | `+3 per spell in their blue tome` · or `+10 if they have no green` |
| **HP totals** | *last stand / execute* | `+15 while you're below half HP` · or `double vs an opponent under 20` |
| **Recent history** (last cast) | *combo rhythm* | `+6 if you cast red last turn` |
| **Momentum** (clash streak) | *press the advantage* | `+3 per clash won in a row` (resets on a loss) |
| **Denial state** (what's Sealed) | *control payoff* | `+4 for each spell currently Sealed` |
| **Sacrifice** (spend the book) | *fuel / channel* | `Forget another spell in this tome: +20` |

The first three are the axes we started from; the rest are the wider space the same
primitive opens. The stand-outs for *this* game:

- **Reading the opponent's book** turns the "range is public, pick is hidden" pillar
  (doc 09) into a *mechanical* resource — a design nobody else has, because no other
  game has a face-up spellbook to read.
- **HP-total scaling** is a clean **comeback/finisher** axis that pairs with the
  loser-completable quests (doc 10) — the behind player's cards get *sharper*.

## Design laws for scaling cards

- **Only some cards scale.** Flat is the default; scaling is opt-in depth (and a
  natural rarity / archetype signal — see bible doc 07's tiers).
- **One read per card.** A scaling card references **one** value in **one** clause.
  If it needs two conditions to explain, redesign it. (Same discipline as the keyword
  rule in doc 11 — the card states its own effect, never the game's rules.)
- **Self-limiting by construction.** Growth-on-connect only pays when you **win the
  clash** (skill-gated); momentum **resets on a loss**; colour-depth costs you RPS
  coverage to reach. The RPS layer stays the great equaliser — a scaled card still
  does nothing on a turn you lose the read.
- **Colour-depth cards are rare and are *not* a mono-deck engine.** We do **not** want
  to reward mono-colour (it's RPS-suicide, doc 12). A depth card asks for *3-ish* of a
  colour you'd run anyway, not *your whole deck*.

## Engine note

- **Growth-on-connect needs per-instance mutable state**: a learned card's live Attack
  can differ from its printed Attack, so the tome stores a value *per learned card*,
  not just a card id. This is new state, accepted on purpose — we're building a
  deliberately **deeper** game (high ceiling), while the **barrier stays low** because
  the core is still RPS and most cards are flat.
- **Everything else is computed on the fly** from state the engine already holds
  (tomes are face-up, HP/Power/last-cast/streak/seals are all known), so it's cheap.

## Open

- **Naming** — the scaling patterns themselves (we dislike Rank/Mastery/Overpower);
  and Power/Attack (see `02-decisions-and-deltas.md`). Part of the vocabulary pass.
- **Which read-axes make the starter set** — likely a handful, not all nine, so the
  first playtest set stays legible.
- **All balance** — thresholds, growth rates, execute cutoffs: playtest-only.
