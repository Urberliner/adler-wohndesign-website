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
- **BEI KONFLIKT GEWINNT IMMER DER ECHTE SEITEN-FRAME / das echte Figma-Design — niemals die Stil-Tafel.** (Bestätigt vom Inhaber 2026-05-30.) Beispiel: Desktop-Typo = Seitenwerte (H1 60/82, Body 15/27, klein), NICHT die Tafel (64/88, 18/32, groß). Im Zweifel den Seiten-Frame als Quelle nehmen, nicht den Style-Guide.
- **Breakpoints (aus Figma-Grid-Frames, verbindlich):** Mobil **320–700** · Tablet **701–991** · Desktop responsiv **992–1760** · Desktop fix **ab 1760**. CSS-Grenzen: `max-width:700` / `min-width:701` und `max-width:991` / `min-width:992`. (NICHT 768/1024.)
- **Maßgebliche Typo — alle aus Seiten-Variablen verifiziert (2026-05-30):**
  - Desktop (≥992): H1/H2 60/82 · H3 36/52 · H4 24/34 · H5 16/25 · Body 15/27 · Titel 11/21 · Small 12/22
  - Tablet (701–991): H1/H2 44/58 · H3 32/46 · H4 22/32 · H5 15/24 · Body 14/25 · Titel 10/18 · Small 11/19
  - Mobil (≤700): H1/H2 36/50 · H3 28/40 · H4 20/30 · H5 14/23 · Body 13/24 · Titel 9/17 · Small 10/18
  - Schriften: **Playfair Display** (H1–H3 Medium) + **Montserrat** (Rest). H4/H5 weight 500.
- **Sektions-Padding ist im Design asymmetrisch** (Desktop-Standardsektion: oben `XXL` 222, unten `XL` 142; Tablet 164/104; Mobil 120/72) — nicht blind symmetrisch bauen.
- **Layout-Stufen je Breakpoint (diskret — KEIN `clamp`):** Margin Desktop **80** / Tablet 32 / Mobil 24 · Gutter 32/24/16 · Content-max **1600**. (Margin 80 aus echten Frames+Variablen gemessen; Franzis handschriftliche 96-Notiz verworfen 2026-05-31 — Regel „Frame gewinnt".)

## So baust du eine neue Seite (Playbook)

### ⛔ GATE 0 — Design-Quelle: immer echter Frame-Kontext, nie Screenshot-Schätzen
**Seit Full/Pro-Seat (2026-05-31) KEINE Auswahl-Pflicht mehr.** `get_design_context` + `get_variable_defs`
liefern für jeden `nodeId` Daten — der Inhaber muss **nichts** in Figma auswählen.
1. Inhaber gibt nur **node-id / Figma-Link**.
2. **`get_variable_defs` + `get_design_context` ZUERST** auf den Frame → echte Tokens, Farben, Spacing, Texte, Asset-Export-URLs. Das ist die **höchstwertige Quelle** — immer nutzen.
3. **NIE** auf Screenshot-Schätzen ausweichen. `get_screenshot`/`get_metadata` nur als Ergänzung (visuelle Kontrolle, Struktur-Überblick), nicht als Wert-Quelle.
4. **Assets** (Icons/Bilder) per **REST-API** exportieren (`/v1/images?format=svg|png`, Token) — echte Vektoren/Dateien statt Platzhalter.
5. Jeden kritischen Wert nach dem Bauen im Browser gegen Figma **verifizieren, BEVOR „fertig" gesagt wird.**

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
