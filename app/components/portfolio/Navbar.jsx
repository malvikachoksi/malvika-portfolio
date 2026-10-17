import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/portfolioData";
import ThemeToggle from "@/components/portfolio/ThemeToggle";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            const sections = NAV_LINKS.map(l => l.href.replace("#", ""));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.getBoundingClientRect().top <= 120) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const handleNavClick = (href) => {
        setMobileOpen(false);
        setTimeout(() => {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                        ? "py-2 sm:py-3 backdrop-blur-2xl bg-white/90 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 shadow-sm"
                        : "py-4 sm:py-5 bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
                        className="text-xl font-poppins font-bold gradient-text shrink-0"
                    >
                        {PERSONAL_INFO.name.split(" ")[0]}
                        <span className="text-foreground">.</span>
                    </a>

                    {/* Desktop Nav — hidden on mobile/tablet */}
                    <div className="hidden lg:flex items-center gap-1">
                        {NAV_LINKS.map((link) => {
                            const section = link.href.replace("#", "");
                            const isActive = activeSection === section;
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${isActive ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-sky-50 dark:bg-sky-500/10 rounded-full border border-sky-200 dark:border-sky-500/30"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </a>
                            );
                        })}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Theme toggle */}
                        <ThemeToggle />

                        {/* CTA — desktop only */}
                        <a
                            href="#contact"
                            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                            className="hidden lg:inline-flex px-5 py-2 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                        >
                            Let's Talk
                        </a>

                        {/* Tablet CTA — shown on md screens */}
                        <a
                            href="#contact"
                            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                            className="hidden md:inline-flex lg:hidden px-4 py-2 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                        >
                            Hire Me
                        </a>

                        {/* Hamburger — shown below lg */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            <Menu className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Full-screen mobile / tablet menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                        />

                        {/* Slide-in drawer from right */}
                        <motion.div
                            key="drawer"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 bottom-0 z-50 w-72 sm:w-80 bg-white dark:bg-slate-900 shadow-2xl flex flex-col lg:hidden"
                        >
                            {/* Drawer header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-lg font-poppins font-bold gradient-text">
                                    {PERSONAL_INFO.name.split(" ")[0]}<span className="text-foreground">.</span>
                                </span>
                                <div className="flex items-center gap-2">
                                    <ThemeToggle className="w-9 h-9" />
                                    <button
                                        onClick={() => setMobileOpen(false)}
                                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
                                    >
                                        <X className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                                    </button>
                                </div>
                            </div>

                            {/* Nav links */}
                            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                                {NAV_LINKS.map((link, i) => {
                                    const section = link.href.replace("#", "");
                                    const isActive = activeSection === section;
                                    return (
                                        <motion.a
                                            key={link.href}
                                            href={link.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.06 }}
                                            onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                                    ? "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/30"
                                                    : "text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                                                }`}
                                        >
                                            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />}
                                            {link.label}
                                        </motion.a>
                                    );
                                })}
                            </nav>

                            {/* Drawer footer CTA */}
                            <div className="px-4 py-6 border-t border-slate-100 dark:border-slate-800">
                                <a
                                    href="#contact"
                                    onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                                    className="block w-full text-center py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                                >
                                    Let's Talk
                                </a>
                                <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-3">{PERSONAL_INFO.email}</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}