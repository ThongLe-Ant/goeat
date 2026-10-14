import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async redirects() {
    // Đường cũ khi trang còn nằm trong app khách hàng.
    return [
      { source: "/vi/goeat", destination: "/", permanent: true },
      { source: "/vi/goeat/chuc-nang", destination: "/chuc-nang", permanent: true },
      { source: "/vi/goeat/chi-tiet", destination: "/chuc-nang", permanent: true },
    ]
  },
}

export default nextConfig
