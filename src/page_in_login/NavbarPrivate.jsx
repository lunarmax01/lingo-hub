// NavbarPrivate.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken } from "./utils";
import { FaChalkboardTeacher, FaBook, FaUser, FaSignOutAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast"; // ✅ toast import

const NavbarPrivate = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [onlineCourses, setOnlineCourses] = useState([]);
    const [showCourses, setShowCourses] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    const dropdownRef = useRef(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        gender: "male",
        address: "",
        phone: "",
    });

    const coursesType = [
        { id: "offline", title: "Offline Course", icon: <FaChalkboardTeacher className="text-red-600" /> },
        { id: "online", title: "Online Course", icon: <FaBook className="text-purple-600" /> },
    ];

    // Foydalanuvchini olish va online kurslarni yuklash
    useEffect(() => {
        const u = getUserFromToken();
        if (!u) {
            navigate("/login");
            return;
        }
        setUser(u);

        fetch("http://localhost:5000/api/courses", {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
            .then((res) => res.json())
            .then((data) => setOnlineCourses(data.courses || []))
            .catch((err) => console.error("Courses fetch error:", err));
    }, [navigate]);

    // Drawer ochilganda scrollni bloklash
    useEffect(() => {
        document.body.style.overflow = showDrawer ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showDrawer]);

    // Dropdown tashqarisiga bosilganda yopish
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowCourses(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 🔹 Offline kurs submit backend bilan bog‘lash va toast bilan
    const handleSubmitOffline = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/courses/enroll-offline", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || "Offline kursga muvaffaqiyatli yozildingiz!", {
                    duration: 4000,
                    style: {
                        borderRadius: "10px",
                        background: "#7F1D8A",
                        color: "#fff",
                        fontWeight: "bold",
                        padding: "12px 16px",
                    },
                    iconTheme: { primary: "#fff", secondary: "#7F1D8A" },
                });

                setShowDrawer(false);
                setFormData({ firstName: "", lastName: "", age: "", gender: "male", address: "", phone: "" });
            } else {
                toast.error(data.message || "Xatolik yuz berdi!", {
                    duration: 4000,
                    style: { borderRadius: "10px", background: "#e11d48", color: "#fff", fontWeight: "bold", padding: "12px 16px" },
                });
            }
        } catch (err) {
            console.error(err);
            toast.error("Server bilan bog‘lanishda xatolik yuz berdi", {
                duration: 4000,
                style: { borderRadius: "10px", background: "#e11d48", color: "#fff", fontWeight: "bold", padding: "12px 16px" },
            });
        }
    };

    const handleEnrollOffline = () => setShowDrawer(true);

    // 🔹 Online kursga enroll backend bilan toast bilan
    const handleEnrollOnline = async (courseId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/courses/enroll/${courseId}`, {
                method: "POST",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || "Online kursga yozildingiz!", {
                    duration: 4000,
                    style: { borderRadius: "10px", background: "#16a34a", color: "#fff", fontWeight: "bold", padding: "12px 16px" },
                });
            } else {
                toast.error(data.message || "Xatolik yuz berdi!", {
                    duration: 4000,
                    style: { borderRadius: "10px", background: "#e11d48", color: "#fff", fontWeight: "bold", padding: "12px 16px" },
                });
            }
        } catch (err) {
            console.error(err);
            toast.error("Server bilan bog‘lanishda xatolik yuz berdi", {
                duration: 4000,
                style: { borderRadius: "10px", background: "#e11d48", color: "#fff", fontWeight: "bold", padding: "12px 16px" },
            });
        }
    };

    if (!user) return null;

    return (
        <>
            {/* 🔹 Toast container */}
            <Toaster position="top-right" reverseOrder={false} />

            <nav className="bg-[#7F1D8A] text-white flex justify-between items-center px-6 py-3 shadow-lg relative">
                <div className="font-bold text-xl cursor-pointer" onClick={() => navigate("/dashboard")}>
                    LingoHub
                </div>

                <ul className="flex space-x-6 items-center">
                    <li>
                        <Link to="/dashboard" className="hover:text-[#cd6fd8]">
                            Dashboard
                        </Link>
                    </li>

                    {/* Courses dropdown */}
                    <li className="relative" ref={dropdownRef}>
                        <button
                            className="flex items-center gap-1 px-3 py-1 rounded bg-[#9a29a7] hover:bg-[#b73cc5] transition"
                            onClick={() => setShowCourses(!showCourses)}
                        >
                            Courses {showCourses ? "▲" : "▼"}
                        </button>

                        <AnimatePresence>
                            {showCourses && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute left-0 mt-2 w-80 bg-white text-black rounded shadow-lg z-20 p-3 space-y-2"
                                >
                                    {coursesType.map((c) => (
                                        <div
                                            key={c.id}
                                            className="flex justify-between items-center p-2 rounded hover:bg-gray-100 transition cursor-pointer"
                                        >
                                            <div className="flex items-center gap-2">
                                                {c.icon}
                                                <span className="font-medium">{c.title}</span>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    c.id === "offline" ? handleEnrollOffline() : handleEnrollOnline("ONLINE_BACKEND_ID")
                                                }
                                                className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition"
                                            >
                                                Qo‘shilish
                                            </button>
                                        </div>
                                    ))}

                                    {onlineCourses.length > 0 && (
                                        <div className="mt-2 space-y-1">
                                            <p className="text-gray-500 text-xs font-semibold">Boshqa Online kurslar:</p>
                                            {onlineCourses.map((c) => (
                                                <div
                                                    key={c._id}
                                                    className="flex justify-between items-center p-2 rounded hover:bg-gray-100 transition"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <FaBook className="text-purple-600" />
                                                        <span className="font-medium">{c.title} ({c.level || "N/A"})</span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleEnrollOnline(c._id)}
                                                        className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition"
                                                    >
                                                        Qo‘shilish
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>

                    <li>
                        <Link
                            to="/profile"
                            className="flex items-center gap-2 bg-[#9a29a7] hover:bg-[#b73cc5] text-[#fff] px-4 py-2 rounded-full shadow transition"
                        >
                            <FaUser /> Profil
                        </Link>
                    </li>

                    {user.role === "admin" && (
                        <li>
                            <Link to="/admin" className="hover:text-[#b73cc5] font-semibold">
                                Admin Panel
                            </Link>
                        </li>
                    )}

                    <li
                        onClick={handleLogout}
                        className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded bg-[#9a29a7] hover:bg-[#b73cc5] transition-colors duration-300 text-white shadow-md hover:shadow-lg"
                        title="Logout"
                    >
                        <FaSignOutAlt className="w-5 h-5" />
                        <span className="hidden sm:inline font-medium">Logout</span>
                    </li>
                </ul>

                {/* Offline Drawer */}
                <AnimatePresence>
                    {showDrawer && (
                        <div
                            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                            onClick={() => setShowDrawer(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.75, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.75, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="bg-white p-6 rounded-2xl shadow-lg w-96 max-w-[95%] overflow-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-purple-700">Offline Kursga Yozilish</h2>
                                    <button
                                        onClick={() => setShowDrawer(false)}
                                        className="text-red-500 font-bold text-xl"
                                    >
                                        X
                                    </button>
                                </div>

                                <p className="text-gray-600 mb-4">Iltimos, quyidagi ma’lumotlarni to‘ldiring:</p>

                                <form className="space-y-3" onSubmit={handleSubmitOffline}>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="Ism"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-400"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Familya"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-400"
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            name="age"
                                            placeholder="Yosh"
                                            value={formData.age}
                                            onChange={handleChange}
                                            className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-400"
                                            required
                                        />
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                                        >
                                            <option value="male">Erkak</option>
                                            <option value="female">Ayol</option>
                                        </select>
                                    </div>

                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Yashash joyi / Manzil"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-400"
                                        required
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Telefon raqami"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-400"
                                        required
                                    />

                                    <button
                                        type="submit"
                                        className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-600 transition"
                                    >
                                        Yozilish
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default NavbarPrivate;
