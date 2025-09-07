import './App.css';
import { Progress } from '@base-ui-components/react/progress';
import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Content from './components/content';

// Register plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
    const [darkMode] = useState(() =>
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );
    const [progress, setProgress] = useState(0);

    const homeRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const loadingRef = useRef(null);
    const loadingTitleRef = useRef(null);
    const loadingbarRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    useEffect(() => {
        if (!titleRef.current || !subtitleRef.current || !loadingTitleRef.current) return;

        // Split text into characters
        const titleSplit = new SplitText(titleRef.current, { type: "chars" });
        const subtitleSplit = new SplitText(subtitleRef.current, { type: "chars" });
        const loadingSplit = new SplitText(loadingTitleRef.current, { type: "chars" });
        const chars = [...titleSplit.chars, ...subtitleSplit.chars];

        // Master timeline with ONE ScrollTrigger
        const master = gsap.timeline({
            scrollTrigger: {
                trigger: homeRef.current,
                start: "top top",
                end: "bottom ", // controls scroll length
                scrub: 2,
                pin: true,
                markers: true, // debug

            }
        });

        // Hero explosion
        master.to(chars, {
            x: () => gsap.utils.random(-500, 500),
            y: () => gsap.utils.random(-500, 500),
            rotation: () => gsap.utils.random(-720, 720),
            scale: () => gsap.utils.random(0.5, 7),
            opacity: 0,
            ease: "power3.out",
            stagger: 0.02,
            duration: 1.5,
        }, "+=0.5");

        // Fade in loading
        master.to(loadingRef.current, { opacity: 1, duration: 1 }, "+=0.5");

        // Loading title characters
        master.from(loadingSplit.chars, {
            y: 50,
            opacity: 0,
            stagger: 0.5,
            duration: 1,
            ease: "power3.out",
        });

        // Progress bar
        master.fromTo(loadingbarRef.current,
            { opacity: 0, y: 150 },
            {
                opacity: 1, y: 0, duration: 1, ease: "power3.out",
                onStart: () => setProgress(0), // reset
                onUpdate: function () {
                    // get progress relative to this tween
                    const localProgress = this.progress(); // 0 → 1
                    setProgress(Math.round(localProgress * 100));
                }
            },
            "-=0.5"
        );

        // Fade out loading
        master.to(loadingRef.current, {
            opacity: 0,
            duration: 1,
            delay:3,
            ease: "power3.out",
        }, "+=1");

        // Fade in content
        master.fromTo(contentRef.current,
            { opacity: 0, y: 0 },
            { opacity: 1, y: 300,delay:2, duration: 1.2, ease: "power1.in" },
            "-=0.5"
        );

        // Cleanup
        return () => {
            titleSplit.revert();
            subtitleSplit.revert();
            loadingSplit.revert();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <main className="w-screen overflow-x-hidden">
            {/* Hero Section */}
            <div
                ref={homeRef}
                className="relative h-screen flex flex-col justify-center items-center gap-10 bg-light dark:bg-dark transition duration-500"
            >
                <div className="pin-wrapper w-full flex flex-col justify-center items-center gap-10">
                    <h2 ref={subtitleRef} className="text-dark dark:text-light sm:text-2xl">
                        Internship Portfolio
                    </h2>
                    <h1
                        ref={titleRef}
                        className="text-dark dark:text-light font-bold xl:text-[6rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] 2xl:text-[13rem]"
                    >
                        Pepijn Latour
                    </h1>
                </div>

                {/* Loading Section */}
                <div
                    ref={loadingRef}
                    className="h-screen w-screen flex flex-col items-center justify-center opacity-0 absolute top-0 left-0 bg-light dark:bg-dark transition duration-500"
                >
                    <h1
                        ref={loadingTitleRef}
                        className="flex font-black text-[9rem] mb-10 text-dark dark:text-light"
                    >
                        Loading
                    </h1>
                    <div ref={loadingbarRef} className="w-full flex justify-center m-5">
                        <Progress.Root value={progress}>
                            <Progress.Track
                                style={{
                                    backgroundColor: "var(--dark)",
                                    borderRadius: 5,
                                    outline: "3px solid var(--light)",
                                    height: 10,
                                    margin: 10,
                                    width: 300,
                                }}
                            >
                                <Progress.Indicator
                                    style={{
                                        backgroundColor: "var(--light)",
                                        transition: "width 0.4s ease-in-out",
                                    }}
                                />
                            </Progress.Track>
                            <Progress.Value />
                        </Progress.Root>
                    </div>
                </div>

                {/* Content Section */}
                <div
                    ref={contentRef}
                    className="opacity-0 transition absolute top-0 left-0 w-full"
                >
                    <Content />
                </div>
            </div>
        </main>
    );
}

export default App;