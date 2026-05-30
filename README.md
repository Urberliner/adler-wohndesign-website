# ADLER Wohndesign — Website

Statische Website für ADLER Wohndesign (Raumausstatter & Innenarchitektur, Berlin-Charlottenburg).
Design: Franzi (Figma). Umsetzung: Astro, gehostet auf Cloudflare.

## Stack
- **Astro** (statische Seiten, schnell, top SEO)
- **Vanilla CSS + Design-Tokens** (`src/styles/global.css`) — Tokens 1:1 aus Figma
- **Hosting:** Cloudflare (Workers / Static Assets)
- **Sprache:** Deutsch

## Struktur
```
src/
  styles/global.css     Design-Tokens (Farben, Typo, Spacing) + Basis
  components/            Wiederverwendbare Komponenten (Header, Footer, …)
  pages/                 Eine Datei = eine Seite/URL
public/images/           Bilder & Assets
```

## Lokal starten
```
npm install
npm run dev      # http://localhost:4321
npm run build    # Produktions-Build nach dist/
```

## Status (Stand 05/2026)
- ✅ Design-Tokens (Farben gesichert; Typo-Skala: **Master-Figma-Datei noch zu bestätigen**)
- ✅ Komponenten: Header, Footer
- ✅ Seite: `komplettloesung.astro` (Arbeitsprobe, aus Figma gebaut)
- ⏳ Offen: GitHub-Repo, Hosting/Deploy, Kontaktformular-Backend, optionales CMS

## Launch-Checkliste (vor Go-Live!)
- [ ] **Schriften selbst hosten** (NICHT vom Google-CDN laden — DSGVO/Abmahn-Risiko in DE)
- [ ] Datenschutzerklärung + Impressum korrekt
- [ ] Cookie-/Consent-Handling (falls Tracking/Karten/Embeds)
- [ ] Kontaktformular: echte End-to-End-Zustellung getestet (kein Spam-Nirvana)
- [ ] SEO: Meta-Tags, sitemap.xml, robots.txt, LocalBusiness-Structured-Data
- [ ] Lighthouse + axe (Performance + Barrierefreiheit) grün
- [ ] Cross-Device geprüft (echtes iPhone/Android)
