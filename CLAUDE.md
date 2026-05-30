# ADLER Wohndesign — Projekt-Brief (für Claude Code)

Statische Website für **ADLER Wohndesign** (Raumausstatter & Innenarchitektur, Berlin-Charlottenburg).
Sprache: **Deutsch (Sie-Form)**. Design: Franzi (Figma). Umsetzung: **Astro**, Hosting: **Cloudflare Pages**.

## Stack & Struktur
- **Astro** (statisch) · **Vanilla CSS + Design-Tokens** (kein Tailwind)
- `src/styles/global.css` — **Design-Tokens (KANONISCH)**: Farben, Typo-Skala, Spacing. Immer Tokens/Utility-Klassen nutzen, **keine** hartkodierten Farben/Größen.
- `src/components/` — wiederverwendbare Komponenten (Header, Footer, …). **Vor dem Bauen prüfen, ob es die Komponente schon gibt.**
- `src/pages/` — eine `.astro`-Datei = eine URL.
- `public/images/` — Bilder/Assets.

## Design-Quelle — WICHTIG
- **Kanonische Figma-Datei: V4**, fileKey **`AryB7Db9AeJFgXmfBEsvpn`**. Nur diese nutzen.
  Es existieren veraltete Varianten (V2, „ohne Version") → ignorieren.
- **Figma ist die alleinige Wahrheit. 1:1 umsetzen. Keine eigenen Design-Entscheidungen.** Abweichung nur, wenn absolut technisch notwendig — und dann ansagen.
- **Tokens (Typo/Spacing/Farben) NUR aus `get_design_context`/`get_variable_defs`-Variablen des jeweiligen Seiten-Frames.** NICHT aus der „Typography"-Style-Guide-Tafel und NICHT von Screenshots ablesen — die Tafel widerspricht den echten Seiten-Variablen.
- **Maßgebliche Typo — alle aus Seiten-Variablen verifiziert (2026-05-30):**
  - Desktop (≥1024): H1/H2 60/82 · H3 36/52 · H4 24/34 · H5 16/25 · Body 15/27 · Titel 11/21 · Small 12/22
  - Tablet (768–1023): H1/H2 44/58 · H3 32/46 · H4 22/32 · H5 15/24 · Body 14/25 · Titel 10/18 · Small 11/19
  - Mobil (<768): H1/H2 36/50 · H3 28/40 · H4 20/30 · H5 14/23 · Body 13/24 · Titel 9/17 · Small 10/18
  - Schriften: **Playfair Display** (H1–H3 Medium) + **Montserrat** (Rest). H4/H5 weight 500.
- **Sektions-Padding ist im Design asymmetrisch** (Desktop-Standardsektion: oben `XXL` 222, unten `XL` 142; Tablet 164/104; Mobil 120/72) — nicht blind symmetrisch bauen.
- **Layout-Stufen je Breakpoint (Variablen):** Margin Desktop 80 / Tablet 32 / Mobil 24 · Gutter 32/24/16. (Aktuell global per `clamp()` — exakte Stufen ggf. nachziehen.)

## So baust du eine neue Seite (Playbook)

### ⛔ GATE 0 — Design-Quelle klären, BEVOR gebaut wird (Pflicht, kein stilles Ausweichen)
**Standardweg ist IMMER `get_design_context`. Der Inhaber wählt den Frame gern aus — also aktiv darum bitten, nicht darauf verzichten.** Screenshot-Modus ist die seltene Ausnahme, nie der Default.
1. Inhaber aktiv bitten: **Seiten-Frame in Figma-Desktop (V4) auswählen.** (Ist für ihn kein Aufwand.)
2. **`get_design_context` (+ `get_variable_defs`) ZUERST aufrufen** → echte Tokens, Farben, Spacing, Asset-Export-URLs.
3. Fehler **„nothing selected"** → **STOPP. Erneut um Auswahl bitten**, NICHT heimlich auf Screenshot umsteigen.
   Auf diesem Seat brauchen `get_design_context`/`get_variable_defs` eine **Live-Auswahl** (siehe Memory `figma-connector-limitations`).
4. Screenshot-Modus (`get_screenshot` + `get_metadata`) NUR, wenn der Inhaber ihn **ausdrücklich** wählt — und vorher laut ansagen, was dadurch ungenau wird (Bilder = Platzhalter · Farben/Spacing evtl. ab).

### Bauen
5. Assets nach `public/images/<seite>/` laden (echte Exporte aus design_context; im Screenshot-Modus Platzhalter + als solche benennen).
6. Seite in `src/pages/<name>.astro` bauen: Header/Footer + **vorhandene** Komponenten + Tokens. Neue wiederkehrende Bausteine als Komponente in `src/components/` anlegen.
   - **Sektions-Hintergrund pro Block explizit setzen** (`Cta`/`Section` `bg=`: weiß=`default`, grün=`moos`, beige=`nature`) und **gegen das Figma-Bild prüfen** — Komponenten-Default NICHT blind übernehmen.
   - **Keine runden Ecken** an Karten/Bildern; Radius nie aus dem Figma-Knotentyp `rounded-rectangle` ableiten.

### Prüfen & Abnahme-Meldung (jedes Mal)
7. `npm run dev` / Claude-Preview — **Desktop UND Mobil**. Pro Sektion visuell gegen Figma abgleichen (nicht nur Gesamt-Screenshot).
8. `npm run build` muss fehlerfrei sein.
9. **Abnahme-Dreisatz an den Inhaber melden:** (a) Tokens-Quelle = `design_context` ODER `screenshot` · (b) welche Bilder echt/Platzhalter · (c) Sektions-Hintergründe geprüft.
10. Deploy (nur mit Cloudflare-Zugang): `npm run build && npx wrangler pages deploy dist --project-name=adler-wohndesign-website --branch=main`

## Konventionen / Regeln
- Deutsch, Sie-Form. Semantisch + barrierefrei: ein `<h1>` pro Seite, `alt`-Texte, `lang="de"`, sichtbarer Fokus, guter Kontrast.
- **Schriften selbst hosten** — NICHT vom Google-CDN laden (DSGVO/Abmahn-Risiko). ⚠️ *Aktuell noch CDN — offener Punkt, vor Launch fixen.*
- Mobile-first. Breakpoints: Mobil < 768 · Tablet 768–1023 · Desktop ≥ 1024.
- Bilder: `object-fit: cover`, große Dateien optimieren.
- **Kontaktformular:** Web3Forms (Access-Key als Umgebungsvariable, kein eigenes Backend). Alternative: Cloudflare-Worker + E-Mail-API. DSGVO: Hinweis in Datenschutzerklärung + AVV.
- Pre-Launch-Checkliste: siehe `README.md`.

## Infrastruktur
- **GitHub:** `Urberliner/adler-wohndesign-website` (Branch `main`)
- **Cloudflare Pages:** Projekt `adler-wohndesign-website` → https://adler-wohndesign-website.pages.dev
- Deploy aktuell **manuell** via Wrangler. Auto-Deploy-bei-Push noch nicht eingerichtet (braucht GitHub↔Cloudflare-Freigabe durch den Inhaber).
- **CMS (geplant): Sanity** — für Projekte, Blog, editierbare Texte.

## Offene Punkte
- [ ] Design-Tokens final auf V4 vereinheitlichen (`global.css`)
- [ ] Komponentenbibliothek aus V4 ausbauen (Button, Card, Benefit, Quote, Section, Typo)
- [ ] Schriften self-hosten (Google-CDN entfernen)
- [ ] Sanity-CMS einbauen
- [ ] Kontaktformular implementieren
- [ ] Restliche Seiten aus V4 bauen
