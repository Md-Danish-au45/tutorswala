// app/components/BackToTopButton.jsx
"use client"; // This directive is crucial! It marks this as a Client Component.

import React from "react";

const BackToTopButton = () => {
  return (
    <a
      href="#top"
      className="fixed bottom-8 right-8 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200 flex items-center justify-center z-50"
      aria-label="Back to top"
      title="Back to Top"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </a>
  );
};

export default BackToTopButton;
