import { motion } from "framer-motion";
import { MapPin, Mail, Calendar, Download, Briefcase, Users, Code2 } from "lucide-react";
import { PERSONAL_INFO, STATS } from "@/lib/portfolioData";
import ScrollReveal from "./ScrollReveal";

const infoCards = [
    { icon: MapPin, label: "Location", value: "Surat, Gujarat" },
    { icon: Mail, label: "Email", value: PERSONAL_INFO.email },
    { icon: Calendar, label: "Availability", value: PERSONAL_INFO.availability }];


const techBadges = [
    "React.js", "TypeScript", "Next.js", "React Native", "Node.js",
    "Tailwind CSS", "Redux Toolkit", "Prisma", "MongoDB", "Docker"];


export default function About() {
    return (
        <section id="about" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="text-sm font-medium text-primary uppercase tracking-widest">About Me</span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold mt-3 text-slate-900">
                            Passionate about crafting
                            <span className="gradient-text block mt-1">digital experiences</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-5 gap-10">
                    {/* Bio */}
                    <div className="lg:col-span-3 space-y-6">
                        <ScrollReveal>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {PERSONAL_INFO.bio}
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <p className="text-slate-600 leading-relaxed">
                                At Olix Lab, I work across the stack: React and Next.js frontends, React Native apps with Expo,
                                and REST APIs with Node.js, Express, MongoDB and PostgreSQL. I care about clean, maintainable
                                code, performance and SEO, and I keep learning new tools to ship better products for users and
                                businesses.
                            </p>
                        </ScrollReveal>

                        {/* Tech Badges */}
                        <ScrollReveal delay={0.2}>
                            <div className="pt-4">
                                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Core Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {techBadges.map((tech) =>
                                        <motion.span
                                            key={tech}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            className="px-4 py-1.5 text-sm rounded-full bg-gray-100 border border-slate-200 text-slate-600 hover:text-sky-500 hover:border-sky-300 hover:bg-sky-50 transition-colors cursor-default">

                                            {tech}
                                        </motion.span>
                                    )}
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3}>
                            <a
                                href="/Malvika-Choksi-Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
                                <Download className="w-4 h-4" />
                                Download Resume
                            </a>
                        </ScrollReveal>
                    </div>

                    {/* Info Cards */}
                    <div className="lg:col-span-2 space-y-4">
                        {infoCards.map((card, i) =>
                            <ScrollReveal key={card.label} delay={i * 0.1} direction="right">
                                <motion.div
                                    whileHover={{ scale: 1.02, x: -4 }}
                                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all duration-300 group">

                                    <div className="flex items-start gap-4">
                                        <div className="p-2.5 rounded-xl bg-sky-50 text-sky-500 group-hover:bg-sky-100 transition-colors">
                                            <card.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground">{card.label}</div>
                                            <div className="font-medium mt-0.5 text-slate-900">{card.value}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </ScrollReveal>
                        )}

                        {/* Mini Stats */}
                        <ScrollReveal delay={0.3} direction="right">
                            <div className="grid grid-cols-3 gap-3 mt-2">
                                {STATS.slice(0, 3).map((stat) =>
                                    <motion.div
                                        key={stat.label}
                                        whileHover={{ y: -3 }}
                                        className="p-4 rounded-2xl bg-white border border-slate-200 text-center hover:border-sky-300 transition-all duration-300">

                                        <div className="text-xl font-poppins font-bold gradient-text">{stat.value}</div>
                                        <div className="text-xs text-muted-foreground mt-1">{stat.label.split(" ").pop()}</div>
                                    </motion.div>
                                )}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>);

}