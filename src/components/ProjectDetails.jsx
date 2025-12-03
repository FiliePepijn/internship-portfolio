import React, { useEffect } from "react";
import { gsap } from "gsap";

const ProjectDetails = ({ project, open, onClose }) => {
  const overlayRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const headerRef = React.useRef(null);
  const sectionsRef = React.useRef([]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";

      // Animate in - full page slide up
      if (overlayRef.current && contentRef.current) {
        const tl = gsap.timeline();

        // Slide up from bottom
        tl.fromTo(
          overlayRef.current,
          { y: "100%" },
          { y: "0%", duration: 0.6, ease: "power3.inOut" }
        )
        // Fade in and slide up header
        .fromTo(
          headerRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
          "-=0.2"
        )
        // Stagger in sections
        .fromTo(
          sectionsRef.current.filter(Boolean),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
          },
          "-=0.3"
        );
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleClose = () => {
    if (overlayRef.current) {
      const tl = gsap.timeline({
        onComplete: onClose
      });

      // Fade out content first
      tl.to(contentRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      })
      // Slide down
      .to(overlayRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power3.inOut"
      }, "-=0.1");
    } else {
      onClose();
    }
  };

  if (!open || !project) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-light dark:bg-dark overflow-hidden"
      style={{ transform: "translateY(100%)" }}
    >
      <div ref={contentRef} className="h-full w-full overflow-y-auto">
        {/* Close Button - Fixed */}
        <button
          onClick={handleClose}
          className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-dark/10 dark:bg-light/10 hover:bg-dark/20 dark:hover:bg-light/20 text-dark dark:text-light transition-all duration-300 group backdrop-blur-sm"
          aria-label="Close"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="group-hover:rotate-90 transition-transform duration-300"
          >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>

        {/* Content Container */}
        <div className="max-w-6xl bg-light dark:bg-dark mx-auto px-6 py-12 md:px-12 md:py-20">
          {/* Header Section */}
          <div ref={headerRef} className="mb-12">
            <div className="flex items-start gap-6 mb-6">
              {project.icon && (
                <div className="text-7xl md:text-8xl">
                  {project.icon}
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-4xl md:text-6xl font-bold text-dark dark:text-light mb-4">
                  {project.title}
                </h1>
                <p className="text-xl md:text-2xl text-dark/70 dark:text-light/70 leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-sm rounded-lg bg-dark/10 dark:bg-light/10 text-dark dark:text-light font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Main Image */}
          {project.image && (
            <div
              ref={(el) => sectionsRef.current[0] = el}
              className="mb-16 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-video object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <section ref={(el) => sectionsRef.current[1] = el}>
                <h2 className="text-3xl font-bold text-dark dark:text-light mb-6">
                  About This Project
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-dark/80 dark:text-light/80">
                  {project.fullDescription || project.shortDescription}
                </p>
              </section>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <section ref={(el) => sectionsRef.current[2] = el}>
                  <h2 className="text-3xl font-bold text-dark dark:text-light mb-6">
                    Key Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg bg-dark/5 dark:bg-light/5"
                      >
                        <svg
                          className="w-6 h-6 text-dark dark:text-light mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-dark/80 dark:text-light/80">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <section ref={(el) => sectionsRef.current[3] = el}>
                  <h3 className="text-2xl font-bold text-dark dark:text-light mb-4">
                    Built With
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 rounded-lg bg-dark text-light dark:bg-light dark:text-dark font-medium text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Action Buttons */}
              {(project.githubUrl || project.liveUrl) && (
                <section ref={(el) => sectionsRef.current[4] = el} className="space-y-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-6 py-4 rounded-lg bg-dark text-light dark:bg-light dark:text-dark hover:opacity-90 transition-opacity font-medium text-center text-lg"
                    >
                      View Live Demo →
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-6 py-4 rounded-lg border-2 border-dark dark:border-light text-dark dark:text-light hover:bg-dark/10 dark:hover:bg-light/10 transition-colors font-medium text-center text-lg"
                    >
                      View on GitHub
                    </a>
                  )}
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
