import { animate } from "framer-motion";

export const smoothScrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;

  const targetY = el.getBoundingClientRect().top + window.scrollY;

  animate(window.scrollY, targetY, {
    duration: 1.4,        // juda sokin
    ease: "easeInOut",
    onUpdate(value) {
      window.scrollTo(0, value);
    },
  });
};
