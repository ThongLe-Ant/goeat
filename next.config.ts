import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async redirects() {
    // Đường cũ khi trang còn nằm trong app khách hàng + gộp www về tên miền chính tắc.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.goeat.vn" }],
        destination: "https://goeat.vn/:path*",
        permanent: true,
      },
      { source: "/vi/goeat", destination: "/", permanent: true },
      {
        source: "/vi/goeat/chuc-nang",
        destination: "/chuc-nang",
        permanent: true,
      },
      {
        source: "/vi/goeat/chi-tiet",
        destination: "/chuc-nang",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
