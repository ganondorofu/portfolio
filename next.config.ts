import type { NextConfig } from "next";

// GitHub Pages用の設定
const isGitHubPages = process.env.GITHUB_ACTIONS || process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages設定（本番環境のみ）
  ...(isGitHubPages && {
    basePath: '/portfolio',
    assetPrefix: '/portfolio/',
  }),
  distDir: 'out',
  // 静的ファイル生成の詳細設定
  experimental: {
    optimizePackageImports: ['react', 'react-dom']
  }
};

export default nextConfig;
