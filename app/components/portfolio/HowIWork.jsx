import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { PROCESS } from "@/lib/portfolioData";
import ScrollReveal from "./ScrollReveal";

const iconMap = { Search, PenTool, Code2, Rocket };

export default function HowIWork() {
    return (
        <section id="process" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="text-sm font-medium text-primary uppercase tracking-widest">How I Work</span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold mt-3 text-slate-900">
                            My<span className="gradient-text"> process</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PROCESS.map((p, i) => {
                        const Icon = iconMap[p.icon];
                        return (
                            <ScrollReveal key={p.step} delay={i * 0.1}>
                                <motion.div
                                    whileHover={{ y: -6 }}
                                    className="relative h-full p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="p-3 rounded-2xl bg-sky-50 text-sky-500">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-3xl font-poppins font-bold text-slate-100">{p.step}</span>
                                    </div>
                                    <h3 className="text-lg font-poppins font-semibold mb-2 text-slate-900">{p.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                                </motion.div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}