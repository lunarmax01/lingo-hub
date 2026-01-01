import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Public pages
import Navbar from "./page/NAV";
import HERO from "./page/HERO";
import PopularCourses from "./page/PopularCourses";
import About from "./page/About";
import SignUp from "./page/SignUp";
import Login from "./page/Login";

// Private pages
import Dashboard from "./page_in_login/Dashboard";
import Courses from "./page_in_login/Courses";
import Profile from "./page_in_login/Profile";
import AdminPanel from "./page_in_login/AdminPanel";

// Private utils
import ProtectedRoute from "./page_in_login/ProtectedRoute";
import NavbarPrivate from "./page_in_login/NavbarPrivate";
import { getUserFromToken } from "./page_in_login/utils";

// Page animation
const pageTransition = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
  transition: { duration: 0.6, ease: "easeInOut" },
};

const BEY = () => {
  const location = useLocation();
  const user = getUserFromToken(); // token orqali foydalanuvchi info

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      
      {/* Navbar */}
      {user ? <NavbarPrivate /> : <Navbar />}

      {/* Page transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* HOME */}
          <Route
            path="/"
            element={
              <motion.main {...pageTransition}>
                <HERO />
                <PopularCourses />
              </motion.main>
            }
          />

          {/* ABOUT */}
          <Route
            path="/about"
            element={
              <motion.main {...pageTransition}>
                <About />
              </motion.main>
            }
          />

          {/* SIGN UP */}
          <Route
            path="/signup"
            element={
              user ? <Navigate to="/dashboard" /> :
              <motion.main {...pageTransition}>
                <SignUp />
              </motion.main>
            }
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={
              user ? <Navigate to="/dashboard" /> :
              <motion.main {...pageTransition}>
                <Login />
              </motion.main>
            }
          />

          {/* DASHBOARD - PROTECTED */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <motion.main {...pageTransition}>
                  <Dashboard />
                </motion.main>
              </ProtectedRoute>
            }
          />

          {/* COURSES - PROTECTED */}
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <motion.main {...pageTransition}>
                  <Courses />
                </motion.main>
              </ProtectedRoute>
            }
          />

          {/* PROFILE - PROTECTED */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <motion.main {...pageTransition}>
                  <Profile />
                </motion.main>
              </ProtectedRoute>
            }
          />

          {/* ADMIN PANEL - PROTECTED, ADMIN ONLY */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <motion.main {...pageTransition}>
                  <AdminPanel />
                </motion.main>
              </ProtectedRoute>
            }
          />

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default BEY;
