import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

export default function ThemeToggle({ className = "" }) {
    const { toggleTheme } = useTheme();

    // Which icon shows is driven by the `dark` class rather than JS state, so the
    // server and client render identical markup and hydration stays clean.
    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`relative flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shrink-0 ${className}`}
        >
            <Sun className="w-5 h-5 text-amber-400 hidden dark:block" />
            <Moon className="w-5 h-5 text-slate-700 block dark:hidden" />
        </button>
    );
}
