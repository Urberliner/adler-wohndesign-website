# ADLER Wohndesign — Strategie & Entscheidungen

Stand: 2026-06-02. Lebendes Dokument: hier werden die verbindlichen Architektur- und
Vorgehens-Entscheidungen festgehalten, damit sie über Sessions/Tools hinweg stabil bleiben.
Hinweis: `docs/architektur-fanout/` gehört Codex (separate Planung) — dort NICHT reinschreiben.

---

## 1. Stack (GO von Marco, 2026-06-02)

**Sanity + Astro + Cloudflare + GitHub.**
- **Astro** — Website-Frontend, aktuell vollständig statisch (SSG).
- **Sanity** — Content Lake = die „Datenbank" für alle Inhalte (gehostet, EU/Belgien, DSGVO-ok).
- **Cloudflare Pages** — Hosting (+ später Functions fürs Backend).
- **GitHub** (`Urberliner/adler-wohndesign-website`) — Code, aktiver Branch `V4` (offener PR V4→main).
- **Figma** — Design-Quelle der Wahrheit.

---

## 2. Wo lebt was? (die wichtigste Trennung)

| Ebene | Inhalt | Ort | Wer pflegt |
|---|---|---|---|
| **Design**: Variablen/Tokens, Abstände/Spacing, Komponenten, Layout, Landingpage-Aufbau | Code, aus **Figma** abgeleitet | **GitHub** | Claude + Agenten |
| **Inhalt**: Texte, Bilder, Blog/Projekte/Farben | strukturierte Dokumente | **Sanity Content Lake** | Franzi (ohne Code) |
| **Bilder (Web)** | Asset mit Crop/Hotspot | **Sanity Assets** | Franzi |
| **Hosting + Backend** | Seiten, Funktionen | **Cloudflare** | Claude |

- Es gibt **keine klassische DB** — Sanity *ist* die Datenbank für Inhalte.
- **Design-Tokens** liegen als CSS-Variablen in `src/styles/global.css` (`:root`, responsive @701/992px). Figma-Wert ändern → propagiert global. Sync aktuell **manuell** (Figma→Code), kein Auto-Export.
- **Das CMS fasst Design NIE an.** `blockContent` ist bewusst eingeschränkt (kein color/font/size). Sanity füllt nur designgeschützte Hüllen mit Inhalt.
- Spätere App-/Transaktionsdaten (Formular-Leads, Favoriten) → **Cloudflare D1/KV**, NUR falls gebraucht (jetzt nicht).

---

## 3. Bild-Hosting (entschieden)

**Alle Web-Bilder in Sanity Assets** (Sanity `image`-Typ, `hotspot:true`, Pflicht-`alt`).
- Grund: Franzi braucht Crop/Fokuspunkt + freie Reihenfolge + variable Mengen pro Projekt; nur möglich, wenn das Bild im CMS liegt. Plus automatische responsive Größen (`?w=…&auto=format`), schlankes Repo, Editor-Upload ohne Git.
- **Ausnahme:** Farben (Farrow & Ball) haben KEIN Bild — der Swatch wird aus dem Hex-Wert gerendert.
- **Master-RAW/TIFF** (5D Mark IV) gehören in KEINEN Web-Pfad — nur fertiges WebP hochladen.
- **Kosten-Watch:** Sanity berechnet Asset-Bandbreite ab Plan-Grenze → Plan-Tier prüfen, ggf. Growth. Cloudflare R2 = Notausgang nur falls Bandbreite zu teuer (R2 ohne natives Crop).

---

## 4. Publish-Modell (entschieden): statisch + Rebuild-Webhook

- Seite bleibt **statisch** (KEIN `@astrojs/cloudflare`-Adapter, KEIN `output:server`, kein Token am Edge). GROQ läuft zur **Build-Zeit**.
- Freigabe in Sanity → **Webhook** stößt einen Cloudflare-Rebuild an (~1–2 Min bis live).
- Begründung: erfüllt alle Anforderungen (es wird nur `status=='approved'` + published gezeigt — kein Live-Draft-Bedarf), niedrigstes Risiko, beste Performance.

---

## 5. Dynamisch vs. statisch (welche Seiten)

- **Dynamisch (Inhalt aus Sanity):** Blog, Projekte, Farben, Services/Einzelleistungen, Kategorie-Seiten, Farbkonzepte, Karriere-Artikel.
- **Statisch (bleibt Code):** Startseite, Kontakt, Komplettlösung, Team, Historie, Partner, Datenschutz, Impressum, F&B-Übersicht, „Das sind wir", Gardinen/Rollos, Stoffe, Boden, Wand.

---

## 6. Phase 1 — Blog ↔ Sanity (FERTIG, getestet, committet; NICHT deployed)

- **Entscheidung „frischer Start":** Nur vollständige, in Sanity verfasste Artikel gehen live. Die 25 Alt-Beiträge aus `src/data/blog.json` werden NICHT migriert. `blogPost.body` bleibt Pflichtfeld → nie leere Artikel. (Folge: 25 alte `/blog/<slug>`-URLs werden nicht mehr gebaut → ggf. später 301-Redirects.)
- **Umgesetzt** (Commit `8170b0d` auf `V4`): `src/lib/sanity.ts` (Read-Client, perspective published, `useCdn:false`, `urlFor`, `getApprovedPosts`/`getPostBySlug`, `fmtDate`), `blog.astro` + `blog/[slug].astro` auf GROQ statt JSON, nur `status=='approved'`, Portable-Text-Body (`@portabletext/to-html`), feste Hero-Bild-Ratio, Null-Guard für leere Liste. Slugs = `slug.current` → URLs stabil. Komponenten-Props/CSS/Tokens unverändert.
- **Verifiziert** (Workflow + 3 adversariale Kritiker, alle PASS): Build grün, statisch geblieben, echtes Rendering per Screenshot bestätigt.
- **Live-Vorschau (Produktion unberührt):** https://blog-sanity-preview.adler-wohndesign-website.pages.dev/blog/
- **Hinweis:** Hero des Testartikels ist noch das Platzhalterbild `groot.jpeg` — echtes Bild später pro Artikel.
- **„Published" vs. „Freigegeben":** Studio-„Published" (Dokument live) ≠ Ampel-Feld `status==approved` (worauf die Website filtert). Verwirrend → evtl. später Ampel-Feld vereinfachen.

---

## 7. Tests / CI (Strategie, noch nicht gebaut)

Aktuell **keine** Tests/CI. Geplant, schlank, in **GitHub Actions**:
- **Stufe 0:** `astro build` + `astro check` (der Build ist der erste Test).
- **Stufe 1:** Smoke/E2E (Playwright) — Kernseiten 200, Kontaktformular, Blog rendert.
- **Stufe 2:** Visual-Regression (Playwright-Screenshots) — schützt das Figma-Layout vor stillen Verschiebungen.
- **Stufe 3:** Lighthouse/axe/Link-Check (Pre-Launch).
- **Wann:** lokal beim Entwickeln; bei jedem Push/PR (CI); Deploy nur bei grün; optional nachts.
- **Empfehlung:** schlankes CI ZUERST aufsetzen, damit jede Landingpage-Schleife abgesichert ist.

---

## 8. Roadmap (empfohlene Reihenfolge)

**A — vor Go-Live (GitHub-Track):**
- **A0** schlankes CI (Build + Typecheck + Smokes + Visual-Baseline) — zuerst.
- **A1** Backend / Kontaktformular über Cloudflare-Funktionen (statt Web3Forms) — Launch-Blocker.
- **A2** Landingpage-Iterationen (Figma→Code) — Qualitätsrunde, Großteil des Feedbacks.
- **A3** QA + Produktions-Launch von V4.

**B — drumherum / danach:**
- **B1** Blog-Webhook (Freigabe → Auto-Rebuild).
- **B2** Phase 2 Projekte in Sanity (neues `project`- + `projectCategory`-Schema, Bild-Galerien).
- **B3** Phase 3 Farben in Sanity (`color`-Schema, 302 Einträge, Hex-Swatch ohne Bild).

Pivot-Entscheidung offen: **erst polieren dann launchen** vs. **bald launchen, dann live iterieren**.

---

## 9. Schema-Designs für Phase 2/3 (vorbereitet, noch nicht deployed)

- **`projectCategory`** (eigener Typ, NICHT die Blog-`category` — Projektkategorien Gardinen/Farben/Polsterei/Sonnenschutz/Einrichtung überschneiden sich nicht mit Blog-Themen).
- **`project`**: title, slug, excerpt, category(ref→projectCategory), body(blockContent optional), heroImage(image+alt), gallery(array image), seo, status(Review-Gate), publishedAt, optional relatedColors(ref→color).
- **`color`**: name, nummer(string), hex(#RRGGBB), farbwelt(enum Blau/Rot/Grün/Dunkel/Gelb/Neutral), archiviert(bool), slug=`<nummer>-<name>`. KEIN Bild.
- **Naming-Contract:** Typnamen englisch (`project`/`color`), `_id`=`<typ>.<slug>`, Dokumente per `slug.current`-Query finden (nie geratene `_id`s). Vor Migration `sanity dataset export` als Rollback-Snapshot. Bild-Upload läuft über OAuth/Studio (funktioniert) bzw. CLI-Login; Master-Bilder nicht in den Web-Pfad.

---

## 10. Arbeitsweise & Kommunikation

- **Claude = Dirigent** bei komplexen Aufgaben: orchestriert via ultracode-Workflows/viele Agenten, verifiziert adversarial, entscheidet Phasen — baut nicht selbst Zeile für Zeile.
- **Reporting-Kadenz „Mittel":** leise bei Routine, Klartext-Zusammenfassung an Meilensteinen, sofort bei Fehler/Rot. CI-Benachrichtigung per GitHub-Mail.
- **Autonomie:** build/verify/commit autonom; Freigabe nötig für Deploy, Löschen, neue Dependencies, neue Content-Routes, externe Infra (Webhooks).

---

## 11. Offene Gates / To-dos

- [ ] **CI** aufsetzen (A0) — braucht OK für Dev-Deps (Playwright).
- [ ] **Launch-Philosophie** entscheiden (polieren-dann-launchen vs. launchen-dann-iterieren).
- [ ] **Backend/Kontaktformular** (A1).
- [ ] **Landingpage-Schleifen** (A2).
- [ ] **Blog-Webhook** (B1) — externe Infra, braucht OK.
- [ ] **Produktions-Launch V4** (A3) — braucht OK.
- [ ] **ClickUp**: verbunden/authentifiziert; Tools erst nach Session-Neustart nutzbar → Roadmap dort als Tasks spiegeln.
- [ ] **Sanity-Plan-Tier** im Dashboard prüfen (Asset-Bandbreite).
- [ ] Franzi ins Sanity-Projekt einladen (manage.sanity.io → Members).

---

## Sanity-Eckdaten
- Projekt `hn079dlt`, Dataset `production` (EU). Studio: https://adler-wohndesign.sanity.studio/
- Studio-Quellcode lokal: `~/Code/adler-sanity-studio`. Schreiben via MCP-OAuth (API-Tokens sind read-only auf diesem Projekt).
