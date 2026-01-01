import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBookOpen, FaClipboardList, FaGraduationCap, FaTachometerAlt } from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Backend endpoint: token bilan user ma'lumotini olish
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("User data olishda xato!");

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <p className="text-center mt-20 text-lg">Loading...</p>;
  if (!user) return <p className="text-center mt-20 text-red-500">User not found. Please login again.</p>;

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#7F1D8A]">
            Salom, {user.firstName}!
          </h1>
          <p className="text-gray-700 mt-1">
            O‘rganish statusi: <span className="font-semibold">{user.learningStatus}</span>
          </p>
        </div>

        <div className="flex mt-4 md:mt-0 gap-3">
          {user.role === "admin" && (
            <Link
              to="/admin"
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 transition"
            >
              <FaTachometerAlt /> Admin Panel
            </Link>
          )}
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <FaBookOpen className="text-purple-600 text-3xl mb-2" />
          <span className="text-gray-500 text-sm">Kurslar soni</span>
          <span className="font-bold text-xl mt-1">{user.courses?.length || 0}</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <FaClipboardList className="text-purple-600 text-3xl mb-2" />
          <span className="text-gray-500 text-sm">Progress</span>
          <span className="font-bold text-xl mt-1">
            {user.courses?.length
              ? Math.round(user.courses.reduce((sum, c) => sum + c.progress, 0) / user.courses.length)
              : 0}%
          </span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <FaGraduationCap className="text-purple-600 text-3xl mb-2" />
          <span className="text-gray-500 text-sm">Yakunlangan kurslar</span>
          <span className="font-bold text-xl mt-1">
            {user.courses?.filter(c => c.progress === 100).length || 0}
          </span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <FaUser className="text-purple-600 text-3xl mb-2" />
          <span className="text-gray-500 text-sm">Rol</span>
          <span className="font-bold text-xl mt-1">{user.role}</span>
        </div>
      </div>

      {/* Courses cards */}
      <h2 className="text-2xl font-semibold mb-4">Sizning kurslaringiz</h2>
      {user.courses && user.courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {user.courses.map((c) => (
            <div key={c._id} className="bg-white rounded-lg shadow p-4 flex flex-col justify-between hover:scale-105 transition transform">
              <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-sm">{c.progress}% completed</span>
                <div className="w-1/2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${c.progress}%` }}
                  ></div>
                </div>
              </div>
              <Link
                to={`/courses/${c._id}`}
                className="mt-auto bg-[#7F1D8A] text-white py-2 rounded-full text-center hover:bg-purple-800 transition"
              >
                Ko‘rish
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Siz hali biron kursga yozilmadingiz.</p>
      )}
    </div>
  );
};

export default Dashboard;
