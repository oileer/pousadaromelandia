import type { NextConfig } from "next";

// Endereços antigos (*[.]vercel[.]app) levam para o sistema novo, hospedado em pousadaromelandia.nexoraos.io.
// Previews de branch (-git-) não são redirecionados.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "^(?!.*-git-).*[.]vercel[.]app$" }],
        destination: "https://pousadaromelandia.nexoraos.io/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
