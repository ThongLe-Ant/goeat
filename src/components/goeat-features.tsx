import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  FileSpreadsheet,
  MessageCircle,
  Minus,
} from "lucide-react"

import { TRY_DEMO_HREF } from "./demo-url"
import {
  BROCHURE_HREF,
  CONTACT,
  CubeBackdrop,
  Eyebrow,
  FEATURE_MODULES,
  GoEatFooter,
  GoEatHeader,
  GuideRails,
  HEADING_STYLE,
  PLANS,
  PLAN_MATRIX,
  RailMarks,
  SoftGlow,
} from "./goeat-shared"

/* ============================================================================
 * Trang chức năng GoEat: mỗi chức năng một mục (chữ và ảnh so le), cuối trang
 * là bảng đối chiếu phạm vi chi tiết giữa 3 gói (PLAN_MATRIX).
 * ========================================================================== */

export function GoEatFeaturesPage() {
  return (
    <div className="sysdark:bg-[#08090B] sysdark:text-[#F5F7FA] sysdark:selection:bg-[#2563EB] min-h-dvh bg-white text-[#0B1220] antialiased selection:bg-[#1D4ED8] selection:text-white">
      <GoEatHeader active="Chức năng" />

      <div>
        <h1 className="sr-only">Chức năng GoEat</h1>
        <div aria-hidden="true" className="h-[76px]" />

        {/* ---------- Thanh chọn nhanh, dính dưới đầu trang ---------- */}
        <nav
          aria-label="Các chức năng"
          className="sysdark:border-[#1F232A] sysdark:bg-[#0E1014]/90 sticky top-[76px] z-20 border-b border-[#E3E7EE] bg-white/95 backdrop-blur-sm"
        >
          <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
            {FEATURE_MODULES.map((m) => {
              const Icon = m.icon
              return (
                <li key={m.id} className="shrink-0">
                  <a
                    href={`#${m.id}`}
                    className="sysdark:border-[#262B33] sysdark:text-[#E6E9EF] sysdark:hover:border-[#3B82F6] sysdark:hover:text-[#6EA8FF] inline-flex items-center gap-1.5 rounded-full border border-[#D6DCE6] px-3.5 py-2 text-sm font-medium text-[#1F2937] transition-colors hover:border-[#1D4ED8] hover:text-[#1D4ED8]"
                  >
                    <Icon className="sysdark:text-[#6EA8FF] h-4 w-4 text-[#1D4ED8]" />
                    {m.name}
                  </a>
                </li>
              )
            })}
            <li className="shrink-0">
              <a
                href="#so-sanh"
                className="sysdark:text-[#6EA8FF] inline-flex items-center rounded-full px-3.5 py-2 text-sm font-semibold text-[#1D4ED8] hover:underline"
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
                className={`sysdark:border-[#1F232A] relative scroll-mt-40 border-b border-[#E3E7EE] py-14 lg:py-16 ${flip ? "sysdark:bg-[#0E1014] bg-[#F7F9FC]" : "sysdark:bg-[#08090B] bg-white"}`}
              >
                <RailMarks />
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
                  <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
                    <p className="sysdark:text-[#6EA8FF] flex flex-wrap items-center gap-2 text-xs font-semibold text-[#1D4ED8]">
                      <span className="sysdark:bg-[#2563EB] inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#1D4ED8] text-white">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="tnum font-mono tracking-[0.06em] uppercase">
                        {String(i + 1).padStart(2, "0")} · {m.name}
                      </span>
                      <span className="sysdark:text-[#6B7280] text-[#8B93A3]">
                        · {m.when}
                      </span>
                      {"addon" in m && (
                        <span className="sysdark:bg-[#1E3A8A] rounded-full bg-[#0B1220] px-2 py-0.5 text-[11px] font-semibold text-white">
                          {m.addon}
                        </span>
                      )}
                    </p>
                    <h2
                      id={`${m.id}-title`}
                      className="sysdark:text-[#F5F7FA] mt-4 font-medium tracking-[-0.02em] [text-wrap:balance] text-[#0B1220]"
                      style={HEADING_STYLE}
                    >
                      {m.title}
                    </h2>
                    <p className="sysdark:text-[#A3AAB8] mt-3 text-base leading-relaxed text-[#4B5565]">
                      {m.text}
                    </p>

                    <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                      {m.points.map((p) => (
                        <li key={p.t} className="flex gap-2.5">
                          <Check className="sysdark:text-[#6EA8FF] mt-0.5 h-4 w-4 shrink-0 text-[#1D4ED8]" />
                          <div>
                            <p className="sysdark:text-[#F5F7FA] text-sm font-semibold text-[#0B1220]">
                              {p.t}
                            </p>
                            <p className="sysdark:text-[#8B93A3] mt-0.5 text-sm leading-relaxed text-[#5B6475]">
                              {p.d}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <p className="sysdark:border-[#3B82F6] sysdark:bg-[#111317] sysdark:text-[#C9CED8] sysdark:shadow-[0_1px_2px_rgba(0,0,0,0.4)] mt-7 rounded-md border-l-2 border-[#1D4ED8] bg-white px-4 py-3 text-[13px] leading-relaxed text-[#2D3748] shadow-[0_1px_2px_rgba(11,18,32,0.05)]">
                      <b className="sysdark:text-white font-semibold text-[#0B2A5B]">
                        Ví dụ:{" "}
                      </b>
                      {m.example}
                    </p>
                  </div>

                  <div
                    className={`relative isolate lg:col-span-7 ${flip ? "lg:order-1" : ""}`}
                  >
                    <SoftGlow />
                    <div className="sysdark:border-[#262B33] sysdark:bg-[#111317] sysdark:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.28)] overflow-hidden rounded-xl border border-[#D6DCE6] bg-white shadow-[0_24px_48px_-24px_rgba(11,18,32,0.28)]">
                      <div className="sysdark:border-[#1F232A] sysdark:bg-[#16191E] flex h-8 items-center gap-1.5 border-b border-[#E3E7EE] bg-[#F4F6FA] px-3">
                        <span className="sysdark:bg-[#262B33] h-2.5 w-2.5 rounded-full bg-[#D6DCE6]" />
                        <span className="sysdark:bg-[#262B33] h-2.5 w-2.5 rounded-full bg-[#D6DCE6]" />
                        <span className="sysdark:bg-[#262B33] h-2.5 w-2.5 rounded-full bg-[#D6DCE6]" />
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
                          <div className="sysdark:border-[#262B33] sysdark:bg-[#111317] sysdark:shadow-[0_16px_32px_-20px_rgba(0,0,0,0.28)] overflow-hidden rounded-xl border border-[#D6DCE6] bg-white shadow-[0_16px_32px_-20px_rgba(11,18,32,0.24)]">
                            <Image
                              src={x.src}
                              alt={x.alt}
                              width={1280}
                              height={720}
                              sizes="(min-width: 1024px) 640px, 100vw"
                              className="block aspect-video w-full object-cover object-center"
                            />
                          </div>
                          <figcaption className="sysdark:text-[#8B93A3] mt-2 text-[13px] text-[#5B6475]">
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
                  className="sysdark:text-[#F5F7FA] mt-2 font-medium tracking-[-0.02em] [text-wrap:balance] text-[#0B1220]"
                  style={HEADING_STYLE}
                >
                  Đối chiếu phạm vi nghiệp vụ từng gói
                </h2>
                <p className="sysdark:text-[#8B93A3] mt-2 text-sm text-[#5B6475]">
                  Chọn cấu hình theo quy mô nhân sự, số ca ăn và nhu cầu tích
                  hợp tại nhà máy.
                </p>
              </div>

              <div className="sysdark:border-[#1F232A] mt-10 overflow-x-auto rounded-xl border border-[#E3E7EE]">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="sysdark:bg-[#0E1014] bg-[#F7F9FC]">
                      <th
                        scope="col"
                        className="sysdark:text-[#8B93A3] px-5 py-4 font-semibold text-[#5B6475]"
                      >
                        Hạng mục nghiệp vụ
                      </th>
                      {PLANS.map((p) => (
                        <th
                          key={p.id}
                          scope="col"
                          className={`w-[21%] px-4 py-4 text-center ${p.tone === "featured" ? "sysdark:bg-[#2563EB] bg-[#1D4ED8] [&>span]:!text-white" : ""}`}
                        >
                          <span className="sysdark:text-[#F5F7FA] block font-bold text-[#0B1220]">
                            {p.name}
                          </span>
                          {p.listPrice ? (
                            <span className="tnum mt-0.5 block font-mono text-[11px] text-[#8B93A3] line-through opacity-80">
                              {p.listPrice}
                            </span>
                          ) : null}
                          <span className="tnum sysdark:text-[#6EA8FF] mt-0.5 block font-mono text-xs font-semibold text-[#1D4ED8]">
                            {p.price}
                            {p.unit}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PLAN_MATRIX.map((r) => (
                      <tr
                        key={r.label}
                        className="sysdark:border-[#1F232A] border-t border-[#E3E7EE]"
                      >
                        <th
                          scope="row"
                          className="sysdark:text-[#E6E9EF] px-5 py-3.5 font-medium text-[#1F2937]"
                        >
                          {r.label}
                        </th>
                        {r.cells.map((c, idx) => {
                          const isFeaturedCol = PLANS[idx].tone === "featured"
                          return (
                            <td
                              key={PLANS[idx].id}
                              className={`px-4 py-3.5 text-center ${isFeaturedCol ? "sysdark:bg-[#16203A]/35 bg-[#EFF6FF]/45" : ""}`}
                            >
                              {c === true ? (
                                <Check
                                  aria-label="Có"
                                  className="sysdark:text-[#6EA8FF] mx-auto h-4 w-4 text-[#1D4ED8]"
                                />
                              ) : c === false ? (
                                <Minus
                                  aria-label="Không"
                                  className="sysdark:text-[#3A404A] mx-auto h-4 w-4 text-[#C4CBD6]"
                                />
                              ) : (
                                <span className="tnum sysdark:text-[#A3AAB8] text-xs font-medium text-[#4B5565]">
                                  {c}
                                </span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="sysdark:text-[#8B93A3] mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5B6475]">
                <span>
                  Mỗi doanh nghiệp vận hành trên cơ sở dữ liệu độc lập, miễn phí
                  khởi tạo ban đầu.
                </span>
                <Link
                  href={BROCHURE_HREF}
                  className="sysdark:text-[#6EA8FF] inline-flex items-center gap-1.5 font-semibold text-[#1D4ED8] hover:underline"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  Tải Hồ sơ giải pháp &amp; Biểu phí PDF (A4)
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* ---------- Kêu gọi liên hệ ---------- */}
        <section className="sysdark:bg-[#0E1014] relative overflow-hidden bg-[#0B1220] py-14 lg:py-16">
          <CubeBackdrop id="goeat-cubes-cta" />
          <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <h2
                className="font-medium tracking-[-0.02em] [text-wrap:balance] text-white"
                style={HEADING_STYLE}
              >
                Xem tận mắt các chức năng trên bản demo chạy thật
              </h2>
              <p className="sysdark:text-[#6B7280] mt-2 text-sm text-[#A9B8D6]">
                Dùng thử miễn phí 7 ngày, chỉ cần email. Cần tư vấn:{" "}
                {CONTACT.email}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href={TRY_DEMO_HREF}
                className="sysdark:bg-[#2563EB] sysdark:hover:bg-[#3B82F6] inline-flex items-center gap-1.5 rounded-full bg-[#1D4ED8] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2563EB]"
              >
                Nhận tài khoản demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={CONTACT.zalo}
                className="sysdark:hover:bg-[#111317]/10 inline-flex items-center gap-1.5 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
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
