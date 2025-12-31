import React from "react";

const teachers = [
  {
    firstName: "John",
    lastName: "Smith",
    level: "Beginner",
    code: "A1",
    description: "Basic phrases and simple conversations for everyday situations.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80"
  },
  {
    firstName: "Anna",
    lastName: "Petrova",
    level: "Elementary",
    code: "A2",
    description: "Understand and use simple sentences in familiar contexts.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80"
  },
  {
    firstName: "Kim",
    lastName: "Min-jun",
    level: "Pre-Intermediate",
    code: "B1",
    description: "Communicate independently in routine situations and travel.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80"
  },
  {
    firstName: "Emily",
    lastName: "Johnson",
    level: "Intermediate",
    code: "B2",
    description: "Understand more complex texts and communicate on a wide range of topics.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80"
  },
  {
    firstName: "David",
    lastName: "Lee",
    level: "Advanced",
    code: "C1/C2",
    description: "Professional and academic communication, fluent and accurate expression.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
  }
];

const EnglishLevels = () => {
  return (
    <section id="courses" className="w-full min-h-screen flex flex-col bg-gradient-to-b from-white via-purple-50 to-purple-100 px-4 sm:px-6 md:px-10 py-10">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 mb-3 sm:mb-4">
          English Language Levels & Teachers
        </h1>
        <p className="text-gray-700 text-xs sm:text-sm md:text-base max-w-3xl mx-auto">
          Meet our teachers and explore the 5 main levels of English according to CEFR. Learn and grow with our experienced instructors.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full max-w-[1200px] mx-auto auto-rows-fr">
        {teachers.map((teacher, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-500 w-full max-w-[307px] min-w-[260px] h-[500px] flex flex-col"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {/* Image */}
            <img
              src={teacher.image}
              alt={`${teacher.firstName} ${teacher.lastName}`}
              className="w-full h-[200px] object-cover"
            />

            {/* Text content */}
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-blue-700 mb-1 truncate">
                  {teacher.firstName} {teacher.lastName}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm mb-1">{teacher.level}</p>
                <p className="text-gray-500 text-xs sm:text-sm mb-2">Code: {teacher.code}</p>
                <p className="text-gray-500 text-xs sm:text-sm">{teacher.description}</p>
              </div>
              <button className="mt-4 bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-full hover:bg-blue-700 transition-colors text-xs sm:text-sm md:text-sm font-medium w-full">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EnglishLevels;
