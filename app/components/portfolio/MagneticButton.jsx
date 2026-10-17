import { useRef } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({ children, className = "", strength = 0.3, as = "a", ...props }) {
    const ref = useRef(null);

    const handleMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const reset = () => {
        if (ref.current) ref.current.style.transform = "translate(0,0)";
    };

    const MotionTag = motion[as] || motion.a;

    return (
        <MotionTag
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            className={`transition-all duration-300 ease-out will-change-transform inline-block ${className}`}
            {...props}
        >
            {children}
        </MotionTag>
    );
}