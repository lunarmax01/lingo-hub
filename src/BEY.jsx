// BEY.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./page/NAV";
import HERO from "./page/HERO";
import PopularCourses from "./page/PopularCourses";
import About from "./page/About";
import SignUp from "./page/SignUp";
import Login from "./page/Login"; // ⬅️ Login page qo‘shildi

// Page animation
const pageTransition = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
  transition: {
    duration: 0.6,
    ease: "easeInOut",
  },
};

const BEY = () => {
  const location = useLocation();

  return (
    <div className="relative overflow-x-hidden">
      <Navbar />

      {/* Page transition */}
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
              <motion.main {...pageTransition}>
                <SignUp />
              </motion.main>
            }
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={
              <motion.main {...pageTransition}>
                <Login />
              </motion.main>
            }
          />

        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default BEY;
