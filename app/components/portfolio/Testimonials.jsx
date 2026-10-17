import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/portfolioData";
import ScrollReveal from "./ScrollReveal";

export default function Testimonials() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((current + 1) % TESTIMONIALS.length);
    const prev = () => setCurrent((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

    return (
        <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="text-sm font-medium text-primary uppercase tracking-widest">Testimonials</span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold mt-3 text-slate-900">
                            What clients
                            <span className="gradient-text"> say</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                    <div className="max-w-3xl mx-auto">
                        <div className="relative p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                            {/* Background glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-sky-100/50 blur-3xl" />

                            <Quote className="w-10 h-10 text-primary/20 mb-6" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <p className="text-lg sm:text-xl leading-relaxed text-slate-600 mb-8">
                                        "{TESTIMONIALS[current].content}"
                                    </p>

                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                                                {TESTIMONIALS[current].name[0]}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-900">{TESTIMONIALS[current].name}</div>
                                                <div className="text-sm text-muted-foreground">{TESTIMONIALS[current].role}</div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-1">
                                            <div className="flex gap-0.5">
                                                {Array(TESTIMONIALS[current].rating).fill(0).map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                                ))}
                                            </div>
                                            <span className="text-xs text-primary font-medium">{TESTIMONIALS[current].metric}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation */}
                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                                <div className="flex gap-2">
                                    {TESTIMONIALS.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrent(i)}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-sky-500" : "w-4 bg-slate-200 hover:bg-slate-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={prev}
                                        className="p-2 rounded-full bg-gray-100 border border-slate-200 hover:bg-gray-200 transition-colors text-slate-600"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={next}
                                        className="p-2 rounded-full bg-gray-100 border border-slate-200 hover:bg-gray-200 transition-colors text-slate-600"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}