# Portfolio — What's Left

Design is done. This is everything else, checked against the code (not a generic checklist).

**Suggested order:** git init → contact form → project links → favicon/OG/resume → deploy.

Legend for **Owner**: `You` = needs your decision, content, or credentials · `Claude` = I can do it now, no input needed.

---

## 🔴 Blockers — these stop the site working as a portfolio

| ✔ | Task | Where | Why it matters | Owner |
|---|---|---|---|---|
| [ ] | **Make the contact form actually send** | `app/components/portfolio/Contact.jsx:11` | `handleSubmit` waits 1500ms and shows the success tick — the message is **discarded**. A recruiter fills it in, sees the green check, and you never hear from them. Pick Formspree / Web3Forms (no backend) or Resend + a Next route handler. | You (pick service) |
| [ ] | **Fill in real project URLs** | `app/lib/portfolioData.js` | All 13 `liveLink` **and** all 13 `githubLink` are `"#"`. The DriftWall tiles are deliberately non-clickable while links are `"#"`, so the Projects section currently has **zero** outbound links. Add real URLs → tiles become links automatically. | You (URLs) |
| [ ] | **Put the project under git** | project root | There is no `.git` at all — no history, no backup. Also blocks deploying, since Vercel/Netlify deploy *from* a repo. | Claude |

---

## 🟠 Credibility — fix before anyone sees it

| ✔ | Task | Where | Why it matters | Owner |
|---|---|---|---|---|
| [ ] | **Don't ship the invented testimonials** | `app/lib/portfolioData.js` → `TESTIMONIALS` | "Arjun Patel, CEO at TechStart", "3x faster delivery", "40% more engagement" are placeholder text. Currently **not rendered** (`Testimonials.jsx` is orphaned) — that's fine. Only wire it in once you have real quotes. Fabricated endorsements under real-sounding names can end a hiring conversation. | You (real quotes, or leave off) |

---

## 🟡 Missing assets — `public/` is completely empty

| ✔ | Task | Where | Why it matters | Owner |
|---|---|---|---|---|
| [x] | ~~**Add a favicon**~~ | `app/icon.svg` + `app/apple-icon.png` | Done. Sky→cyan tile with a white **M**. Note: icons live in `app/`, **not** `public/` — Next's file convention auto-injects the `<link>` tags. The M is drawn as strokes, not `<text>`, because SVG favicons render without web fonts. | ~~Claude~~ |
| [x] | ~~**Add an OG share image**~~ | `app/opengraph-image.png` (1200×630) | Done. Dark brand card with your name, title and stack. | ~~Claude~~ |
| [ ] | **Add your resume PDF + a download button** | `public/` + Hero or Contact | For a job-seeking portfolio this is usually the main conversion action, and there's currently no way to get your CV. (This one *does* go in `public/` — it's a plain static file, not a metadata convention.) | You (the PDF) |
| [x] | ~~**Flesh out SEO metadata**~~ | `app/layout.tsx`, `app/lib/seo.js`, `app/robots.ts`, `app/sitemap.ts` | Done. Full OG + Twitter cards, canonical, robots directives, `robots.txt`, `sitemap.xml`, and schema.org `Person` JSON-LD. | ~~Claude~~ |
| [ ] | 🔺 **Set your real domain** | `.env.local` → `NEXT_PUBLIC_SITE_URL` | **Everything SEO depends on this.** Currently falls back to `https://malvika-portfolio.vercel.app`, which is a guess. Canonical URL, OG image URL, sitemap and JSON-LD all derive from it — wrong value = Google indexes the wrong address. | You |
| [ ] | **Verify your GitHub + LinkedIn URLs** | `app/lib/portfolioData.js:11` | They feed JSON-LD `sameAs`, which tells Google these profiles are *you*. Pointing at someone else's handle is worse than omitting them. | You |
| [ ] | **Submit to Google Search Console** | after deploy | Verify the domain, submit `/sitemap.xml`. Nothing gets indexed quickly without it. | You |

---

## 🟢 Free wins — already built, just not switched on

| ✔ | Task | Where | Why it matters | Owner |
|---|---|---|---|---|
| [ ] | **Turn on the Services section** | `Services.jsx` → import in `app/pages/Home.jsx` | Fully built and unused. Its `SERVICES` data is real and reasonable. Two more sections for the cost of two import lines. | Claude |
| [ ] | **Turn on the How I Work / process section** | `HowIWork.jsx` → import in `app/pages/Home.jsx` | Same — complete, uses the real `PROCESS` data, currently orphaned. | Claude |
| [ ] | **Add real project screenshots** | `public/projects/` + `image:` field per project | The tile system already accepts `image:` per project; all 13 currently fall back to generated gradient cards. This would change the Projects section more than any further design work. | You (screenshots) |

---

## ⚪ Cleanup — before the first commit

| ✔ | Task | Where | Why it matters | Owner |
|---|---|---|---|---|
| [ ] | **Delete leftover Base44 cruft** | `.base44-removed/`, `package.json.base44.bak` | Dead files sitting in the project root. | Claude |
| [ ] | **Gitignore the build artifact** | `tsconfig.tsbuildinfo` | Generated file, shouldn't be committed. | Claude |
| [ ] | **Decide on the unused `ProjectCard.jsx`** | `app/components/portfolio/ProjectCard.jsx` | Orphaned since the Projects grid became the DriftWall. Kept in case you want the card grid back — delete it if not. | You |
| [ ] | **Decide on `social.twitter`** | `app/lib/portfolioData.js:13` | No longer referenced anywhere after the Follow Me change. Inert, but dead. | You |

---

## 🚀 Then: deploy

| ✔ | Task | Notes |
|---|---|---|
| [ ] | Push to GitHub | Needs the git repo above first. |
| [ ] | Deploy to Vercel | Zero-config for Next.js. Connect the repo and it builds on every push. |
| [ ] | Add a custom domain | Optional, but `malvikachoksi.dev` reads better than `*.vercel.app` on a CV. |
| [ ] | Re-check both themes on a real phone | Everything this session was verified by build output and served markup — the browser tooling was down, so the light/dark hero, the skills scroll-depth effect and the Projects hover panel have **not been visually confirmed**. |

---

## Known-unverified (from this session)

The Chrome extension was disconnected for the later half of the work. These all pass build, lint and typecheck, and I confirmed them in the served HTML — but **nobody has looked at them yet**:

| Area | What to eyeball | Dial if it's wrong |
|---|---|---|
| Projects hover panel | Panel position relative to cursor | `placementFor` — `Projects.jsx:60` |
| Education rail | Do the rail's ends sit under the outer nodes? | `left-[16%] right-[16%]` — `Education.jsx:27` |
| Skills cloud | Is the scroll depth effect too strong / too weak? | `cloudScale` range — `Skills.jsx:198` |
| Skills cloud | Are icons too small at rest? | per-bubble scale — `Skills.jsx:84` |
| Light hero | Base wash too blue? Glows too strong? | `GradientBackground.jsx:20` (wash), lines 9–11 (glow alphas) |
