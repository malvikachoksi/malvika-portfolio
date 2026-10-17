// Generates a project tile as an SVG data URI for the DriftWall. The tiles are
// drawn to match the site's own cards — light surface, slate title, sky accent —
// so the wall reads as a drifting deck of project cards rather than a slab of
// gradients. Set an `image` field on a project in portfolioData.js to override.

// [accent, accentLight] — accent carries the light tile, accentLight the dark one.
const PALETTES = [
    ["#0ea5e9", "#7dd3fc"], // sky
    ["#06b6d4", "#67e8f9"], // cyan
    ["#0891b2", "#22d3ee"], // deep cyan
    ["#6366f1", "#a5b4fc"], // indigo
    ["#14b8a6", "#5eead4"], // teal
    ["#0284c7", "#38bdf8"], // deep sky
];

const SANS = "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
const DISPLAY = `Poppins, ${SANS}`;

const escapeXml = (value) =>
    String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

// Greedy word wrap into at most `maxLines` lines of roughly `maxChars` each.
const wrap = (text, maxChars = 15, maxLines = 2) => {
    const lines = [];
    let current = "";

    for (const word of String(text).split(/\s+/).filter(Boolean)) {
        const candidate = current ? `${current} ${word}` : word;
        if (candidate.length <= maxChars || !current) {
            current = candidate;
        } else {
            lines.push(current);
            current = word;
            if (lines.length === maxLines) break;
        }
    }
    if (current && lines.length < maxLines) lines.push(current);

    return lines.length ? lines : [String(text)];
};

/**
 * Build a 600x400 card tile for a project.
 * @param {{ title: string, category?: string, tech?: string[] }} project
 * @param {number} index - drives accent selection so neighbouring tiles differ
 * @param {boolean} dark - render the dark-theme variant
 * @returns {string} an `image/svg+xml` data URI
 */
export function buildProjectTile(project, index = 0, dark = false) {
    const [accent, accentLight] = PALETTES[index % PALETTES.length];

    const surface = dark ? "#0f1729" : "#ffffff";
    const ink = dark ? "#f8fafc" : "#0f172a";
    const mark = dark ? accentLight : accent;
    const washStrong = dark ? 0.18 : 0.1;
    const washSoft = dark ? 0.1 : 0.06;
    const numberOpacity = dark ? 0.26 : 0.2;

    const id = `${dark ? "d" : "l"}${index}`;
    const titleLines = wrap(project.title);
    const eyebrow = (project.tech?.[0] ?? project.category ?? "").toUpperCase();
    const number = String(index + 1).padStart(2, "0");

    // Title is bottom-anchored, so a second line grows upward.
    const titleBaseline = 322 - (titleLines.length - 1) * 58;
    const titleTspans = titleLines
        .map((line, i) => `<tspan x="48" y="${titleBaseline + i * 58}">${escapeXml(line)}</tspan>`)
        .join("");

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <defs>
    <clipPath id="${id}c"><rect width="600" height="400"/></clipPath>
  </defs>
  <g clip-path="url(#${id}c)">
    <rect width="600" height="400" fill="${surface}"/>
    <circle cx="530" cy="58" r="172" fill="${mark}" fill-opacity="${washStrong}"/>
    <circle cx="530" cy="58" r="104" fill="${mark}" fill-opacity="${washStrong}"/>
    <circle cx="48" cy="378" r="132" fill="${mark}" fill-opacity="${washSoft}"/>
    <text x="552" y="126" text-anchor="end" font-family="${DISPLAY}" font-size="124" font-weight="800" fill="${mark}" fill-opacity="${numberOpacity}">${number}</text>
    <text x="48" y="${titleBaseline - 76}" font-family="${SANS}" font-size="26" font-weight="700" letter-spacing="4.5" fill="${mark}">${escapeXml(eyebrow)}</text>
    <text font-family="${DISPLAY}" font-size="52" font-weight="800" fill="${ink}">${titleTspans}</text>
    <rect x="48" y="352" width="76" height="7" rx="3.5" fill="${mark}"/>
  </g>
</svg>`;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
