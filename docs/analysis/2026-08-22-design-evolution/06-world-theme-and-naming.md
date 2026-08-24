# World, theme & naming

The plot from the brief, tightened, plus the naming decisions it forces.

## The story (as given)

Little creatures lived in harmony as three peoples — **Red, Green, Blue**. One
wandering **wizard** carried a great **tome** of spells from village to village,
healing and defending against monsters. When **evil spirits** began attacking the
world, the wizard **vanished** at the moment of greatest need. Desperate, the three
peoples' leaders each seized the tome to claim its magic — and tearing it three
ways, they **shattered it**, scattering its **pages** across the world. You are one
of these creatures, travelling to **recover the pages**, master the spells, and
become a wizard strong enough to protect the world.

This is a genuinely good spine because it *is* the game's systems:

- **Pages = spell cards.** Collecting cards *is* the story premise. 
- **Three peoples = the three colours.** The RPS wheel is baked into the lore.
- **Becoming a wizard = the progression track** (doc 07).
- **Evil spirits = the story-mode / PvE enemies.**

## Naming — shortlists (pick one line each)

Naming should feel **cute-collectible + arcane** (the Pokémon-Pocket-meets-grimoire
tone). Recommendations marked ★.

### The creatures (the collectible species you play as)

The premise ties them to the tome, so tome/grimoire roots read best:

| Option | Feel |
|---|---|
| ★ **Tomelings** | On-theme (tome), cute `-ling`, obviously collectible. Strong default. |
| **Grimlings** | From *grimoire*; a touch spookier/edgier. |
| **Runelings** | Leans into runes/crafting (doc 07). |
| **Wisps** | Soft, magical, but generic and less tied to the tome. |
| **Motes** | Minimal, elegant, but abstract. |

### The three peoples / zones (Red · Green · Blue)

Give each a people-name *and* a home-region, so story mode has places to visit:

| Colour | People (★) | Region flavour |
|---|---|---|
| 🔴 Red | **Emberkin** | Cinder peaks / forge-vales — heat, courage, aggression. |
| 🟢 Green | **Thornkin** *(or Leafkin)* | Deep wood / bramble-holds — growth, patience, resilience. |
| 🔵 Blue | **Tidekin** *(or Rimekin)* | Coast / frost-meres — flow, cunning, control. |

(The `-kin` suffix keeps the "three peoples of one folk" harmony idea audible.)

### The wizard, the tome, the enemy

- **Wizard:** ★ *the Wandering Wizard* / *the Tomekeeper* / *the Last Archmage*.
- **Tome:** ★ *the Grand Tome* / *the Codex* / *the Worldtome*. (Product name candidate
  too — the repo is already "Tome TCG".)
- **Enemy spirits:** ★ *the Blight* / *the Hollow* / *the Dusk* / *Wraiths*. Pick a
  collective ("the Blight") for the faction and a creature word ("wraiths") for
  individuals.

## In-world lexicon (make every system speak the theme — P5)

The RPG feel comes from *naming the verbs* consistently. Proposed dictionary:

| System term | In-world name |
|---|---|
| Your deck | **Tome** / **Spellbook** |
| A card | **Page** |
| Spell card type | **Spell (Page)** — the stacked attackers |
| New reactive type (doc 04) | **Ward** / **Glyph** — quick protective magic |
| Ambient type (doc 03, optional) | **Omen** / **Weather** |
| Opening a pack | Recovering a **Satchel** / **Page-bundle** of lost pages |
| Disenchanting a card | **Tearing** / **Burning** a page → essence |
| Crafting a card | **Scribing** / **Transcribing** a new page |
| Crafting mats (colour) | **Runes** (red/green/blue) |
| Crafting mats (misc loot) | **Reagents** — twigs, caterpillars, crystals, feathers |
| Soft currency | **Gold** (earned from wins) |
| Progression | Your rank on the road to **Wizard** |

Keeping this dictionary consistent across UI, store, and story is most of what makes
the game *feel* like an RPG rather than a card spreadsheet.

## Story mode (as described, endorsed)

Still images + scrolling text, defeat the Blight, earn cards/recipes. This is the
right scope for a first version and does triple duty:

- **Tutorial** — the hardest thing to teach is the *double RPS + reactions*; a
  scripted PvE run can introduce one layer at a time.
- **Lore delivery** — the shattered-tome premise pays off as you recover pages.
- **Economy on-ramp (P4)** — story rewards give **recipes** and **starter reagents**
  so a new/free player can *scribe* a real deck without spending (doc 07).

Design note: make each story **zone** a colour region (Emberkin peaks, Thornkin
wood, Tidekin coast) so the three-peoples lore and the three-colour mechanics teach
each other.

## Open naming questions (for you)

1. Species name: **Tomelings** (★) or something else?
2. People suffix: `-kin` (Emberkin/Thornkin/Tidekin) — yes/no, and Thornkin vs
   Leafkin, Tidekin vs Rimekin?
3. Product/tome name: keep **Tome**, or name the in-world book something distinct so
   "Tome" stays the app and the book has its own name?
