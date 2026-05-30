# Übergabe an Franzi

Stand: 30.05.2026. Ziel: Franzi baut die Website mit **Claude Code** Seite für Seite aus den Figma-Dateien (V4) weiter.

## Was schon steht
- **Astro-Projekt** mit Design-Tokens (`src/styles/global.css`), Komponenten `Header`/`Footer`.
- **Beispielseite** `/komplettloesung` (aus Figma gebaut, als Arbeitsprobe).
- **GitHub:** https://github.com/Urberliner/adler-wohndesign-website
- **Live (Cloudflare):** https://adler-wohndesign-website.pages.dev
- Projekt-Brief & Konventionen: `CLAUDE.md` (lädt Claude Code automatisch).

## Zugänge für Franzi — von marco direkt vergeben
> ⚠️ **Passwörter/Tokens NIE per Chat oder im Repo teilen.** Alles über die Einladungsfunktion der Plattformen.

- [ ] **GitHub:** Franzi als *Collaborator* einladen (Repo → Settings → Collaborators).
- [ ] **Cloudflare:** Franzi als *Member* zum Account/Projekt einladen (nur falls sie selbst deployen soll).
- [ ] **Figma V4** (`AryB7Db9AeJFgXmfBEsvpn`): hat sie als Erstellerin. Für `get_design_context` ist ein **Figma Dev/Full-Seat** empfehlenswert.
- [ ] **Claude Code:** auf Franzis Rechner installiert, **Figma-Connector** verbunden.
- [ ] **Web3Forms / Sanity:** Accounts werden beim jeweiligen Schritt angelegt (Keys dann als Umgebungsvariablen, nicht ins Repo).

## Einrichtung auf Franzis Rechner
```bash
git clone https://github.com/Urberliner/adler-wohndesign-website.git
cd adler-wohndesign-website
npm install
npm run dev            # http://localhost:4321
# nur falls sie deployen soll:
npx wrangler login     # mit Cloudflare-Zugang
```

## Anfangs-Prompt für Franzis Claude-Code-Sitzung (zum Kopieren)
```
Lies zuerst CLAUDE.md und README.md in diesem Projekt – sie enthalten Stack, Konventionen
und das Playbook „So baust du eine neue Seite“.

Kontext: Wir bauen die Website von ADLER Wohndesign in Astro weiter und deployen auf
Cloudflare Pages. Die kanonische Design-Quelle ist die Figma-Datei V4
(fileKey AryB7Db9AeJFgXmfBEsvpn) – nur diese verwenden.

Erste Aufgabe: <hier die konkrete Seite/Aufgabe nennen, z. B. „Baue die Startseite“>.
Vorgehen: Ich wähle den passenden Frame in Figma aus; du ziehst ihn per get_design_context,
lädst die Assets nach public/images/, und baust die Seite mit den vorhandenen Komponenten
und Tokens. Danach lokal (Desktop + Mobil) prüfen, dann zeigst du mir das Ergebnis.

Halte dich strikt an die Tokens in global.css und nutze bestehende Komponenten,
bevor du neue anlegst.
```

## Arbeitsweise (das Wichtige in Kurz)
1. In Figma (V4) den Frame **auswählen** → Claude zieht ihn per `get_design_context`.
2. Bauen mit **vorhandenen Komponenten + Tokens** (nicht neu erfinden).
3. **Lokal prüfen** (Desktop + Mobil), dann committen/pushen.
4. Deploy: `npm run build && npx wrangler pages deploy dist --project-name=adler-wohndesign-website --branch=main`

Details & Pre-Launch-Checkliste: `CLAUDE.md` und `README.md`.
