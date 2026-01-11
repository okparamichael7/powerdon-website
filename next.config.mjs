/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    qualities: [75, 85, 90, 95, 100],
    // SEO: Enable image optimization for better Core Web Vitals
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // SEO: Enable compression for better performance
  compress: true,
  // SEO: Remove X-Powered-By header for security
  poweredByHeader: false,
  reactStrictMode: true,
  // SEO: Optimize production builds
  swcMinify: true,
  // SEO: Add security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  // SEO: Redirects for URL canonicalization (if needed)
  async redirects() {
    return [
      // Add any URL redirects here for SEO purposes
      // Example: redirect www to non-www or http to https
    ];
  },
};

export default nextConfig;
