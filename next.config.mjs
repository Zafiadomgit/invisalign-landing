/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' https://static.elfsight.com 'unsafe-inline' 'unsafe-eval';
              frame-src 'self' https://www.google.com https://static.elfsight.com https://www.openstreetmap.org;
              child-src 'self' https://www.google.com https://static.elfsight.com https://www.openstreetmap.org;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              img-src * blob: data:;
              connect-src * data:;
              media-src 'self' https://video-private-assets.canva.com data: blob:;
            `.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
}

export default nextConfig
