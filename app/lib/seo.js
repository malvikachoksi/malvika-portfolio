import { PERSONAL_INFO, PROJECTS, SKILLS } from "./portfolioData";

// ⚠️ SET THIS BEFORE DEPLOYING.
// Everything else in this file derives from it: canonical URL, the absolute OG
// image URL, sitemap entries and the JSON-LD `url`. Override in .env.local with
// NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://malvika-portfolio.vercel.app").replace(/\/$/, "");

export const SITE_NAME = `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`;

// Search results truncate around 60 chars for titles and 155-160 for
// descriptions, so both are written to land inside that.
export const SITE_TITLE = `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`;

export const SITE_DESCRIPTION =
    "Frontend developer with 2+ years building fast, accessible web apps in React, Next.js and TypeScript. Based in Surat, India — open to work.";

// Drawn from the real skills list rather than invented. Keywords carry little
// ranking weight now, but still feed some aggregators and social scrapers.
export const SITE_KEYWORDS = [
    PERSONAL_INFO.name,
    "frontend developer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "React Native developer",
    "web developer Surat",
    "frontend developer India",
    "portfolio",
    ...SKILLS.find((s) => s.category === "Frameworks").items,
];

// Only profiles that are actually linked from the site. A `sameAs` pointing at
// a profile that isn't yours is worse than omitting it.
export const SOCIAL_PROFILES = [PERSONAL_INFO.social.github, PERSONAL_INFO.social.linkedin];

// Referenced by every CreativeWork below so the graph resolves to one person
// instead of re-declaring an unrelated author on each project.
const PERSON_ID = `${SITE_URL}/#person`;

function personNode() {
    return {
        "@type": "Person",
        "@id": PERSON_ID,
        name: PERSONAL_INFO.name,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image.png`,
        jobTitle: PERSONAL_INFO.title,
        email: `mailto:${PERSONAL_INFO.email}`,
        description: PERSONAL_INFO.bio,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Surat",
            addressRegion: "Gujarat",
            addressCountry: "IN",
        },
        sameAs: SOCIAL_PROFILES,
        knowsAbout: SKILLS.flatMap((group) => group.items),
    };
}

// schema.org has no "projects" property on Person, so the portfolio is modelled
// the documented way round: each project is a CreativeWork crediting the person.
function projectsNode() {
    return {
        "@type": "ItemList",
        name: `Projects by ${PERSONAL_INFO.name}`,
        numberOfItems: PROJECTS.length,
        itemListElement: PROJECTS.map((project, i) => {
            const work = {
                "@type": "CreativeWork",
                name: project.title,
                description: project.description,
                creator: { "@id": PERSON_ID },
                keywords: project.tech.join(", "),
                genre: project.category,
            };
            // A placeholder "#" would resolve to the portfolio itself and make
            // every project look like the same URL.
            if (project.liveLink && project.liveLink !== "#") work.url = project.liveLink;

            return { "@type": "ListItem", position: i + 1, item: work };
        }),
    };
}

/**
 * schema.org graph for the site. The Person node is what lets Google associate
 * the site with a named human rather than an anonymous page; the ItemList is
 * what lets search engines and LLMs enumerate the actual work, which is
 * otherwise unreadable — the projects section renders as image tiles.
 */
export function personJsonLd() {
    return {
        "@context": "https://schema.org",
        "@graph": [personNode(), projectsNode()],
    };
}
