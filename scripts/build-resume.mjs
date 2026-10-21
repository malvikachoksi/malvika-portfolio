// Builds public/Malvika-Choksi-Resume.pdf from app/lib/portfolioData.js so the
// resume never drifts from the site. Run: npm run resume
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PERSONAL_INFO, SKILLS, PROJECTS, EXPERIENCE, EDUCATION } from "../app/lib/portfolioData.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "Malvika-Choksi-Resume.pdf");
const chrome = process.env.CHROME_PATH || "google-chrome";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const host = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const skillGroups = [];
const seen = new Set();
for (const { category, items } of SKILLS) {
    // Docker and Nginx appear in two categories on the site.
    const unique = items.filter((i) => !seen.has(i) && seen.add(i));
    if (unique.length) skillGroups.push({ category, items: unique });
}

// Client work only — the personal projects are small and the page budget is tight.
const projects = PROJECTS.filter((p) => p.category === "Office Work");

const { name, email, location, bio, social } = PERSONAL_INFO;
const title = EXPERIENCE[0].role;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(name)} — Resume</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
<style>
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Inter, Arial, sans-serif; color: #1e293b; font-size: 9.6pt; line-height: 1.5; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    a { color: inherit; text-decoration: none; }
    .page { display: grid; grid-template-columns: 68mm 1fr; }
    /* Fixed elements repeat on every printed page, so the sidebar colour runs full height on page 2 too. */
    .sidebar-bg { position: fixed; top: 0; bottom: 0; left: 0; width: 68mm; background: #0f172a; z-index: -1; }
    aside, main { -webkit-box-decoration-break: clone; box-decoration-break: clone; }

    aside { color: #cbd5e1; padding: 14mm 8mm 12mm 10mm; }
    aside h2 { break-after: avoid; font-family: Poppins, sans-serif; font-size: 9pt; letter-spacing: 0.14em; text-transform: uppercase; color: #60a5fa; margin: 7mm 0 2.5mm; }
    aside h2:first-of-type { margin-top: 0; }
    .contact div { margin-bottom: 2mm; word-break: break-word; }
    .contact span { display: block; font-size: 7.4pt; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; }
    .contact a, .contact p { color: #e2e8f0; font-size: 8.8pt; }
    .skill-group { margin-bottom: 3mm; }
    .skill-group h3 { font-size: 8pt; font-weight: 600; color: #f1f5f9; margin-bottom: 1.2mm; }
    .chips { display: flex; flex-wrap: wrap; gap: 1.2mm; }
    .chips span { font-size: 7.4pt; padding: 0.6mm 2mm; border-radius: 99px; background: rgba(96, 165, 250, 0.14); color: #bfdbfe; }
    .edu { margin-bottom: 3.5mm; break-inside: avoid; }
    .edu h3 { font-size: 9pt; color: #f1f5f9; }
    .edu p { font-size: 8pt; color: #94a3b8; line-height: 1.4; }
    .edu .grade { color: #93c5fd; }

    main { padding: 14mm 12mm 12mm 11mm; }
    header h1 { font-family: Poppins, sans-serif; font-size: 26pt; line-height: 1.1; color: #0f172a; }
    header h1 span { color: #3b82f6; }
    header .role { font-size: 12pt; font-weight: 600; color: #3b82f6; margin-top: 1mm; }
    header .summary { margin-top: 4mm; color: #475569; }
    main h2 { font-family: Poppins, sans-serif; font-size: 11pt; color: #0f172a; margin: 7mm 0 3mm; padding-bottom: 1.5mm; border-bottom: 2px solid #e2e8f0; position: relative; }
    main h2::after { content: ""; position: absolute; left: 0; bottom: -2px; width: 14mm; height: 2px; background: #3b82f6; }
    .job { position: relative; padding-left: 5mm; margin-bottom: 4mm; break-inside: avoid; }
    .job::before { content: ""; position: absolute; left: 0; top: 1.6mm; width: 2mm; height: 2mm; border-radius: 50%; background: #3b82f6; }
    .job::after { content: ""; position: absolute; left: 0.85mm; top: 4.5mm; bottom: -4mm; width: 0.3mm; background: #cbd5e1; }
    .job:last-child::after { display: none; }
    .job-head { display: flex; justify-content: space-between; gap: 4mm; align-items: baseline; }
    .job h3 { font-size: 10.4pt; color: #0f172a; }
    .dates { font-size: 8pt; font-weight: 600; color: #3b82f6; white-space: nowrap; }
    .company { font-size: 8.8pt; color: #64748b; font-weight: 500; margin-bottom: 1mm; }
    .job p { color: #475569; }
    .projects { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; }
    .project { border: 1px solid #e2e8f0; border-radius: 2mm; padding: 2.6mm 3mm; break-inside: avoid; }
    .project h3 { font-size: 9.4pt; color: #0f172a; display: flex; justify-content: space-between; gap: 2mm; }
    .project h3 a { font-size: 7.4pt; font-weight: 500; color: #3b82f6; }
    .project p { font-size: 8.2pt; color: #475569; line-height: 1.42; margin: 1mm 0 1.5mm; }
    .project .tech { font-size: 7.4pt; color: #3b82f6; font-weight: 500; }
</style>
</head>
<body>
<div class="sidebar-bg"></div>
<div class="page">
    <aside>
        <h2>Contact</h2>
        <div class="contact">
            <div><span>Email</span><a href="mailto:${esc(email)}">${esc(email)}</a></div>
            <div><span>Location</span><p>${esc(location)}</p></div>
            <div><span>GitHub</span><a href="${esc(social.github)}">${esc(host(social.github))}</a></div>
            <div><span>LinkedIn</span><a href="${esc(social.linkedin)}">${esc(host(social.linkedin))}</a></div>
        </div>

        <h2>Skills</h2>
        ${skillGroups.map((g) => `
        <div class="skill-group">
            <h3>${esc(g.category)}</h3>
            <div class="chips">${g.items.map((i) => `<span>${esc(i)}</span>`).join("")}</div>
        </div>`).join("")}

        <h2>Education</h2>
        ${EDUCATION.map((e) => `
        <div class="edu">
            <h3>${esc(e.degree)}</h3>
            <p>${esc(e.institution)}</p>
            <p>${esc(e.dates)}</p>
            ${e.cgpa ? `<p class="grade">CGPA ${esc(e.cgpa)}${e.sgpa ? ` · SGPA ${esc(e.sgpa)}` : ""}</p>` : ""}
        </div>`).join("")}
    </aside>

    <main>
        <header>
            <h1>${esc(name.split(" ")[0])} <span>${esc(name.split(" ").slice(1).join(" "))}</span></h1>
            <div class="role">${esc(title)}</div>
            <p class="summary">${esc(bio)}</p>
        </header>

        <h2>Work Experience</h2>
        ${EXPERIENCE.map((x) => `
        <div class="job">
            <div class="job-head"><h3>${esc(x.role)}</h3><span class="dates">${esc(x.dates)}</span></div>
            <div class="company">${esc(x.company)}</div>
            <p>${esc(x.description)}</p>
        </div>`).join("")}

        <h2>Key Projects</h2>
        <div class="projects">
        ${projects.map((p) => `
            <div class="project">
                <h3>${esc(p.title)}${p.liveLink && p.liveLink !== "#" ? `<a href="${esc(p.liveLink)}">Live site ↗</a>` : ""}</h3>
                <p>${esc(p.description)}</p>
                <div class="tech">${p.tech.map(esc).join(" · ")}</div>
            </div>`).join("")}
        </div>
    </main>
</div>
</body>
</html>`;

const dir = mkdtempSync(join(tmpdir(), "resume-"));
const htmlPath = join(dir, "resume.html");
writeFileSync(htmlPath, html);
try {
    execFileSync(chrome, [
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--virtual-time-budget=5000",
        `--print-to-pdf=${out}`,
        `file://${htmlPath}`,
    ], { stdio: "pipe" });
    console.log(`Wrote ${out}`);
} finally {
    rmSync(dir, { recursive: true, force: true });
}
