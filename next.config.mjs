/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  // Required for GitHub Pages project site (repo name: v0-portfolio-website-design)
  basePath: '/v0-portfolio-website-design',
}

export default nextConfig
