/** @type {import('next').NextConfig} */
const nextConfig = {
  // Comment out output: "export" for dynamic routes to work in production
  // output: "export", // ❌ This prevents dynamic routes from working properly

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // Add this for better dynamic route handling
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  // Enable dynamic routes in production
  trailingSlash: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  // Add rewrites for better URL handling
  async rewrites() {
    return [
      {
        source: "/tuition/:slug*",
        destination: "/tuition/:slug*",
      },
    ];
  },
};

export default nextConfig;
