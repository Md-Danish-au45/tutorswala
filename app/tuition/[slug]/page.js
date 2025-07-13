// app/tuition/[slug]/page.js

import React from "react";
import { marked } from "marked";
import BackToTopButton from "../../../components/sections/BackTopButton";
import { notFound } from "next/navigation";

// THIS IS CRITICAL: Set dynamic rendering for production
export const dynamic = "force-dynamic";
export const dynamicParams = true;

// Simplified generateStaticParams for production compatibility
export async function generateStaticParams() {
  try {
    const res = await fetch(
      "https://tutorwalabackend.onrender.com/api/articles/blog",
      {
        next: { revalidate: 3600 },
      }
    );

    let staticParams = [];

    if (res.ok) {
      const articles = await res.json();
      if (articles && articles.length > 0) {
        staticParams = articles.map((article) => ({
          slug: article.slug,
        }));
        console.log(
          "Generated Slugs from API:",
          articles.map((a) => a.slug)
        );
      }
    }

    // For production, we'll keep this minimal and handle other routes dynamically
    return staticParams.length > 0 ? staticParams : [];
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

// Enhanced metadata generation to handle both article and location pages
export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const { slug } = awaitedParams;

  console.log("Generating metadata for slug:", slug);

  // First try to fetch as an article
  try {
    const res = await fetch(
      `https://tutorwalabackend.onrender.com/api/articles/blog/${slug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (res.ok) {
      const data = await res.json();
      console.log("Found article metadata for:", slug);

      return {
        title: data.metaTitle || data.title || "TutorWala Blog",
        description:
          data.metaDescription ||
          "Read insightful articles on tutoring and education.",
        keywords:
          data.metaKeywords?.join(", ") ||
          "tutoring, education, blog, articles",
        openGraph: {
          title: data.metaTitle || data.title,
          description: data.metaDescription,
          url: `https://tutorswala.com/tuition/${slug}`,
          type: "article",
          images: [
            {
              url:
                data.image || "https://tutorswala.com/default-blog-image.jpg",
              alt: data.title || "TutorWala Article Image",
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: data.metaTitle || data.title,
          description: data.metaDescription,
          image: data.image || "https://tutorswala.com/default-blog-image.jpg",
        },
      };
    }
  } catch (error) {
    console.log("Not an article, treating as location page:", slug);
  }

  // If not an article, generate location-based metadata
  const locationTitle = generateLocationTitle(slug);
  const locationDescription = generateLocationDescription(slug);

  return {
    title: locationTitle,
    description: locationDescription,
    keywords: generateLocationKeywords(slug),
    openGraph: {
      title: locationTitle,
      description: locationDescription,
      url: `https://tutorswala.com/tuition/${slug}`,
      type: "website",
      images: [
        {
          url: "https://tutorswala.com/images/tutoring-banner.jpg",
          alt: locationTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: locationTitle,
      description: locationDescription,
      image: "https://tutorswala.com/images/tutoring-banner.jpg",
    },
  };
}

// Helper functions for location-based content
function generateLocationTitle(slug) {
  const formatted = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  if (slug.includes("home-tutoring")) {
    const location = slug.replace("home-tutoring-", "").replace("-", " ");
    return `Home Tutoring in ${
      location.charAt(0).toUpperCase() + location.slice(1)
    } | TutorsWala`;
  }

  if (slug.includes("tutor")) {
    return `${formatted} | Find Expert Tutors | TutorsWala`;
  }

  return `${formatted} | Premium Tutoring Services | TutorsWala`;
}

function generateLocationDescription(slug) {
  if (slug.includes("home-tutoring")) {
    const location = slug.replace("home-tutoring-", "").replace("-", " ");
    return `Find expert home tutors in ${
      location.charAt(0).toUpperCase() + location.slice(1)
    }. Personalized tutoring services for all subjects and grades. Book your tutor today with TutorsWala!`;
  }

  if (slug.includes("tutor")) {
    return `Connect with qualified tutors for personalized learning experiences. Expert tutoring services available for all subjects and academic levels.`;
  }

  return `Premium tutoring services available in your area. Connect with qualified tutors for personalized learning experiences. Book your session today!`;
}

function generateLocationKeywords(slug) {
  const baseKeywords =
    "tutoring, home tutor, private tutor, education, learning, TutorsWala";

  if (slug.includes("home-tutoring")) {
    const location = slug.replace("home-tutoring-", "").replace("-", " ");
    return `${baseKeywords}, ${location} tutor, home tutoring ${location}, tutors in ${location}`;
  }

  return baseKeywords;
}

// Enhanced page component to handle both articles and location pages
const Page = async ({ params }) => {
  const awaitedParams = await params;
  const { slug } = awaitedParams;

  console.log("Rendering Page for slug:", slug);

  const showSeoInfo =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_SHOW_SEO_PANEL === "true";

  let data = null;
  let isArticle = false;
  let error = null;

  // First, try to fetch as an article
  try {
    console.log("Trying to fetch article for slug:", slug);
    const res = await fetch(
      `https://tutorwalabackend.onrender.com/api/articles/blog/${slug}`,
      {
        next: { revalidate: 3600 },
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    console.log("Article fetch response status:", res.status);

    if (res.ok) {
      data = await res.json();
      isArticle = true;
      console.log("Successfully fetched article data for:", slug);

      // Clean up data
      if (data.title) data.title = data.title.trim();
      if (data.content) data.content = data.content.trim();
      if (data.metaTitle) data.metaTitle = data.metaTitle.trim();
      if (data.metaDescription)
        data.metaDescription = data.metaDescription.trim();
      if (data.category) data.category = data.category.trim();
    } else {
      console.log("No article found, will render as location page:", slug);
    }
  } catch (err) {
    console.log(
      "Article fetch failed, treating as location page:",
      slug,
      err.message
    );
  }

  // If no article found, render as location page
  if (!isArticle) {
    console.log("Rendering location page for:", slug);
    return renderLocationPage(slug, showSeoInfo);
  }

  // Original article rendering logic
  if (!data) {
    console.log("No data found, rendering error page");
    return renderErrorPage();
  }

  const wordCount = data.content ? data.content.split(/\s+/).length : 0;
  const readTime = Math.ceil(wordCount / 200);
  const renderedContent = data.content ? marked.parse(data.content) : "";

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans text-gray-800"
      id="top"
    >
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 mb-4">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            {data.category || "Uncategorized"}
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
              {new Date(data.createdAt).toLocaleDateString("en-US", {
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
              {readTime} min read
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-8 py-12">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
              dangerouslySetInnerHTML={{ __html: renderedContent }}
            />
            {!renderedContent && (
              <p className="text-gray-500 text-center py-4">
                No article content available.
              </p>
            )}
          </div>

          {/* Article Footer */}
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
                      No tags available
                    </span>
                  )}
                </div>
              </div>
            </div>
          </footer>
        </article>

        {/* SEO Information Panel */}
        {showSeoInfo && (
          <aside className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div
                    id="metaTitle"
                    className="p-3 bg-gray-50 rounded-lg border"
                  >
                    <p className="text-sm text-gray-800">
                      {data.metaTitle || "Not provided"}
                    </p>
                  </div>
                </div>
                <div></div>
              </div>
              <div>
                <div
                  id="metaDescription"
                  className="p-3 bg-gray-50 rounded-lg border"
                >
                  <p className="text-sm text-gray-800">
                    {data.metaDescription || "Not provided"}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    Last updated:{" "}
                    {new Date(
                      data.updatedAt || data.createdAt || Date.now()
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        )}
      </main>

      <BackToTopButton />
    </div>
  );
};

// Function to render location-based page with enhanced content
function renderLocationPage(slug, showSeoInfo) {
  const locationTitle = generateLocationTitle(slug);
  const locationContent = generateLocationContent(slug);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans text-gray-800"
      id="top"
    >
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 mb-4">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            Tutoring Services
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {locationTitle.replace(" | TutorsWala", "")}
          </h1>

          {/* Add hero image for location pages */}
          <div className="mb-8 rounded-lg overflow-hidden shadow-md">
            <div className="w-full h-96 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-2xl font-bold text-gray-800">
                  Get top-notch tutoring
                </p>
                <p className="text-xl text-gray-700">
                  with our experienced teachers
                </p>
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Available in your area
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
              {locationContent}
            </div>

            {/* Call to Action Section */}
            <div className="mt-12 p-8 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-600 mb-6">
                  Connect with expert tutors in your area today!
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

// Function to render error page
function renderErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Content Not Available
        </h2>
        <p className="text-gray-600">
          The requested content could not be loaded.
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
}

// Function to generate location-specific content
function generateLocationContent(slug) {
  if (slug.includes("home-tutoring")) {
    const location = slug
      .replace("home-tutoring-", "")
      .replace("-", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    return (
      <div>
        <h2>Premium Home Tutoring Services in {location}</h2>
        <p>
          Looking for qualified home tutors in {location}? TutorsWala connects
          you with experienced, verified tutors who provide personalized
          education right at your doorstep.
        </p>

        <h3>Why Choose Our Home Tutoring in {location}?</h3>
        <ul>
          <li>
            <strong>Qualified Tutors:</strong> All our tutors are thoroughly
            vetted and experienced
          </li>
          <li>
            <strong>Personalized Learning:</strong> One-on-one attention
            tailored to your learning style
          </li>
          <li>
            <strong>Convenient Scheduling:</strong> Flexible timings that fit
            your schedule
          </li>
          <li>
            <strong>All Subjects:</strong> Mathematics, Science, English, and
            more
          </li>
          <li>
            <strong>Competitive Pricing:</strong> Affordable rates with
            transparent pricing
          </li>
        </ul>

        <h3>Subjects We Cover</h3>
        <p>
          Our expert tutors in {location} provide comprehensive tutoring across
          all academic levels:
        </p>
        <ul>
          <li>Mathematics (Elementary to Advanced)</li>
          <li>Science (Physics, Chemistry, Biology)</li>
          <li>English Language & Literature</li>
          <li>Social Studies & History</li>
          <li>Computer Science & Programming</li>
          <li>Exam Preparation (Board Exams, Competitive Tests)</li>
        </ul>

        <h3>How It Works</h3>
        <ol>
          <li>
            <strong>Tell us your needs:</strong> Share your subject, grade
            level, and schedule preferences
          </li>
          <li>
            <strong>Get matched:</strong> We'll connect you with the perfect
            tutor for your requirements
          </li>
          <li>
            <strong>Start learning:</strong> Begin your personalized tutoring
            sessions at home
          </li>
          <li>
            <strong>Track progress:</strong> Monitor improvement with regular
            assessments and feedback
          </li>
        </ol>

        <h3>Book Your Home Tutor Today</h3>
        <p>
          Ready to start your learning journey? Contact us today to find the
          perfect tutor for your needs in {location}. We're committed to helping
          you achieve academic success!
        </p>
      </div>
    );
  }

  // Generic content for other types of URLs
  const formattedSlug = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div>
      <h2>Quality Tutoring Services - {formattedSlug}</h2>
      <p>
        Discover excellent tutoring opportunities with TutorsWala. We provide
        comprehensive educational support tailored to your specific needs.
      </p>

      <h3>Our Services Include:</h3>
      <ul>
        <li>One-on-one personalized tutoring</li>
        <li>Group study sessions</li>
        <li>Online and offline learning options</li>
        <li>Exam preparation and skill development</li>
        <li>Academic support across all subjects</li>
      </ul>

      <h3>Why Choose TutorsWala?</h3>
      <ul>
        <li>Experienced and qualified tutors</li>
        <li>Flexible scheduling options</li>
        <li>Affordable pricing with no hidden costs</li>
        <li>Proven track record of student success</li>
        <li>Continuous progress monitoring</li>
      </ul>

      <p>
        Contact us today to learn more about how we can help you achieve your
        academic goals!
      </p>
    </div>
  );
}

export default Page;
