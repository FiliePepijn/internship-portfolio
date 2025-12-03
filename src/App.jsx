import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import ContentSection from "./components/ContentSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import FollowCursor from "./components/FollowCursor";
import ProjectCard from "./components/ProjectCard";
import ProjectDetails from "./components/ProjectDetails";

// Register plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Project data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    shortDescription: "A full-stack e-commerce solution with real-time inventory management.",
    fullDescription: "Built a comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, and secure payment processing. Implemented real-time inventory tracking and admin dashboard for store management.",
    icon: "🛒",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "Redux", "Tailwind CSS"],
    features: [
      "User authentication and authorization",
      "Real-time inventory management",
      "Secure payment processing with Stripe",
      "Admin dashboard for product and order management",
      "Responsive design for mobile and desktop"
    ],
    githubUrl: "https://github.com/platour/ecommerce-platform",
    liveUrl: "https://demo-ecommerce.platour.net"
  },
  {
    id: 2,
    title: "Task Management App",
    shortDescription: "Collaborative task management tool with team features.",
    fullDescription: "A modern task management application that helps teams organize their work efficiently. Features include drag-and-drop task boards, real-time collaboration, and progress tracking.",
    icon: "✓",
    tags: ["React", "Firebase", "TypeScript"],
    technologies: ["React", "TypeScript", "Firebase", "React DnD", "Material-UI"],
    features: [
      "Drag-and-drop kanban boards",
      "Real-time collaboration",
      "Task assignments and deadlines",
      "Project progress tracking",
      "Team notifications"
    ],
    githubUrl: "https://github.com/platour/task-manager",
    liveUrl: "https://tasks.platour.net"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    shortDescription: "Beautiful weather forecasting app with location-based predictions.",
    fullDescription: "An elegant weather dashboard that provides accurate weather forecasts using multiple weather APIs. Features location-based weather, hourly and weekly forecasts, and interactive maps.",
    icon: "🌤️",
    tags: ["React", "API Integration", "Charts"],
    technologies: ["React", "OpenWeather API", "Chart.js", "Leaflet", "CSS3"],
    features: [
      "Current weather conditions",
      "7-day weather forecast",
      "Hourly predictions",
      "Interactive weather maps",
      "Location-based weather"
    ],
    githubUrl: "https://github.com/platour/weather-dashboard",
    liveUrl: "https://weather.platour.net"
  },
  {
    id: 4,
    title: "Portfolio Website Builder",
    shortDescription: "Drag-and-drop portfolio builder for creators and developers.",
    fullDescription: "A no-code solution for creating beautiful portfolio websites. Users can choose from multiple templates, customize them with drag-and-drop interface, and deploy instantly.",
    icon: "🎨",
    tags: ["React", "Builder", "Templates"],
    technologies: ["React", "React DnD", "Cloudflare Pages", "Tailwind CSS", "Framer Motion"],
    features: [
      "Multiple professional templates",
      "Drag-and-drop editor",
      "Custom domain support",
      "One-click deployment",
      "Mobile responsive"
    ],
    githubUrl: "https://github.com/platour/portfolio-builder"
  },
  {
    id: 5,
    title: "Chat Application",
    shortDescription: "Real-time messaging platform with video call support.",
    fullDescription: "A modern chat application with real-time messaging, file sharing, and video call capabilities. Built with WebRTC for peer-to-peer connections and Socket.io for instant messaging.",
    icon: "💬",
    tags: ["React", "WebRTC", "Socket.io"],
    technologies: ["React", "Node.js", "Socket.io", "WebRTC", "MongoDB", "Express"],
    features: [
      "Real-time messaging",
      "Video and audio calls",
      "File sharing",
      "Group chats",
      "Message encryption"
    ],
    githubUrl: "https://github.com/platour/chat-app",
    liveUrl: "https://chat.platour.net"
  },
  {
    id: 6,
    title: "Analytics Dashboard",
    shortDescription: "Data visualization platform with customizable charts and reports.",
    fullDescription: "A comprehensive analytics dashboard for visualizing business metrics and KPIs. Features real-time data updates, customizable charts, and exportable reports.",
    icon: "📊",
    tags: ["React", "D3.js", "Data Viz"],
    technologies: ["React", "D3.js", "Chart.js", "PostgreSQL", "Node.js", "Express"],
    features: [
      "Real-time data visualization",
      "Customizable dashboards",
      "Multiple chart types",
      "Export to PDF/CSV",
      "Advanced filtering"
    ],
    githubUrl: "https://github.com/platour/analytics-dashboard",
    liveUrl: "https://analytics.platour.net"
  }
];

function App() {
  const [darkMode] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const progressTextRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const progressFillRef = useRef(null);

  const siteRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const welcomeRef = useRef(null);
  const welcomeTitleRef = useRef(null);
  const welcomeTextRef = useRef(null);

  const aboutRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutTextRef = useRef(null);

  const skillsRef = useRef(null);
  const skillsTitleRef = useRef(null);
  const skillsTextRef = useRef(null);

  const projectsRef = useRef(null);
  const projectsTitleRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current)
      return;

    // Split text into characters/words
    const titleSplit = new SplitText(titleRef.current, { type: "chars" });
    const subtitleSplit = new SplitText(subtitleRef.current, { type: "chars" });

    const chars = [...titleSplit.chars, ...subtitleSplit.chars];
    const welcomeTitleSplit = new SplitText(welcomeTitleRef.current, {
      type: "words",
    });

    // Master timeline
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: siteRef.current,
        start: "top top",
        end: "+=10000", // enough scroll room
        scrub: 1,
        pin: true,
      },
    });

    // ---------------------------
    // Hero
    // ---------------------------
    master.to(chars, {
      x: () => gsap.utils.random(-1000, 1000),
      y: () => gsap.utils.random(-500, 500),
      rotation: () => gsap.utils.random(-720, 720),
      scale: () => gsap.utils.random(2, 10),
      opacity: 0,
      ease: "power3.out",
      stagger: 0.02,
      duration: 1.5,
    });

    // ---------------------------
    // Welcome
    // ---------------------------
    master
      .set(welcomeRef.current, { pointerEvents: "auto" })
      .to(welcomeRef.current, { opacity: 1, duration: 1 })
      .from(welcomeTitleSplit.words, {
        y: 50,
        opacity: 0,
        stagger: 0.5,
        duration: 1,
        ease: "power3.out",
      })
      .fromTo(
        welcomeTextRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .to(welcomeRef.current, { opacity: 0, duration: 1, ease: "power3.out" })
      .set(welcomeRef.current, { pointerEvents: "none" });

    // ---------------------------
    // About
    // ---------------------------
    master
      .set(aboutRef.current, { pointerEvents: "auto" })
      .to(aboutRef.current, { opacity: 1, duration: 1 })
      .fromTo(
        aboutTitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(
        aboutTextRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .to(aboutRef.current, {
        opacity: 0,
        duration: 1,
        x: -1000,
        ease: "power3.out",
      })
      .set(aboutRef.current, { pointerEvents: "none" });

    // ---------------------------
    // Skills
    // ---------------------------
    master
      .set(skillsRef.current, { pointerEvents: "auto" })
      .to(skillsRef.current, { opacity: 1, duration: 1 })
      .fromTo(
        skillsTitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(
        skillsTextRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .to(skillsRef.current, {
        opacity: 0,
        duration: 1,
        x: -1000,
        ease: "power3.out",
      })
      .set(skillsRef.current, { pointerEvents: "none" });

    // ---------------------------
    // Projects
    // ---------------------------
    master
      .set(projectsRef.current, { pointerEvents: "auto" })
      .to(projectsRef.current, { opacity: 1, duration: 1 })
      .fromTo(
        projectsTitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

    // Cleanup
    return () => {
      titleSplit.revert();
      subtitleSplit.revert();
      welcomeTitleSplit.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  useEffect(() => {
  if (!progressFillRef.current || !progressTextRef.current) return;

  ScrollTrigger.create({
    trigger: document.documentElement,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      const percent = Math.round(self.progress * 100);
      gsap.to(progressFillRef.current, {
        width: `${percent}%`,
        ease: "none",
        overwrite: "auto",
        duration: 0.2,
      });
      progressTextRef.current.textContent = `${percent}%`;
    },
  });
}, []);


  return (
    <>
      <Helmet>
        <title>platour.net - Developer Portfolio</title>
        <meta name="description" content="Full-stack developer portfolio showcasing projects in React, Node.js, and modern web technologies. View my work and get in touch." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://platour.net/" />
        <meta property="og:title" content="platour.net - Developer Portfolio" />
        <meta property="og:description" content="Full-stack developer portfolio showcasing projects in React, Node.js, and modern web technologies." />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://platour.net/" />
        <meta name="twitter:title" content="platour.net - Developer Portfolio" />
        <meta name="twitter:description" content="Full-stack developer portfolio showcasing projects in React, Node.js, and modern web technologies." />
      </Helmet>

      <main className="w-screen overflow-x-hidden">
        <FollowCursor />

      <div
        ref={siteRef}
        className="relative h-screen flex flex-col justify-center items-center gap-10 bg-light dark:bg-dark transition duration-500"
      >
        {/* Hero Section */}
        <section className="w-full flex flex-col justify-center items-center gap-10">
          <h2
            ref={subtitleRef}
            className="text-dark dark:text-light text-2xl sm:text-3xl"
          >
            Developer Portfolio
          </h2>
          <h1
            ref={titleRef}
            className="text-dark dark:text-light font-bold text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] 2xl:text-[13rem]"
          >
            platour.net
          </h1>
        </section>



        {/* welcome Section */}
        <section
          ref={welcomeRef}
          className="h-screen w-screen flex flex-col items-center justify-center opacity-0 absolute top-0 left-0 bg-light dark:bg-dark transition duration-500"
        >
          <h2
            ref={welcomeTitleRef}
            className=" text-4xl font-bold mb-10 text-dark dark:text-light"
          >
            Hi, Welcome 👋
          </h2>
          <p
            ref={welcomeTextRef}
            className="max-w-[300px] text-center mb-10   text-dark dark:text-light"
          >
            This is my portfolio showcasing my projects and skills as a full-stack developer.
          </p>
        </section>

        <ContentSection
          ref={aboutRef}
          titleRef={aboutTitleRef}
          textRef={aboutTextRef}
          title="About Me"
          text="I'm a passionate full-stack developer specializing in React, Node.js, and modern web technologies. I love building beautiful, user-friendly applications that solve real-world problems."
        >
          <div className="mt-6"></div>
        </ContentSection>

        <ContentSection
          ref={skillsRef}
          titleRef={skillsTitleRef}
          textRef={skillsTextRef}
          title="My Skills"
          text="Frontend: React, TypeScript, Tailwind CSS, GSAP • Backend: Node.js, Express, MongoDB, PostgreSQL • Tools: Git, Docker, Cloudflare, Firebase • Design: Responsive UI/UX, Animation, Accessibility"
        />

        <section
          ref={projectsRef}
          className="w-screen min-h-screen flex flex-col items-center justify-start opacity-0 absolute bg-light dark:bg-dark transition duration-500 p-8 overflow-y-auto"
        >
          <h1
            ref={projectsTitleRef}
            className="text-4xl font-bold mb-10 text-dark dark:text-light"
          >
            My Projects
          </h1>
          <div className="flex flex-wrap gap-6 justify-center max-w-7xl">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
              />
            ))}
          </div>
        </section>

        <ProjectDetails
          project={selectedProject}
          open={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>

      <div className="fixed w-screen left-0 right-0 bottom-0 z-20 px-4 pointer-events-none">
  <div className="flex items-center justify-between w-full">
    {/* Progress bar */}
    <div className="relative flex-1 h-3 bg-dark/10 dark:bg-light/20 overflow-hidden rounded-full border border-dark/20 dark:border-light/20">
      <div
        ref={progressFillRef}
        className="absolute left-0 top-0 h-full bg-[var(--dark)] dark:bg-[var(--light)]"
        style={{ width: "0%" }}
      />
    </div>

    {/* Percentage text outside right edge */}
    <span
      ref={progressTextRef}
      className="ml-3 text-sm font-bold text-dark dark:text-light whitespace-nowrap"
    >
      0%
    </span>
  </div>
</div>

    </main>
    </>
  );
}

export default App;
