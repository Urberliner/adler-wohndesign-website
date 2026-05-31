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
**Frage 4b:** Welche **Header-Höhe auf Mobil**? Im Mockup wirkt die Statusleiste wie ~64px,
das echte Menü ist aber 96px hoch. Bitte Soll-Höhe der Mobil-Navigation bestätigen.

---

## 5. Bilder
Alle neuen Bausteine (Hero-Image, image-text, Service-Karten, Übersicht) sowie die
Startseite nutzen aktuell **Platzhalter** (recyceltes Foto).

**Frage:** Sind die finalen Bilder schon in Figma exportierbar, oder kommen sie separat?

---

## Hinweise (keine Rückfrage, nur zur Info)
- **Aufbau-Accordion** (Startseite): „neue Card öffnet → vorherige schließt; Start: alle zu" → **umgesetzt**.
- **Blog-Quadrat-Karten**: „Hover-Zoom im Bildrahmen" → **umgesetzt**.
- Diese Startseiten-Änderungen sind gebaut, aber **noch nicht im Browser final geprüft**
  (Preview-Server hing) und **noch nicht committet**.
