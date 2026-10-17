import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PROJECTS } from "@/lib/portfolioData";
import { buildProjectTile } from "@/lib/projectTile";
import { useTheme } from "@/lib/ThemeContext";
import DriftWall from "@/components/reactbits/DriftWall";
import ScrollReveal from "./ScrollReveal";
import "./ProjectsWall.css";

const layoutFor = (width) => {
    if (width < 640) return { columns: 2, tileWidth: 148, tileHeight: 98, gap: 12 };
    if (width < 1024) return { columns: 3, tileWidth: 178, tileHeight: 118, gap: 15 };
    if (width < 1600) return { columns: 5, tileWidth: 200, tileHeight: 132, gap: 18 };
    return { columns: 7, tileWidth: 212, tileHeight: 140, gap: 20 };
};

export default function Projects() {
    const { theme } = useTheme();
    const [layout, setLayout] = useState(() => layoutFor(1280));

    useEffect(() => {
        const onResize = () => {
            const next = layoutFor(window.innerWidth);
            setLayout((prev) => (prev.columns === next.columns ? prev : next));
        };
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const isDark = theme === "dark";

    const items = useMemo(() => {
        const tiles = PROJECTS.map((project, i) => ({
            image: project.image ?? buildProjectTile(project, i, isDark),
            title: project.title,
            // DriftWall passes items through untouched, so the record rides along
            // to the hover panel instead of being looked up again by title.
            project,
            number: i + 1,
            // liveLink is "#" for placeholders — leave href off so the tile
            // renders as a non-navigating element instead of opening a blank tab.
            href: project.liveLink && project.liveLink !== "#" ? project.liveLink : undefined,
        }));

        // DriftWall deals items round-robin into columns, so 13 projects across
        // 7 columns would leave each column cycling over just 1-2 tiles. Dealing
        // three passes gives every column ~6 *different* projects instead.
        return [...tiles, ...tiles, ...tiles];
    }, [isDark]);

    const wrapRef = useRef(null);
    const panelRef = useRef(null);
    const pointRef = useRef({ x: 0, y: 0 });
    const [active, setActive] = useState(null);

    // Place the panel beside the pointer, flipping to its left near the right
    // edge and clamping so it never escapes the wall.
    const placementFor = useCallback((point) => {
        const wrap = wrapRef.current;
        if (!wrap) return { left: 0, top: 0 };

        const panel = panelRef.current;
        const pw = panel?.offsetWidth || 320;
        const ph = panel?.offsetHeight || 260;
        const M = 16;
        const { clientWidth: w, clientHeight: h } = wrap;

        let left = point.x + 28;
        if (left + pw + M > w) left = point.x - pw - 28;

        return {
            left: Math.min(Math.max(M, left), Math.max(M, w - pw - M)),
            top: Math.min(Math.max(M, point.y - ph / 2), Math.max(M, h - ph - M)),
        };
    }, []);

    // Follow the cursor imperatively — going through state here would re-render
    // the panel on every pointermove and fight its enter animation.
    const handleWrapPointerMove = useCallback(
        (e) => {
            const wrap = wrapRef.current;
            const panel = panelRef.current;
            if (!wrap) return;

            const rect = wrap.getBoundingClientRect();
            pointRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
            if (!panel) return;

            const { left, top } = placementFor(pointRef.current);
            panel.style.left = `${left}px`;
            panel.style.top = `${top}px`;
        },
        [placementFor]
    );

    const handleActiveChange = useCallback(
        (item, point) => {
            if (!item?.project) {
                setActive(null);
                return;
            }
            // Keyboard focus has no cursor, so DriftWall sends the tile centre.
            if (point) pointRef.current = point;
            const { left, top } = placementFor(pointRef.current);
            setActive({ project: item.project, number: item.number, href: item.href, left, top });
        },
        [placementFor]
    );

    return (
        <section id="projects" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <span className="text-sm font-medium text-primary uppercase tracking-widest">Selected Work</span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold mt-3 text-slate-900 dark:text-slate-50">
                            Selected
                            <span className="gradient-text"> Work</span>
                        </h2>
                        <p className="mt-4 text-sm text-muted-foreground">
                            {PROJECTS.length} projects drifting by — hover a tile to bring it forward.
                        </p>
                    </div>
                </ScrollReveal>

                {/* The wall paints each project as a generated image tile and keeps
                    the write-up in a hover panel that only mounts on pointer-over,
                    so none of that text ever reaches the DOM. Crawlers, LLMs and
                    screen readers would otherwise see 14 bare names and nothing
                    else. This list is the readable copy of the same data — it is
                    not decorative duplication, it is the only text version. */}
                <ul className="sr-only">
                    {PROJECTS.map((project) => (
                        <li key={project.title}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <p>Built with {project.tech.join(", ")}.</p>
                            <p>Category: {project.category}.</p>
                            {project.liveLink && project.liveLink !== "#" && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                    View {project.title} live
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <ScrollReveal delay={0.1}>
                <div
                    ref={wrapRef}
                    onPointerMove={handleWrapPointerMove}
                    className="relative w-full h-[460px] sm:h-[560px] lg:h-[660px]"
                >
                    <DriftWall
                        className="projects-wall"
                        items={items}
                        onActiveChange={handleActiveChange}
                        columns={layout.columns}
                        tileWidth={layout.tileWidth}
                        tileHeight={layout.tileHeight}
                        gap={layout.gap}
                        radius={16}
                        // Gentler than the upstream defaults: a hard pitch/yaw skews
                        // the titles, which now carry the content.
                        tilt={9}
                        turn={-7}
                        perspective={1500}
                        depth={80}
                        speed={30}
                        direction="up"
                        variance={0.4}
                        parallax={0.45}
                        lift={56}
                        fade={0.45}
                        dim={isDark ? 0.72 : 0.9}
                        overlayColor={isDark ? "rgba(2, 6, 23, 0.6)" : "rgba(255, 255, 255, 0.35)"}
                    />

                    <AnimatePresence>
                        {active && (
                            <motion.div
                                // A stable key: moving between cards swaps the
                                // panel's content in place rather than remounting
                                // it, so no two panels ever overlap mid-transition.
                                key="project-detail"
                                ref={panelRef}
                                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                                style={{ left: active.left, top: active.top }}
                                // Non-interactive: reaching for it would leave the
                                // tile and dismiss it. The tile itself is the link.
                                className="pointer-events-none absolute z-20 w-80 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-2xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/95"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2.5 py-1 rounded-full bg-sky-50 border border-slate-200 text-[11px] font-semibold text-slate-700 dark:bg-sky-500/10 dark:border-sky-500/30 dark:text-sky-200">
                                        {String(active.number).padStart(2, "0")}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-sky-50 border border-slate-200 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                                        {active.project.category}
                                    </span>
                                </div>

                                <h3 className="text-lg font-poppins font-semibold text-slate-900 dark:text-slate-50">
                                    {active.project.title}
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground">{active.project.description}</p>

                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {active.project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="px-2.5 py-1 text-xs rounded-md bg-gray-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {active.href && (
                                    <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary">
                                        <ExternalLink className="w-3.5 h-3.5" /> Click to open the live demo
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </ScrollReveal>
        </section>
    );
}
