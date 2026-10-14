import type { Metadata } from "next"

import { CONTACT, FAQ, FEATURE_MODULES, PLANS } from "./goeat-shared"

/* SEO cho trang giới thiệu GoEat: metadata riêng (không dính tên/logo của
 * đơn vị đang chạy app) + dữ liệu có cấu trúc schema.org để Google và trợ lý
 * AI đọc được sản phẩm là gì, giá bao nhiêu, liên hệ ở đâu. */

/** Tên miền chính thức của trang giới thiệu. Đổi bằng biến SITE_URL. */
export const SITE_URL = (
process.env.SITE_URL || "https://goeat.vn"
).replace(/\/$/, "")

export const LANDING_PATH = "/"
export const FEATURES_PATH = "/chuc-nang"
export const TRY_DEMO_PATH = "/dung-thu"

/** Đường dẫn tuyệt đối: abs("/") = "https://goeat.vn/", abs("/chuc-nang#x"). */
const abs = (path: string) => `${SITE_URL}${path}`

const OG_IMAGE = {
  url: "/images/goeat-dat-mon-ca-tuan-v2.jpg",
  alt: "Màn hình GoEat: chọn ca và món ăn cho cả tuần",
}

const KEYWORDS = [
  "phần mềm quản lý suất ăn",
  "phần mềm suất ăn công nghiệp",
  "quản lý nhà ăn",
  "quản lý căn-tin",
  "đặt cơm nhân viên",
  "báo cơm",
  "quẹt thẻ nhận cơm",
  "phần mềm bếp ăn tập thể",
  "GoEat",
]

export function goEatMetadata({
  path,
  title,
  description,
}: {
  path: string
  title: string
  description: string
}): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    // `absolute`: bỏ đuôi "| <tên đơn vị>" mà layout gốc gắn vào.
    title: { absolute: title },
    description,
    keywords: KEYWORDS,
    applicationName: "GoEat",
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: "GoEat",
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
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

const offers = PLANS.map((plan) => {
  const amount = Number(plan.price.replace(/\D/g, ""))
  return {
    "@type": "Offer",
    name: `Gói ${plan.name}`,
    description: plan.note,
    url: `${SITE_URL}/#bang-gia`,
    ...(amount
      ? {
          price: amount,
          priceCurrency: "VND",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: amount,
            priceCurrency: "VND",
            unitText: "tháng",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: 1,
              unitCode: "MON",
            },
          },
        }
      : {}),
  }
})

const software = {
  "@type": "SoftwareApplication",
  "@id": APP_ID,
  name: "GoEat",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Phần mềm quản lý suất ăn và căn-tin",
  operatingSystem: "Web",
  inLanguage: "vi",
  url: abs(LANDING_PATH),
  image: `${SITE_URL}${OG_IMAGE.url}`,
  description:
    "Phần mềm quản lý suất ăn công nghiệp và căn-tin nội bộ cho nhà máy, cơ quan và đơn vị thầu bếp: chọn món theo tuần, tự chốt số báo bếp theo ca, quẹt thẻ nhận cơm, xử lý ngoại lệ tại quầy, đối soát và xuất Excel.",
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Nhà máy, cơ quan, đơn vị thầu bếp, căn-tin nội bộ",
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

export function landingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      software,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: abs(LANDING_PATH),
        name: "GoEat — Phần mềm quản lý suất ăn & căn-tin",
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
