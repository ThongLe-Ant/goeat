import type { MetadataRoute } from "next"

import { SITE_URL } from "@/components/goeat-seo"

/* Trang giới thiệu công khai: cho mọi bot, kể cả bot của các trợ lý AI. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
