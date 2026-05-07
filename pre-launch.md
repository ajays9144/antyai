# Anty AI — Pre-Launch Context for Claude

> **Read this entire file before doing any work in this repository.** It contains everything you need to understand the project, the decisions already made, the constraints to respect, and how to behave when the user asks you to make changes.

---

## 1 · Project at a glance

**What this is.** Anty AI is an identity-protection SaaS platform for celebrities, public figures, and high-value individuals. The service detects unauthorized images, videos, and audio of clients across the internet and files takedowns through the appropriate legal channels (DMCA, NO FAKES Act, TAKE IT DOWN Act, ELVIS Act, EU AI Act, India IT Rules, DPDP Act, personality-rights case law).

**Domain.** `antyai.com`

**Brand.** Wordmark is "Anty.ai" — serif "Anty" + monospace ".ai" in gold accent.

**Stage.** Pre-launch. The product itself does not exist yet. The current scope is a marketing landing page + legal pages for waitlist sign-ups and reservations. Public service launch targeted for 2026.

**Geography.** Founder is in India. Target market is **global** with India as a competitive strength (deep coverage of Indian platforms and personality-rights case law) — but the website must NOT read as India-only. Treat global users as the primary audience.

---

## 2 · The honest framing — non-negotiable

These are commitments the founder has made and Claude must preserve in all copy work:

- **We take down content. We do NOT prevent generation.** Open-source models exist and cannot be unbuilt. Anyone marketing "we stop deepfakes from being made" is selling fiction. Anty AI's value is fast removal *after* content surfaces publicly.
- **We pursue takedowns, not uploaders.** We get content removed from platforms. We do not identify anonymous uploaders, prosecute them, or guarantee they will stop. Legal action against uploaders is the client's lawyers' job — we provide the evidence package.
- **We do not guarantee 100% takedown.** Industry leaders cap at 94–98%. Telegram, dark web, encrypted channels are partially out of reach. A 5% residual is the honest baseline.
- **We honor protected speech.** Parody, satire, news, political commentary stay up. The Arjun Kapoor case (Delhi HC, April 2025) is binding precedent in India.
- **Realistic timing only.** No false promises. Detection: 30 min – 2 hr on cooperative platforms. Removal: 24–72 hr typical (48 hr mandatory under TAKE IT DOWN Act for NCII; longer for Telegram and offshore hosts).

If the user ever asks Claude to write copy that violates any of the above, push back politely and remind them of this section. The honesty is a strategic differentiator, not a marketing tic.

---

## 3 · Current scope — what we are working on now

**Pre-launch deliverable: a marketing/waitlist site at antyai.com.**

What it must do:
1. Explain the service clearly to visitors who have never heard of this category.
2. Build trust with a high-stakes audience (celebrities, agents, lawyers) by being radically honest about capabilities and limits.
3. Capture waitlist sign-ups via a form.
4. Optionally capture pre-launch reservations with refundable deposits — **this is an open legal question, see Section 7.**
5. Host the legal documents (Privacy Policy, Reservation Terms, DPDP Notice) at clean URLs.

What it must NOT do (yet):
- Process actual biometric data.
- Run any takedown logic.
- Connect to any platform APIs.
- Hold any production user data beyond email addresses and form submissions.
- Charge anyone money until the BUDS Act question is resolved (Section 7).

---

## 4 · Future scope — for awareness, not for implementation now

When you (Claude) help with the actual product post-launch, these are the major systems you will eventually touch. **Do not build any of these yet.** Do not scaffold them. Do not assume their architecture. They are listed here only so you do not accidentally make pre-launch decisions that block them.

- **Identity enrollment pipeline** — KYC (government ID + liveness check), biometric sample capture, encrypted template generation, secure storage.
- **Internet-scale crawler infrastructure** — across YouTube, Meta, TikTok, X, Reddit, Telegram, Indian platforms (JioHotstar, JioSaavn, ShareChat, Moj, Josh, Hungama, Sony LIV, Zee5, Koo, Roposo), image hosts, adult sites, dark-web mirrors.
- **Multi-modal biometric matching engine** — facial geometry (FaceNet / ArcFace baseline), voice embedding (Resemblyzer / SpeechBrain baseline), text and name detection, gesture markers.
- **Match classification system** — commercial fraud, NCII, deceptive impersonation, fan content, satire, news, ambiguous → human review queue.
- **Takedown automation engine** — multi-jurisdiction, multi-statute. Routes to DMCA, TAKE IT DOWN, NO FAKES (when passed), ELVIS, EU AI Act, India IT Rules + DPDP Act, platform-specific ToS.
- **Watchtower dashboard** — real-time detection feed, takedown status, historical metrics, transparency reports.
- **Re-monitoring loop** — content fingerprint matching against re-uploads, mirrors, screen-recordings, re-encodes.
- **Legal-ops console** — paralegal queue, attorney escalation, court-order workflow, evidence package generator.
- **Billing and subscription management** — five tiers (Free, Individual, Creator, Celebrity, Enterprise), INR/USD, agency rosters.
- **Compliance and audit** — DPDP Act, GDPR, CCPA, SOC 2, ISO 27001 audit trails.

When the user asks for any of this, treat it as a **major engineering project** that needs its own scoping conversation. Do not start coding until you and the user have agreed on a specific module to build, the technology choices, and the file layout.

---

## 5 · Repository layout (current)

```
/
├── pre-launch.md          ← this file (Claude context)
├── index.html             ← main landing page
├── privacy.html           ← Privacy Policy
├── terms.html             ← Reservation Terms / Terms of Service
├── dpdp-notice.html       ← DPDP Act 2023 disclosures (India)
└── (future pages go here)
```

All four HTML files are currently single-file (CSS embedded in `<style>`, JS embedded in `<script>`). Do not split them into separate CSS/JS files unless the user explicitly asks for a build pipeline. Reason: the pre-launch site is meant to be drop-in deployable to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, even an S3 bucket) without a build step.

When deploying, `index.html` is the home page. `privacy.html`, `terms.html`, `dpdp-notice.html` are reachable at `/privacy.html` etc. — links in the footer and form already point to these paths.

---

## 6 · Design system — already decided, do not redesign

**Palette (CSS variables already defined in every file):**
- `--cream` `#F8F4EC` — primary background
- `--paper-pure` `#FFFFFF` — card/surface background
- `--ink` `#1A1814` — primary text
- `--ink-2` `#2D2A23` — secondary text
- `--mute` `#6B6457` — tertiary text
- `--gold` `#B8923D` — primary accent
- `--gold-deep` `#8C6F2E` — accent text/links
- `--gold-light` `#D4B66E` — accent highlights
- `--gold-tint` `rgba(184, 146, 61, 0.08)` — soft backgrounds
- `--burgundy` `#7A2E2E` — danger/warning (use sparingly)
- `--olive` `#5C6B3D` — success/positive
- `--line` `rgba(26, 24, 20, 0.10)` — borders

**Typography:**
- `--display: 'Fraunces'` — headings, display copy, italic emphasis (`em` tag colored gold-deep)
- `--sans: 'Manrope'` — body text, UI
- `--mono: 'JetBrains Mono'` — labels, eyebrows, technical metadata

**Visual mood.** Indian-luxe but restrained. Cream paper, warm gold, deep ink. Subtle paper grain via SVG noise. Hairline grids. Generous whitespace. The tone is "private wealth-management firm meets technical paper" — not "consumer SaaS" and not "Y Combinator startup."

**Layout grid.** Max content width is `1280px` for the landing page, `880px` for legal pages. Section padding is generous (`120px` desktop, `80px` mobile). Section headers use a two-column meta + heading pattern.

**Things NOT to do:** dark mode, neon accents, glassmorphism, emoji-heavy UI, AI-generated stock illustrations, gradients other than the existing subtle ones. The brand is restrained.

---

## 7 · Open questions — flag these, don't decide for the user

These are decisions the founder has not yet made. If a user request implicitly forces one of these decisions, **stop and ask** before implementing.

### 7.1 The reservation deposit — BUDS Act 2019 risk

The site currently shows a refundable interest deposit feature (₹500–₹1,00,000) in the waitlist form. This is **legally untested** for our model and may trigger India's Banning of Unregulated Deposit Schemes Act 2019 — a criminal statute with 2–7 years imprisonment for unregulated deposit-taking.

The founder is consulting an Indian startup lawyer on this. Until that opinion is delivered, treat the deposit feature as **provisional**. Two possible outcomes:

- **Outcome A — Drop the deposit.** Convert the form into a free email-only waitlist. Remove all deposit UI, escrow language, and refund mechanics from `index.html` and `terms.html`. This is the safer path and the assistant's recommended default.
- **Outcome B — Keep the deposit with proper legal scaffolding.** Requires escrow partner (Razorpay Trust, EscrowPay, or similar), strict 15-day refund window on plan cancellation, no interest paid to user, written legal opinion from Indian counsel.

If the user asks Claude to "implement the payment flow" before the legal question is resolved, push back and remind them this is unsafe.

### 7.2 Legal-page placeholders that need real values

Search every legal page for `[TO BE FILLED]` and `[Insert ...]` — these are placeholders that must be replaced before going live:
- Legal entity name (e.g., "Anty AI Technologies Private Limited")
- CIN (Corporate Identification Number)
- Registered office address
- Effective dates and last-updated dates
- Grievance Officer name (DPDP requirement)
- Data Protection Officer name (GDPR)
- EU/UK Representative (GDPR Art. 27 — required before EU launch)
- Escrow partner name
- Sub-processor list

Do not invent values. Leave the placeholders until the founder provides real ones.

### 7.3 Form backend

The waitlist form on `index.html` currently has no backend — submissions show a success modal but go nowhere. Before launch, this needs to be wired to one of:
- A no-code backend (Tally, Formspree, Getform)
- A custom backend (likely Vercel Serverless Function or Cloudflare Worker → database)
- A CRM directly (HubSpot, Pipedrive, Notion API)

Do not pick one unilaterally. Ask the user which they want.

### 7.4 Analytics and tracking

The site has no analytics installed. Before launch, decide:
- Plausible / Fathom (privacy-first, simple)
- Google Analytics 4 (free, comprehensive, requires cookie consent in EU/India)
- Self-hosted (Umami)

Cookie-consent banner is required if GA4 is chosen and any EU/UK/Indian users are expected.

### 7.5 Domain and hosting

Founder owns `antyai.com`. Hosting target not yet decided. Recommended: Vercel or Cloudflare Pages for the static site. DNS needs to be pointed at hosting provider.

---

## 8 · Copy and content stance

The voice is built into every line on the existing site. Maintain it.

- **Calm and confident.** No exclamation marks. No urgency-marketing tactics. No "limited time only."
- **Honest before clever.** When there is a tension between sounding good and being accurate, accuracy wins.
- **Diplomatic about limits.** The "what we don't do" section is framed as transparency, not as failure. Use neutral or positive framing for unavoidable limits.
- **Specific numbers when defensible.** Use the real industry stats (94–98% takedown rate, 24–72 hr removal typical, 48 hr NCII mandate, 30 min – 2 hr detection). Don't invent metrics.
- **Real legal authorities.** Cite actual statutes and cases — Bachchan family, Asha Bhosle, Sunil Shetty, Arjun Kapoor (Delhi HC), TAKE IT DOWN Act, NO FAKES Act, ELVIS Act, EU AI Act Article 50.
- **Global examples balanced with Indian ones.** Taylor Swift deepfake (47M views), Hong Kong CFO $25M wire fraud, alongside Indian personality-rights cases.

---

## 9 · How Claude should behave in this repository

When the user asks for changes:

1. **Read this file first.** Do not skip Section 2 (honest framing) or Section 7 (open questions).
2. **Ask before assuming on open questions.** Sections 7.1–7.5 list decisions still to be made. Don't pick for the founder.
3. **Edit existing files in place.** Use `str_replace` rather than rewriting whole files. Preserve the design system (Section 6).
4. **Test before declaring done.** For HTML changes, mentally render the page. For copy changes, re-read in context to make sure the surrounding paragraphs still flow.
5. **Flag scope creep.** If the user asks for something that belongs to the future-scope list (Section 4), confirm with them: "This is post-launch territory — do you want a quick scaffolding for the marketing page, or are we starting the real product build?"
6. **Be conservative with claims.** When in doubt about a stat or legal citation, say so and ask the founder to verify rather than asserting.
7. **Respect the founder's time.** They are non-technical-leaning. Default to short, clear responses with concrete deliverables. Don't lecture about implementation choices unless asked.

When making code changes:

- **HTML/CSS:** Preserve existing CSS variable names and design tokens. Don't introduce new color values without good reason.
- **JS:** Keep it vanilla. No framework dependency for the marketing site. If interactivity grows beyond a few hundred lines, pause and propose a refactor before continuing.
- **Accessibility:** Maintain semantic HTML (`<section>`, `<nav>`, `<header>`, `<footer>`, real headings). Form fields need labels. Color contrast must stay WCAG AA.
- **Mobile-first:** All breakpoints already exist in the CSS — `@media (max-width: 980px)`, `820px`, `720px`, `580px`. Test changes at 375px width minimum.

---

## 10 · Stats, citations, and legal references — the canonical list

When writing or reviewing copy, these are the verified-by-the-founder reference numbers and authorities. Use these. Don't invent others.

**Market and threat data:**
- 2,031 verified deepfake incidents in Q3 2025 (Resemble AI Q3 2025 report)
- $1.1B in US deepfake fraud losses 2025, 3× the 2024 total of $359M (Surfshark)
- 48% of US deepfake incidents in 2025 used celebrity likeness (Keepnet Labs 2026)
- +680% YoY growth in voice deepfake incidents (SQ Magazine 2026)
- 3 seconds of audio yields ~85% voice clone match (multiple sources)
- $401M lost to fake celebrity endorsements alone in 2025
- Taylor Swift AI explicit image: 47M views before takedown
- Hong Kong CFO deepfake voice fraud: $25M wire transfer

**Indian personality-rights case law (2025):**
- Aishwarya Rai Bachchan v. Aishwaryaworld.com — Delhi HC, Sept 2025 — 72-hour platform takedown order
- Abhishek Bachchan v. The Bollywood Tee Shop — Delhi HC, Sept 2025 — broad AI deepfake injunction
- Asha Bhosle — Bombay HC, Oct 2025 — voice cloning, bound Amazon, Flipkart, Google
- Sunil Shetty — Bombay HC — personality rights under Article 21
- Karan Johar, Akkineni Nagarjuna, Sri Sri Ravi Shankar — 2025
- Anil Kapoor, Jackie Shroff, Amitabh Bachchan — earlier precedents
- Arjun Kapoor — Delhi HC, April 2025 — declined blanket takedown; protected satire/news (this is the limit case)

**Legal frameworks:**
- TAKE IT DOWN Act — US federal, signed 2025, 48-hr NCII removal mandate
- NO FAKES Act — HR 2794, reintroduced April 2025, in committee
- ELVIS Act — Tennessee, in force July 2024
- EU AI Act Article 50 — enforced August 2026, penalties up to €15M or 3% global turnover
- DMCA — long-standing, US copyright takedowns
- DPDP Act 2023 — India, biometric data classified as sensitive personal data
- IT Rules 2021 (amended 2023) — India intermediary liability
- GDPR Article 9 — biometric data is special category
- BUDS Act 2019 — India, the deposit-taking risk for our pre-launch model

**Industry / competitor reference points (do not name on the public site, but useful context):**
- Loti AI — Khosla Ventures-funded, ~$21M raised, US-focused
- Vermillio — TIME 100 Most Influential 2025
- Ceartas — Ireland-based, claims 1B+ takedowns
- These are the players we differentiate from, not partner with — so the public site should not mention them by name.

---

## 11 · Quick command reference for common founder requests

When the founder asks something like the below, this is the recommended approach:

| Request | Approach |
|---|---|
| "Change the hero copy to X" | Edit `index.html`, find the `<header class="hero">` section, use `str_replace`. Preserve the honest-framing callout below the headline. |
| "Add a new FAQ" | Edit `index.html`, find the `.faq-list` section, add a new `.faq-item` matching the existing pattern. |
| "Update the privacy policy section X" | Edit `privacy.html`. Preserve the section numbering and TOC structure. |
| "Drop the deposit feature" | Major change — affects `index.html` (form, deposit-area, modal), `terms.html` (Sections 4, 5, 14), and possibly `privacy.html`. Confirm scope with founder first. |
| "Add a new legal page" | Create new `<name>.html` matching the design system from `privacy.html`. Update footer links in all four existing pages. |
| "Wire up the form backend" | This is a 7.3 open question. Ask which backend the founder wants before writing any code. |
| "Change the brand color" | The brand has been decided. Push back politely and confirm before making this change. |
| "Build the actual product / takedown engine / dashboard" | This is Section 4 future-scope territory. Pause and have a scoping conversation. Do not start. |

---

## 12 · Final reminder

This is a serious project handling sensitive personal data (biometric templates, government IDs) in a regulatory environment that includes criminal liability under multiple statutes (BUDS Act, DPDP Act, IT Rules, ELVIS Act, GDPR, CCPA). The website is the front door but the trust signal it sends is the whole product before launch.

**Be careful. Be honest. Be conservative. Ask before assuming. The founder is moving fast but cannot afford to break things in this category.**

---

*Last updated: when this file was created. Update the date manually whenever this file changes.*