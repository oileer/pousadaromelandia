import type {NextConfig} from 'next';

// Endereços antigos (*[.]vercel[.]app) levam para o painel novo, hospedado em painelpousada.nexoraos.io.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: '^(?!.*-git-).*[.]vercel[.]app$' }],
        destination: 'https://painelpousada.nexoraos.io/:path*',
        permanent: false,
      },
    ];
  },
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
