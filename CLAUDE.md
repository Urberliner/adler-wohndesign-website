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
  Es existieren veraltete Varianten (V2, „ohne Version") mit **abweichender Typo-Skala** → ignorieren.
- **Farben sind in allen Dateien identisch.** Maßgeblich für Typo ist V4 (große Skala: H1 64/88, Body 18/32, Titel 14px).
- Schriften: **Playfair Display** (H1, H3) + **Montserrat** (Rest).

## So baust du eine neue Seite (Playbook)
1. In Figma (V4) den Seiten-Frame **auswählen** (nötig für die nächsten Tools).
2. `get_design_context` auf den Frame → liefert Inhalt, Layout, Asset-Download-URLs, Token-Namen.
3. Assets nach `public/images/<seite>/` laden (z. B. via `curl`).
4. Seite in `src/pages/<name>.astro` bauen: Header/Footer + **vorhandene** Komponenten + Tokens. Neue wiederkehrende Bausteine als Komponente in `src/components/` anlegen.
5. Prüfen: `npm run dev` → http://localhost:4321 (oder Claude-Preview). **Desktop UND Mobil** ansehen.
6. `npm run build` muss fehlerfrei sein.
7. Deploy (nur mit Cloudflare-Zugang): `npm run build && npx wrangler pages deploy dist --project-name=adler-wohndesign-website --branch=main`

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
