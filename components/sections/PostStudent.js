"use client";
export const dynamic = "force-static";

import React, { useState } from "react";
import {
  User,
  GraduationCap,
  MapPin,
  Home,
  Calendar,
  Clock,
  BookOpen,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function PostStudent() {
  const [form, setForm] = useState({
    name: "",
    board: "",
    home: "",
    class: "",
    city: "",
    address: "",
    time: "",
    date: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Basic validation
    const requiredFields = [
      "name",
      "board",
      "home",
      "class",
      "city",
      "address",
      "time",
      "date",
    ];
    const isValid = requiredFields.every((field) => form[field].trim() !== "");

    if (!isValid) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        "https://tutorwalabackend.onrender.com/api/student/student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (response.ok) {
        setSubmitStatus("success");
        setForm({
          name: "",
          board: "",
          home: "",
          class: "",
          city: "",
          address: "",
          time: "",
          date: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const boardOptions = [
    { value: "", label: "Select Board" },
    { value: "CBSE", label: "CBSE" },
    { value: "ICSE", label: "ICSE" },
    { value: "State Board", label: "State Board" },
    { value: "IB", label: "International Baccalaureate (IB)" },
    { value: "IGCSE", label: "IGCSE" },
  ];

  const classOptions = [
    { value: "", label: "Select Class" },
    { value: "1st", label: "Class 1st" },
    { value: "2nd", label: "Class 2nd" },
    { value: "3rd", label: "Class 3rd" },
    { value: "4th", label: "Class 4th" },
    { value: "5th", label: "Class 5th" },
    { value: "6th", label: "Class 6th" },
    { value: "7th", label: "Class 7th" },
    { value: "8th", label: "Class 8th" },
    { value: "9th", label: "Class 9th" },
    { value: "10th", label: "Class 10th" },
    { value: "11th", label: "Class 11th" },
    { value: "12th", label: "Class 12th" },
  ];

  const homeOptions = [
    { value: "", label: "Select Mode" },
    { value: "Yes", label: "Home Tuition" },
    { value: "No", label: "Online Classes" },
  ];

  const timeOptions = [
    { value: "", label: "Select Time" },
    { value: "6:00 AM", label: "6:00 AM" },
    { value: "7:00 AM", label: "7:00 AM" },
    { value: "8:00 AM", label: "8:00 AM" },
    { value: "9:00 AM", label: "9:00 AM" },
    { value: "10:00 AM", label: "10:00 AM" },
    { value: "11:00 AM", label: "11:00 AM" },
    { value: "12:00 PM", label: "12:00 PM" },
    { value: "1:00 PM", label: "1:00 PM" },
    { value: "2:00 PM", label: "2:00 PM" },
    { value: "3:00 PM", label: "3:00 PM" },
    { value: "4:00 PM", label: "4:00 PM" },
    { value: "5:00 PM", label: "5:00 PM" },
    { value: "6:00 PM", label: "6:00 PM" },
    { value: "7:00 PM", label: "7:00 PM" },
    { value: "8:00 PM", label: "8:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-6">
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="bg-emerald-700 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Student Registration
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-2">
            Fill out the form below to register for tuition
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === "success" && (
          <div className="mb-4 sm:mb-6 bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 flex items-start sm:items-center space-x-2 sm:space-x-3">
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-sm sm:text-base text-green-800 font-medium">
              Student registered successfully!
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-4 sm:mb-6 bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 flex items-start sm:items-center space-x-2 sm:space-x-3">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-sm sm:text-base text-red-800 font-medium">
              Error submitting form. Please try again.
            </p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8">
          <div className="space-y-4 sm:space-y-6">
            {/* Personal Information */}
            <div className="border-b border-gray-200 pb-4 sm:pb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-700 flex-shrink-0" />
                <span>Personal Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter your city"
                    required
                  />
                </div>
              </div>

              <div className="mt-3 sm:mt-4">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  <MapPin className="inline h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Complete Address *
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                  placeholder="Enter your complete address"
                  required
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="border-b border-gray-200 pb-4 sm:pb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-700 flex-shrink-0" />
                <span>Academic Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Class *
                  </label>
                  <select
                    name="class"
                    value={form.class}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  >
                    {classOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Board *
                  </label>
                  <select
                    name="board"
                    value={form.board}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  >
                    {boardOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Tuition Preferences */}
            <div className="border-b border-gray-200 pb-4 sm:pb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
                <Home className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-700 flex-shrink-0" />
                <span>Tuition Preferences</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Tuition Mode *
                  </label>
                  <select
                    name="home"
                    value={form.home}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  >
                    {homeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    <Clock className="inline h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Preferred Time *
                  </label>
                  <select
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  >
                    {timeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3 sm:mt-4">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  <Calendar className="inline h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Preferred Start Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 sm:pt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base rounded-md sm:rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Register for Tuition</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8 text-gray-500 text-xs sm:text-sm px-2">
          <p>Need help? Contact our support team for assistance.</p>
        </div>
      </div>
    </div>
  );
}
