// app/tuition/[slug]/page.js

import React from "react";
import { marked } from "marked";
// Ensure this path is correct based on your project structure:
// e.g., if components is directly in 'app', it might be '../../components/sections/BackTopButton'
// if components is at root, it might be '../../components/sections/BackTopButton'
import BackToTopButton from "../../../components/sections/BackTopButton";

export async function generateStaticParams() {
  try {
    const res = await fetch(
      "https://tutorwalabackend.onrender.com/api/articles/blog",
      {
        // Disable revalidate during export since it's SSG
        next: { revalidate: 3600 }, // ✅
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch articles:", res.status, res.statusText);
      return [
        { slug: "example-article" }, // fallback
      ];
    }

    const articles = await res.json();

    if (!articles || articles.length === 0) {
      console.warn("No articles returned from API. Falling back.");
      return [{ slug: "example-article" }];
    }

    console.log(
      "Generated Slugs:",
      articles.map((a) => a.slug)
    );

    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [{ slug: "example-article" }];
  }
}

// Function to generate metadata for the page (runs on server for each request or at build time)
export async function generateMetadata({ params }) {
  // AWAIT params before destructuring, as params can be a promise
  const awaitedParams = await params;
  const { slug } = awaitedParams;

  console.log("Generating metadata for slug:", slug); // Debugging metadata generation

  try {
    const res = await fetch(
      `https://tutorwalabackend.onrender.com/api/articles/blog/${slug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error(
        "Failed to fetch article for metadata:",
        res.status,
        res.statusText
      );
      return {
        title: "Page Not Found",
        description: "The requested article could not be found.",
        // Consider a noindex, nofollow for 404 pages
        robots: {
          index: false,
          follow: false,
        },
      };
    }
    const data = await res.json();

    // Log fetched data for metadata to confirm content
    console.log("Metadata fetched data (excerpt):", {
      title: data.title,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      image: data.image,
    });

    return {
      title: data.metaTitle || data.title || "TutorWala Blog",
      description:
        data.metaDescription ||
        "Read insightful articles on tutoring and education.",
      keywords:
        data.metaKeywords?.join(", ") || "tutoring, education, blog, articles",
      // IMPORTANT: Replace 'https://yourwebsite.com' with your actual domain
      openGraph: {
        title: data.metaTitle || data.title,
        description: data.metaDescription,
        url: `https://yourwebsite.com/tuition/${slug}`,
        type: "article",
        images: [
          {
            url: data.image || "https://yourwebsite.com/default-blog-image.jpg", // Default image if article has none
            alt: data.title || "TutorWala Article Image",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: data.metaTitle || data.title,
        description: data.metaDescription,
        image: data.image || "https://yourwebsite.com/default-blog-image.jpg", // Default image if article has none
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error Loading Page",
      description: "There was an error loading the article details.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

// Main Page Component (Server Component)
const Page = async ({ params }) => {
  // AWAIT params before destructuring, as params can be a promise
  const awaitedParams = await params;
  const { slug } = awaitedParams;

  console.log("Rendering Page for slug:", slug); // Debugging page rendering

  // Example condition: show SEO info in development or if an environment variable is set
  const showSeoInfo =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_SHOW_SEO_PANEL === "true";

  let data = null;
  let error = null;

  try {
    const res = await fetch(
      `https://tutorwalabackend.onrender.com/api/articles/blog/${slug}`,
      {
        next: { revalidate: 3600 }, // ✅
      }
    );

    if (!res.ok) {
      error = {
        status: res.status,
        message: `Article with slug "${slug}" not found or an error occurred. Status: ${res.status}`,
      };
      console.error(
        "API response not OK for main content fetch:",
        res.status,
        res.statusText
      );
    } else {
      data = await res.json();
      // Log fetched data for the page component to confirm content
      console.log("Successfully fetched data for page (excerpt):", {
        title: data.title,
        contentLength: data.content?.length, // Log length to check if content is present
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        image: data.image,
      });
      // Optionally trim whitespace from content fields from backend
      if (data.title) data.title = data.title.trim();
      if (data.content) data.content = data.content.trim();
      if (data.metaTitle) data.metaTitle = data.metaTitle.trim();
      if (data.metaDescription)
        data.metaDescription = data.metaDescription.trim();
      if (data.category) data.category = data.category.trim();
    }
  } catch (err) {
    console.error("Error fetching article for page component:", err);
    error = {
      message: "Failed to load article due to a network or server error.",
    };
  }

  // Handle article not found or errors gracefully
  if (error || !data) {
    // Added !data check just in case fetch succeeds but returns empty
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
            {error?.status === 404
              ? "Article Not Found"
              : "Error Loading Article"}
          </h2>
          <p className="text-gray-600">
            {error?.message ||
              "The requested article could not be found or an unexpected error occurred."}
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

  // Calculate estimated read time (example: 200 words per minute)
  const wordCount = data.content ? data.content.split(/\s+/).length : 0;
  const readTime = Math.ceil(wordCount / 200);

  // Safely render content, converting markdown using marked.parse
  // If data.content is empty, renderedContent will be ""
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
            {/* Display category */}
            {data.category || "Uncategorized"}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {/* Display title */}
            {data.title}
          </h1>

          {/* Display Article Image if available */}
          {data.image && (
            <div className="mb-8 rounded-lg overflow-hidden shadow-md">
              <img
                src={data.image}
                alt={data.title || "Article Image"} // Use article title for alt text
                className="w-full h-auto max-h-96 object-cover" // Responsive image styles
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
          {/* Article Content */}
          <div className="px-8 py-12">
            {/* This is where the main article content (from 'data.content') will be rendered */}
            {/* It will be empty if data.content is empty or null after marked.parse */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
              dangerouslySetInnerHTML={{ __html: renderedContent }}
            />
            {/* Optional: Fallback message if content is truly empty */}
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

        {/* SEO Information Panel (Conditional Display) */}
        {showSeoInfo && (
          <aside className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div
                    id="metaTitle"
                    className="p-3 bg-gray-50 rounded-lg border"
                  >
                    {/* Display metaTitle */}
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
                  {/* Display metaDescription */}
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

      {/* Back to Top button */}
      <BackToTopButton />
    </div>
  );
};

export default Page;
