# Play-by-play: 6 turns

Two wizards, **Aria** (sideA, a Red "Fire" aggro build) vs **Bram** (sideB,
Green/Blue control-heal). Colours are chosen arbitrarily to demonstrate the
mechanics. All cards below are real entries in `card.db.ts`. Opening hand assumed
4 + turn-1 draw = 5 (a configurable setting).

> ⚠️ **Note on the colour wheel:** this play-by-play uses the wheel direction as
> it was in the code when written — **Red > Blue > Green > Red**. That direction
> was a bug; the intended wheel is **Red > Green > Blue > Red** (fixed in PR #1).
> Under the corrected rules every clash winner below would **invert**, but the
> mechanics being demonstrated — stacking, field buffs, combos, hook ordering,
> heal, discard effects — are unaffected. Kept as-written to preserve the
> original snapshot.

Wheel used below: **Red > Blue > Green > Red.**

## Turn 1 — Aria 100 / Bram 100
- **Draw:** both to 5 cards. No effects active.
- **Prepare:** Aria → **Fireball** (Red, 11) into Red. Bram → **Sacred Water**
  (Blue, 10, heal 5) into Blue.
- **Field clash:** none.
- **Attack colours:** Aria picks **🔴 Red** (Fireball 11); Bram picks **🔵 Blue**
  (Sacred Water 10).
- **Clash:** Red beats Blue → **Aria wins.** Fireball deals 11. Bram's heal never
  triggers (losers do nothing).
- **Result:** Bram 100 → **89.**

## Turn 2 — Aria 100 / Bram 89
- **Draw:** Aria draws Flaming Sword; Bram draws Stomp.
- **Prepare:** Aria → **Boiling Temperature** → Red stack (single red). Now Aria
  red = [Fireball, Boiling Temperature] (*on damage: discard top of opponent's
  Blue stack*). Bram → **Overgrown Root** → green stack ("6×X where X = cards in
  this stack") → 6×1 = **6 atk**.
- **Attack colours:** Aria **🔴 Red** (Boiling Temp 8); Bram **🟢 Green**
  (Overgrown Root 6).
- **Clash:** Green beats Red → **Bram wins.** Deals 6. (Boiling Temp dealt no
  damage, so its discard effect doesn't fire.)
- **Result:** Aria 100 → **94.** Bram reads the wheel correctly and answers.

## Turn 3 — Aria 94 / Bram 89
- **Draw:** Aria draws Fired Up; Bram draws Nature's Wrath.
- **Prepare (fields this time):** Aria → **Fired Up** (Field, Red — *each player's
  damage +5×(their active "Fire" spells + 1)*). Bram → **Sacred Pool** (Field,
  Blue — *attack with Blue → heal 10*).
- **Field clash:** Fired Up (red) vs Sacred Pool (blue) → Red beats Blue → **Aria's
  Fired Up becomes the active field**; Sacred Pool discarded.
- **Attack colours:** Aria **🔴 Red** (Boiling Temperature 8); Bram **🔵 Blue**
  (Sacred Water 10).
- **Clash:** Red beats Blue → **Aria wins.**
- **Damage:** Fired Up adds +5 (Aria has 0 active "Fire" tops, so 5×(0+1)) →
  Boiling Temp 8 **+5 = 13.** Bram 89 → **76.** Boiling Temperature's
  `onDealDamage` then **discards the top of Bram's Blue stack (Sacred Water)** —
  Bram's Blue is now empty.

## Turn 4 — Aria 94 / Bram 76
- **Draw:** Aria draws her 2nd **Fireball**; Bram draws Wooden Staff of Healing.
- **Prepare:** Aria → **Fireball #2** onto Red → Red = [Fireball, Boiling
  Temperature, Fireball #2]. The active top is now Fireball ("**Fire**" in its
  name). Bram → **Wooden Staff of Healing** (Green, 5, heal 6; *if beaten, discard
  it*) onto Green.
- **Attack colours:** Aria **🔴 Red** (Fireball #2, 11); Bram **🟢 Green** (Wooden
  Staff 5, heal 6).
- **Clash:** Green beats Red → **Bram wins.**
- **Damage:** Fired Up now buffs **Bram** (the dealer): Bram has 0 "Fire" tops →
  +5. Wooden Staff 5 **+5 = 10** to Aria, and heals Bram **6.** Aria 94 → **84**,
  Bram 76 → **82.**

## Turn 5 — Aria 84 / Bram 82
- **Draw:** Aria draws Flaming Bow; Bram draws Ice Shard.
- **Prepare:** Aria → **Violent Instinct** (Red, 15; *if it's your attack, double
  all combat damage; removed after use*) onto Red. Bram → **Ice Shard** (Blue, 11)
  into Blue (refilling the emptied stack).
- **Attack colours:** Aria **🔴 Red** (Violent Instinct 15); Bram **🔵 Blue** (Ice
  Shard 11).
- **Clash:** Red beats Blue → **Aria wins.**
- **Damage (hook order matters):** field fires first → Fired Up +5 → 15 **+5 =
  20**; then Violent Instinct **doubles** → **40** damage. Bram 82 → **42.**
  Violent Instinct is removed from play after combat.

## Turn 6 — Aria 84 / Bram 42
- **Draw:** Aria draws Syphon Fire; Bram draws Giant Leech.
- **Prepare:** Bram, desperate to kill the field, → **Stomp** (Green, 11; *on
  damage: remove the top field*) onto Green. Aria → **Syphon Fire** (Blue, 8; *on
  damage: activate your top Red card's effect*) into Blue.
- **Attack colours:** Aria **🔵 Blue** (Syphon Fire 8) — a read to beat green;
  Bram **🟢 Green** (Stomp 11).
- **Clash:** Blue beats Green → **Aria wins.** Stomp never resolves (loser), so
  **Fired Up survives.**
- **Damage:** Aria's active "Fire" tops are now Fireball (Red) **and** Syphon Fire
  (Blue) = 2 → Fired Up adds 5×(2+1) = **+15.** Syphon Fire 8 **+15 = 23.** Bram
  42 → **19.** (Syphon Fire then tries to trigger Aria's top Red card, Fireball,
  which has no effect.)

## End state

Aria **84**, Bram **19**. Aria's fire-synergy engine + correct colour reads
snowballed after the Violent-Instinct + Fired-Up combo on Turn 5. Bram's early
green dominance stalled once he couldn't remove the field.

This showcases: the colour wheel (both field & spell layers), one-card-per-turn
tempo, stacking, field buffs, heal, Violent Instinct doubling, Boiling
Temperature's stack-discard, Fired Up scaling, Syphon Fire, and hook ordering.
