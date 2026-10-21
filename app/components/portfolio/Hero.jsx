import { motion } from "framer-motion";
import {
    ArrowDown, Github, Linkedin, Code2, Palette, Smartphone,
    Database, Terminal, GitBranch, Cpu, Globe, Layers, Braces, Boxes,
    Zap, Component, Server, Rocket, PenTool, MonitorSmartphone,
} from "lucide-react";
import { PERSONAL_INFO, STATS } from "@/lib/portfolioData";
import ScrollReveal from "./ScrollReveal";

// Scattered tech glyphs behind the hero — a backdrop, not prominent cards, so
// the centred content stays the focus.
//
// Light and dark need different alphas to land at the same perceived weight:
// the same value that reads on near-black disappears on a light wash. These sit
// at ~2.0:1 and ~2.3:1 against their backgrounds — present, but well below the
// headline. (The previous slate values measured 1.19:1 in BOTH themes, i.e.
// effectively invisible.)
const BG_ICONS = [
    { icon: Code2, pos: "top-[10%] left-[6%]", size: "w-9 h-9", delay: 0.05 },
    { icon: Smartphone, pos: "top-[16%] right-[8%]", size: "w-8 h-8", delay: 0.1 },
    { icon: Braces, pos: "top-[26%] left-[14%]", size: "w-7 h-7", delay: 0.15 },
    { icon: Database, pos: "top-[30%] right-[16%]", size: "w-9 h-9", delay: 0.2 },
    { icon: Terminal, pos: "top-[44%] left-[4%]", size: "w-8 h-8", delay: 0.25 },
    { icon: GitBranch, pos: "top-[40%] right-[5%]", size: "w-7 h-7", delay: 0.3 },
    { icon: Palette, pos: "top-[56%] left-[10%]", size: "w-9 h-9", delay: 0.35 },
    { icon: Layers, pos: "top-[60%] right-[12%]", size: "w-8 h-8", delay: 0.4 },
    { icon: Cpu, pos: "bottom-[18%] left-[7%]", size: "w-8 h-8", delay: 0.45 },
    { icon: Globe, pos: "bottom-[14%] right-[7%]", size: "w-9 h-9", delay: 0.5 },
    { icon: Boxes, pos: "bottom-[8%] left-[16%]", size: "w-7 h-7", delay: 0.55 },
    { icon: Component, pos: "bottom-[10%] right-[18%]", size: "w-8 h-8", delay: 0.6 },
    { icon: Zap, pos: "top-[20%] left-[26%]", size: "w-6 h-6", delay: 0.5 },
    { icon: Server, pos: "top-[24%] right-[28%]", size: "w-6 h-6", delay: 0.55 },
    { icon: Rocket, pos: "bottom-[24%] left-[24%]", size: "w-6 h-6", delay: 0.6 },
    { icon: MonitorSmartphone, pos: "bottom-[22%] right-[26%]", size: "w-7 h-7", delay: 0.65 },
    { icon: PenTool, pos: "top-[50%] left-[22%]", size: "w-6 h-6", delay: 0.45 },
];

const TechField = () => (
    <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        {BG_ICONS.map(({ icon: Icon, pos, size, delay }, i) => (
            <motion.div
                key={i}
                className={`absolute ${pos} text-sky-600/55 dark:text-sky-400/40`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, -8, 0] }}
                transition={{
                    opacity: { delay, duration: 0.8 },
                    y: { duration: 5 + (i % 4), delay, repeat: Infinity, ease: "easeInOut" },
                }}
            >
                <Icon className={size} strokeWidth={1.75} />
            </motion.div>
        ))}
    </div>
);

export default function Hero() {
    return (
        <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-20 pb-16 relative overflow-hidden">
            {/* Faint scattered tech-glyph backdrop */}
            <TechField />

            <div className="max-w-4xl mx-auto px-6 w-full flex flex-col items-center text-center relative z-10">

                {/* Availability badge */}
                <ScrollReveal>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-6">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        {PERSONAL_INFO.availability}
                    </div>
                </ScrollReveal>

                {/* Main heading */}
                <ScrollReveal delay={0.1}>
                    <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-8xl font-poppins font-bold leading-[1.05] mb-5">
                        {/* The visible greeting drops the surname and the role, which
                            are the two things this page most needs to rank for. Lead
                            the h1 with the full phrase for crawlers and screen
                            readers, then hide the greeting from assistive tech so it
                            is not announced twice. */}
                        <span className="sr-only">
                            {PERSONAL_INFO.name} — {PERSONAL_INFO.title}
                        </span>
                        <span aria-hidden="true">
                            Hi, I'm{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-500 to-rose-400">
                                {PERSONAL_INFO.name.split(" ")[0]}
                            </span>
                        </span>
                    </h1>
                </ScrollReveal>

                {/* Subtitle row */}
                <ScrollReveal delay={0.2}>
                    <p className="text-2xl sm:text-3xl lg:text-4xl text-slate-700 font-medium mb-6">
                        I build digital experiences.
                    </p>
                </ScrollReveal>

                {/* Bio */}
                <ScrollReveal delay={0.3}>
                    <p className="text-base lg:text-lg text-slate-500 max-w-xl mb-10 leading-relaxed">
                        {PERSONAL_INFO.tagline}
                    </p>
                </ScrollReveal>

                {/* CTA Buttons */}
                <ScrollReveal delay={0.4}>
                    <div className="flex flex-wrap justify-center gap-4 mb-10">
                        <a
                            href="#projects"
                            onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                            className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold text-base hover:from-sky-600 hover:to-cyan-600"
                        >
                            View My Work
                        </a>
                        <a
                            href="#contact"
                            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                            className="inline-block px-8 py-3.5 rounded-xl bg-white border-2 border-slate-300 text-slate-700 font-semibold text-base hover:bg-sky-50 hover:border-sky-400 hover:text-sky-600 transition-colors dark:border-slate-700 dark:hover:border-sky-500"
                        >
                            Contact Me
                        </a>
                    </div>
                </ScrollReveal>

                {/* Social icons with labels */}
                <ScrollReveal delay={0.5}>
                    <div className="flex items-center gap-5 text-slate-600 mb-16">
                        {[
                            { icon: Github, href: PERSONAL_INFO.social.github, label: "GitHub" },
                            { icon: Linkedin, href: PERSONAL_INFO.social.linkedin, label: "LinkedIn" }
                        ].map(({ icon: Icon, href, label }, i) => (
                            <div key={label} className="flex items-center gap-5">
                                {i > 0 && <span className="text-slate-300">|</span>}
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    <Icon className="w-5 h-5" />
                                    {label}
                                </a>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Stats */}
                <ScrollReveal delay={0.6} className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                        {STATS.map((stat) => (
                            <motion.div
                                key={stat.label}
                                className="p-5 rounded-2xl bg-white border border-slate-200 ring-1 ring-slate-900/5 shadow-lg shadow-slate-900/[0.07] text-center hover:shadow-xl hover:shadow-sky-500/15 hover:border-sky-300 transition-all duration-300 dark:ring-white/5"
                                whileHover={{ y: -4, scale: 1.02 }}
                            >
                                <div className="text-2xl sm:text-3xl font-poppins font-bold gradient-text mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Scroll indicator */}
                <motion.div
                    className="mt-12"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <a
                        href="#about"
                        onClick={(e) => { e.preventDefault(); document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }); }}
                        className="p-2 rounded-full bg-gray-100 border border-slate-200 text-slate-400 hover:text-sky-500 transition-colors inline-block"
                    >
                        <ArrowDown className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}