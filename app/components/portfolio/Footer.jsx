import { PERSONAL_INFO, NAV_LINKS } from "@/lib/portfolioData";

export default function Footer() {
    const handleNavClick = (href) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer className="border-t border-slate-200 bg-white py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-10 mb-10">
                    {/* Brand */}
                    <div>
                        <div className="text-2xl font-poppins font-bold gradient-text mb-3">
                            {PERSONAL_INFO.name.split(" ")[0]}<span className="text-foreground">.</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            {PERSONAL_INFO.subtitle}. Always exploring new technologies and pushing the boundaries of web development.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                    className="relative text-sm text-slate-500 hover:text-slate-900 transition-colors py-1 w-fit after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Let's Connect</h3>
                        <p className="text-sm text-muted-foreground mb-2">{PERSONAL_INFO.email}</p>
                        <p className="text-sm text-muted-foreground">{PERSONAL_INFO.location}</p>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">

                </div>
            </div>
        </footer>
    );
}