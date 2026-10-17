import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, index }) {
    const ref = useRef(null);
    const mvX = useMotionValue(0);
    const mvY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 18 });
    const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 18 });

    const handleMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        mvX.set((e.clientX - rect.left) / rect.width - 0.5);
        mvY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const reset = () => { mvX.set(0); mvY.set(0); };

    return (
        <motion.article
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
            whileHover={{ y: -8 }}
            className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-2xl hover:shadow-sky-100/60 transition-shadow duration-500 will-change-transform h-full"
        >
            <div className="p-6 flex flex-col h-full">
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-sky-50 border border-slate-200 text-[11px] font-semibold text-slate-700 shadow-sm">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-sky-50 border border-slate-200 text-[11px] font-medium text-slate-600 shadow-sm">
                            {project.category}
                        </span>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gray-100 border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-45 transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                    </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-poppins font-semibold mb-2 text-slate-900 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            className="px-2.5 py-1 text-xs rounded-md bg-gray-100 text-slate-600 border border-slate-200 group-hover:border-sky-200 group-hover:text-sky-600 transition-colors duration-300"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-2">
                    <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                    <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-4 rounded-xl bg-gray-100 border border-slate-200 hover:bg-gray-200 transition-colors text-slate-700"
                    >
                        <Github className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </motion.article>
    );
}