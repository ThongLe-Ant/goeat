import type { Metadata } from "next"

import { CONTACT, FAQ, FEATURE_MODULES, PLANS } from "./goeat-shared"

/* SEO & AI Semantic Search (GEO/AEO) cho trang giới thiệu GoEat: metadata riêng
 * (không dính tên/logo của đơn vị đang chạy app) + dữ liệu có cấu trúc schema.org
 * để Google, Perplexity, ChatGPT, Claude và Gemini đọc rõ sản phẩm, biểu phí B2B,
 * cẩm nang nghiệp vụ và thông tin liên hệ. */

/** Tên miền chính thức của trang giới thiệu. Đổi bằng biến SITE_URL. */
export const SITE_URL = (process.env.SITE_URL || "https://goeat.vn").replace(
  /\/$/,
  "",
)

export const LANDING_PATH = "/"
export const FEATURES_PATH = "/chuc-nang"
export const TRY_DEMO_PATH = "/dung-thu"
export const GUIDES_PATH = "/cam-nang"
export const BROCHURE_PATH = "/ho-so-giai-phap"
export const PRIVACY_PATH = "/chinh-sach-bao-mat"

/** Đường dẫn tuyệt đối: abs("/") = "https://goeat.vn/", abs("/chuc-nang#x"). */
const abs = (path: string) => `${SITE_URL}${path}`

const OG_IMAGE = {
  url: "/images/goeat-dat-mon-ca-tuan-v2.jpg",
  alt: "Màn hình GoEat: chọn ca và món ăn cho cả tuần",
}

const KEYWORDS = [
  "phần mềm quản lý suất ăn",
  "phần mềm quản lý suất ăn công nghiệp",
  "phần mềm nhà ăn nhà máy",
  "quản lý suất ăn khu công nghiệp",
  "quẹt thẻ nhận cơm công nhân",
  "đối soát suất ăn công nghiệp",
  "quản lý căn-tin nội bộ",
  "đặt cơm nhân viên theo tuần",
  "phần mềm bếp ăn tập thể FDI",
  "GoEat",
]

export function goEatMetadata({
  path,
  title,
  description,
  ogImage,
  ogType = "website",
}: {
  path: string
  title: string
  description: string
  ogImage?: { url: string; alt: string }
  ogType?: "website" | "article"
}): Metadata {
  const url = abs(path)
  const image = ogImage || OG_IMAGE
  return {
    metadataBase: new URL(SITE_URL),
    // `absolute`: bỏ đuôi "| <tên đơn vị>" mà layout gốc gắn vào.
    title: { absolute: title },
    description,
    keywords: KEYWORDS,
    applicationName: "GoEat",
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: ogType,
      locale: "vi_VN",
      siteName: "GoEat",
      url,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  }
}

const ORG_ID = `${SITE_URL}/#organization`
const APP_ID = `${SITE_URL}/#software`

const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "GoEat",
  url: abs(LANDING_PATH),
  logo: `${SITE_URL}/images/logos/goeat_logo.png`,
  email: CONTACT.email,
  telephone: `+84${CONTACT.phone.slice(1)}`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: `+84${CONTACT.phone.slice(1)}`,
    email: CONTACT.email,
    areaServed: "VN",
    availableLanguage: "vi",
  },
  sameAs: [CONTACT.zalo],
}

const offers = PLANS.flatMap((plan) => {
  const amount = Number(plan.price.replace(/\D/g, ""))
  if (!amount) return []
  const isStartingPrice = plan.price.startsWith("Từ ")
  return [
    {
      "@type": "Offer",
      name: `Gói ${plan.name} (${plan.scaleTag})`,
      description: `${plan.listPrice ? `Ưu đãi triển khai ${plan.price}${plan.unit} (niêm yết ${plan.listPrice}${plan.unit})` : `${plan.price}${plan.unit}`}. ${plan.setupBonus}. ${plan.note}`,
      url: `${SITE_URL}/#bang-gia`,
      price: amount,
      priceCurrency: "VND",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        ...(isStartingPrice ? { minPrice: amount } : { price: amount }),
        priceCurrency: "VND",
        unitText: "tháng",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: 1,
          unitCode: "MON",
        },
      },
    },
  ]
})

const software = {
  "@type": "SoftwareApplication",
  "@id": APP_ID,
  name: "GoEat",
  applicationCategory: "BusinessApplication",
  applicationSubCategory:
    "Phần mềm quản lý suất ăn công nghiệp và căn-tin nội bộ",
  operatingSystem: "Web",
  inLanguage: "vi",
  url: abs(LANDING_PATH),
  image: `${SITE_URL}${OG_IMAGE.url}`,
  description:
    "Phần mềm quản lý suất ăn công nghiệp và căn-tin nội bộ cho nhà máy KCN/FDI, cơ quan và đơn vị thầu bếp: chọn món theo tuần, tự chốt số báo bếp theo ca, quẹt thẻ nhân viên nhận cơm chống nhận trùng, xử lý thẻ tạm và ngoại lệ tại quầy, đối soát ba bên xuất Excel A4.",
  audience: {
    "@type": "BusinessAudience",
    audienceType:
      "Nhà máy sản xuất, doanh nghiệp FDI khu công nghiệp, cơ quan, đơn vị thầu bếp ăn công nghiệp",
  },
  featureList: FEATURE_MODULES.map((m) => `${m.name}: ${m.text}`),
  offers,
  provider: { "@id": ORG_ID },
}

const faqPage = {
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#hoi-dap`,
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

const productVideo = {
  "@type": "VideoObject",
  "@id": `${SITE_URL}/#video-gioi-thieu`,
  name: "GoEat — 53 giây nắm trọn quy trình quản lý suất ăn công nghiệp & căn-tin nhà máy",
  description:
    "Video thuyết minh thực tế phần mềm GoEat cho nhà máy KCN, cơ quan và đơn vị thầu bếp: đặt món cả tuần trên điện thoại, tự khóa sổ báo bếp theo ca, quẹt thẻ nhận cơm chống nhận trùng, cấp thẻ tạm quên thẻ, căn-tin QR và xuất Excel đối soát cuối kỳ.",
  thumbnailUrl: [`${SITE_URL}/images/goeat-video-poster.jpg`],
  contentUrl: `${SITE_URL}/videos/goeat-gioi-thieu.mp4`,
  embedUrl: `${SITE_URL}/#video-gioi-thieu`,
  uploadDate: "2026-11-20T08:00:00+07:00",
  duration: "PT53S",
  inLanguage: "vi",
  publisher: { "@id": ORG_ID },
  hasPart: [
    {
      "@type": "Clip",
      name: "Đặt món cả tuần & quản lý đặt thay",
      startOffset: 0,
      endOffset: 13,
      url: `${SITE_URL}/#video-gioi-thieu`,
    },
    {
      "@type": "Clip",
      name: "Tự khóa sổ & chốt số báo bếp theo ca",
      startOffset: 13,
      endOffset: 22,
      url: `${SITE_URL}/#video-gioi-thieu`,
    },
    {
      "@type": "Clip",
      name: "Quẹt thẻ nhận cơm & chặn nhận trùng",
      startOffset: 22,
      endOffset: 29,
      url: `${SITE_URL}/#video-gioi-thieu`,
    },
    {
      "@type": "Clip",
      name: "Cấp thẻ tạm quên thẻ & phát ngoại lệ",
      startOffset: 29,
      endOffset: 36,
      url: `${SITE_URL}/#video-gioi-thieu`,
    },
    {
      "@type": "Clip",
      name: "Căn-tin QR & đối soát xuất Excel A4",
      startOffset: 36,
      endOffset: 44,
      url: `${SITE_URL}/#video-gioi-thieu`,
    },
    {
      "@type": "Clip",
      name: "Nhận tài khoản Demo chạy thật 7 ngày",
      startOffset: 44,
      endOffset: 53,
      url: `${SITE_URL}/#video-gioi-thieu`,
    },
  ],
}

export function landingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      software,
      productVideo,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: abs(LANDING_PATH),
        name: "GoEat — Phần mềm quản lý suất ăn công nghiệp & căn-tin nội bộ",
        inLanguage: "vi",
        about: { "@id": APP_ID },
        publisher: { "@id": ORG_ID },
      },
      faqPage,
    ],
  }
}

export function featuresJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      software,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}${FEATURES_PATH}#webpage`,
        url: abs(FEATURES_PATH),
        name: "Chức năng GoEat",
        inLanguage: "vi",
        about: { "@id": APP_ID },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "GoEat",
              item: abs(LANDING_PATH),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Chức năng",
              item: abs(FEATURES_PATH),
            },
          ],
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: FEATURE_MODULES.map((m, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}${FEATURES_PATH}#${m.id}`,
            name: m.title,
            description: m.text,
          })),
        },
      },
    ],
  }
}

export function tryDemoJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      software,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}${TRY_DEMO_PATH}#webpage`,
        url: abs(TRY_DEMO_PATH),
        name: "Dùng thử GoEat miễn phí 7 ngày",
        inLanguage: "vi",
        about: { "@id": APP_ID },
        publisher: { "@id": ORG_ID },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "GoEat",
              item: abs(LANDING_PATH),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Dùng thử miễn phí",
              item: abs(TRY_DEMO_PATH),
            },
          ],
        },
      },
    ],
  }
}

export function brochureJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      software,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}${BROCHURE_PATH}#webpage`,
        url: abs(BROCHURE_PATH),
        name: "Hồ sơ giải pháp GoEat (Brochure PDF A4) — Quản lý suất ăn công nghiệp & căn-tin nhà máy",
        inLanguage: "vi",
        about: { "@id": APP_ID },
        publisher: { "@id": ORG_ID },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "GoEat",
              item: abs(LANDING_PATH),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Hồ sơ giải pháp",
              item: abs(BROCHURE_PATH),
            },
          ],
        },
      },
    ],
  }
}

export function guidesIndexJsonLd(
  guides: ReadonlyArray<{
    slug: string
    title: string
    description: string
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      software,
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}${GUIDES_PATH}#webpage`,
        url: abs(GUIDES_PATH),
        name: "Cẩm nang quản lý suất ăn công nghiệp & vận hành nhà ăn nhà máy — GoEat",
        inLanguage: "vi",
        about: { "@id": APP_ID },
        publisher: { "@id": ORG_ID },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "GoEat",
              item: abs(LANDING_PATH),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Cẩm nang",
              item: abs(GUIDES_PATH),
            },
          ],
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: guides.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}${GUIDES_PATH}/${g.slug}`,
            name: g.title,
            description: g.description,
          })),
        },
      },
    ],
  }
}

export function guideArticleJsonLd(article: {
  slug: string
  title: string
  description: string
  publishedAt: string
  heroImage: string
}) {
  const url = abs(`${GUIDES_PATH}/${article.slug}`)
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      software,
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        dateModified: article.publishedAt,
        inLanguage: "vi",
        url,
        mainEntityOfPage: url,
        image: `${SITE_URL}${article.heroImage.replace(/\?.*$/, "")}`,
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        about: { "@id": APP_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "GoEat",
            item: abs(LANDING_PATH),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Cẩm nang",
            item: abs(GUIDES_PATH),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: url,
          },
        ],
      },
    ],
  }
}

/** Thẻ <script type="application/ld+json">; escape `<` để chuỗi không đóng thẻ. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
