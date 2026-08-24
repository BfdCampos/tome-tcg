# Economy, monetisation & progression

The brief lays out a Pokémon-Pocket-style store fused with an RPG crafting/loot
loop, under a hard constraint: **not pay-to-win, and you never *need* to spend.**
This doc endorses the shape, then flags the decisions that make-or-break the
"not P2W" promise.

## The loop, as described

- **Coins**: bought with money **or** earned in-game. **Win → coins. Lose → none.**
- **Packs**: bought with coins. Multiple **sets**. **Rarities**: common, rare, super
  rare, ultra rare, mythic, legendary. Rarer = **full art + better animation**.
- **Crafting**: **disenchant** cards → **runes/ingredients**; **recipes** combine
  ingredients + loot (e.g. a rare green spell = 3 green runes + 2 twigs + 1
  caterpillar) to **scribe** new spells.
- **Loot**: **every** game (win or lose) drops loot; **more/rarer if you win**. Small
  pool, **recycled**.
- **Goal**: keep the incentive to open packs, *and* the incentive to play; no
  pay-to-win; spending optional.

This is a coherent, proven skeleton (it's broadly Hearthstone's dust loop wearing an
alchemy costume, with Pocket's cosmetic-rarity chase). The critiques below are about
**tuning and consistency**, not the shape.

## The one decision that determines "not pay-to-win": what does rarity *mean*?

This is the biggest inconsistency latent in the brief. "Rarer cards should be full
art, have better animation" says **rarity = cosmetic**. But a ladder named up to
**"legendary"** implies **rarity = power**. These are opposite games:

- **Rarity = power** → the legendary card is *stronger*, and whoever opens/affords it
  wins. That's **pay-to-win by construction**, no matter how generous crafting is.
- **Rarity = cosmetic** *(recommended)* → a card's **effect is fixed**; rarity is the
  **art treatment and the craft cost**. Everyone can *play* the card at base rarity;
  the chase is the **full-art / animated** version. This is exactly how Pokémon
  Pocket stays fair, and it's the only model consistent with P4.

**Recommendation — lock this now:** *rarity is a cosmetic + craft-cost axis, not a
power axis.* Power lives in the card's design and is **balanced independently of how
pretty your copy is.** A free player and a whale can bring the *same deck*; the whale
just has shinier pages.

Consequence: "legendary" should read as *"legendarily rare to pull as full-art,"* not
*"legendarily strong."* If some cards are genuinely build-arounds, that's fine — but
their **playable version must be craftable**, so power is never gated behind money.

## Six rarity tiers is too many for launch

With a launch pool of ~120–150 cards (per the `2026-08-17` review), six tiers
(common→legendary) either (a) makes the top tiers so sparse that pulling one feels
arbitrary, or (b) dilutes what each tier *means*. Pocket can run a deep ladder
because it has hundreds of cards and cosmetic variants per card.

**Recommendation:** start with **4 tiers** — e.g. **Common · Rare · Epic · Legendary**
— and layer **cosmetic variants** on top (foil / full-art / animated) as the *real*
chase. Expand to more tiers later when the card pool is big enough to support them.
Fewer tiers = clearer pity math and a less punishing collection curve for free
players (P4).

## Making packs and crafting *coexist* (so neither is pointless)

If crafting can make anything, why buy packs? If packs give everything, why craft?
The resolution (proven): give them **different jobs**.

- **Packs = breadth + cosmetics + fuel.** Fast, exciting, random; the source of
  *duplicates* (which feed disenchant) and of the shiny cosmetic variants.
- **Crafting = precision + pity.** Slow, deterministic; how you get the **one specific
  card** you're missing so bad luck never hard-walls you. This is the anti-P2W safety
  valve — you can always *scribe* your way to a legal, competitive deck.

Concretely, mirror the disenchant→craft economy: tearing a page yields runes; a
recipe spends runes + reagents. Set craft costs so that **a competitive 20-card deck
is completable by a steady free player in a reasonable time**, while packs stay the
*faster* and *prettier* path.

## The two material sources (keep them clean and small)

The brief already implies two distinct mat streams — keep them separated:

- **Runes (colour)** — from **disenchanting** cards. "Grind green spells → green
  runes." Ties dupes from packs directly into crafting. Three runes (R/G/B), maybe a
  neutral rune for colourless cards.
- **Reagents (misc, organic)** — from **playing games**. Twigs, caterpillars,
  crystals, feathers — the "random loot." Keep the pool **~10–15 items, recycled**,
  as the brief wants, so recipes stay readable and reagents stay easy to get.

Recipe = *colour runes (power/identity) + reagents (flavour/gating)*. Clean, RPG,
and it makes both "open packs" and "play matches" feed crafting.

## Coins: win-only is motivating, but needs floors

**Win = coins, lose = none, loot always** is good motivation, but pure win-only pay
risks a **rich-get-richer spiral**: new or losing players can't buy packs, stall, and
churn — the opposite of P4. Mitigations (standard, cheap):

- **First-win-of-the-day bonus** and a few **daily/weekly quests** that pay coins for
  *playing*, not only winning — a guaranteed floor so everyone progresses.
- **Loss still progresses you**: losers get **loot + XP** (they do get loot; add XP so
  the progression bar always moves).
- **Matchmaking / ranked** so losses aren't relentless — without it, "lose = nothing"
  is brutal for the bottom half of the ladder.
- Consider a small **loot→coins or loot→pack** conversion so grinding always trends
  toward packs even on a losing streak.

## RPG progression (the P5 payoff)

The brief keeps invoking RPG feel — make it a literal track, not a metaphor:

- **Player level / "road to Wizard"** — XP from every match (win or lose), cosmetic
  and quality-of-life unlocks along the way. This *is* the "become a wizard" fantasy.
- **Story mode as the on-ramp** (doc 06) — hands out **recipes** and **starter
  reagents** so a free player can scribe a real deck from day one.
- **Collection as questing** — recovering pages *is* the plot; frame the collection
  screen as reassembling the shattered tome.

## Consistency checklist (lock these before building the economy)

1. **Rarity = cosmetic, not power.** *(the P4 linchpin — decide first.)*
2. **Every playable card is craftable**, so no power is money-gated.
3. **4 tiers at launch**, cosmetic variants as the chase; expand later.
4. **Packs vs crafting have different jobs** (breadth+cosmetics vs precision+pity).
5. **Two mat streams**: runes (disenchant) + reagents (play-loot), small & recycled.
6. **Coin floors** (daily/first-win/quests) so losing players still progress.
7. **Losers get XP + loot**, and matchmaking exists, so "lose = no coins" isn't a
   death spiral.
8. **Smaller decks (doc 05) lower the collection wall** — treat that as a *fairness
   win*; recover monetisation on the **cosmetic** axis, not by re-inflating decks.
