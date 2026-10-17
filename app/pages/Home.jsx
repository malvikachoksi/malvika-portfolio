import GradientBackground from "@/components/portfolio/GradientBackground";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Journey from "@/components/portfolio/Journey";
import Projects from "@/components/portfolio/Projects";
import Education from "@/components/portfolio/Education";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

export default function Home() {
    return (
        <div className="min-h-screen font-inter">
            <GradientBackground />
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Journey />
            <Projects />
            <Education />
            <Contact />
            <Footer />
        </div>
    );
}