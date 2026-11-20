import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  GUIDES,
  GoEatGuideDetailPage,
  getGuideBySlug,
} from "@/components/goeat-guides"
import {
  GUIDES_PATH,
  JsonLd,
  goEatMetadata,
  guideArticleJsonLd,
} from "@/components/goeat-seo"

export const dynamicParams = false

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getGuideBySlug(slug)
  if (!article) return {}
  return goEatMetadata({
    path: `${GUIDES_PATH}/${article.slug}`,
    title: `${article.title} — GoEat`,
    description: article.description,
    ogImage: { url: article.heroImage, alt: article.heroAlt },
    ogType: "article",
  })
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getGuideBySlug(slug)
  if (!article) notFound()

  return (
    <>
      <JsonLd data={guideArticleJsonLd(article)} />
      <GoEatGuideDetailPage article={article} />
    </>
  )
}
