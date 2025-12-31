import React from "react";

const HERO = () => {
  return (
    <section
      id="home"
      className="w-full min-h-screen flex items-center bg-gradient-to-b from-white via-purple-50 to-purple-100"
    >
      <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16">

          {/* LEFT CONTENT */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 text-left">
            <h1 className="font-extrabold text-gray-900 leading-[1.15] max-w-xl text-balance text-[clamp(1.6rem,3vw,2.8rem)]">
              Develop your English skills <br /> in a modern and effective way
            </h1>

            <p className="text-gray-700 leading-[1.7] max-w-lg text-[clamp(0.95rem,1.3vw,1.1rem)]">
              Learn English through interactive lessons, real-life conversations,
              and practical exercises. With experienced teachers and modern methods,
              improve your speaking, listening, reading, and writing skills.
              Start speaking English confidently for work, study, and everyday life.
            </p>

            <div>
              <button className="inline-flex items-center justify-center px-[clamp(1.4rem,3vw,2.6rem)] py-[clamp(0.7rem,1.6vw,1rem)] text-[clamp(0.9rem,1.2vw,1rem)] rounded-full bg-gradient-to-r from-purple-700 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-purple-400">
                Get started now
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
            <div
              className="
                w-[clamp(240px,80vw,580px)]
                h-[clamp(240px,80vw,580px)]
                sm:w-[clamp(300px,70vw,580px)]
                sm:h-[clamp(300px,70vw,580px)]
                bg-cover bg-center bg-no-repeat
                drop-shadow-2xl
                rounded-3xl
                transition-transform duration-500
                hover:scale-105
              "
              id="BgHero"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HERO;
