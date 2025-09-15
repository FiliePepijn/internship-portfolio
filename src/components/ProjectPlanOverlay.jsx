import "../App.css";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '/projectplan/figure1.png';
import '/projectplan/figure2.png';


gsap.registerPlugin(ScrollTrigger);

// Steps outside the component to prevent ESLint warnings
const steps = [
  { id: "why", label: "Why" },
  { id: "how", label: "How" },
  { id: "what", label: "What" },
  { id: "so-what", label: "So what" },
  { id: "summary", label: "Summary" },
];

export default function ProjectPlanOverlay({ open, onClose }) {
  const prevOverflowRef = useRef("");
  const prevPaddingRef = useRef("");

  const scrollerRef = useRef(null);
  const pathRef = useRef(null);
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  const labelsRef = useRef([]);
  const [dotPositions, setDotPositions] = useState([]);
  const [labelPositions, setLabelPositions] = useState([]);

  // lock/unlock scroll
  useEffect(() => {
    if (open) {
      prevOverflowRef.current = document.body.style.overflow;
      prevPaddingRef.current = document.body.style.paddingRight;
      const scrollbar = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbar > 0) {
        document.body.style.paddingRight = `${scrollbar}px`;
      }
    } else {
      document.body.style.overflow = prevOverflowRef.current || "";
      document.body.style.paddingRight = prevPaddingRef.current || "";
    }
    return () => {
      document.body.style.overflow = prevOverflowRef.current || "";
      document.body.style.paddingRight = prevPaddingRef.current || "";
    };
  }, [open]);

  // gsap roadmap animation
  // gsap roadmap animation
useEffect(() => {
  if (!open) return;
  const scroller = scrollerRef.current;
  const path = pathRef.current;
  if (!scroller || !path) return;

  ScrollTrigger.defaults({ scroller });
  const length = path.getTotalLength();
  // Preferred: place dots on the anchor points of the path (endpoints of each curve)
  const anchorPoints = [
    { x: 180, y: 70 },  // end of first C segment
    { x: 30, y: 200 },  // end of 1st S
    { x: 180, y: 360 }, // end of 2nd S
    { x: 30, y: 520 },  // end of 3rd S
    { x: 180, y: 700 }, // end of 4th S
  ];
  let positions = anchorPoints;
  // Fallback to even distribution if counts mismatch
  if (anchorPoints.length !== steps.length) {
    positions = steps.map((_, i) => {
      const t = steps.length === 1 ? 0.5 : i / (steps.length - 1);
      const pt = path.getPointAtLength(length * t);
      return { x: pt.x, y: pt.y };
    });
  }
  setDotPositions(positions);
  // Compute label positions in container pixels
  const svgEl = svgRef.current;
  const container = containerRef.current;
  if (svgEl && container) {
    const rect = container.getBoundingClientRect();
    const ctm = path.getScreenCTM();
    if (ctm) {
      const transformed = positions.map((p) => {
        const pt = svgEl.createSVGPoint();
        pt.x = p.x;
        pt.y = p.y;
        const sp = pt.matrixTransform(ctm);
        return { x: sp.x - rect.left, y: sp.y - rect.top };
      });
      setLabelPositions(transformed);
    }
  }
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

  const drawST = ScrollTrigger.create({
    trigger: scroller,
    start: "top top",
    end: () => `${scroller.scrollHeight - scroller.clientHeight} top`,
    scrub: true,
    onUpdate: (self) => {
      gsap.to(path, {
        strokeDashoffset: (1 - self.progress) * length,
        overwrite: "auto",
      });
    },
  });

  const sectionTriggers = steps.map((step, i) => {
    const section = document.getElementById(step.id);
    const dot = dotsRef.current[i];
    const label = labelsRef.current[i];
    if (!section || !dot || !label) return null;
    return ScrollTrigger.create({
      trigger: section,
      start: "top center+=5%",
      end: "bottom center-=5%",
      onEnter: () => activate(i),
      onEnterBack: () => activate(i),
      onLeave: () => deactivate(i),
      onLeaveBack: () => deactivate(i),
    });
  });

  function activate(i) {
    gsap.to(dotsRef.current[i], { scale: 1.3, opacity: 1, duration: 0.3 });
    gsap.to(labelsRef.current[i], { opacity: 1, fontWeight: 700, duration: 0.3 });
  }
  function deactivate(i) {
    gsap.to(dotsRef.current[i], { scale: 1, opacity: 0.6, duration: 0.3 });
    gsap.to(labelsRef.current[i], { opacity: 0.7, fontWeight: 500, duration: 0.3 });
  }

  // 🌟 Swirling animation for dots
  gsap.to(dotsRef.current, {
    x: (i) => (i % 2 === 0 ? 6 : -6), // alternate swirl direction
    scale: 1.1,
    duration: 2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    stagger: {
      each: 0.2,
      yoyo: true,
    },
  });

  return () => {
    drawST && drawST.kill();
    sectionTriggers.forEach((st) => st && st.kill());
    ScrollTrigger.defaults({ scroller: window });
  };
}, [open]);


  const jumpTo = (id) => {
    const scroller = scrollerRef.current;
    const el = document.getElementById(id);
    if (!scroller || !el) return;
    scroller.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
  };

  return (
    <section
      onClick={onClose}
      className={`fixed inset-0 bg-[var(--dark)] bg-opacity-50 backdrop-blur-sm flex text-left items-center transition-opacity ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-4 md:mx-10 flex flex-row gap-6 md:gap-10 justify-between bg-[var(--light)] dark:bg-[var(--dark)] h-screen w-full border-2 border-[var(--dark)] dark:border-[var(--light)] text-[var(--dark)] dark:text-[var(--light)] p-4 md:p-8 rounded-lg overflow-hidden"
      >
        {/* Left: roadmap */}
        <aside className="hidden md:block sticky top-10 self-start w-64 shrink-0">
          <div className="relative" ref={containerRef}>
            <svg ref={svgRef} viewBox="0 0 200 800" className="w-full h-[700px]">
              <path
                ref={pathRef}
                d="
                  M 10 40
                  C 80 30, 140 30, 180 70
                  S 120 150, 30 200
                  S 120 300, 180 360
                  S 120 470, 30 520
                  S 120 640, 180 700
                "
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--dark)] dark:text-[var(--light)]"
                style={{ opacity: 0.9 }}
              />
              {dotPositions.map((p, i) => (
                <circle
                  key={`dot-${i}`}
                  ref={(el) => (dotsRef.current[i] = el)}
                  cx={p.x}
                  cy={p.y}
                  r="9"
                  fill="currentColor"
                  style={{ opacity: 0.6 }}
                />
              ))}
            </svg>
            <ul className="absolute inset-0 pointer-events-none">
              {labelPositions.map((pos, i) => (
                <li
                  key={`label-${i}`}
                  style={{ left: pos.x + 18, top: pos.y - 8 }}
                  className="absolute pointer-events-auto select-none"
                >
                  <button
                    ref={(el) => (labelsRef.current[i] = el)}
                    onClick={() => jumpTo(steps[i].id)}
                    className="text-sm md:text-base hover:underline opacity-70"
                  >
                    {steps[i].label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right: content */}
        <main ref={scrollerRef} className="w-full md:w-3/5 h-full overflow-y-auto pr-2 md:pr-4">
          {/* TOP BAR */}
          <div className="sticky top-0 z-10 flex justify-between items-center bg-[var(--light)] dark:bg-[var(--dark)] border-b border-gray-300 dark:border-gray-700 px-4 py-3">
            <h2 className="text-lg font-semibold">Project Plan</h2>
            <button
              onClick={onClose}
              className="text-sm font-medium px-3 py-1 rounded-md border border-gray-400 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              ✕ Close
            </button>
          </div>

          <header className="mt-4">
            <h1 className="text-2xl font-bold mb-4">Atlas Redesign Project Plan</h1>
            <p className="mb-8 opacity-80">
              Internship project at Sorama — migration of Atlas from Aurelia to React, based on the new Figma design.
            </p>
          </header>

          {/* WHY */}
          <section id="why" className="scroll-mt-24">
            <h2 className="text-xl font-semibold mb-3">Why</h2>
            <p>Sorama’s mission is to “make the world sound right” with acoustic cameras and sound visualization software.</p>
            <p>The Sustainable Design team uses Aurelia while other teams work in React, creating collaboration issues. Migrating Atlas to React aligns with company-wide standards.</p>
            <img src="/projectplan/figure1.png" alt="Time writing and reporting process" className="rounded-lg shadow-md my-4" />
          </section>

          {/* HOW */}
          <section id="how" className="scroll-mt-24">
            <h2 className="text-xl font-semibold mb-3">How</h2>
            <p>Following Scrum in two-week sprints, with sprint planning/reviews and Sorama’s Demo & Drinks sessions.</p>
            <p>Manual testing, user feedback, and code reviews ensure usability and quality.</p>
            <p>Research covers React frameworks, styling approaches, accessibility, and testing strategies.</p>
          </section>

          {/* WHAT */}
          <section id="what" className="scroll-mt-24">
            <h2 className="text-xl font-semibold mb-3">What</h2>
            <p>Assignment: rebuild Atlas front-end in React, implementing the Figma design.</p>
            <p>Scope: rebuild front-end only, redesign UI, improve usability, and ensure maintainable React code. Backend and new features are out of scope.</p>
            <img src="/projectplan/figure2.png" alt="Scope context diagram" className="rounded-lg shadow-md my-4" />
            <p>Deliverables: React front-end, Figma design implementation, research reports, documentation, and tested features.</p>
          </section>

          {/* SO WHAT */}
          <section id="so-what" className="scroll-mt-24">
            <h2 className="text-xl font-semibold mb-3">So what</h2>
            <p>This project improves maintainability by moving to React, aligning with Sorama’s standards.</p>
            <p>Employees benefit from a modern UI, faster workflows, and reduced frustration when logging/reporting hours.</p>
            <p>Risks: migration complexity, React learning curve, Figma/backend mismatch, limited time — mitigated with research, prioritization, and feedback.</p>
          </section>

          {/* SUMMARY */}
          <section id="summary" className="scroll-mt-24 mb-28">
            <h2 className="text-xl font-semibold mb-3">Summary</h2>
            <p>Goal: migrate Atlas from Aurelia to React, implementing the Figma design.</p>
            <p>Timeline: 10 sprints, from September to February.</p>
            <p>Team: Sorama mentor (Kristin Peneva), UX/UI designer (Iva Dimitrova), intern (Pepijn Latour), Fontys coach (Evert van der Grift).</p>
            <p>Communication: bi-weekly sprint meetings, Teams, email, and feedback via pull requests.</p>
            <p>Setup: backend in Azure, version control in Bitbucket, free open-source React libraries.</p>
          </section>
        </main>
      </div>
    </section>
  );
}
