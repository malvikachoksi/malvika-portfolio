"use client";

import { ThemeProvider } from "@/lib/ThemeContext";
import Home from "./pages/Home";

export default function Page() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
