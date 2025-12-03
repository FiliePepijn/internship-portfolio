import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

const effects = [
  { from: { opacity: 0, x: 100 }, to: { opacity: 1, x: 0 } },       // Slide from right
  { from: { opacity: 0, scale: 0.8 }, to: { opacity: 1, scale: 1 } }, // Zoom in
  { from: { opacity: 0, y: 100 }, to: { opacity: 1, y: 0 } },         // Slide from bottom
  { from: { opacity: 0, rotation: 45 }, to: { opacity: 1, rotation: 0 } }, // Rotate in
  { from: { opacity: 0, x: -100 }, to: { opacity: 1, x: 0 } },        // Slide from left
];

const AnimatedProjectShowcase = ({ projects }) => {
  const slidesRef = useRef([]);
  const [current, setCurrent] = useState(0);
  const totalSlides = projects.length;

  useEffect(() => {
    // show the first slide
    gsap.fromTo(
      slidesRef.current[0],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  const goToSlide = (nextIndex) => {
    if (nextIndex === current || nextIndex < 0 || nextIndex >= totalSlides)
      return;

    const currentSlide = slidesRef.current[current];
    const nextSlide = slidesRef.current[nextIndex];
    const effect = effects[nextIndex % effects.length]; // Pick a different animation each time

    // animate current slide out
    gsap.to(currentSlide, {
      opacity: 0,
      x: nextIndex > current ? -100 : 100,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        currentSlide.style.display = "none";
      },
    });

    // prepare next slide
    nextSlide.style.display = "flex";

    // animate next slide in with effect
    gsap.fromTo(
      nextSlide,
      effect.from,
      { ...effect.to, duration: 1.2, ease: "power3.out" }
    );

    setCurrent(nextIndex);
  };

  const nextSlide = () => goToSlide((current + 1) % totalSlides);
  const prevSlide = () =>
    goToSlide((current - 1 + totalSlides) % totalSlides);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-light dark:bg-dark text-dark dark:text-light">
      {/* Slides */}
      {projects.map((project, i) => (
        <div
          key={i}
          ref={(el) => (slidesRef.current[i] = el)}
          className="absolute inset-0 flex flex-col justify-center items-center text-center p-10 bg-light dark:bg-dark"
          style={{
            display: i === 0 ? "flex" : "none",
          }}
        >
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-2/3 max-w-xl rounded-lg shadow-2xl mb-8 object-cover"
            />
          )}

          <h2 className="text-5xl font-bold mb-4 text-dark dark:text-light">{project.title}</h2>
          <p className="text-lg max-w-2xl text-dark/80 dark:text-light/80 mb-6">
            {project.fullDescription || project.shortDescription}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {project.technologies?.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-dark/10 dark:bg-light/10 text-dark dark:text-light border border-dark/20 dark:border-light/20"
              >
                {tech}
              </span>
            ))}
          </div>

          {(project.liveUrl || project.githubUrl) && (
            <div className="flex gap-6 mt-8">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-dark dark:bg-light text-light dark:text-dark font-semibold hover:opacity-90 transition"
                >
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg border-2 border-dark dark:border-light text-dark dark:text-light hover:bg-dark/10 dark:hover:bg-light/10 transition"
                >
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Controls */}
      <div className="absolute bottom-10 w-full flex justify-center gap-6">
        <button
          onClick={prevSlide}
          className="px-6 py-3 rounded-lg bg-dark/10 dark:bg-light/10 hover:bg-dark/20 dark:hover:bg-light/20 transition text-dark dark:text-light font-medium"
        >
          ◀ Previous
        </button>
        <button
          onClick={nextSlide}
          className="px-6 py-3 rounded-lg bg-dark/10 dark:bg-light/10 hover:bg-dark/20 dark:hover:bg-light/20 transition text-dark dark:text-light font-medium"
        >
          Next ▶
        </button>
      </div>

      {/* Indicator */}
      <div className="absolute top-6 right-6 text-dark/70 dark:text-light/70 text-sm font-medium">
        {current + 1} / {totalSlides}
      </div>
    </div>
  );
};

export default AnimatedProjectShowcase;
