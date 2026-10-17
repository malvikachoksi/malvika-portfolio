import { motion } from "framer-motion";

// Light and dark need very different glow alphas: a 0.10 wash reads clearly
// against near-black but vanishes against a light page, so each is tuned
// separately through custom properties rather than sharing one value.
const SHELL = [
    "fixed top-0 left-0 right-0 h-screen -z-10 overflow-hidden",
    "bg-[#e9f0f9] dark:bg-slate-950",
    "[--glow-a:rgba(14,165,233,0.18)] dark:[--glow-a:rgba(14,165,233,0.12)]",
    "[--glow-b:rgba(6,182,212,0.15)] dark:[--glow-b:rgba(6,182,212,0.10)]",
    "[--glow-c:rgba(139,92,246,0.20)] dark:[--glow-c:rgba(139,92,246,0.10)]",
    "[--dot:#94a3b8] dark:[--dot:#64748b]",
].join(" ");

export default function GradientBackground() {
    return (
        <div className={SHELL}>
            {/* Tinted base wash. The old flat neutral grey gave the light theme no
                hue at all, which flattened every brand colour sitting on top. */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f7fafd] via-[#e9f1fa] to-[#dde8f5] dark:hidden" />

            {/* Dot grid */}
            <div
                className="absolute inset-0 opacity-[0.16] dark:opacity-[0.14]"
                style={{
                    backgroundImage: "radial-gradient(circle, var(--dot) 1px, transparent 1px)",
                    backgroundSize: "34px 34px",
                }}
            />

            {/* Drifting glows — three of them, so the field has depth instead of
                one centred blob. */}
            <motion.div
                className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, var(--glow-a), transparent 62%)" }}
                animate={{ x: ["-8%", "8%", "-8%"], y: ["0%", "6%", "0%"] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-1/4 -right-[10vw] w-[46vw] h-[46vw] rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, var(--glow-b), transparent 65%)" }}
                animate={{ x: ["4%", "-6%", "4%"], y: ["-4%", "6%", "-4%"] }}
                transition={{ duration: 23, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -bottom-[14vw] -left-[8vw] w-[44vw] h-[44vw] rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, var(--glow-c), transparent 65%)" }}
                animate={{ x: ["-4%", "7%", "-4%"], y: ["3%", "-5%", "3%"] }}
                transition={{ duration: 27, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Very subtle noise */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
                <filter id="noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
        </div>
    );
}
