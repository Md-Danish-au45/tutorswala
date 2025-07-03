// app/robots.js

// IMPORTANT: For `output: "export"`, you MUST configure this for static generation.
// This ensures robots.txt is built at compile time.
export const dynamic = "force-static"; // <--- Add this line

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/"],
    },
    sitemap: "https://tutorswala.com/sitemap.xml",
  };
}
