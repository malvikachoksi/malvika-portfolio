import { motion } from "framer-motion";
import { Calendar, GraduationCap } from "lucide-react";
import { EDUCATION } from "@/lib/portfolioData";
import ScrollReveal from "./ScrollReveal";

// The data is stored newest-first (MSc → HSC). The rail reads left-to-right as a
// progression, so it runs the other way: earliest qualification first.
const STEPS = [...EDUCATION].reverse();

export default function Education() {
    return (
        <section id="education" className="py-24 relative">
            <div className="max-w-6xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="text-sm font-medium text-primary uppercase tracking-widest">My Education</span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold mt-3 text-slate-900">
                            Education
                            <span className="gradient-text"> background</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="relative">
                    {/* Rail track. Inset to roughly the centre of the first and last
                        columns so it starts and ends under a node. */}
                    <div className="hidden md:block absolute left-[16%] right-[16%] top-[7px] h-0.5 rounded-full bg-slate-200 dark:bg-slate-800">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full w-full origin-left rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-400"
                        />
                    </div>

                    <div className="grid gap-8 md:grid-cols-3 md:gap-6 items-stretch">
                        {STEPS.map((edu, i) => (
                            <ScrollReveal
                                key={edu.degree + edu.institution}
                                delay={0.15 + i * 0.12}
                                className="h-full"
                            >
                                <div className="flex h-full flex-col">
                                    {/* Node on the rail, plus a tick down to the card */}
                                    <div className="hidden md:flex flex-col items-center">
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true, margin: "-80px" }}
                                            transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.3 + i * 0.12 }}
                                            className="relative z-10 block h-4 w-4 rounded-full border-4 border-white bg-gradient-to-br from-sky-500 to-cyan-400 shadow-sm"
                                        />
                                        <span className="h-6 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />
                                    </div>

                                    <motion.div
                                        whileHover={{ y: -4 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                        className="group flex flex-1 flex-col rounded-2xl bg-white border border-slate-200 p-6 shadow-sm transition-colors duration-300 hover:border-sky-300 hover:shadow-lg"
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="p-3 rounded-xl bg-sky-50 text-sky-500 transition-colors duration-300 group-hover:bg-sky-100">
                                                <GraduationCap className="w-5 h-5" />
                                            </div>
                                            <span className="font-poppins text-2xl font-bold text-slate-200 dark:text-slate-700 transition-colors duration-300 group-hover:text-sky-200 dark:group-hover:text-sky-900">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-poppins font-semibold text-slate-900">{edu.degree}</h3>
                                        <div className="mt-1 text-sm font-medium text-primary">{edu.institution}</div>

                                        {edu.dates && (
                                            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                                                {edu.dates}
                                            </div>
                                        )}

                                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{edu.description}</p>

                                        {/* Pinned to the card foot so the grade rows line up across
                                            columns. Hidden entirely when no grade is recorded. */}
                                        {(edu.sgpa || edu.cgpa) && (
                                            <div className="mt-auto flex flex-wrap gap-2 border-t border-slate-200 pt-4">
                                                {[
                                                    ["SGPA", edu.sgpa],
                                                    ["CGPA", edu.cgpa],
                                                ]
                                                    .filter(([, value]) => value)
                                                    .map(([label, value]) => (
                                                        <div
                                                            key={label}
                                                            className="flex items-baseline gap-1.5 rounded-lg bg-sky-50 border border-sky-200 px-3 py-1.5"
                                                        >
                                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                                                                {label}
                                                            </span>
                                                            <span className="text-sm font-bold text-slate-900">{value}</span>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
