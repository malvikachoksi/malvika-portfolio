import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { SKILLS } from "@/lib/portfolioData";
import { getTech } from "@/lib/techIcons";
import { useTheme } from "@/lib/ThemeContext";
import ScrollReveal from "./ScrollReveal";

// Deterministic 0..1 from an index — Math.random would reshuffle the cloud on
// every render and fight React's reconciliation.
const noise = (i, salt) => {
    const x = Math.sin((i + 1) * 127.1 + salt * 311.7) * 43758.5453;
    return x - Math.floor(x);
};

const ALL_TECHS = (() => {
    const seen = new Set();
    const flat = [];
    for (const group of SKILLS) {
        for (const item of group.items) {
            // Docker and Nginx are listed under both Tools and DevOps.
            if (seen.has(item)) continue;
            seen.add(item);
            flat.push(item);
        }
    }

    // Seeded shuffle: without it the cloud reads as contiguous category blocks,
    // and same-logo pairs (React.js / React Native) land side by side.
    for (let i = flat.length - 1; i > 0; i--) {
        const j = Math.floor(noise(i, 7) * (i + 1));
        [flat[i], flat[j]] = [flat[j], flat[i]];
    }
    return flat;
})();

const columnsFor = (width) => (width < 640 ? 6 : width < 1024 ? 9 : 11);

/**
 * Scatter items on a jittered grid: organic-looking, but the cell structure
 * keeps bubbles apart. Jitter shrinks as columns grow, since dense grids have
 * less slack between neighbours.
 */
function scatter(items, cols) {
    const n = items.length;
    if (!n) return [];

    const rows = Math.ceil(n / cols);
    const jx = Math.min(0.4, 2.2 / cols);
    const jy = Math.min(0.42, 2.4 / rows);

    return items.map((name, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        // Centre a short final row instead of leaving it hanging left.
        const inRow = Math.min(cols, n - row * cols);
        const rowOffset = (cols - inRow) / 2;
        const depth = noise(i, 3);

        return {
            name,
            depth,
            left: ((col + rowOffset + 0.5) / cols) * 100 + (noise(i, 1) - 0.5) * (100 / cols) * jx,
            top: ((row + 0.5) / rows) * 100 + (noise(i, 2) - 0.5) * (100 / rows) * jy,
            // Each bubble peaks at a slightly different scroll point, so the
            // field arrives in layers rather than as one flat pulse.
            mid: 0.4 + depth * 0.2,
            duration: 4 + noise(i, 4) * 3.5,
            delay: noise(i, 5) * 2.5,
            drift: 5 + noise(i, 6) * 6,
        };
    });
}

function Bubble({ node, isDark, reduced, progress }) {
    const { Icon, color, dark, label } = getTech(node.name);
    const tint = (isDark && dark) || color;
    const flip = node.top > 66;

    // Depth: far and faint at the edges of the section's scroll, near and solid
    // as it passes through the viewport.
    const scale = useTransform(progress, [0, node.mid, 1], [0.6 + node.depth * 0.16, 1 + node.depth * 0.3, 0.6 + node.depth * 0.16]);
    const opacity = useTransform(progress, [0, node.mid, 1], [0.28 + node.depth * 0.22, 1, 0.28 + node.depth * 0.22]);

    return (
        <li
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.left}%`, top: `${node.top}%` }}
        >
            <motion.div style={reduced ? undefined : { scale, opacity }}>
                <motion.div
                    animate={reduced ? undefined : { y: [0, -node.drift, 0] }}
                    transition={
                        reduced
                            ? undefined
                            : { duration: node.duration, delay: node.delay, repeat: Infinity, ease: "easeInOut" }
                    }
                    whileHover={{ scale: 1.25 }}
                    className="group relative"
                >
                    <div
                        className="grid place-items-center rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-900/5 transition-colors duration-300 group-hover:border-sky-300"
                        style={{ width: "var(--bubble)", height: "var(--bubble)" }}
                    >
                        {Icon ? (
                            // Rest desaturated (clean monochrome chip); full brand
                            // colour returns on hover.
                            <span
                                aria-hidden="true"
                                className="[filter:grayscale(0.9)] transition-[filter] duration-300 group-hover:[filter:grayscale(0)]"
                                style={{ color: tint, fontSize: "calc(var(--bubble) * 0.44)" }}
                            >
                                <Icon />
                            </span>
                        ) : (
                            <span
                                aria-hidden="true"
                                className="font-poppins font-bold text-primary"
                                style={{ fontSize: "calc(var(--bubble) * 0.3)" }}
                            >
                                {label}
                            </span>
                        )}
                    </div>

                    {/* Present in the DOM for screen readers; revealed on hover. */}
                    <span
                        className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 ${flip ? "bottom-full mb-2" : "top-full mt-2"} whitespace-nowrap rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-700 border border-slate-200 shadow-md opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
                    >
                        {node.name}
                    </span>
                </motion.div>
            </motion.div>
        </li>
    );
}

export default function Skills() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const canvasRef = useRef(null);
    const [cols, setCols] = useState(11);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduced(mq.matches);
        const onMotion = (e) => setReduced(e.matches);
        mq.addEventListener("change", onMotion);

        const onResize = () => {
            const next = columnsFor(window.innerWidth);
            setCols((prev) => (prev === next ? prev : next));
        };
        onResize();
        window.addEventListener("resize", onResize);

        return () => {
            mq.removeEventListener("change", onMotion);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    const nodes = useMemo(() => scatter(ALL_TECHS, cols), [cols]);

    const { scrollYProgress } = useScroll({
        target: canvasRef,
        offset: ["start end", "end start"],
    });
    const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.001 });

    // One transform on the whole field spreads the bubbles outward as they come
    // near — the "moving through it" part — for the cost of a single element.
    const cloudScale = useTransform(progress, [0, 0.5, 1], [0.74, 1.06, 0.74]);

    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <span className="text-sm font-medium text-primary uppercase tracking-widest">My Toolkit</span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold mt-3 text-slate-900">
                            Technologies I
                            <span className="gradient-text"> work with</span>
                        </h2>
                        <p className="mt-4 text-sm text-muted-foreground">
                            {ALL_TECHS.length} technologies — hover any one to name it.
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                    <div
                        ref={canvasRef}
                        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl glass [--bubble:30px] sm:[--bubble:42px] lg:[--bubble:52px] h-[560px] sm:h-[620px] lg:h-[700px]"
                    >
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-25"
                            style={{
                                backgroundImage: "radial-gradient(rgb(148 163 184 / 0.5) 1px, transparent 1px)",
                                backgroundSize: "22px 22px",
                            }}
                        />

                        <motion.ul
                            role="list"
                            aria-label="Technologies I work with"
                            style={reduced ? undefined : { scale: cloudScale }}
                            className="absolute inset-8 sm:inset-12 m-0 list-none p-0"
                        >
                            {nodes.map((node) => (
                                <Bubble
                                    key={node.name}
                                    node={node}
                                    isDark={isDark}
                                    reduced={reduced}
                                    progress={progress}
                                />
                            ))}
                        </motion.ul>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
