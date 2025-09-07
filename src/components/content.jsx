// src/components/content.jsx
import React from "react";

export default function Content() {
    return (
        <section className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light flex flex-col items-center justify-center p-10">
            <h2 className="text-4xl font-bold mb-6">Welcome to my Portfolio</h2>
            <p className="max-w-2xl text-center mb-10">
                Hi, I’m Pepijn 👋 — this is my internship portfolio where I’ll showcase
                my projects, skills, and journey. Scroll down to explore more.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
                    <h3 className="text-xl font-semibold mb-2">📂 Project 1</h3>
                    <p className="text-sm">
                        A brief description of my first project. Click to learn more.
                    </p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
                    <h3 className="text-xl font-semibold mb-2">🎨 UI/UX</h3>
                    <p className="text-sm">
                        My design process, from wireframes to prototypes and testing.
                    </p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
                    <h3 className="text-xl font-semibold mb-2">💻 Skills</h3>
                    <p className="text-sm">
                        React, TailwindCSS, GSAP animations, and more.
                    </p>
                </div>
            </div>
        </section>
    );
}
