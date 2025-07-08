"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css"; // Import the CSS for react-quill-new

// Dynamically import ReactQuill, only on the client-side
// Using 'react-quill-new' for better compatibility with React 18+
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false, // Do not server-side render ReactQuill
  loading: () => <p>Loading editor...</p>, // Optional: Show a loading message
});

const AddArticleForm = () => {
  const [form, setForm] = useState({
    category: "",
    title: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "", // This will initially be a comma-separated string
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // For loading state during submission
  const [message, setMessage] = useState(null); // For success/error messages

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value) => {
    setForm({ ...form, content: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please upload an image file." });
      setImage(null); // Clear image if invalid type
      e.target.value = ""; // Clear file input field
      return;
    }
    setImage(file);
    setMessage(null); // Clear previous messages
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading true on submission
    setMessage(null); // Clear previous messages

    const formData = new FormData();
    for (let key in form) {
      // Special handling for metaKeywords: convert comma-separated string to JSON array string
      if (key === "metaKeywords") {
        const keywordsArray = form[key]
          .split(",")
          .map((keyword) => keyword.trim())
          .filter((keyword) => keyword !== "");
        formData.append(key, JSON.stringify(keywordsArray)); // Send as JSON stringified array
      } else {
        formData.append(key, form[key]);
      }
    }

    if (image) {
      formData.append("image", image);
    }

    // Hardcoded API URL as requested
    const API_URL = "https://tutorwalabackend.onrender.com/api/articles/blog";

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      // It's crucial to check res.ok before trying to parse JSON
      // as res.json() will throw an error if the response body is not valid JSON.
      // A 500 error typically returns an HTML page, not JSON.
      if (!res.ok) {
        let errorData = {};
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          errorData = await res.json();
        } else {
          // If not JSON, try to read as text to get raw error message
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
        return; // Exit if response was not OK
      }

      const data = await res.json(); // Now this should only run if res.ok is true

      setMessage({ type: "success", text: "Article added successfully!" });
      // Reset form
      setForm({
        category: "",
        title: "",
        content: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
      });
      setImage(null);
      // Manually clear file input field
      const imageInput = e.target.elements.image; // Access by name attribute
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
      setLoading(false); // Always set loading false after request
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New Article</h2>

      {/* Message Display Area */}
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div>
          <label htmlFor="category" className="block font-medium">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Category</option>
            <option value="Home Tutors">Home Tutors</option>
            <option value="Delhi Areas">Delhi Areas</option>
            <option value="NCR & Nearby Areas">NCR & Nearby Areas</option>
          </select>
        </div>

        <div>
          <label htmlFor="title" className="block font-medium">
            Title:
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block font-medium">
            Content:
          </label>
          {/* ReactQuill will be client-side rendered only */}
          <ReactQuill
            id="content"
            value={form.content}
            onChange={handleContentChange}
            className="h-48 mb-12" // Add some height for the editor and margin for the toolbar
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

        <div className="pt-10">
          {" "}
          {/* Added padding top to adjust for Quill's height */}
          <label htmlFor="image" className="block font-medium">
            Upload Image:
          </label>
          <input
            id="image"
            name="image" // Added name attribute for easier targeting
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="metaTitle" className="block font-medium">
            Meta Title:
          </label>
          <input
            id="metaTitle"
            name="metaTitle"
            value={form.metaTitle}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="metaDescription" className="block font-medium">
            Meta Description:
          </label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            value={form.metaDescription}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="4"
          />
        </div>

        <div>
          <label htmlFor="metaKeywords" className="block font-medium">
            Meta Keywords (comma separated):
          </label>
          <input
            id="metaKeywords"
            name="metaKeywords"
            value={form.metaKeywords}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddArticleForm;
