# Open questions, inconsistencies & next steps

The running list of what still needs a decision from you, and the tensions this
session surfaced. This is the doc we'll keep editing as we lock things down.

## Inconsistencies / tensions spotted in the brief

1. **"Remove fields" vs "weather is fine."** Resolved in doc 03 by splitting the
   *mechanic* (clash-gated terrain — bad) from the *niche* (ambient weather — fine).
   Fields go; an optional non-clashing "Omen/Weather" type can keep the niche.
2. **Rarity: cosmetic or power?** (doc 07) — "full art / better animation" says
   cosmetic; "legendary" implies power. **These are opposite games.** You must pick,
   and picking *cosmetic* is the only choice consistent with "not pay-to-win." This
   is the single most important economy decision.
3. **The new card type could relieve the clog — or recreate it.** (docs 02, 04) — if
   the new type is played via the **one prepare**, it competes with spells exactly
   like fields did. It only *helps* if it's played **outside** the prepare
   (reactively). Whatever your idea is, its **timing** is the load-bearing detail.
4. **Two different needs are being bundled as "a new card type."** (doc 04) — (a)
   *replace the ambient/field niche*, and (b) *make combat more than RPS*. These may
   be **one** type or **two**. Keep them conceptually separate so we don't jam both
   jobs into one confused card.
5. **Smaller deck vs the collection chase.** (docs 05, 07) — 20-card decks are more
   elegant and more fair, but need fewer cards, softening the chase. Resolve on the
   **cosmetic** axis, not by re-inflating the deck.
6. **Win-only coins vs "everyone progresses."** (doc 07) — pure win-pays-coins can
   spiral for losing players; needs floors (daily/first-win/quests, loss-XP,
   matchmaking) to stay P4-true.

## Decisions we need from you

**Combat / cards**
- [ ] **Your card-type idea** — drop it into doc 04's slot (when played, persist vs
      one-shot, does it touch the clash, the fantasy name). Everything downstream
      keys off this.
- [ ] Adopt **Wards/Glyphs** (reactions outside the prepare)? Standalone, or merged
      with your idea?
- [ ] Should reactions **cost a discard** to fire (turning clog into fuel)?

**Tempo / structure**
- [ ] **Deck size 20** (recommended) or keep 30? Decide *with* draw rate,
      `emptySlotAttack`, mulligan, and deck-out-as-loss (doc 05).
- [ ] Lower **`emptySlotAttack`** so "commit nothing" stops being free? (worth
      testing regardless)
- [ ] Keep an **ambient/Omen** layer at all, or drop global effects entirely for
      now? (doc 03)

**Economy**
- [ ] **Rarity = cosmetic, not power** — confirm. (doc 07, the linchpin)
- [ ] **4 rarity tiers** at launch instead of 6? 
- [ ] Confirm **every playable card is craftable** (no money-gated power).
- [ ] Coin **floors** (daily/first-win/quests) + **loss-XP** — in or out?

**Theme / naming** (doc 06)
- [ ] Species name — **Tomelings**?
- [ ] Peoples — **Emberkin / Thornkin / Tidekin** (`-kin`)? Thornkin vs Leafkin,
      Tidekin vs Rimekin?
- [ ] Does the in-world tome get its own name so "Tome" stays the app?

## A suggested sequence (once decisions land)

Design-first, cheapest-reversible-first:

1. **Lock the new card type** (doc 04) — it gates combat, UI, and the clog fix.
2. **Playtest the tempo bundle** (doc 05) — 20 cards + draw/empty-slot/mulligan +
   deck-out. These are mostly *number* changes to the existing engine; fast to try.
3. **Remove fields**, re-home the salvageable 38 into Wards/Omens or retire (doc 03).
4. **Prototype the interactive layer** in-engine — the hooks
   (`onClashWin`/`onClashLose`/`beforeDamage`) and `playerAction` window already
   exist, so a Ward reveal-window is a contained addition.
5. **Then** the economy/meta layer (doc 07) and story mode (doc 06) — they sit on top
   of a settled core and shouldn't be built until the core loop feels right.

## What's explicitly *not* being changed

- The **double-... wait — the single** colour-RPS *spell* clash stays the spine. (The
  *field* clash is what's being removed, not the spell clash.)
- **Persistent per-colour stacks, top-card-is-live** — untouched; it's the engine's
  best original idea.
- **Max-2-copies** — kept.

## Notes for future edits of this folder

- This is a **living design set**, not a snapshot — edit these files in place as
  decisions land (that's different from the `analysis/` snapshot convention, and
  intentional for a working session).
- When the core is settled and *built*, write a **new dated snapshot** (à la
  `2026-08-17`) describing the game as-shipped, and freeze this folder as the record
  of how we got there.
