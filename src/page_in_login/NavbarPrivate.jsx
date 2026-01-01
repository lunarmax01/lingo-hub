// NavbarPrivateResponsive.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "./utils";
import { FaChalkboardTeacher, FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

const NavbarPrivateResponsive = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // basic token data
  const [profileData, setProfileData] = useState(null); // full data from backend
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const mobileMenuRef = useRef(null);
  const drawerRef = useRef(null);
  const profileRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "male",
    address: "",
    phone: "",
  });

  // Get user from token on page load
  useEffect(() => {
    const u = getUserFromToken();
    if (!u) {
      navigate("/login");
      return;
    }
    setUser(u);
  }, [navigate]);

  // Block scroll when drawer/profile/mobile menu is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen || mobileMenu || profileOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [drawerOpen, mobileMenu, profileOpen]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) setMobileMenu(false);
      if (drawerRef.current && !drawerRef.current.contains(e.target)) setDrawerOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch full profile from backend
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch profile data.");

      const data = await res.json();
      setProfileData(data.user);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to fetch profile data", {
        duration: 4000,
        style: { borderRadius: "10px", background: "#e11d48", color: "#fff", fontWeight: "bold", padding: "12px 16px" },
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOffline = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/courses/enroll-offline", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Successfully enrolled!", {
          duration: 4000,
          style: { borderRadius: "10px", background: "#7F1D8A", color: "#fff", fontWeight: "bold", padding: "12px 16px" },
        });
        setDrawerOpen(false);
      } else {
        toast.error(data.message || "Error occurred!", {
          duration: 4000,
          style: { borderRadius: "10px", background: "#e11d48", color: "#fff", fontWeight: "bold", padding: "12px 16px" },
        });
      }
    } catch (err) {
      toast.error("Server error!", {
        duration: 4000,
        style: { borderRadius: "10px", background: "#e11d48", color: "#fff", fontWeight: "bold", padding: "12px 16px" },
      });
    }
  };

  const handleEnrollOffline = () => setDrawerOpen(true);

  const handleOpenProfile = () => {
    setProfileOpen(true);
    fetchProfileData();
  };

  if (!user) return null;

  return (
    <>
      <Toaster position="top-right" />

      {/* Navbar */}
      <nav className="bg-[#7F1D8A] text-white px-4 py-3 flex justify-between items-center shadow-md fixed w-full z-40">
        <div className="font-bold text-xl cursor-pointer" onClick={() => navigate("/dashboard")}>
          LingoHub
        </div>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex space-x-6 items-center">
          <li>
            <button className="hover:text-[#cd6fd8]" onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>
          </li>
          <li>
            <button className="px-3 py-1 bg-[#9a29a7] hover:bg-[#b73cc5] rounded" onClick={handleEnrollOffline}>
              Enroll Offline Course
            </button>
          </li>
          <li>
            <button className="flex items-center gap-2 bg-[#9a29a7] px-4 py-2 rounded-full" onClick={handleOpenProfile}>
              <FaUser /> Profile
            </button>
          </li>
          {user.role === "admin" && (
            <li>
              <button className="hover:text-[#b73cc5] font-semibold" onClick={() => navigate("/admin")}>
                Admin Panel
              </button>
            </li>
          )}
          <li>
            <button className="flex items-center gap-2 bg-[#9a29a7] px-3 py-1 rounded" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-72 h-full bg-white shadow-2xl z-50 p-6 flex flex-col overflow-auto rounded-l-3xl"
          >
            <div className="flex justify-between items-center mb-6">
              <div
                className="text-3xl font-extrabold text-purple-700 cursor-pointer"
                onClick={() => {
                  navigate("/dashboard");
                  setMobileMenu(false);
                }}
              >
                LingoHub
              </div>
              <button onClick={() => setMobileMenu(false)} className="text-red-500 font-bold text-xl">
                <FaTimes />
              </button>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setMobileMenu(false);
                }}
                className="font-semibold text-purple-700 py-2 px-3 rounded-lg hover:bg-purple-100"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  handleEnrollOffline();
                  setMobileMenu(false);
                }}
                className="px-3 py-2 bg-purple-50 text-purple-700 font-medium rounded-lg flex justify-between"
              >
                Offline Course <span className="text-xs font-semibold">Enroll</span>
              </button>
              <button
                onClick={() => {
                  handleOpenProfile();
                  setMobileMenu(false);
                }}
                className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-xl"
              >
                Profile
              </button>
              {user.role === "admin" && (
                <button
                  onClick={() => {
                    navigate("/admin");
                    setMobileMenu(false);
                  }}
                  className="text-purple-700 font-semibold py-2 px-3 rounded-lg hover:bg-purple-100"
                >
                  Admin Panel
                </button>
              )}
              <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl">
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offline Course Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4"
            onClick={() => setDrawerOpen(false)}
          >
            <motion.div
              ref={drawerRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl overflow-auto p-6 sm:p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-purple-700">Enroll in Offline Course</h2>
                <button onClick={() => setDrawerOpen(false)} className="text-red-500 font-bold text-2xl sm:text-3xl">
                  <FaTimes />
                </button>
              </div>

              <p className="text-gray-600 mb-4">Please fill in the following information:</p>

              <form className="space-y-4" onSubmit={handleSubmitOffline}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-400"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-400"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
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
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-400"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-400"
                  required
                />
                <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-600 transition">
                  Enroll
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Profile Drawer */}
      <AnimatePresence>
        {profileOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4"
            onClick={() => setProfileOpen(false)}
          >
            <motion.div
              ref={profileRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-gradient-to-b from-purple-100 via-purple-50 to-white rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl overflow-auto p-6 sm:p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-purple-700">Profile</h2>
                <button onClick={() => setProfileOpen(false)} className="text-red-500 font-bold text-2xl sm:text-3xl">
                  <FaTimes />
                </button>
              </div>

              {/* Profile Content */}
              {!profileData && <p className="text-center text-purple-700">Loading...</p>}
              {profileData && (
                <div className="space-y-3 text-black">
                  <p><strong>First Name:</strong> {profileData.firstName}</p>
                  <p><strong>Last Name:</strong> {profileData.lastName}</p>
                  <p><strong>Email:</strong> {profileData.email}</p>
                  <p><strong>Phone:</strong> {profileData.phone || "N/A"}</p>
                  <p><strong>Learning Status:</strong> {profileData.learningStatus || "N/A"}</p>
                  <p><strong>Role:</strong> {profileData.role}</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarPrivateResponsive;
