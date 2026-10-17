// Brand logos for the skills canvas. Simple Icons are monochrome, so each entry
// carries its brand colour; `dark` overrides it for near-black marks that would
// disappear on the dark theme. Anything not listed here falls back to a monogram
// bubble via `label` — Playwright, AWS and VS Code have no Simple Icons mark
// (removed for trademark reasons), so they use one deliberately.
import {
    SiAxios,
    SiCss,
    SiDocker,
    SiExpo,
    SiExpress,
    SiFigma,
    SiFirebase,
    SiGit,
    SiGithub,
    SiGithubactions,
    SiGnubash,
    SiHtml5,
    SiJavascript,
    SiJest,
    SiJsonwebtokens,
    SiLinux,
    SiMongodb,
    SiMui,
    SiMysql,
    SiNextdotjs,
    SiNginx,
    SiNodedotjs,
    SiPostgresql,
    SiPostman,
    SiPrisma,
    SiReact,
    SiReacthookform,
    SiRedis,
    SiRedux,
    SiSentry,
    SiSocketdotio,
    SiStripe,
    SiTailwindcss,
    SiTestinglibrary,
    SiTypescript,
    SiVitest,
    SiZod,
} from "react-icons/si";

const TECH = {
    // Languages
    "JavaScript": { Icon: SiJavascript, color: "#F7DF1E" },
    "TypeScript": { Icon: SiTypescript, color: "#3178C6" },
    "HTML": { Icon: SiHtml5, color: "#E34F26" },
    "CSS / CSS3": { Icon: SiCss, color: "#663399", dark: "#A78BFA" },
    "SQL": { label: "SQL" },
    "Bash": { Icon: SiGnubash, color: "#4EAA25" },

    // Frameworks
    "React.js": { Icon: SiReact, color: "#61DAFB" },
    "Next.js": { Icon: SiNextdotjs, color: "#0F172A", dark: "#F8FAFC" },
    "React Native": { Icon: SiReact, color: "#61DAFB" },
    "Expo": { Icon: SiExpo, color: "#0F172A", dark: "#F8FAFC" },
    "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
    "Express.js": { Icon: SiExpress, color: "#0F172A", dark: "#F8FAFC" },
    "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },

    // Tools
    "Git": { Icon: SiGit, color: "#F05032" },
    "GitHub": { Icon: SiGithub, color: "#181717", dark: "#F8FAFC" },
    "Figma": { Icon: SiFigma, color: "#F24E1E" },
    "Docker": { Icon: SiDocker, color: "#2496ED" },
    "Nginx": { Icon: SiNginx, color: "#009639" },
    "Postman": { Icon: SiPostman, color: "#FF6C37" },
    "VS Code": { label: "VS" },
    "MongoDB Compass": { Icon: SiMongodb, color: "#47A248" },

    // Libraries
    "Redux": { Icon: SiRedux, color: "#764ABC" },
    "Redux Toolkit": { Icon: SiRedux, color: "#764ABC" },
    "React Hook Form": { Icon: SiReacthookform, color: "#EC5990" },
    "Zod": { Icon: SiZod, color: "#3E67B1" },
    "Prisma": { Icon: SiPrisma, color: "#2D3748", dark: "#E2E8F0" },
    "Axios": { Icon: SiAxios, color: "#5A29E4" },
    "Playwright": { label: "PW" },
    "Jest": { Icon: SiJest, color: "#C21325" },
    "Vitest": { Icon: SiVitest, color: "#6E9F18" },
    "React Testing Library": { Icon: SiTestinglibrary, color: "#E33332" },
    "MUI (Material UI)": { Icon: SiMui, color: "#007FFF" },
    "BullMQ": { label: "MQ" },
    "Socket.io": { Icon: SiSocketdotio, color: "#0F172A", dark: "#F8FAFC" },

    // Database
    "MySQL": { Icon: SiMysql, color: "#4479A1" },
    "PostgreSQL": { Icon: SiPostgresql, color: "#4169E1" },
    "MongoDB": { Icon: SiMongodb, color: "#47A248" },
    "Redis": { Icon: SiRedis, color: "#FF4438" },

    // DevOps / Deployment
    "Linux": { Icon: SiLinux, color: "#E8B10A" },
    "VPS": { label: "VPS" },
    "GitHub Actions": { Icon: SiGithubactions, color: "#2088FF" },
    "AWS (Basics)": { label: "AWS" },

    // Other Technologies
    "REST API": { label: "API" },
    "WebSocket": { label: "WS" },
    "JWT Authentication": { Icon: SiJsonwebtokens, color: "#0F172A", dark: "#F8FAFC" },
    "OAuth": { label: "OA" },
    "Stripe": { Icon: SiStripe, color: "#635BFF" },
    "Firebase": { Icon: SiFirebase, color: "#FFA000" },
    "Sentry": { Icon: SiSentry, color: "#362D59", dark: "#B4A7E8" },
};

/** Resolve a skill name to its mark. Always returns something renderable. */
export function getTech(name) {
    const entry = TECH[name];
    if (!entry) return { label: name.slice(0, 2).toUpperCase() };
    return entry;
}
