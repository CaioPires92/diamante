import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Mantém as imagens otimizadas em cache por 31 dias (padrão: 4h),
    // evitando novas transformações cobradas pela Vercel.
    minimumCacheTTL: 2678400,
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.awsli.com.br',
      },
    ],
  }
};

export default withNextIntl(nextConfig);
