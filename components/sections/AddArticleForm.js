"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image"; // Import Next.js Image component for optimized images
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill, only on the client-side
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p className="text-gray-500">Loading editor...</p>, // Added styling to loading message
});

const AddArticleForm = () => {
  const [form, setForm] = useState({
    category: "",
    title: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // State for image preview URL
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value) => {
    setForm({ ...form, content: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setMessage({ type: "error", text: "Please upload an image file." });
        setImage(null);
        setImagePreviewUrl(null); // Clear preview if invalid
        e.target.value = "";
        return;
      }
      setImage(file);
      setImagePreviewUrl(URL.createObjectURL(file)); // Create a URL for preview
      setMessage(null);
    } else {
      setImage(null);
      setImagePreviewUrl(null); // Clear preview if no file selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    for (let key in form) {
      if (key === "metaKeywords") {
        const keywordsArray = form[key]
          .split(",")
          .map((keyword) => keyword.trim())
          .filter((keyword) => keyword !== "");
        formData.append(key, JSON.stringify(keywordsArray));
      } else {
        formData.append(key, form[key]);
      }
    }

    if (image) {
      formData.append("image", image);
    }

    const API_URL = "https://tutorwalabackend.onrender.com/api/articles/blog";

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let errorData = {};
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          errorData = await res.json();
        } else {
          const errorText = await res.text();
          console.error("Backend error (non-JSON response):", errorText);
          errorData.message = `Server responded with status ${
            res.status
          }. ${errorText.substring(0, 100)}... (check console)`;
        }
        setMessage({
          type: "error",
          text: `Failed to submit: ${
            errorData.message || "Unknown server error."
          }`,
        });
        return;
      }

      const data = await res.json();

      setMessage({ type: "success", text: "Article added successfully!" });
      // Reset form and image states
      setForm({
        category: "",
        title: "",
        content: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
      });
      setImage(null);
      setImagePreviewUrl(null); // Clear image preview
      // Manually clear file input field
      const imageInput = e.target.elements.image;
      if (imageInput) {
        imageInput.value = "";
      }
    } catch (err) {
      console.error("Submit error:", err);
      setMessage({
        type: "error",
        text: "Error submitting article. Please check your network or server logs.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg my-8">
      {" "}
      {/* Increased max-w, added vertical margin and padding */}
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
        Add New Article
      </h2>{" "}
      {/* Enhanced heading */}
      {/* Message Display Area */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-md text-sm font-medium ${
            message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-200" // More distinct success styling
              : "bg-red-100 text-red-700 border border-red-200" // More distinct error styling
          }`}
        >
          {message.text}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-6" // Increased space between form elements
      >
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" // Improved styling
            required
          >
            <option value="">Select Category</option>
            <option value="Home Tutors">Home Tutors</option>
            <option value="Delhi Areas">Delhi Areas</option>
            <option value="NCR & Nearby Areas">NCR & Nearby Areas</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Title:
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Content:
          </label>
          <ReactQuill
            id="content"
            value={form.content}
            onChange={handleContentChange}
            className="h-64 mb-12 border border-gray-300 rounded-md" // Increased height, added border to quill editor
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "blockquote",
              "list",
              "bullet",
              "link",
              "image",
            ]}
          />
        </div>

        <div className="pt-16">
          {" "}
          {/* Increased padding-top to give more space for Quill toolbar */}
          <label
            htmlFor="image"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Upload Image:
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-emerald-50 file:text-emerald-700
                       hover:file:bg-emerald-100" // Custom file input styling
          />
          {/* Image Preview Area */}
          {imagePreviewUrl && (
            <div className="mt-4 p-2 border border-gray-200 rounded-md bg-gray-50">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Image Preview:
              </p>
              <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden rounded-md">
                {" "}
                {/* Responsive height */}
                <Image
                  src={imagePreviewUrl}
                  alt="Image Preview"
                  layout="fill" // Makes the image fill the parent div
                  objectFit="contain" // Ensures the whole image is visible within the container
                  className="rounded-md"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="metaTitle"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Meta Title:
          </label>
          <input
            id="metaTitle"
            name="metaTitle"
            value={form.metaTitle}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="metaDescription"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Meta Description:
          </label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            value={form.metaDescription}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            rows="4"
          />
        </div>

        <div>
          <label
            htmlFor="metaKeywords"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Meta Keywords (comma separated):
          </label>
          <input
            id="metaKeywords"
            name="metaKeywords"
            value={form.metaKeywords}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out" // Enhanced button styling
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Article"}
        </button>
      </form>
    </div>
  );
};

export default AddArticleForm;
