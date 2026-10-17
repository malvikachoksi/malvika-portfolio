import { motion } from "framer-motion";
import { Code2, Palette, Smartphone, Layers, Server } from "lucide-react";
import { SERVICES } from "@/lib/portfolioData";
import ScrollReveal from "./ScrollReveal";

const iconMap = { Code2, Palette, Smartphone, Layers, Server };

export default function Services() {
    return (
        <section id="services" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="text-sm font-medium text-primary uppercase tracking-widest">What I Build</span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold mt-3 text-slate-900">
                            What I
                            <span className="gradient-text"> Build</span>
                        </h2>
                    </div>
                </ScrollReveal>

                {/* Bento Grid */}
                <div className="grid md:grid-cols-3 gap-4">
                    {SERVICES.map((service, i) => {
                        const Icon = iconMap[service.icon];
                        const isLarge = service.size === "large";
                        const isMedium = service.size === "medium";

                        return (
                            <ScrollReveal
                                key={service.title}
                                delay={i * 0.1}
                                className={isLarge ? "md:col-span-2 md:row-span-2" : isMedium ? "md:col-span-1" : ""}
                            >
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className={`relative h-full rounded-3xl bg-white border border-slate-200 shadow-sm p-8 overflow-hidden group hover:border-sky-300 transition-all duration-500 hover:shadow-xl hover:shadow-sky-100 ${isLarge ? "flex flex-col justify-between min-h-[280px]" : ""
                                        }`}
                                >
                                    {/* Glow effect */}
                                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-sky-100/60 blur-3xl group-hover:bg-sky-200/60 transition-all duration-700 group-hover:w-48 group-hover:h-48" />

                                    <div className="relative">
                                        <div className="p-3 rounded-2xl bg-sky-50 text-sky-500 w-fit mb-5 group-hover:bg-sky-100 group-hover:-rotate-6 transition-all duration-300">
                                            {Icon && <Icon className={`${isLarge ? "w-7 h-7" : "w-5 h-5"}`} />}
                                        </div>
                                        <h3 className={`font-poppins font-semibold mb-3 ${isLarge ? "text-2xl" : "text-lg"}`}>
                                            {service.title}
                                        </h3>
                                        <p className={`text-muted-foreground leading-relaxed ${isLarge ? "text-base max-w-md" : "text-sm"}`}>
                                            {service.description}
                                        </p>
                                    </div>

                                    {isLarge && (
                                        <div className="relative mt-6 flex items-center gap-3">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map((j) => (
                                                    <div key={j} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 border-2 border-background" />
                                                ))}
                                            </div>
                                            <span className="text-sm text-muted-foreground">15+ projects delivered</span>
                                        </div>
                                    )}
                                </motion.div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}