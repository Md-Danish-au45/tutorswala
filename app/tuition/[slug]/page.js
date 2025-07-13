// app/tuition/[slug]/page.js

import React from "react";
import { marked } from "marked"; // For rendering Markdown content
// Ensure this path is correct based on your project structure.
// For example, if 'components' is at the root level alongside 'app',
// then '../../components/sections/BackTopButton' is correct.
import BackToTopButton from "../../../components/sections/BackTopButton";

// Define your API base URL to centralize it and make it easier to change.
const API_BASE_URL = "https://tutorwalabackend.onrender.com/api";

/**
 * generateStaticParams is used with `output: 'export'` to tell Next.js
 * which dynamic routes should be pre-rendered into static HTML files at build time.
 * If a slug is not returned here, that page will result in a 404 in production.
 */
export async function generateStaticParams() {
  console.log(
    "generateStaticParams: Starting to fetch articles for static generation..."
  );
  try {
    // Fetch all articles to get their slugs.
    // 'cache: force-cache' is suitable for `output: 'export'` as data is fetched once at build time.
    const res = await fetch(`${API_BASE_URL}/articles/blog`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      // Log detailed error if API call fails. This is crucial for debugging production builds.
      const errorText = await res.text();
      console.error(
        `generateStaticParams: Failed to fetch articles. Status: ${res.status} ${res.statusText}. Response body: ${errorText}`
      );
      // Fallback: If API fails, generate at least one fallback page to avoid build errors
      // and give a hint about the issue. This page will display the error message.
      return [{ slug: "example-article" }];
    }

    const articles = await res.json();

    if (!articles || articles.length === 0) {
      console.warn(
        "generateStaticParams: No articles returned from API. Falling back to default slugs."
      );
      // Fallback if the API returns an empty array or null.
      return [{ slug: "example-article" }];
    }

    // Map the fetched articles to an array of objects, each with a 'slug' property.
    // This array tells Next.js which HTML files to create.
    const slugs = articles.map((article) => ({
      slug: article.slug,
    }));

    console.log(
      "generateStaticParams: Successfully generated slugs for static export:",
      slugs.map((s) => s.slug)
    );
    return slugs;
  } catch (error) {
    // Catch any network errors or other exceptions during the fetch process.
    console.error(
      "generateStaticParams: Error during API fetch or processing:",
      error
    );
    return [{ slug: "example-article" }]; // Fallback on any unexpected error
  }
}

/**
 * generateMetadata is a Next.js App Router function for defining page metadata (SEO).
 * It runs at build time for static exports, using the slugs from generateStaticParams.
 */
export async function generateMetadata({ params }) {
  // 'params' is a direct object containing the slug, no need to await it.
  const { slug } = params;

  console.log("generateMetadata: Generating metadata for slug:", slug); // Debugging metadata generation

  try {
    // Fetch the specific article's data for metadata.
    // 'cache: force-cache' ensures this data is also built at static export time.
    const res = await fetch(`${API_BASE_URL}/articles/blog/${slug}`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error(
        `generateMetadata: Failed to fetch article for metadata. Status: ${res.status} ${res.statusText}. Slug: ${slug}`
      );
      return {
        title: "Page Not Found",
        description: "The requested article could not be found.",
        robots: {
          index: false, // Prevents search engines from indexing pages that return 404
          follow: false,
        },
      };
    }
    const data = await res.json();

    // Log fetched data for metadata to confirm content (useful during build debugging).
    console.log("generateMetadata: Fetched data (excerpt):", {
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
      openGraph: {
        title: data.metaTitle || data.title,
        description: data.metaDescription,
        // IMPORTANT: Replace 'https://yourwebsite.com' with your actual production domain.
        // This is critical for Open Graph to work correctly on social media.
        url: `https://tutorswala.com/tuition/${slug}`, // <<< ENSURE THIS MATCHES YOUR PROD DOMAIN
        type: "article",
        images: [
          {
            // Provide a robust default image URL if the article doesn't have one.
            url: data.image || "https://tutorswala.com/default-blog-image.jpg",
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
  } catch (error) {
    console.error("generateMetadata: Error generating metadata:", error);
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
  // 'params' is a direct object containing the slug, no need to await it.
  const { slug } = params;

  console.log("Page Component: Attempting to render page for slug:", slug); // Debugging page rendering

  // Conditional display for SEO info, useful in development
  const showSeoInfo =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_SHOW_SEO_PANEL === "true";

  let data = null;
  let error = null;

  try {
    // Fetch the specific article's content for display.
    // 'cache: force-cache' ensures consistency with other fetches for static export.
    const res = await fetch(`${API_BASE_URL}/articles/blog/${slug}`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      // If the response is not OK (e.g., 404, 500), set an error state.
      error = {
        status: res.status,
        message: `Article with slug "${slug}" not found or an error occurred. Status: ${res.status}`,
      };
      console.error(
        `Page Component: API response not OK for main content fetch. Status: ${res.status} ${res.statusText}. Slug: ${slug}`
      );
    } else {
      // Parse the JSON response if successful.
      data = await res.json();
      console.log("Page Component: Successfully fetched data (excerpt):", {
        title: data.title,
        contentLength: data.content?.length,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        image: data.image,
      });

      // Trim whitespace from string fields for cleaner data.
      if (data.title) data.title = data.title.trim();
      if (data.content) data.content = data.content.trim();
      if (data.metaTitle) data.metaTitle = data.metaTitle.trim();
      if (data.metaDescription)
        data.metaDescription = data.metaDescription.trim();
      if (data.category) data.category = data.category.trim();
    }
  } catch (err) {
    // Catch any network errors or other exceptions during the fetch.
    console.error(
      "Page Component: Error fetching article for page component:",
      err
    );
    error = {
      message: "Failed to load article due to a network or server error.",
    };
  }

  // If there's an error or no data, display a user-friendly error page.
  if (error || !data) {
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

  // Calculate estimated read time based on content word count.
  const wordCount = data.content ? data.content.split(/\s+/).length : 0;
  const readTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute

  // Convert Markdown content to HTML using 'marked'.
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
            {/* Display article category */}
            {data.category || "Uncategorized"}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {/* Display article title */}
            {data.title}
          </h1>

          {/* Display Article Image if available */}
          {data.image && (
            <div className="mb-8 rounded-lg overflow-hidden shadow-md">
              <img
                src={data.image}
                alt={data.title || "Article Image"} // Use article title for alt text for accessibility
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
              Published: {/* Format date for readability */}
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
            {/* Render the Markdown content as HTML. */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
              dangerouslySetInnerHTML={{ __html: renderedContent }}
            />
            {/* Fallback message if content is truly empty (e.g., article was saved without content). */}
            {!renderedContent && (
              <p className="text-gray-500 text-center py-4">
                No article content available.
              </p>
            )}
          </div>

          {/* Article Footer (Tags) */}
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

        {/* SEO Information Panel (only shown if showSeoInfo is true, e.g., in development) */}
        {showSeoInfo && (
          <aside className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Meta Title
                  </h3>
                  <div
                    id="metaTitle"
                    className="p-3 bg-gray-50 rounded-lg border"
                  >
                    <p className="text-sm text-gray-800">
                      {data.metaTitle || "Not provided"}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Image URL
                  </h3>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-sm text-gray-800 break-all">
                      {data.image || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Meta Description
                </h3>
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

      {/* Back to Top button - Client Component */}
      <BackToTopButton />
    </div>
  );
};

export default Page;
