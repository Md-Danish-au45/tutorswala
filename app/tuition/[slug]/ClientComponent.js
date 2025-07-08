// app/tuition/[slug]/ClientComponents.js
"use client";

import React, { useState } from "react";

const BackButton = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={handleBack}
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
    >
      Go Back
    </button>
  );
};

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <svg
        className={`w-5 h-5 ${
          isLiked ? "text-red-500 fill-red-500" : "text-gray-600"
        }`}
        fill={isLiked ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span
        className={`text-sm font-medium ${
          isLiked ? "text-red-500" : "text-gray-700"
        }`}
      >
        {isLiked ? "Liked" : "Like"}
      </span>
    </button>
  );
};

const ShareButton = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <svg
        className="w-5 h-5 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
        />
      </svg>
      <span className="text-sm font-medium text-gray-700">Share</span>
    </button>
  );
};

const CTAButton = () => {
  const handleFindTutor = () => {
    // You can add navigation logic here
    console.log("Finding tutor...");
  };

  return (
    <button
      onClick={handleFindTutor}
      className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
    >
      Find a Tutor
    </button>
  );
};

const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
      aria-label="Back to top"
    >
      <svg
        className="w-6 h-6"
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
    </button>
  );
};

const ClientComponents = {
  BackButton,
  LikeButton,
  ShareButton,
  CTAButton,
  BackToTopButton,
};

export default ClientComponents;
