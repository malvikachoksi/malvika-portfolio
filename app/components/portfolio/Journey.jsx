import { useRef } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { EXPERIENCE } from "@/lib/portfolioData";
import ScrollReveal from "./ScrollReveal";

function TimelineRow({ exp, index }) {
    const rowRef = useRef(null);
    // Fires once the row reaches roughly the vertical middle of the viewport,
    // which is about where the scroll-driven gradient line reaches its dot.
    const isActive = useInView(rowRef, { once: true, margin: "-50% 0px -45% 0px" });

    return (
        <div ref={rowRef} className="relative grid gap-3 sm:grid-cols-2 sm:gap-0">
            {/* Dot on the rail */}
            <div className="absolute left-5 top-1 z-10 -translate-x-1/2 sm:left-1/2">
                <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: isActive ? 1 : 0.45 }}
                    transition={{ type: "spring", stiffness: 320, damping: 20 }}
                    className="absolute inset-0 -m-2 rounded-full bg-sky-400/25 blur-[6px]"
                    aria-hidden="true"
                />
                <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className={`relative block h-4 w-4 rounded-full border-4 border-white shadow-sm transition-colors duration-500 ${
                        isActive
                            ? "bg-gradient-to-br from-sky-500 to-cyan-400"
                            : "bg-slate-300"
                    }`}
                />
            </div>

            {/* Meta — right-aligned into the rail on desktop */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="pl-16 sm:pl-0 sm:pr-14 sm:text-right"
            >
                <span className="text-sm font-semibold tracking-wide text-primary">
                    {exp.dates}
                </span>
                <h3 className="mt-1 font-poppins text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
                    {exp.role}
                </h3>
                <div className="mt-1 text-sm text-slate-500">{exp.company}</div>
            </motion.div>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="pl-16 sm:pl-14"
            >
                <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-sky-300 hover:shadow-lg"
                >
                    <p className="text-sm leading-relaxed text-slate-600">
                        {exp.description}
                    </p>
                </motion.div>
            </motion.div>

            <span className="sr-only">{`Position ${index + 1} of ${EXPERIENCE.length}`}</span>
        </div>
    );
}

export default function Journey() {
    const railRef = useRef(null);

    // Drives the gradient fill: 0 when the rail's top hits the viewport centre,
    // 1 when its bottom does.
    const { scrollYProgress } = useScroll({
        target: railRef,
        offset: ["start center", "end center"],
    });
    const progress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });
    const headTop = useTransform(progress, (v) => `${v * 100}%`);
    const headOpacity = useTransform(progress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

    return (
        <section id="journey" className="relative py-24">
            <div className="mx-auto max-w-5xl px-6">
                <ScrollReveal>
                    <div className="mb-16 text-center">
                        <span className="text-sm font-medium uppercase tracking-widest text-primary">
                            My Journey
                        </span>
                        <h2 className="mt-3 font-poppins text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
                            Experience
                            <span className="gradient-text"> timeline</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div ref={railRef} className="relative">
                    {/* Rail track */}
                    <div className="absolute bottom-0 left-5 top-0 w-[3px] -translate-x-1/2 rounded-full bg-slate-200 sm:left-1/2">
                        {/* Gradient fill, scaled by scroll progress */}
                        <motion.div
                            style={{ scaleY: progress }}
                            className="h-full w-full origin-top rounded-full bg-gradient-to-b from-sky-500 via-cyan-400 to-sky-400"
                        />
                        {/* Glowing head that rides the fill */}
                        <motion.div
                            style={{ top: headTop, opacity: headOpacity }}
                            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_4px_rgba(34,211,238,0.55)]"
                            aria-hidden="true"
                        />
                    </div>

                    <div className="space-y-16 sm:space-y-24">
                        {EXPERIENCE.map((exp, i) => (
                            <TimelineRow
                                key={exp.role + exp.company}
                                exp={exp}
                                index={i}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
