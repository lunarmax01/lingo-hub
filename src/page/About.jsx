import React from 'react';

const About = () => {
  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-10 bg-purple-50">
      {/* Section Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#7F1D8A] mb-8 sm:mb-12 text-center">
        About Lingo Hub
      </h2>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
        {/* Left Column: Text */}
        <div className="space-y-4 sm:space-y-6 text-gray-700 text-base sm:text-lg md:text-xl">
          <p>
            Lingo Hub is an interactive platform designed to make learning English fun, easy, and effective. 
            Whether you are a beginner or an advanced learner, we provide structured courses to improve your skills.
          </p>
          <p>
            Our mission is to help learners around the world gain confidence in speaking, reading, and writing English. 
            With personalized lessons, quizzes, and interactive exercises, learning becomes engaging and productive.
          </p>
          <p>
            Join thousands of learners who are already improving their English with Lingo Hub!
          </p>
        </div>

        {/* Right Column: Background Divs */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div
            className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 w-full h-48 bg-cover bg-center"
            style={{ backgroundImage: "url('../src/assets/English_Learning.png')" }}
          />
          <div
            className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 w-full h-48 bg-cover bg-center"
            style={{ backgroundImage: "url('src/assets/Online_Learning.png')" }}
          />
          <div
            className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 col-span-2 w-full h-48 bg-cover bg-center"
            style={{ backgroundImage: "url('src/assets/Learning_Together.png')" }}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
