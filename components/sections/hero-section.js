"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import landingpage from "../../public/images/landing/landingpage.png";

export default function HeroSection() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    class: "",
    location: "", // Added location field
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Show popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Check if form is valid
  useEffect(() => {
    const isValid =
      formData.name.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.class.trim() !== "" &&
      formData.location.trim() !== ""; // Added location to validation
    setIsFormValid(isValid);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      setIsSubmitting(true);

      try {
        const response = await fetch("http://localhost:5006/api/consultation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentName: formData.name,
            phoneNumber: formData.phone,
            classGrade: formData.class,
            location: formData.location,
          }),
        });

        if (!response.ok) {
          throw new Error("Submission failed");
        }

        // Show success message
        setShowSuccessMessage(true);

        // Close popup after 2 seconds
        setTimeout(() => {
          setShowPopup(false);
          setShowSuccessMessage(false);
          setIsSubmitting(false);
          // Reset form
          setFormData({ name: "", phone: "", class: "", location: "" });
        }, 2000);
      } catch (error) {
        console.error("Submission error:", error);
        setIsSubmitting(false);
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  // Modified handleClose function to always close the popup
  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <section className="w-full pt-24 md:pt-32 lg:pt-40 pb-8 md:pb-12 lg:pb-16 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center px-3 py-1 mb-2 text-sm font-medium rounded-full bg-emerald-100 text-emerald-700">
                <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-emerald-600"></span>
                Trusted by 10,000+ students
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Quality Tutoring for{" "}
                  <span className="text-emerald-600">Your Child's Success</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Tutorswala connects your child with experienced tutors for
                  personalized learning.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-base"
                >
                  Find a Tutor
                </Button>
                <Button size="lg" variant="outline" className="text-base">
                  How It Works
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm mt-4">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span>Qualified Tutors</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span>Flexible Scheduling</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span>Satisfaction Guaranteed</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center relative">
              <div className="absolute inset-0 bg-emerald-200 rounded-full blur-3xl opacity-20 transform -rotate-6"></div>
              <Image
                src={landingpage}
                width={500}
                height={500}
                alt="Student learning with tutor"
                className="rounded-lg object-cover relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Professional Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ease-out">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 rounded-t-2xl relative">
              <button
                onClick={handleClose}
                // Removed the 'disabled={!isFormValid}' prop to always enable the close button
                className="absolute top-4 right-4 p-1 rounded-full transition-colors hover:bg-white hover:bg-opacity-20 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Get Started Today!</h2>
                <p className="text-emerald-100">
                  Find the perfect tutor for your child
                </p>
              </div>
            </div>

            {/* Form */}
            {!showSuccessMessage ? (
              <div className="p-6 space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Student Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                    placeholder="Enter student's full name"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                    placeholder="Enter contact number"
                    pattern="[0-9]{10}"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="class"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Class/Grade *
                  </label>
                  <select
                    id="class"
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select class/grade</option>
                    <option value="1st">1st Grade</option>
                    <option value="2nd">2nd Grade</option>
                    <option value="3rd">3rd Grade</option>
                    <option value="4th">4th Grade</option>
                    <option value="5th">5th Grade</option>
                    <option value="6th">6th Grade</option>
                    <option value="7th">7th Grade</option>
                    <option value="8th">8th Grade</option>
                    <option value="9th">9th Grade</option>
                    <option value="10th">10th Grade</option>
                    <option value="11th">11th Grade</option>
                    <option value="12th">12th Grade</option>
                    <option value="college">College</option>
                  </select>
                </div>

                {/* New Location Input Field */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                    placeholder="Enter your location (e.g., city, area)"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-3 text-base font-medium transition-all ${
                      isFormValid && !isSubmitting
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      "Get Free Consultation"
                    )}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-3">
                  * All fields are required. We'll connect you with the best
                  tutors in your area.
                </p>
              </div>
            ) : (
              // Success Message
              <div className="p-8 text-center">
                <div className="mb-4">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-4">
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600 text-lg">
                    We will connect you soon
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Our team will reach out to you within 24 hours
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
