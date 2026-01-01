import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user info and enrolled offline courses
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        setLoading(false);
        return;
      }

      // Fetch user info
      const resUser = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!resUser.ok) throw new Error("Failed to fetch user info");
      const dataUser = await resUser.json();
      setUser(dataUser.user);

      // Fetch enrolled offline courses
      const resCourses = await fetch("http://localhost:5000/api/courses/enrolled-offline", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!resCourses.ok) throw new Error("Failed to fetch courses");
      const dataCourses = await resCourses.json();
      setCourses(dataCourses.courses || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-20 text-lg text-purple-700">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!user) return <p className="text-center mt-20 text-red-500">User not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-purple-100 to-purple-200 p-6">
      <h1 className="text-4xl font-bold text-[#7F1D8A] mb-8 text-center">Welcome, {user.firstName}!</h1>

      {courses.length === 0 ? (
        <p className="text-center text-purple-700 text-lg">You are not enrolled in any offline courses yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <h2 className="text-2xl font-semibold text-purple-800 mb-4">{course.name}</h2>

              {course.lessons.length === 0 ? (
                <p className="text-gray-500">No lessons yet.</p>
              ) : (
                <ul className="space-y-2">
                  {course.lessons.map((lesson, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center bg-purple-50 px-3 py-2 rounded-md"
                    >
                      <span>{lesson.name}</span>
                      <span
                        className={`font-bold ${
                          lesson.completed ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        {lesson.completed ? "✅" : "❌"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {course.grade && (
                <p className="mt-4 text-right text-purple-700 font-semibold">Grade: {course.grade}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
