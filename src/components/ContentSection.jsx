import React, { forwardRef } from "react";

const ContentSection = forwardRef(({ title, text, titleRef, textRef }, ref) => (
  <section
    ref={ref}
    className="w-screen flex flex-row flex-wrap justify-evenly items-center opacity-0 absolute bg-light dark:bg-dark transition duration-500"
  >
    <h1
      ref={titleRef}
      className="text-4xl w-1/3 text-center font-bold text-dark dark:text-light"
    >
      {title}
    </h1>
    <p
      ref={textRef}
      className="max-w-[300px] sm:max-w-lg text-left text-dark dark:text-light"
    >
      {text}
    </p>
  </section>
));

export default ContentSection;
