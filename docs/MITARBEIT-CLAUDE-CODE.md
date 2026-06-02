# Mitarbeit am ADLER-Projekt mit Claude Code (zu zweit)

Kurzanleitung, wie wir beide am Projekt arbeiten — ohne uns gegenseitig Dateien zu überschreiben.

## ⛔ Grundregel: Arbeitsbereich AUSSERHALB von iCloud
macOS synct **`~/Desktop` und `~/Documents` standardmäßig in iCloud**. Ein Code-Projekt dort
(`node_modules`, `.git`) führt zu Sync-Chaos, kaputten Binärdateien und Konflikten — und auch
**keine** gesynkten Netz-/Cloud-Ordner (z. B. geteilte Volumes).

➡️ Projekt **lokal** anlegen, z. B. unter **`~/Code/`** oder **`~/dev/`** (im Home, NICHT Desktop/Documents).

## Einmal einrichten (lokal)
```bash
mkdir -p ~/Code && cd ~/Code
git clone -b V4 https://github.com/Urberliner/adler-wohndesign-website.git
cd adler-wohndesign-website
npm install          # lädt die Abhängigkeiten (einmalig / bei Paket-Änderungen)
npm run dev          # Vorschau-Server → http://localhost:4321 (Live-Reload)
```
Optional (nur wenn du Daten neu aus Figma ziehst): eigene `.env` mit `FIGMA_TOKEN=…` anlegen.
**Niemals committen** — `.env` ist gitignored. Jeder nutzt seinen **eigenen** Token.

## Gemeinsam arbeiten — Git-Workflow
- **Nie direkt auf `main`.** Aktueller Entwicklungsstand ist Branch **`V4`** (bzw. der laufende PR).
- **Vor der Arbeit:** `git pull` (neuesten Stand holen).
- **Eigener Branch je Aufgabe:** `git checkout -b feature/<thema>`.
- Arbeiten → `git add -A && git commit -m "…"` → `git push -u origin feature/<thema>`.
- Auf GitHub **Pull Request** öffnen → kurz gegenseitig reviewen → mergen.
- So führt Git beide Stände sauber zusammen; niemand überschreibt den anderen.

## Zuerst lesen (Projektregeln)
- **`CLAUDE.md`** — verbindlich: Figma V4 ist die alleinige Design-Wahrheit; Werte **nur** aus
  `get_design_context`/`get_variable_defs` (keine Screenshot-Rekonstruktion); **immer S/M/L**;
  keine runden Ecken; Breakpoints 701/992; Sie-Form.
- **`RUECKFRAGEN-FRANZI.md`** — offene Design-/Inhaltsfragen.
- **`docs/UEBERGABE-FRANZI.md`** — Übergabe-Notizen.

## Reviews ohne Terminal
Für reines Anschauen gibt es eine **Cloudflare-Preview-URL** (Branch-Deploy) — Link kommt vom
Projekt-Owner. Dann musst du nicht lokal bauen, um den aktuellen Stand zu sehen.

---

## 🟢 Starter-Prompt für Claude Code (Franzi: 1:1 in Claude Code einfügen)

> Richte mir bitte einen lokalen Arbeitsbereich für das ADLER-Wohndesign-Projekt ein.
> **Wichtig: außerhalb von iCloud** — also NICHT in `~/Desktop` oder `~/Documents` (die syncen in iCloud),
> sondern unter `~/Code/`.
> Schritte:
> 1. `mkdir -p ~/Code && cd ~/Code`
> 2. Klone das Repo (Branch V4): `git clone -b V4 https://github.com/Urberliner/adler-wohndesign-website.git`
> 3. `cd adler-wohndesign-website && npm install`, dann `npm run dev` und nenne mir die lokale URL.
> 4. Lies anschließend `CLAUDE.md`, `docs/MITARBEIT-CLAUDE-CODE.md` und `RUECKFRAGEN-FRANZI.md`,
>    damit du die Projektregeln und unseren Git-Workflow kennst.
> Arbeite **nie direkt auf `main`** — lege für Änderungen Feature-Branches an und öffne Pull Requests.
> Halte dich strikt an die Regeln in `CLAUDE.md` (Figma V4 als alleinige Wahrheit, nur strukturierte
> Figma-Daten statt Screenshots, immer S/M/L, keine runden Ecken).

**Voraussetzungen für Franzi:** Zugriff auf das GitHub-Repo `Urberliner/adler-wohndesign-website`
(als Collaborator einladen) und Git/Node installiert. Für eigene Figma-Datenabfragen einen eigenen
Figma-Token (read-only) in eine lokale `.env`.
