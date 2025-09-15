import "./App.css";
import { Progress } from "@base-ui-components/react/progress";
import React, { useEffect, useState, useRef } from "react";
import ContentSection from "./components/ContentSection";
import DocsOverlay from "./components/DocsOverlay";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import FollowCursor from "./components/FollowCursor";
import ScrollToaster from "./components/ScrollToaster";

// Register plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const [darkMode] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [progress, setProgress] = useState(0);
  const [docsOpen, setDocsOpen] = useState(false);

  const siteRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const loadingRef = useRef(null);
  const loadingTitleRef = useRef(null);
  const loadingbarRef = useRef(null);

  const welcomeRef = useRef(null);
  const welcomeTitleRef = useRef(null);
  const welcomeTextRef = useRef(null);

  const soramaRef = useRef(null);
  const soramaTitleRef = useRef(null);
  const soramaTextRef = useRef(null);

  const item1Ref = useRef(null);
  const item1TitleRef = useRef(null);
  const item1TextRef = useRef(null);

  const researchRef = useRef(null);
  const researchTitleRef = useRef(null);
  const researchTextRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !loadingTitleRef.current)
      return;

    // Split text into characters/words
    const titleSplit = new SplitText(titleRef.current, { type: "chars" });
    const subtitleSplit = new SplitText(subtitleRef.current, { type: "chars" });
    const loadingSplit = new SplitText(loadingTitleRef.current, {
      type: "chars",
    });
    const chars = [...titleSplit.chars, ...subtitleSplit.chars];
    const welcomeTitleSplit = new SplitText(welcomeTitleRef.current, {
      type: "words",
    });

    // Master timeline (button-driven, no scroll trigger)
    const master = gsap.timeline({ paused: true });
    siteRef.current.__master = master;

    // ---------------------------
    // Hero
    // ---------------------------
    master.addLabel("hero");
    master.to(chars, {
      x: () => gsap.utils.random(-1000, 1000),
      y: () => gsap.utils.random(-500, 500),
      rotation: () => gsap.utils.random(-720, 720),
      scale: () => gsap.utils.random(2, 20),
      opacity: 0,
      ease: "power3.out",
      stagger: 0.02,
      duration: 1.5,
    });
    master.addLabel("start_loading");

    // ---------------------------
    // Loading
    // ---------------------------
    master
      .to(loadingRef.current, { opacity: 1, duration: 1 })
      .from(loadingSplit.chars, {
        y: 50,
        opacity: 0,
        stagger: 0.5,
        duration: 1,
        ease: "power3.out",
      })
      .fromTo(
        loadingbarRef.current,
        { opacity: 0, y: 0 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power1.in" }
      )
      .to(
        { val: 0 },
        {
          val: 100,
          duration: 5,
          ease: "none",
          onUpdate: function () {
            setProgress(Math.round(this.targets()[0].val));
          },
        }
      )
      .addLabel("end_loading")
      .to(loadingRef.current, { opacity: 0, duration: 1, ease: "power3.out" });

    // ---------------------------
    // Welcome
    // ---------------------------
    master
      .addLabel("start_welcome")
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
      .addLabel("end_welcome")
      .to(welcomeRef.current, { opacity: 0, duration: 1, ease: "power3.out" });

    // ---------------------------
    // Sorama
    // ---------------------------
    master
      .addLabel("start_sorama")
      .to(soramaRef.current, { opacity: 1, duration: 1 })
      .fromTo(
        soramaTitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(
        soramaTextRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .addLabel("end_sorama")
      .to(soramaRef.current, {
        opacity: 0,
        duration: 1,
        x: -1000,
        ease: "power3.out",
      });

    // ---------------------------
    // Item 1
    // ---------------------------
    master
      .addLabel("start_item1")
      .to(item1Ref.current, { opacity: 1, duration: 1 })
      .fromTo(
        item1TitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(
        item1TextRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .addLabel("end_item1")
      .to(item1Ref.current, {
        opacity: 0,
        duration: 1,
        x: -1000,
        ease: "power3.out",
      });

    // ---------------------------
    // Research
    // ---------------------------
    master
      .addLabel("start_research")
      .to(researchRef.current, { opacity: 1, duration: 1 })
      .fromTo(
        researchTitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(
        researchTextRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    master.addLabel("end_research");

    // Cleanup
    return () => {
      titleSplit.revert();
      subtitleSplit.revert();
      loadingSplit.revert();
      welcomeTitleSplit.revert();
    };
  }, []);

  // helpers to move timeline
  const goTo = (label) => {
    const tl = siteRef.current?.__master;
    if (!tl) return;

    // Animate from hero → requested label
    tl.tweenFromTo("hero", label);
  };

  return (
    <main className="w-screen overflow-x-hidden">
      <FollowCursor />
      <ScrollToaster />

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
            Internship Portfolio
          </h2>
          <h1
            ref={titleRef}
            className="text-dark dark:text-light font-bold text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] 2xl:text-[13rem]"
          >
            Pepijn Latour
          </h1>
          <button
            onClick={() => goTo("start_loading")}
            className="px-6 py-3 rounded-md bg-[var(--dark)] text-[var(--light)] dark:bg-[var(--light)] dark:text-[var(--dark)] hover:opacity-90"
          >
            Start
          </button>
        </section>

        {/* Loading Section */}
        <section
          ref={loadingRef}
          className="h-screen w-screen flex flex-col items-center justify-center opacity-0 absolute top-0 left-0 bg-light dark:bg-dark transition duration-500"
        >
          <h1
            ref={loadingTitleRef}
            className="flex font-black text-[5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] 2xl:text-[13rem] mb-10 text-dark dark:text-light"
          >
            Loading
          </h1>
          <div ref={loadingbarRef} className="w-full flex justify-center m-5">
            <Progress.Root value={progress}>
              <Progress.Track className="rounded h-2 m-2 w-72 outline-[3px] outline-[var(--dark)] dark:outline-[var(--light)]">
                <Progress.Indicator
                  className="bg-[var(--dark)] dark:bg-[var(--light)] h-2 rounded"
                  style={{
                    width: `${progress}%`,
                    transition: "width 0.1s linear",
                  }}
                />
              </Progress.Track>
              <Progress.Value />
            </Progress.Root>
          </div>
          <button
            onClick={() => goTo("start_welcome")}
            className="mt-6 px-4 py-2 rounded-md bg-[var(--dark)] text-[var(--light)] dark:bg-[var(--light)] dark:text-[var(--dark)] hover:opacity-90"
          >
            Next
          </button>
        </section>

        {/* Welcome Section */}
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
            className="max-w-[300px] text-center mb-10 text-dark dark:text-light"
          >
            This is my portfolio where I will showcase my internship project at
            Sorama.
          </p>
          <button
            onClick={() => goTo("start_sorama")}
            className="mt-2 px-4 py-2 rounded-md bg-[var(--dark)] text-[var(--light)] dark:bg-[var(--light)] dark:text-[var(--dark)] hover:opacity-90"
          >
            Next
          </button>
        </section>

        <ContentSection
          ref={soramaRef}
          titleRef={soramaTitleRef}
          textRef={soramaTextRef}
          title="Who is Sorama"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisl quam, varius a eros vitae, viverra dignissim erat. Praesent quis leo placerat, lacinia ipsum sed, pulvinar ligula. Morbi tempor nibh eget ipsum convallis, ac molestie eros luctus. Mauris laoreet metus nec dolor blandit, vitae pellentesque eros venenatis. Suspendisse at tempus augue. In at nisl ut diam posuere rhoncus. Nunc vitae tellus pellentesque, tempor dui ac, aliquam elit. Phasellus sed nunc risus. Fusce scelerisque tempor sagittis. Donec ullamcorper mi neque, quis aliquet massa blandit in."
          onNext={() => goTo("start_item1")}
        />

        <ContentSection
          ref={item1Ref}
          titleRef={item1TitleRef}
          textRef={item1TextRef}
          title="My work at Sorama"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisl quam, varius a eros vitae, viverra dignissim erat. Praesent quis leo placerat, lacinia ipsum sed, pulvinar ligula. Morbi tempor nibh eget ipsum convallis, ac molestie eros luctus. Mauris laoreet metus nec dolor blandit, vitae pellentesque eros venenatis. Suspendisse at tempus augue. In at nisl ut diam posuere rhoncus. Nunc vitae tellus pellentesque, tempor dui ac, aliquam elit. Phasellus sed nunc risus. Fusce scelerisque tempor sagittis. Donec ullamcorper mi neque, quis aliquet massa blandit in."
          onNext={() => goTo("start_research")}
        />

        <section
          ref={researchRef}
          className="w-screen flex flex-row flex-wrap justify-evenly items-center opacity-0 absolute bg-light dark:bg-dark transition duration-500"
        >
          <h1
            ref={researchTitleRef}
            className="text-4xl w-1/3 text-center font-bold text-dark dark:text-light"
          >
            Research
          </h1>
          <p
            ref={researchTextRef}
            className="max-w-[300px] sm:max-w-lg text-left text-dark dark:text-light"
          >
            For the first part of the project I had to set up a React
            environment, to to understand the basics of React and how it works.
            I had to do some research on what framework to use and if i wanted
            to use a component ui library. I decided to use Tailwind CSS as the
            framework and I used a component library called Base UI components.
          </p>
          <button
            onClick={() => setDocsOpen(true)}
            className="mt-6 px-4 py-2 rounded-md bg-[var(--dark)] text-[var(--light)] dark:bg-[var(--light)] dark:text-[var(--dark)] hover:opacity-90"
          >
            Open Research Doc
          </button>
          <button
            onClick={() => goTo("end_research")}
            className="mt-6 px-4 py-2 rounded-md bg-[var(--dark)] text-[var(--light)] dark:bg-[var(--light)] dark:text-[var(--dark)] hover:opacity-90"
          >
            Next
          </button>
          <DocsOverlay
            open={docsOpen}
            onClose={() => setDocsOpen(false)}
            title="Research Questions"
            context="Context of the document"
            docxUrl="/Sorama_Project_Plan.docx"
          />
        </section>
      </div>
    </main>
  );
}

export default App;
