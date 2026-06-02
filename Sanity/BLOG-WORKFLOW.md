# Blog-Workflow ADLER Wohndesign (Sanity)

Anleitung zum Prüfen, Freigeben und Veröffentlichen von Blogartikeln.
Letzter Stand: 02.06.2026 — Phase A abgeschlossen.

---

## Teil 1 — Für Franzi

**So prüfst und gibst du einen Blogartikel frei:**

### 1. Studio öffnen
Gehe auf **https://adler-wohndesign.sanity.studio/** und melde dich mit deiner
Einladungs-Mail an. (Marco lädt dich vorher ein — du bekommst eine E-Mail von
Sanity, einmal auf den Link klicken und Konto bestätigen.)

### 2. Den Artikel finden
Links in der Liste siehst du alle Blogartikel. Der zu prüfende Artikel heißt
aktuell **„Farrow & Ball richtig einsetzen: 3 Tipps vom Malermeister"** und steht
auf Status **„In Prüfung (Franzi)"**.

### 3. Lesen & korrigieren
Klick den Artikel an. Du kannst alles direkt bearbeiten:
- **Titel, Teaser, Artikeltext** — einfach reinklicken und tippen, wird automatisch gespeichert.
- **LinkedIn-Entwurf** — der fertige Text für den LinkedIn-Post, kannst du anpassen.
- **Bildbriefing** — Beschreibung, welches Foto zum Artikel passt (für später).

### 4. Freigeben
Wenn alles passt: im Feld **„Status"** von **„In Prüfung (Franzi)"** auf
**„Freigegeben"** umstellen.

### 5. Veröffentlichen
Dann unten rechts auf den **„Publish"**-Knopf klicken. Fertig. ✅

> Wenn du dir unsicher bist: lieber nur Status auf „Freigegeben" setzen und Marco
> kurz Bescheid geben, dann macht er das Publishen.

---

## Teil 2 — Für Marco (Hintergrund)

### Die 3 Status-Stufen
| Status | Bedeutung |
|---|---|
| `Entwurf (Claude)` | Frisch erstellt, noch nicht geprüft |
| `In Prüfung (Franzi)` | Liegt bei Franzi zum Gegenlesen |
| `Freigegeben` | Inhaltlich abgenommen |

Der Status ist nur ein **inhaltliches Label** — er steuert (noch) nichts automatisch.

### Zwei verschiedene Dinge — wichtig zu trennen
1. **Status „Freigegeben"** = inhaltlich ok (Label im Dokument).
2. **„Publish"-Knopf** = technisches Veröffentlichen in Sanity (Draft → Live-Version).

### ⚠️ Wichtiger Hinweis
Ein „Publish" in Sanity macht den Artikel **noch nicht auf der Website sichtbar.**
Dafür fehlt **Phase B** (Astro liest die Blog-Daten aus Sanity aus). Solange Phase B
nicht live ist, lebt der Blog nur im Sanity-Studio. Das ist erwartet — Phase A war
nur die Pipeline bis zur Freigabe.

### Zum Loslegen
1. **Franzi einladen:** manage.sanity.io → Projekt ADLER → **Members** →
   „Invite member" → Franzis E-Mail. Rolle **Editor** reicht (lesen, schreiben,
   publishen — aber keine Projekteinstellungen/Mitglieder ändern).
2. Franzi den Teil-1-Text schicken (oder diese Datei).
3. Einmal den Durchlauf testen: Sie gibt frei + published → Flow geprüft.

### Danach: Phase B
Astro Teil-SSR — braucht ein separates Go (neue Deps + Astro-Adapter + Deploy).

---

## Technische Eckdaten (Referenz)

- **Sanity-Projekt:** `hn079dlt`, Dataset `production` (EU/Belgien)
- **Studio (gehostet):** https://adler-wohndesign.sanity.studio/
- **Studio-Quellcode (lokal):** `~/Code/adler-sanity-studio`
- **Schreiben:** via Sanity-MCP (OAuth als Marco). API-Tokens sind auf diesem
  Projekt nur `read` → nicht zum Schreiben/Seeden geeignet.

### Geseedete Inhalte (Phase A, published)
- **Autor:** ADLER Wohndesign
- **Kategorien:** Handwerk, Farrow & Ball, Inspiration, Events, Farbe & Raum
- **Test-Entwurf:** Slug `farrow-and-ball-richtig-einsetzen`, Status `review`
  (noch nicht published — wartet auf Franzis Freigabe)
