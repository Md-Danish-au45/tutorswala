// app/tuition/[slug]/page.js

import React from "react";
import { marked } from "marked";
import BackToTopButton from "../../../components/sections/BackTopButton";

// 🔥 CRITICAL: These settings force dynamic rendering for ANY slug
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

// 🚨 IMPORTANT: Do NOT export generateStaticParams at all
// This ensures ANY slug works without pre-generation

// Metadata generation that works for ANY slug
export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Try to fetch article data first
  let articleData = null;
  try {
    const response = await fetch(
      `https://tutorwalabackend.onrender.com/api/articles/blog/${slug}`,
      {
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    if (response.ok) {
      articleData = await response.json();
    }
  } catch (error) {
    console.log("No article found for slug:", slug);
  }

  // If article exists, use article metadata
  if (articleData) {
    return {
      title: articleData.metaTitle || articleData.title || "TutorWala Blog",
      description:
        articleData.metaDescription ||
        "Read insightful articles on tutoring and education.",
      keywords:
        articleData.metaKeywords?.join(", ") || "tutoring, education, blog",
      openGraph: {
        title: articleData.metaTitle || articleData.title,
        description: articleData.metaDescription,
        url: `https://tutorswala.com/tuition/${slug}`,
        type: "article",
        images: [
          {
            url:
              articleData.image ||
              "https://tutorswala.com/default-blog-image.jpg",
            alt: articleData.title || "TutorWala Article",
          },
        ],
      },
    };
  }

  // Generate location-based metadata for any other slug
  const cleanLocation = slug
    .replace(/home-tutoring-|tuition-|tutoring-/g, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const title = `Home Tutoring in ${cleanLocation} | Expert Tutors | TutorsWala`;
  const description = `Find expert home tutors in ${cleanLocation}. Personalized tutoring services for all subjects. Qualified teachers, flexible scheduling. Book your tutor today!`;

  return {
    title,
    description,
    keywords: `home tutoring ${cleanLocation}, tutors ${cleanLocation}, private tutor, education, TutorsWala`,
    openGraph: {
      title,
      description,
      url: `https://tutorswala.com/tuition/${slug}`,
      type: "website",
      images: [
        {
          url: "https://tutorswala.com/images/tutoring-banner.jpg",
          alt: title,
        },
      ],
    },
  };
}

// Main page component that handles ANY slug
async function Page({ params }) {
  const { slug } = await params;

  console.log("🚀 Rendering page for slug:", slug);

  let articleData = null;
  let isArticle = false;

  // Try to fetch article data
  try {
    console.log("🔍 Checking if slug is an article:", slug);
    const response = await fetch(
      `https://tutorwalabackend.onrender.com/api/articles/blog/${slug}`,
      {
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    if (response.ok) {
      articleData = await response.json();
      isArticle = true;
      console.log("✅ Found article for slug:", slug);
    } else {
      console.log("❌ No article found, treating as location page:", slug);
    }
  } catch (error) {
    console.log("🔄 API call failed, treating as location page:", slug);
  }

  // Render article page if article data exists
  if (isArticle && articleData) {
    return renderArticlePage(articleData);
  }

  // Otherwise render location page
  return renderLocationPage(slug);
}

// Function to render article page
function renderArticlePage(data) {
  const wordCount = data.content ? data.content.split(/\s+/).length : 0;
  const readTime = Math.ceil(wordCount / 200) || 1;
  const renderedContent = data.content ? marked.parse(data.content) : "";

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans text-gray-800"
      id="top"
    >
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 mb-4">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            {data.category || "Blog Article"}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {data.title}
          </h1>

          {data.image && (
            <div className="mb-8 rounded-lg overflow-hidden shadow-md">
              <img
                src={data.image}
                alt={data.title || "Article Image"}
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Published:{" "}
              {new Date(data.createdAt || new Date()).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {readTime} min read
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-8 py-12">
            {renderedContent ? (
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: renderedContent }}
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Article content is loading...</p>
              </div>
            )}
          </div>

          <footer className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.metaKeywords && data.metaKeywords.length > 0 ? (
                    data.metaKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">
                      Education, Tutoring
                    </span>
                  )}
                </div>
              </div>
            </div>
          </footer>
        </article>
      </main>

      <BackToTopButton />
    </div>
  );
}

// Function to render location page for ANY slug
function renderLocationPage(slug) {
  console.log("🏠 Rendering location page for:", slug);

  // Extract location from slug
  const cleanLocation = slug
    .replace(/home-tutoring-|tuition-|tutoring-/g, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const displayLocation = cleanLocation || "Your Area";

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans text-gray-800"
      id="top"
    >
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 mb-4">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            Delhi Areas
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Home Tutoring in {displayLocation}
          </h1>

          {/* Hero Banner */}
          <div className="mb-8 rounded-lg overflow-hidden shadow-md">
            <div className="w-full h-96 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 flex items-center justify-center relative">
              <div className="flex items-center justify-between w-full max-w-4xl px-8">
                <div className="flex-1">
                  <div className="text-left">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">
                      Get top-notch
                    </h2>
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">
                      Math tutoring
                    </h2>
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">
                      with our
                    </h2>
                    <h2 className="text-4xl font-bold text-gray-800">
                      experienced
                    </h2>
                    <h2 className="text-4xl font-bold text-gray-800">
                      teachers.
                    </h2>
                  </div>
                </div>
                <div className="flex-1 flex justify-center items-center">
                  <div className="text-center">
                    <div className="w-48 h-48 bg-green-600 rounded-lg flex items-center justify-center mb-4 relative">
                      <div className="text-white text-6xl">👩‍🏫</div>
                      <div className="absolute bottom-4 left-4 bg-teal-500 text-white px-3 py-1 rounded text-sm font-bold">
                        MATH
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Published:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              1 min read
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-8 py-12">
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed">
              <h2>Premium Home Tutoring Services in {displayLocation}</h2>
              <p>
                Looking for qualified home tutors in {displayLocation}?
                TutorsWala connects you with experienced, verified tutors who
                provide personalized education right at your doorstep. Our
                platform makes it easy to find the perfect tutor for your
                academic needs.
              </p>

              <h3>Why Choose Our Home Tutoring in {displayLocation}?</h3>
              <ul>
                <li>
                  <strong>Qualified Tutors:</strong> All our tutors are
                  thoroughly vetted and experienced professionals
                </li>
                <li>
                  <strong>Personalized Learning:</strong> One-on-one attention
                  tailored to your specific learning style
                </li>
                <li>
                  <strong>Convenient Scheduling:</strong> Flexible timings that
                  fit perfectly with your busy schedule
                </li>
                <li>
                  <strong>All Subjects:</strong> Mathematics, Science, English,
                  Social Studies, and much more
                </li>
                <li>
                  <strong>Competitive Pricing:</strong> Affordable rates with
                  completely transparent pricing
                </li>
                <li>
                  <strong>Local Presence:</strong> Tutors available right in{" "}
                  {displayLocation} area
                </li>
              </ul>

              <h3>Subjects We Cover in {displayLocation}</h3>
              <p>
                Our expert tutors in {displayLocation} provide comprehensive
                tutoring across all academic levels and subjects:
              </p>
              <ul>
                <li>
                  <strong>Mathematics:</strong> From elementary arithmetic to
                  advanced calculus
                </li>
                <li>
                  <strong>Sciences:</strong> Physics, Chemistry, Biology, and
                  Environmental Science
                </li>
                <li>
                  <strong>Languages:</strong> English, Hindi, and regional
                  languages
                </li>
                <li>
                  <strong>Social Studies:</strong> History, Geography, Civics,
                  and Economics
                </li>
                <li>
                  <strong>Computer Science:</strong> Programming, Web
                  Development, and Digital Literacy
                </li>
                <li>
                  <strong>Exam Preparation:</strong> Board Exams, Entrance
                  Tests, and Competitive Exams
                </li>
              </ul>

              <h3>How Our {displayLocation} Tutoring Process Works</h3>
              <ol>
                <li>
                  <strong>Share Your Requirements:</strong> Tell us about your
                  subject, grade level, and schedule preferences
                </li>
                <li>
                  <strong>Get Matched:</strong> We'll connect you with the most
                  suitable tutor in {displayLocation}
                </li>
                <li>
                  <strong>Start Learning:</strong> Begin your personalized
                  tutoring sessions from the comfort of your home
                </li>
                <li>
                  <strong>Track Progress:</strong> Monitor improvement with
                  regular assessments and detailed feedback
                </li>
              </ol>

              <h3>Benefits of Home Tutoring in {displayLocation}</h3>
              <p>
                Home tutoring in {displayLocation} offers numerous advantages
                for students of all ages:
              </p>
              <ul>
                <li>Comfortable learning environment at home</li>
                <li>No travel time or transportation concerns</li>
                <li>Individual attention and customized lesson plans</li>
                <li>Flexible scheduling around your existing commitments</li>
                <li>Better parent involvement in the learning process</li>
                <li>Cost-effective compared to coaching institutes</li>
              </ul>

              <h3>
                Ready to Start Your Learning Journey in {displayLocation}?
              </h3>
              <p>
                Don't wait any longer to give your child the educational support
                they deserve. Contact TutorsWala today to find the perfect tutor
                for your needs in {displayLocation}. We're committed to helping
                students achieve academic excellence through personalized,
                professional tutoring services delivered right to your doorstep.
              </p>
            </div>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-600 mb-6">
                  Connect with expert tutors in {displayLocation} today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/"
                    className="bg-emerald-600 text-white px-8 py-3 rounded-lg shadow hover:bg-emerald-700 transition-colors duration-200 font-semibold"
                  >
                    Find a Tutor
                  </a>
                  <a
                    href="/contact"
                    className="border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors duration-200 font-semibold"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      <BackToTopButton />
    </div>
  );
}

export default Page;
