import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Github, Linkedin, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/portfolioData";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle | sending | success | error
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === "sending") return;

        setStatus("sending");
        setErrorMessage("");
        try {
            // Delivery lives in app/api/contact/route.ts so the EmailJS keys
            // never reach the browser bundle.
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json().catch(() => ({}));

            if (!res.ok) throw new Error(data.error || "Request failed");

            setStatus("success");
            setForm({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setStatus("idle"), 4000);
        } catch (err) {
            console.error("Contact form send failed:", err);
            setErrorMessage(err.message);
            setStatus("error");
        }
    };

    const contactInfo = [
        { icon: Mail, label: "Email", value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
        { icon: MapPin, label: "Location", value: PERSONAL_INFO.location, href: null }
    ];

    const socials = [
        { icon: Github, href: PERSONAL_INFO.social.github, label: "GitHub" },
        { icon: Linkedin, href: PERSONAL_INFO.social.linkedin, label: "LinkedIn" },
    ];

    return (
        <section id="contact" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="text-sm font-medium text-primary uppercase tracking-widest">Get In Touch</span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold mt-3 text-slate-900">
                            Have an idea?
                            <span className="gradient-text"> Let's build it.</span>
                        </h2>
                        <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
                            Have a project in mind? I'd love to hear about it. Drop me a message and let's create something amazing.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
                    {/* Form */}
                    <ScrollReveal className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-slate-200 focus:border-sky-400 focus:bg-white outline-none transition-all duration-300 text-sm text-slate-800 placeholder:text-slate-400"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        required
                                        type="email"
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-slate-200 focus:border-sky-400 focus:bg-white outline-none transition-all duration-300 text-sm text-slate-800 placeholder:text-slate-400"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Subject</label>
                                <input
                                    required
                                    type="text"
                                    value={form.subject}
                                    onChange={e => setForm({ ...form, subject: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-slate-200 focus:border-sky-400 focus:bg-white outline-none transition-all duration-300 text-sm text-slate-800 placeholder:text-slate-400"
                                    placeholder="Project inquiry"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-slate-200 focus:border-sky-400 focus:bg-white outline-none transition-all duration-300 text-sm text-slate-800 placeholder:text-slate-400 resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={status === "sending"}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-70"
                            >
                                {status === "sending" && <Loader2 className="w-4 h-4 animate-spin" />}
                                {status === "success" && <CheckCircle2 className="w-4 h-4" />}
                                {status === "idle" && <Send className="w-4 h-4" />}
                                {status === "error" && <Send className="w-4 h-4" />}
                                {status === "sending" ? "Sending..." : status === "success" ? "Message Sent!" : status === "error" ? "Try Again" : "Send Message"}
                            </motion.button>

                            {status === "error" && (
                                <p className="flex items-center gap-2 text-sm text-red-600" role="alert">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {errorMessage || "Something went wrong."} Please email me directly at{" "}
                                    <a href={`mailto:${PERSONAL_INFO.email}`} className="underline font-medium">
                                        {PERSONAL_INFO.email}
                                    </a>
                                </p>
                            )}

                            {status === "success" && (
                                <p className="flex items-center gap-2 text-sm text-emerald-600" role="status">
                                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                                    Thanks! I&apos;ll get back to you soon.
                                </p>
                            )}
                        </form>
                    </ScrollReveal>

                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-5">
                        {contactInfo.map((item, i) => (
                            <ScrollReveal key={item.label} delay={i * 0.1} direction="right">
                                <motion.div
                                    whileHover={{ scale: 1.02, x: -4 }}
                                    className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-300 group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-sky-50 text-sky-500 group-hover:bg-sky-100 transition-colors">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground">{item.label}</div>
                                            {item.href ? (
                                                <a href={item.href} className="font-medium hover:text-primary transition-colors">
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <div className="font-medium">{item.value}</div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </ScrollReveal>
                        ))}

                        {/* Socials */}
                        <ScrollReveal delay={0.3} direction="right">
                            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Follow Me</h3>
                                <div className="flex gap-3">
                                    {socials.map(({ icon: Icon, href, label }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 border border-slate-200 text-slate-500 hover:text-sky-500 hover:border-sky-300 hover:bg-sky-50 transition-all duration-300 hover:scale-105 group"
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="text-sm hidden sm:inline">{label}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}