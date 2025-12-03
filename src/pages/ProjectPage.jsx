import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Project data (matching App.jsx)
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

function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (!project) {
      navigate('/');
    }
  }, [project, navigate]);

  if (!project) {
    return null;
  }

  const siteUrl = window.location.origin;
  const ogImageUrl = `${siteUrl}/og/project-${project.id}.png`;
  const projectUrl = `${siteUrl}/project/${project.id}`;

  return (
    <>
      <Helmet>
        <title>{project.title} | platour.net</title>
        <meta name="description" content={project.shortDescription} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={projectUrl} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.shortDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={projectUrl} />
        <meta name="twitter:title" content={project.title} />
        <meta name="twitter:description" content={project.shortDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>

      <div className="min-h-screen bg-[var(--light)] dark:bg-[var(--dark)] text-[var(--dark)] dark:text-[var(--light)] p-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className="mb-8 px-6 py-3 bg-[var(--dark)]/10 dark:bg-[var(--light)]/10 hover:bg-[var(--dark)]/20 dark:hover:bg-[var(--light)]/20 rounded-lg transition-colors"
          >
            ← Back to Portfolio
          </button>

          {/* Project header */}
          <div className="text-center mb-12">
            <div className="text-8xl mb-6">{project.icon}</div>
            <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-[var(--dark)]/70 dark:text-[var(--light)]/70 mb-6">
              {project.shortDescription}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-[var(--dark)]/10 dark:bg-[var(--light)]/10 rounded-full text-sm font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Project description */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">About This Project</h2>
            <p className="text-lg leading-relaxed text-[var(--dark)]/80 dark:text-[var(--light)]/80">
              {project.fullDescription}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-[var(--dark)] dark:bg-[var(--light)] text-[var(--light)] dark:text-[var(--dark)] rounded-lg font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-2xl mr-3">✓</span>
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="flex gap-4 justify-center">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[var(--dark)] dark:bg-[var(--light)] text-[var(--light)] dark:text-[var(--dark)] rounded-lg font-bold hover:scale-105 transition-transform"
              >
                View on GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[var(--dark)]/10 dark:bg-[var(--light)]/10 hover:bg-[var(--dark)]/20 dark:hover:bg-[var(--light)]/20 rounded-lg font-bold transition-colors"
              >
                View Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectPage;
