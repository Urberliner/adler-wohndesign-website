# Komponentenbibliothek — ADLER Wohndesign

Alle Bausteine 1:1 aus Figma V4 (`AryB7Db9AeJFgXmfBEsvpn`). Tokens (Farben/Typo/Spacing/Breakpoints)
liegen zentral in `src/styles/global.css`. Icons als echte SVG-Exporte in `src/icons/`.

**Konvention:** Vor dem Neubau prüfen, ob eine Komponente schon existiert. Werte nur aus
`get_design_context`/`get_variable_defs` des Seiten-Frames — nicht aus der Style-Guide-Tafel.

---

## Layout & Struktur

| Komponente | Zweck | Wichtige Props | Figma | Status |
|---|---|---|---|---|
| `Section.astro` | Abschnitts-Wrapper: vertikaler Rhythmus, BG-Varianten, Container | `bg` (default/moos/nature), `pad` (section/even/tight/none), `center`, `flow`, `container` | — | ✅ in Nutzung |
| `../layouts/Einzelleistung.astro` | Wiederverwendbare Seitenvorlage für Einzelleistungen (Hero · Aufbau · Partner · Zitat · Related · Kontakt) | siehe Datei-Kopf | 12272:28264 | ✅ → `/services/vorhaenge` |

## UI-Elemente

| Komponente | Zweck | Wichtige Props | Figma | Status |
|---|---|---|---|---|
| `Button.astro` | Pill-Button (bronze) | `href`, `variant` (primary/ghost), `icon`, `iconPosition`, `iconOnly`, `label` | 2088:4677 | ✅ in Nutzung |
| `Icon.astro` | Icon-Registry, lädt echte SVGs aus `src/icons/` (currentColor) | `name`, `size`, `label` | 6319:51565 (32 Icons) | ✅ in Nutzung |

## Formular-Elemente (currentColor → auf moos & weiß nutzbar)

| Komponente | Zweck | Wichtige Props | Figma | Status |
|---|---|---|---|---|
| `Input.astro` | Unterstrich-Eingabefeld (Text oder Textarea) | `name`, `label`, `type`, `placeholder`, `required`, `textarea`, `rows` | 2088:4684 | ✅ Kontakt |
| `Checkbox.astro` | Eckige Box, bronze bei Auswahl; Label via slot | `name`, `required`, `checked` | 2088:4697 | ✅ Kontakt |
| `Upload.astro` | „Dateien hochladen" + File-uploaded-State (bronze Balken + X) | `name`, `label`, `buttonText`, `multiple` | 2475:4367 / 8022:19199 | ✅ Kontakt |

## Inhalts- & Kartenblöcke

| Komponente | Zweck | Wichtige Props | Figma | Status |
|---|---|---|---|---|
| `Card.astro` | Bild-Link-Karte (Projekt/Blog/Kategorie) | `href`, `image`, `alt`, `eyebrow`, `title`, `ratio` | Card Link (2732:5937) | ✅ in Nutzung |
| `ReviewCard.astro` | Kundenstimme (Sterne + Name + Quelle + Zitat) | `name`, `source`, `stars` | Card Review (2907:6419) | ✅ Startseite |
| `Benefit.astro` | Icon + kurzer Vorteilstext (`<li>`) | `icon` | Fact type=benefit | ✅ Komplettlösung |
| `Quote.astro` | Zentriertes Kundenzitat mit Pfeilen | `author`, `arrows`, `bg` | 12272:28295 | ✅ in Nutzung |
| `Accordion.astro` | Aufklappliste (natives `<details>`, kein JS) | `items`, `name`, `openFirst`, `dividers` | Card Information | ✅ in Nutzung |
| `Cta.astro` | Kontakt-/Abschluss-Block (Titel · Headline · Lead · Button) | `over`, `heading`, `lead`, `buttonLabel`, `buttonHref`, `bg` | 12242:22473 | ✅ in Nutzung |

## Navigation

| Komponente | Zweck | Figma | Status |
|---|---|---|---|
| `Header.astro` | Nav-Bar + Desktop-Mega-Menü + mobiles Vollbild-Overlay + Scroll-Motion | 5152:4275 / 5163:9757 / 5658:12572 | ✅ in Nutzung |
| `Footer.astro` | Footer (Kontakt-Info · 4 Spalten · Social · madebyfranzi) | 5427:10429 | ✅ in Nutzung |

---

## Noch nicht gebaut (Spezifikation erfasst, Einsatzort folgt mit der jeweiligen Seite)

Diese Figma-Bausteine sind dokumentiert, aber bewusst noch nicht implementiert — sie gehören zu
Seiten/Funktionen, die noch nicht existieren (Projekte-/Blog-Übersicht, Farrow & Ball „Meine Farben").
Erst im Seitenkontext bauen, nicht auf Vorrat raten.

- **Search** (6088:41966) — Pill-Suchfeld, Lupe links, X zum Leeren → Header-Suche / Übersichtsseiten
- **Text Input Field / Anmerkung** (12454:25699) — Pill-Feld mit Label, optional Chevron (Dropdown)
- **Funktionen / Liste** (12524:24208) — „Liste umbenennen" + Drucker-Icon → F&B „Meine Farben"
- **List My Color** (12506:20106) — Merkliste öffnen/hinzufügen → F&B
- **Filter menu** (2238:3677) + **Filter tab** (5333:8693) — Filter für Projekte/Blog
- **Button-function** (12416:36802) — Favorit/Add → F&B
- **Navigation Display** (2907:7130) — Karussell-Punkte (Review-/Related-Karussell)

