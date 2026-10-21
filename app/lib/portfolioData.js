export const PERSONAL_INFO = {
    name: "Malvika Choksi",
    title: "Frontend Developer",
    subtitle: "I build digital experiences.",
    tagline: "I craft pixel-perfect, accessible, and performant web applications that users love.",
    email: "malvikachoksi55@gmail.com",
    location: "Surat, Gujarat, India",
    availability: "Open to work",
    bio: "I'm Malvika Choksi, a Software Developer in Surat, India, with 2+ years of experience building fast, responsive and accessible web and mobile applications. I specialize in React, Next.js, TypeScript and Node.js, taking products from Figma designs to production-ready interfaces and the APIs behind them.",
    social: {
        github: "https://github.com/malvikachoksi",
        linkedin: "https://www.linkedin.com/in/malvika-choksi-303199241/",
        twitter: "https://twitter.com/malvikachoksi"
    }
};

export const STATS = [
    { label: "Experience", value: "2+", icon: "Calendar" },
    { label: "Projects", value: "15+", icon: "Briefcase" },
    { label: "Technologies", value: "10+", icon: "Code2" }
];

export const SKILLS = [
    { category: "Languages", items: ["JavaScript", "TypeScript", "HTML", "CSS / CSS3", "SQL", "Bash"] },
    { category: "Frameworks", items: ["React.js", "Next.js", "React Native", "Expo", "Node.js", "Express.js", "Tailwind CSS"] },
    { category: "Tools", items: ["Git", "GitHub", "Figma", "Docker", "Nginx", "Postman", "VS Code", "MongoDB Compass"] },
    { category: "Libraries", items: ["Redux", "Redux Toolkit", "React Hook Form", "Zod", "Prisma", "Axios", "Playwright", "Jest", "Vitest", "React Testing Library", "MUI (Material UI)", "BullMQ", "Socket.io"] },
    { category: "Database", items: ["MySQL", "PostgreSQL", "MongoDB", "Redis"] },
    { category: "DevOps / Deployment", items: ["Linux", "Docker", "Nginx", "VPS", "GitHub Actions", "AWS (Basics)"] },
    { category: "Other Technologies", items: ["REST API", "WebSocket", "JWT Authentication", "OAuth", "Stripe", "Firebase", "Sentry"] }
];

export const PROJECTS = [
    { title: "Cite Visit", description: "A site-visit management platform. I built the admin panel — the user list with multi-criteria filtering and the user profile views.", tech: ["React.js", "Node.js", "Express.js"], category: "Office Work", liveLink: "#", githubLink: "#" },
    { title: "Cloud Menu", description: "A platform where restaurant owners set up and manage their own digital menu, take customer orders, and generate table-specific QR codes for ordering.", tech: ["React Native", "Expo", "Node.js"], category: "Office Work", liveLink: "#", githubLink: "#" },
    { title: "Litigate Notifier", description: "A legal case management system for lawyers, with case tracking, a scheduling feature, and a calendar view of case details — plus client access to their own case information.", tech: ["React.js", "Node.js", "MongoDB"], category: "Office Work", liveLink: "#", githubLink: "#" },
    { title: "Nidan AI", description: "A health diagnostics platform with face-scan health reports and separate panels for doctors, patients, and individual users. I built the responsive landing page, focused on clean UI and performance.", tech: ["Next.js", "Tailwind CSS", "Framer Motion"], category: "Office Work", liveLink: "https://nidan.ai/", githubLink: "#" },
    { title: "E-comm SaaS", description: "A Shopify-style SaaS for diamond jewellery businesses to build and run their own store. I built the admin panel — product creation workflows, product details, images and pricing, and the dashboard UI.", tech: ["React.js", "Redux", "Node.js"], category: "Office Work", liveLink: "#", githubLink: "#" },
    { title: "Welcome Cure", description: "A healthcare platform giving users abroad one month of online health services, with country-wise registration for location-based options. I built the registration and health service interfaces.", tech: ["React.js", "Node.js", "MongoDB"], category: "Office Work", liveLink: "#", githubLink: "#" },
    { title: "ezUTM Manager", description: "A social media link management and analytics platform. I built the dashboard that tracks click activity and surfaces per-link performance insights.", tech: ["React.js", "Node.js", "PostgreSQL"], category: "Office Work", liveLink: "#", githubLink: "#" },
    { title: "Hostsailor", description: "A hosting services website with plan comparison and signup.", tech: ["Next.js", "Tailwind CSS", "Stripe"], category: "Office Work", liveLink: "https://hostsailor.com/", githubLink: "#" },
    { title: "Huch-Pay", description: "A digital payments and wallet application.", tech: ["React.js", "Node.js", "Stripe"], category: "Office Work", liveLink: "https://huch.tech/", githubLink: "#" },
    { title: "Manekvar", description: "An e-commerce and product catalog platform.", tech: ["React.js", "Redux", "MongoDB"], category: "Office Work", liveLink: "https://manekvar-frontend.vercel.app/login", githubLink: "#" },
    { title: "Sales Campaign", description: "A sales campaign management and analytics dashboard.", tech: ["Next.js", "Recharts", "TypeScript"], category: "Office Work", liveLink: "#", githubLink: "#" },
    { title: "Calculator Master", description: "A feature-rich calculator web app with a clean, intuitive interface.", tech: ["React.js", "TypeScript", "Tailwind CSS"], category: "Personal", liveLink: "https://wisteria-calc-master-pro.base44.app", githubLink: "#" },
    { title: "Personal Portfolio", description: "This portfolio website, built to showcase my work and skills.", tech: ["React.js", "Framer Motion", "Tailwind CSS"], category: "Personal", liveLink: "#", githubLink: "#" },
    { title: "Weekly Planner", description: "A weekly planning and scheduling app to organize tasks and time.", tech: ["React.js", "Node.js", "Express.js"], category: "Personal", liveLink: "#", githubLink: "#" }
];

export const SERVICES = [
    { title: "Frontend Development", description: "Building modern, responsive web applications with React, Next.js, and TypeScript.", icon: "Code2", size: "large" },
    { title: "Full-Stack Development", description: "Building complete applications with modern frontend and backend technologies.", icon: "Layers", size: "small" },
    { title: "React Native Development", description: "Creating cross-platform mobile applications with React Native and Expo.", icon: "Smartphone", size: "small" },
    { title: "UI Implementation", description: "Turning Figma designs into responsive, pixel-perfect interfaces.", icon: "Palette", size: "small" },
    { title: "API & Backend Development", description: "Building reliable APIs, authentication, and database-driven backend systems.", icon: "Server", size: "small" }
];

export const PROCESS = [
    { step: "01", title: "Discover", description: "Understanding requirements, goals, and constraints to define the project scope.", icon: "Search" },
    { step: "02", title: "Design", description: "Crafting intuitive UI/UX and architecture before writing a single line of code.", icon: "PenTool" },
    { step: "03", title: "Build", description: "Developing clean, scalable, and tested code with modern frameworks.", icon: "Code2" },
    { step: "04", title: "Launch", description: "Deploying, monitoring, and refining to ensure a smooth release.", icon: "Rocket" }
];

export const EXPERIENCE = [
    { role: "Software Developer", company: "Olix Lab · Full-time", dates: "Dec 2025 – Present", description: "Building modern, responsive web interfaces using React and Next.js. Focused on delivering performant, accessible, and maintainable frontend solutions for production applications." },
    { role: "Junior Frontend Developer", company: "WIZCODER · Full-time", dates: "Sep 2024 – Nov 2025", description: "Developed scalable frontend solutions with React.js and TypeScript. Built reusable components, improved application performance, and collaborated with designers and backend developers across multiple client projects." },
    { role: "Web Developer Intern", company: "MountainsDriven Technologies · Part-time", dates: "Aug 2023 – Dec 2023", description: "Developed and maintained web application features using React and JavaScript. Worked on UI improvements, bug fixes, and integrating APIs to deliver smooth user experiences." },
    { role: "Frontend Web Developer", company: "TechnoYuga Soft. Pvt. ltd. · Internship", dates: "Jul 2022 – Jul 2023", description: "Built responsive web applications using React.js and modern frontend tools. Collaborated with the team to translate designs into clean, interactive interfaces and gained hands-on experience in component-based development." },
];

// sgpa / cgpa render only when filled in — leave them "" to hide the grade row.
export const EDUCATION = [
    { degree: "MSc IT", institution: "J.P. Dawer Institute of Information Science and Technology", dates: "Jul 2023 – Jul 2025", sgpa: "", cgpa: "", description: "Pursued a Master's in Information Technology, deepening knowledge in software development, web technologies, and advanced computing concepts." },
    { degree: "BSc IT", institution: "J.P. Dawer Institute of Information Science and Technology", dates: "Jul 2020 – Jul 2023", sgpa: "7.85", cgpa: "7.21", description: "Completed a Bachelor's in Information Technology with a focus on programming, databases, and web development fundamentals." },
    { degree: "HSC", institution: "Gurukul Vidyapith N.V. Dhamanwala School", dates: "Jun 2018 – Jun 2020", sgpa: "", cgpa: "", description: "Completed higher secondary education in the science stream with a focus on mathematics and computer fundamentals." }
];

export const TESTIMONIALS = [
    { name: "Arjun Patel", role: "CEO at TechStart", content: "Malvika delivered our e-commerce platform ahead of schedule. Her attention to detail and code quality is exceptional.", rating: 5, metric: "Completed in 2 weeks" },
    { name: "Sarah Chen", role: "Product Manager at DataCo", content: "Working with Malvika was a fantastic experience. She understood our vision perfectly and brought it to life.", rating: 5, metric: "3x faster delivery" },
    { name: "Ravi Kumar", role: "Founder at CloudApp", content: "The dashboard she built for us is beautiful and incredibly performant. Our users love the new interface.", rating: 5, metric: "40% more engagement" }
];

export const NAV_LINKS = [
    { label: "Home", href: "#home" },
    { label: "Introduction", href: "#about" },
    { label: "Technology", href: "#skills" },
    { label: "Work Experience", href: "#journey" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Get in touch", href: "#contact" }
];