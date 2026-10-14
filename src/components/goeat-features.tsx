import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, MessageCircle, Minus } from "lucide-react"

import { TRY_DEMO_HREF } from "./demo-url"
import {
  CONTACT,
  CubeBackdrop,
  Eyebrow,
  FEATURE_MODULES,
  GoEatFooter,
  GoEatHeader,
  GuideRails,
  HEADING_STYLE,
  PLANS,
  RailMarks,
  SoftGlow,
} from "./goeat-shared"

/* ============================================================================
 * Trang chức năng GoEat: mỗi chức năng một mục (chữ và ảnh so le), cuối trang
 * là bảng so sánh theo gói. Bảng chỉ lấy đúng các dòng trong PLANS, không thêm.
 * ========================================================================== */

/** Gói đứng sau có đủ chức năng của gói đứng trước. */
const COMPARE_ROWS = PLANS.flatMap((plan, tier) =>
  plan.items
    .filter((item) => !item.startsWith("Toàn bộ gói"))
    .map((item) => ({ item, from: tier }))
)

export function GoEatFeaturesPage() {
  return (
    <div className="min-h-dvh bg-white sysdark:bg-[#08090B] text-[#0B1220] sysdark:text-[#F5F7FA] antialiased selection:bg-[#1D4ED8] sysdark:selection:bg-[#2563EB] selection:text-white">
      <GoEatHeader active="Chức năng" />

      <div>
        <h1 className="sr-only">Chức năng GoEat</h1>
        <div aria-hidden="true" className="h-[76px]" />

        {/* ---------- Thanh chọn nhanh, dính dưới đầu trang ---------- */}
        <nav
          aria-label="Các chức năng"
          className="sticky top-[76px] z-20 border-b border-[#E3E7EE] sysdark:border-[#1F232A] bg-white/95 sysdark:bg-[#0E1014]/90 backdrop-blur-sm"
        >
          <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
            {FEATURE_MODULES.map((m) => {
              const Icon = m.icon
              return (
                <li key={m.id} className="shrink-0">
                  <a
                    href={`#${m.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#D6DCE6] sysdark:border-[#262B33] px-3.5 py-2 text-sm font-medium text-[#1F2937] sysdark:text-[#E6E9EF] transition-colors hover:border-[#1D4ED8] sysdark:hover:border-[#3B82F6] hover:text-[#1D4ED8] sysdark:hover:text-[#6EA8FF]"
                  >
                    <Icon className="h-4 w-4 text-[#1D4ED8] sysdark:text-[#6EA8FF]" />
                    {m.name}
                  </a>
                </li>
              )
            })}
            <li className="shrink-0">
              <a
                href="#so-sanh"
                className="inline-flex items-center rounded-full px-3.5 py-2 text-sm font-semibold text-[#1D4ED8] sysdark:text-[#6EA8FF] hover:underline"
              >
                So sánh gói
              </a>
            </li>
          </ul>
        </nav>

        {/* ---------- Từng chức năng & so sánh gói, chung một khung kẻ dọc ---------- */}
        <div className="relative overflow-x-clip">
          <GuideRails />
          {FEATURE_MODULES.map((m, i) => {
            const Icon = m.icon
            const flip = i % 2 === 1
            return (
              <section
                key={m.id}
                id={m.id}
                aria-labelledby={`${m.id}-title`}
                className={`relative scroll-mt-40 border-b border-[#E3E7EE] sysdark:border-[#1F232A] py-14 lg:py-16 ${flip ? "bg-[#F7F9FC] sysdark:bg-[#0E1014]" : "bg-white sysdark:bg-[#08090B]"}`}
              >
                <RailMarks />
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
                  <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
                    <p className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#1D4ED8] sysdark:text-[#6EA8FF]">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#1D4ED8] sysdark:bg-[#2563EB] text-white">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="tnum font-mono tracking-[0.06em] uppercase">
                        {String(i + 1).padStart(2, "0")} · {m.name}
                      </span>
                      <span className="text-[#8B93A3] sysdark:text-[#6B7280]">
                        · {m.when}
                      </span>
                      {"addon" in m && (
                        <span className="rounded-full bg-[#0B1220] sysdark:bg-[#1E3A8A] px-2 py-0.5 text-[11px] font-semibold text-white">
                          {m.addon}
                        </span>
                      )}
                    </p>
                    <h2
                      id={`${m.id}-title`}
                      className="mt-4 font-medium tracking-[-0.02em] text-[#0B1220] sysdark:text-[#F5F7FA] [text-wrap:balance]"
                      style={HEADING_STYLE}
                    >
                      {m.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-[#4B5565] sysdark:text-[#A3AAB8]">
                      {m.text}
                    </p>

                    <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                      {m.points.map((p) => (
                        <li key={p.t} className="flex gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1D4ED8] sysdark:text-[#6EA8FF]" />
                          <div>
                            <p className="text-sm font-semibold text-[#0B1220] sysdark:text-[#F5F7FA]">
                              {p.t}
                            </p>
                            <p className="mt-0.5 text-sm leading-relaxed text-[#5B6475] sysdark:text-[#8B93A3]">
                              {p.d}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-7 rounded-md border-l-2 border-[#1D4ED8] sysdark:border-[#3B82F6] bg-white sysdark:bg-[#111317] px-4 py-3 text-[13px] leading-relaxed text-[#2D3748] sysdark:text-[#C9CED8] shadow-[0_1px_2px_rgba(11,18,32,0.05)] sysdark:shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                      <b className="font-semibold text-[#0B2A5B] sysdark:text-white">
                        Ví dụ:{" "}
                      </b>
                      {m.example}
                    </p>
                  </div>

                  <div
                    className={`relative isolate lg:col-span-7 ${flip ? "lg:order-1" : ""}`}
                  >
                    <SoftGlow />
                    <div className="overflow-hidden rounded-xl border border-[#D6DCE6] sysdark:border-[#262B33] bg-white sysdark:bg-[#111317] shadow-[0_24px_48px_-24px_rgba(11,18,32,0.28)] sysdark:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.28)]">
                      <div className="flex h-8 items-center gap-1.5 border-b border-[#E3E7EE] sysdark:border-[#1F232A] bg-[#F4F6FA] sysdark:bg-[#16191E] px-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#D6DCE6] sysdark:bg-[#262B33]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#D6DCE6] sysdark:bg-[#262B33]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#D6DCE6] sysdark:bg-[#262B33]" />
                      </div>
                      <Image
                        src={m.src}
                        alt={m.alt}
                        width={1280}
                        height={720}
                        sizes="(min-width: 1024px) 640px, 100vw"
                        className="block aspect-video w-full object-cover object-center"
                      />
                    </div>
                    {"extra" in m &&
                      m.extra.map((x) => (
                        <figure key={x.src} className="mt-5">
                          <div className="overflow-hidden rounded-xl border border-[#D6DCE6] sysdark:border-[#262B33] bg-white sysdark:bg-[#111317] shadow-[0_16px_32px_-20px_rgba(11,18,32,0.24)] sysdark:shadow-[0_16px_32px_-20px_rgba(0,0,0,0.28)]">
                            <Image
                              src={x.src}
                              alt={x.alt}
                              width={1280}
                              height={720}
                              sizes="(min-width: 1024px) 640px, 100vw"
                              className="block aspect-video w-full object-cover object-center"
                            />
                          </div>
                          <figcaption className="mt-2 text-[13px] text-[#5B6475] sysdark:text-[#8B93A3]">
                            {x.caption}
                          </figcaption>
                        </figure>
                      ))}
                  </div>
                </div>
              </section>
            )
          })}

          {/* ---------- So sánh theo gói ---------- */}
          <section
            id="so-sanh"
            className="relative scroll-mt-40 py-14 lg:py-20"
          >
            <RailMarks />
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <Eyebrow>So sánh gói</Eyebrow>
                <h2
                  className="mt-2 font-medium tracking-[-0.02em] text-[#0B1220] sysdark:text-[#F5F7FA] [text-wrap:balance]"
                  style={HEADING_STYLE}
                >
                  Chức năng có trong từng gói
                </h2>
              </div>

              <div className="mt-10 overflow-x-auto rounded-xl border border-[#E3E7EE] sysdark:border-[#1F232A]">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="bg-[#F7F9FC] sysdark:bg-[#0E1014]">
                      <th
                        scope="col"
                        className="px-5 py-4 font-semibold text-[#5B6475] sysdark:text-[#8B93A3]"
                      >
                        Chức năng
                      </th>
                      {PLANS.map((p) => (
                        <th
                          key={p.id}
                          scope="col"
                          className={`w-[19%] px-4 py-4 text-center ${p.tone === "featured" ? "bg-[#1D4ED8] sysdark:bg-[#2563EB] [&>span]:!text-white" : ""}`}
                        >
                          <span className="block font-bold text-[#0B1220] sysdark:text-[#F5F7FA]">
                            {p.name}
                          </span>
                          <span className="tnum mt-0.5 block text-xs font-medium text-[#5B6475] sysdark:text-[#8B93A3]">
                            {p.price}
                            {p.unit}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_ROWS.map((r) => (
                      <tr
                        key={r.item}
                        className="border-t border-[#E3E7EE] sysdark:border-[#1F232A]"
                      >
                        <th
                          scope="row"
                          className="px-5 py-3.5 font-medium text-[#1F2937] sysdark:text-[#E6E9EF]"
                        >
                          {r.item}
                        </th>
                        {PLANS.map((p, tier) => (
                          <td key={p.id} className={`px-4 py-3.5 text-center`}>
                            {tier >= r.from ? (
                              <Check
                                aria-label="Có"
                                className="mx-auto h-4 w-4 text-[#1D4ED8] sysdark:text-[#6EA8FF]"
                              />
                            ) : (
                              <Minus
                                aria-label="Không"
                                className="mx-auto h-4 w-4 text-[#C4CBD6] sysdark:text-[#3A404A]"
                              />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        {/* ---------- Kêu gọi liên hệ ---------- */}
        <section className="relative overflow-hidden bg-[#0B1220] sysdark:bg-[#0E1014] py-14 lg:py-16">
          <CubeBackdrop id="goeat-cubes-cta" />
          <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <h2
                className="font-medium tracking-[-0.02em] text-white [text-wrap:balance]"
                style={HEADING_STYLE}
              >
                Xem tận mắt các chức năng trên bản demo chạy thật
              </h2>
              <p className="mt-2 text-sm text-[#A9B8D6] sysdark:text-[#6B7280]">
                Dùng thử miễn phí 7 ngày, chỉ cần email. Cần tư vấn: {CONTACT.email}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href={TRY_DEMO_HREF}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#1D4ED8] sysdark:bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2563EB] sysdark:hover:bg-[#3B82F6]"
              >
                Nhận tài khoản demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={CONTACT.zalo}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 sysdark:hover:bg-[#111317]/10"
              >
                <MessageCircle className="h-4 w-4" />
                Nhắn Zalo
              </a>
            </div>
          </div>
        </section>
      </div>

      <GoEatFooter />
    </div>
  )
}
