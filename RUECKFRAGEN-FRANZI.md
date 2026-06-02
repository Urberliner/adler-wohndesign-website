# Rückfragen & offene Punkte an Franzi

**Stand: 2026-06-01.** Figma V4 · fileKey `AryB7Db9AeJFgXmfBEsvpn`.
Umsetzungsstand: kompletter V4-Seitensatz gebaut, gegen Figma (S/M/L) geprüft, committet auf
Branch **`V4`** (Pull Request #1). Vorschau via Cloudflare-Preview-URL (kommt vom Owner).
Regel: Figma V4 ist die alleinige Design-Wahrheit; keine eigenen Design-Entscheidungen → daher diese Liste.

---

## A. Design-Entscheidungen (bitte bestätigen/korrigieren)

**A1 · Farrow & Ball – Seitenstruktur/Routing.** Der Frame „Mein Farbkonzept" (`12558:28525`) ist
inhaltlich eine Konzept-**Übersicht** (Karten + 3-Punkte-Menü), „Farbkonzepte" (`6034:34564` ff.)
eher eine Konzept-**Detailseite** („Einfache Grautöne") — die Navigation verlinkt es aber umgekehrt.
Wie ist die IA gedacht? Und **/tapeten** (Menüpunkt) hat **kein Design** bekommen.

**A2 · Zwei Projekt-Artikel-Templates.** Es gibt zwei verschiedene Artikel-Frames
(`5660:17423` und `10078:18204`). War das Absicht (zwei Varianten zur Auflockerung)? Aktuell ist
nur die erste als Template gebaut, die zweite **geparkt**.

**A3 · Projekt-/Listing-Galerie flexibel (war #9, jetzt umgesetzt — Freigabe nötig).** Auf deinen
Wunsch wurde die Projekt-Detail-Galerie **flexibel** gebaut (gemischte Formate, variable Anzahl
3–50, frei kombinierbar) statt der starren fünf Querformat-Bilder. Das ist eine **bewusste
Abweichung vom Frame**. Bitte den visuellen Ansatz freigeben/justieren.
(Listing-Raster generell = 12-Spalten-Grid, gemäß deiner Annotation „grid grid-cols-12 … Cards flexibel".)

**A4 · Service-Karten (text-cards) – Tablet-Spalten.** Frame „tablet, desktop" (`6319:53243`) zeigt
**2-spaltig**, die Dev-Notiz sagt „mobil+tablet vertikal" (= 1-spaltig). Gebaut: mobil 1 / tablet 2 /
desktop 2 (Frame). **Tablet 2- oder 1-spaltig?**

**A5 · Übersicht-Block (F&B-Spec) – Heading Tablet.** Mobil 28/40, Desktop 32/52 aus Frame; **Tablet
30/46 interpoliert** (kein eigener Tablet-Wert). Stimmt 30/46 oder gibt es einen festen Wert?

**A6 · Kontakt-Block – 160px-Abstand.** Notiz „bei new Category Abstand zu letztem Block/Footer auf
160px". Cta-Block ist auf allen Seiten geteilt. Aktuell **nicht angewandt**. Gilt das (a) nur
Kategorie-Seite, (b) auch Startseite, (c) global?

**A7 · Services – Teilleistungen: Linkliste vs. Karten.** Frame zeigt Bild + vertikale **Linkliste**;
Dev-Notiz sagt **Karten-Karussell** (desktop 4 / tablet 2 / mobil 1). Gebaut wie Frame (Linkliste).
Bleibt Linkliste oder echte Karten mit Vorschau? (Falls Karten: Card-Design + Inhalte nötig.)

**A8 · Eyebrow-/Kicker-Texte.** Stehen vielerorts noch auf dem Figma-Platzhalter „Service/Services"
(z. B. /team, /ueber-uns, F&B). Bitte die finalen Begriffe je Sektion.

**A9 · Startseite-Hero „Header + Bildschirm füllend".** Interpretiert als `100vh − Header (96px)`.
Korrekt so?

**A10 · Historie – Variante 2 (Animation).** Variante 1 ist gebaut; V2 mit der Animation ist
**zurückgestellt**. Soll sie noch umgesetzt werden (dann Motion-Detail klären)?

**A11 · Karussell-Navigation: Pfeile vs. Punkte.** Mehrere Karussells (Facts, Verantwortung,
Related-Artikel, Blog-Preview) sind mit **Punkt-Navigation** umgesetzt (vorhandene Carousel-Komponente);
einige Frames zeigen **Pfeil-Slider**. Pfeile gewünscht? → dann Pfeil-Variante der Komponente.

---

## B. Fehlende Inhalte / Assets (aktuell klar benannte Platzhalter)

- **Bilder** generell: Hero-Bilder, Projekt-/Blog-Bilder (Projekt/Blog teils echt aus Alt-Seite),
  F&B-Stimmungsbilder, Historie-Scans, **Partner-Logos**, **GDA-Award-Logo**, ueber-uns/Karriere-Bilder.
- **Hero-Video** für Services/Komplettlösung („Emotionen aufbauen") — Datei fehlt.
- **Detail-Fließtexte:** Projekt-**Beschreibungen** und Blog-**Artikeltexte** (die Listen der Alt-Seite
  hatten keine; nur per Tiefen-Fetch der Detailseiten zu holen — auf Wunsch mache ich das).
- **Team-Bios:** aktuell **sinngemäß/gekürzt** (nicht wortgleich). Name/Rolle/Zitat/„Meine Farbe" sind echt.
- **Kennzahlen** der „In Zahlen"-Sektion (/ueber-uns) — echte Werte fehlen.
- **F&B-Farben:** Namen/Nummern/Hex sind **echt (302)**; die Spezifikationen pro Farbe (Finish,
  ergänzender Weißton etc.) sind noch Platzhalter.

---

## C. Folgeaufgaben (Funktion / CMS)

- **Filter / Sortierung / Favoriten / „Mein Farbkonzept"** sind **presentational** (nur Client-Toggle,
  keine echte Logik/Persistenz). Echte Filterung + Speicherung via localStorage und/oder **Sanity-CMS**.
- **Dynamische Routen:** **Blog ist seit Phase 1 an Sanity angebunden** (live, statisch + Build-Zeit-GROQ). **Projekte & Farben** laufen weiterhin aus `src/data/*.json` → Anbindung in Phase 2/3 (siehe `docs/STRATEGIE-ENTSCHEIDUNGEN.md`).
- **Kontaktformular:** funktionsfähig (Web3Forms); der Key `PUBLIC_WEB3FORMS_KEY` muss als
  **Umgebungsvariable** gesetzt werden (sonst sendet das Formular nicht).
- **Google Maps:** DSGVO-konform per Klick-zum-Laden (schlüsselloser Embed). Offen: Anbindung an ein
  zentrales **Consent-Tool** / ggf. eigener Maps-API-Key.
- **Text-Link-Button-Variante** (borderloser Text + Pfeil, z. B. Blog-Featured-CTA) als Komponente,
  falls das Muster öfter vorkommt.

---

## D. Erledigt / zur Info (keine Rückfrage)

- **#9 Listing-Card-Layout geklärt:** via Annotation „grid grid-cols-12 … flexibel" → 12-Spalten-Grid
  umgesetzt; Projekt-Galerie flexibel (siehe A3).
- **Mobil-Overflow** großer Serif-Überschriften systemisch behoben (Umbruch/Silbentrennung).
- **19 Seiten + dynamische Detailrouten** (302 Farb-, 26 Projekt-, 25 Blog-Seiten) gebaut, gegen Figma
  geprüft, committet.
- **Echte Inhalte** übernommen: 302 F&B-Farben (+ Hex), 26 Projekte, 25 Blogbeiträge, aktuelles Team
  (Kimberly Hart entfernt).
- **Kontakt** an V4 angeglichen (Formular erhalten), **Google Maps** DSGVO-konform ergänzt.
- Startseite-Hero, Aufbau-Accordion (exklusiv), Blog-Hover-Zoom, Services-Seite → umgesetzt & committet.
- **Breakpoints** kanonisch 701/992; **keine runden Ecken**; **Schriften self-hosted** (DSGVO ✅).
