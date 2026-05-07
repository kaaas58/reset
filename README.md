# RESET – Coaching-Website

Coaching für Männer in toxischen Beziehungen  
Mark Mittag & Johann Litty

---

## Dateistruktur

```
deinreset/
├── index.html          ← Landing Page (alle Sektionen)
├── ueber-uns.html      ← Ausführliche Über-uns-Seite (beide Coaches)
├── impressum.html      ← Impressum §5 TMG
├── datenschutz.html    ← Datenschutzerklärung DSGVO
├── style.css           ← Gesamtes Stylesheet
├── script.js           ← Burger-Menü, aktiver Nav-Link
├── resetlogo.png       ← Haupt-Logo (bereits vorhanden)
└── README.md           ← Diese Datei
```

---

## Farbpalette

| Name        | HEX       | Verwendung                              |
|-------------|-----------|------------------------------------------|
| Hintergrund | `#2b2928` | Basis-Hintergrund                        |
| BG Alt      | `#323130` | Abwechselnde Sektionen                   |
| BG Card     | `#3a3836` | Karten, Boxen                            |
| Text        | `#f0ede8` | Fließtext (warmes Off-White)             |
| Muted       | `#9a9591` | Sekundärtext, Labels                     |
| Gold        | `#d4a017` | Akzent, CTAs, Headlines (aus Logo)       |
| Rot         | `#b85450` | Logo-Icon-Farbe, Warn-Markierungen       |
| Border      | `#444140` | Trennlinien, Kartenrahmen                |

Alle als CSS-Variablen in `style.css` unter `:root` definiert.

---

## Typografie

- **Barlow** (700/800) – Überschriften
- **Inter** (400/500/600) – Fließtext
- Quelle: Google Fonts (derzeit extern eingebunden)
- **DSGVO-Hinweis:** Für DSGVO-konformen Betrieb Schriften lokal einbinden

---

## Seitenstruktur (Landing Page)

1. **Hero** – Wiedererkennung, Hauptbotschaft, CTA
2. **Das Problem** – "Kennst du das?" mit Bullet-Liste
3. **Muster** – Co-Abhängigkeitsgrafik (6 Karten)
4. **Die Lösung** – Was ihr bekommt (6 Benefit-Karten)
5. **Der Weg** – 3-Schritte-Methode
6. **Angebote** – 1:1, 12-Wochen-Kurs, Retreat
7. **Über uns** – Kompakt-Teaser mit Link zur Unterseite
8. **Stimmen** – 3 Testimonial-Platzhalter
9. **Kontakt/CTA** – Erstgespräch

---

## Was noch fehlt – [BITTE ERGÄNZEN]

### Inhalte (dringend)

- [ ] **Fotos von Mark & Johann** – für Hero, Über-uns-Seite, Über-uns-Karten
- [ ] **Persönliche Texte beider Coaches** – auf `ueber-uns.html` (je 3–5 Absätze)
- [ ] **Kurztexte für Startseite** – 2–3 Sätze je Coach (Kompakt-Teaser)
- [ ] **Echte Testimonials** – 3–4 Stück mit Vorname + Anfangsbuchstabe Nachname + Alter
- [ ] **E-Mail-Adresse** – für Kontakt-Button und Footer
- [ ] **Calendly-Link oder Kontaktformular** – für Erstgespräch-Buchung
- [ ] **Social-Media-Links** – Instagram, LinkedIn (2x Platzhalter im Footer)
- [ ] **Retreat-Details** – Termine, Ort, Preis oder "auf Anfrage"

### Rechtliches (Impressum)

- [ ] Vollständiger Name / Firmenbezeichnung (GbR oder Einzelperson)
- [ ] Anschrift (Straße, PLZ, Ort)
- [ ] E-Mail-Adresse (Pflichtangabe §5 TMG)
- [ ] USt-IdNr. oder Hinweis auf Kleinunternehmerregelung §19 UStG

### Technisches

- [ ] **Google Fonts lokal einbinden** (DSGVO) – Schriften herunterladen und in CSS via `@font-face` einbinden, `<link>` Tag in allen HTML-Dateien entfernen
- [ ] **Datenschutz: Calendly-Abschnitt** ergänzen, sobald Tool feststeht
- [ ] **Domain kaufen** (Vorschlag aus Fahrplan: borderline-coaching.life oder reset-coaching.de)
- [ ] **Hosting einrichten** (Empfehlung: Netlify Drop, All-Inkl oder Strato – kein Framework nötig, reines HTML/CSS)
- [ ] **favicon.ico** erstellen (aus Logo)

---

## Technischer Stack

- Vanilla HTML5 + CSS3 + minimales JS (kein Framework)
- Mobile First, responsiv bis Desktop
- Keine externen Tracking-Skripte
- Semantisches HTML, ARIA-Labels, alt-Texte

---

## Deployment (einfachste Variante)

```
1. Alle Dateien in einen Ordner packen (ZIP)
2. Auf netlify.com/drop hochladen → sofort online
3. Eigene Domain im Netlify-Dashboard verknüpfen
```

---

## Platzhalter-Übersicht (alle [BITTE ERGÄNZEN]-Stellen)

| Datei              | Stelle                                          |
|--------------------|--------------------------------------------------|
| index.html         | Fotos Mark & Johann (Hero + Über-uns-Karten)     |
| index.html         | Kurztexte beider Coaches                         |
| index.html         | E-Mail-Adresse (2x)                              |
| index.html         | Calendly-Link                                    |
| index.html         | Social-Media-Links (2x)                          |
| index.html         | 3x echte Testimonials                            |
| ueber-uns.html     | Fotos Mark & Johann (groß)                       |
| ueber-uns.html     | Persönliche Geschichte Mark (3–5 Absätze)        |
| ueber-uns.html     | Persönliche Geschichte Johann (3–5 Absätze)      |
| ueber-uns.html     | Ausbildung/Zertifizierungen beider Coaches       |
| impressum.html     | Vollständige Adresse, E-Mail, USt-Angabe         |
| datenschutz.html   | E-Mail-Adresse, Calendly-Datenschutz-Abschnitt   |
| offer-card Retreat | Konkrete Termine und Preis                       |
