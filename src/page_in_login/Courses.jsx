import React, { useEffect, useState } from "react";
import { getUserFromToken } from "./utils";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCourses(data || []);
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <h1 className="text-3xl font-bold text-[#7F1D8A] mb-4">Kurslar</h1>
      {courses.length > 0 ? (
        <ul className="space-y-2">
          {courses.map((c) => (
            <li key={c._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <span>{c.title}</span>
              <span>{c.progress || 0}% completed</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Siz hali biron kursga yozilmadingiz.</p>
      )}
    </div>
  );
};

export default Courses;
