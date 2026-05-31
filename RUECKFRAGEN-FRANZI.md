# Rückfragen an Franzi

Offene Design-Entscheidungen, die ich beim Umsetzen **nicht** allein treffen möchte
(Regel: keine eigenen Design-Entscheidungen). Bitte je Punkt kurz bestätigen oder korrigieren.

Figma V4 · fileKey `AryB7Db9AeJFgXmfBEsvpn`.
Stand: 2026-05-31.

---

## 1. Service-Karten (text-cards) — Spaltenzahl auf Tablet
**Konflikt zwischen Frame und Notiz.**
- Der Frame heißt **„tablet, desktop"** (node `6319:53243`) und zeigt die Karten **2-spaltig**.
- Die Entwicklungs-Notiz am Karten-Container sagt aber **„Anpassung bei mobil+tablet – vertikale Anordnung"** (= 1-spaltig).

→ Aktuell gebaut: **mobil 1 · tablet 2 · desktop 2** (ich bin dem Frame gefolgt).
**Frage:** Soll Tablet **2-spaltig** (wie Frame) oder **1-spaltig** (wie Notiz) sein?

---

## 2. Übersicht-Block (Farrow & Ball Spec) — Überschriftgröße auf Tablet
- Mobil (`6416:21276`) und Desktop (`6416:21314`) sind aus echten Frame-Variablen gebaut:
  Überschrift **Montserrat Medium**, mobil 28/40 → desktop 32/52.
- Für **Tablet** habe ich **30/46 interpoliert** (kein eigener Tablet-Wert geprüft).

**Frage:** Stimmt 30/46 für Tablet, oder gibt es einen festen Wert im Tablet-Frame?

---

## 3. Kontakt-Block — Abstand 160px
Notiz am Kontakt/Text-Container (Startseite Desktop + im Kategorie-Kit):
> „Bei Text Container **new Category**, Abstand zu letztem Block und Footer erhöhen auf **160px**."

- Die Notiz nennt ausdrücklich **„new Category"** — also die Kategorie-Seite, nicht die Startseite.
- Der Kontakt-Block (`Cta`-Komponente) wird **auf allen Seiten geteilt** (Startseite, Komplettlösung, Services, Vorhänge).

→ Aktuell **nicht angewandt** (abwartend).
**Frage:** Gilt die 160px-Regel
- (a) nur für die Kategorie-Seite,
- (b) auch für die Startseite, oder
- (c) global für alle Kontakt-Blöcke?

---

## 4. Startseite-Hero — „Header und Bildschirm füllend"
Notiz auf allen drei Startseiten-Frames (Desktop `12242:22419`, Tablet `12242:22501`, Mobil `12242:22576`).

→ Verstanden als: Hero füllt **einen Viewport abzüglich Header-Höhe** (`100vh − Header`).
→ So gebaut: Header 96 (Desktop/Tablet) / Mobil offen (siehe 4b).

**Frage 4a:** Richtig interpretiert (Hero = voller sichtbarer Bereich unter dem Header)?
**Frage 4b:** ~~Header-Höhe Mobil?~~ **Geklärt:** Header ist auf allen Breakpoints 96px (im
Browser gemessen); die ~64px im Mockup waren die OS-Statusleiste. Umgesetzt: `calc(100vh − 96px)` überall.

---

## 5. Bilder
Alle neuen Bausteine (Hero-Image, image-text, Service-Karten, Übersicht) sowie die
Startseite nutzen aktuell **Platzhalter** (recyceltes Foto).

**Frage:** Sind die finalen Bilder schon in Figma exportierbar, oder kommen sie separat?
(Betrifft auch das **Services-Hero-Video**, s. #7.)

---

## 6. Services — Teilleistungen: Linkliste vs. Karten (Frame ↔ Notiz)
Services-Seite (`12307:37383` ff.). **Konflikt:**
- Der **gezeichnete Frame** zeigt je Kategorie: Bild links + **vertikale Linkliste** rechts (7 „Card Link"-Zeilen: Label H4 + Pfeil).
- Die **Entwicklungs-Notiz** an jeder Kategorie sagt dagegen: „Anordnung: desktop **4 in einer Reihe** (mehrere Reihen), tablet **2 Cards** (horizontal scrollen), mobil **1 Card** (horizontal scrollen)" + Design-Notiz „**Individuelle & größere Vorschau**".

→ Aktuell gebaut: **wie der Frame** (Bild + vertikale Linkliste, Pfeil = `arrow_upward` 90°, bronze; Desktop/Tablet 2-spaltig Bild|Liste, Mobil gestapelt). Regel „Frame gewinnt".
**Frage:** Bleibt es die Linkliste (Frame), oder sollen es echte **Karten mit Bild/Vorschau** im 4/2/1-Karussell werden (Notiz)? Falls Karten: brauche ich das Card-Design + echte Inhalte.

## 8. Farrow & Ball — Color-Navigation + „Mein Farbkonzept"-Favoriten (presentational gebaut)
Für den F&B-Bereich gibt es bislang **keine Seiten/Routen und keine echten Farbdaten**. Die
Komponenten sind daher **presentational** mit Platzhalter-Props gebaut und **keiner Seite zugebunden**:
- `ColorNavigation.astro` — prev/„Zur Übersicht"/next (Figma „Navigation Color" 12471:27030,
  desktop/tablet 12471:27029 · mobil 12471:27031). Farbname-Hover = Unterstrich + Farbwechsel
  (Franzi-Notiz). Pfeil = `arrow_upward` 90°/-90° (wie Frame, kein bronze Kreis), Swatch 22px,
  Titel-Style, gap 14, py 14.
- `FavoriteButton.astro` — runder Icon-Button 32px, natur-Hintergrund, Herz outline↔filled
  (aria-pressed), `variant="add"` = Plus (Figma „Button-function" 12416:36802).
- `ColorListItem.astro` — „Mein Farbkonzept öffnen (n) →" (Herz-filled + Pfeil) und
  „Meinem Farbkonzept hinzufügen"/„Bereits in meinem Farbkonzept" (Herz-Button) — Figma
  „List My Color" 12506:20106.
- Neue Icons: `heart.svg` (outline) + `heart-filled.svg` (gefüllt), Material-Symbols-Stil.
- Konsistenz-Fix: das Text-Glyph `♥` in `ArticleOverview.astro` (`.ao-card__fav`) durch das echte
  `heart`/`heart-filled`-Icon ersetzt.

**Als Folgeaufgabe offen (mit echtem Produktinhalt → vorher abstimmen):**
- echte **F&B-Farbdaten** (Farbname, Nummer, echte Swatch-Hex-Werte, prev/next-Reihenfolge),
- **F&B-Seiten/Route** (Übersicht + Farbdetailseite) mit echtem Inhalt,
- **„Mein Farbkonzept"-Persistenz** (localStorage und/oder CMS) — aktuell nur Client-Toggle ohne Speicherung,
- Mengen-/Zähler-Logik („öffnen (n)") an echte gespeicherte Favoriten anbinden.

## 7. Services — Hero-Video & Card-Inhalte (bestätigt, zur Info)
- **Hero-Video**: Als `<video autoplay muted loop>` mit Poster-Bild (Platzhalter) gebaut — **Videodatei fehlt noch**. Bitte liefern (Franzi-Notiz: „fertige Komplettlösungen, Emotionen aufbauen").
- **Teilleistungs-Links** sind bei Stoffe/Boden/Wand/Einrichtung aktuell **Platzhalter** (dieselbe Gardinen-Liste wie im Frame, auf deinen Wunsch „Platzhalter wie Figma"). Echte Unterpunkte je Kategorie bitte nachliefern.
- **Chips-Labels**: Im Frame Platzhalter („Verantwortung" mehrfach) → ich nutze sinnvolle Sprung-Labels (Komplettes Wohnkonzept / Gardinen & Rollos / Stoffe / Boden / Wand / Einrichtung). OK so?
- **Tippfehler im Frame** („Raffrol**l**los", „Lamellenvor**hönge**") **nicht** übernommen — korrekte Schreibweise genutzt.

---

## Hinweise (keine Rückfrage, nur zur Info)
- **Aufbau-Accordion** (Startseite): „neue Card öffnet → vorherige schließt; Start: alle zu" → **umgesetzt & browser-verifiziert, committet**.
- **Blog-Quadrat-Karten**: „Hover-Zoom im Bildrahmen" → **umgesetzt & committet**.
- **Startseite-Hero** „Header+Bildschirm füllend" → **umgesetzt & committet** (`calc(100vh − 96px)`).
- **Services-Seite** an Frames angeglichen → **umgesetzt & browser-verifiziert** (Desktop+Mobil), noch **nicht committet**.
