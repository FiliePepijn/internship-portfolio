// FollowCursor.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FollowCursor = () => {
  const dotRef = useRef(null);
  const layerRef = useRef(null);
  const particlesRef = useRef(null);
  const cursorPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const lastTrailTime = useRef(0);
  const magnetic = useRef({ active: false, el: null });

  useEffect(() => {
    document.body.style.cursor = "none";

    const dot = dotRef.current;
    if (!dot) return;

    // Mouse move updates target position
    const handleMouseMove = (e) => {
      cursorPos.current = { x: e.clientX, y: e.clientY };
      // Dot follows with easing
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        ease: "power3.out",
        duration: 0.12,
      });
    };

    

    

    

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <div ref={layerRef} className="fixed top-0 left-0 w-full h-screen pointer-events-none overflow-hidden z-50">
      {/* Particles container */}
      <div ref={particlesRef} className="absolute inset-0" />
      {/* Dot cursor */}
      <div
        ref={dotRef}
        className="FollowBox bg-[var(--dark)] dark:bg-[var(--light)] rounded-full w-4 h-4 absolute"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
};

export default FollowCursor;
