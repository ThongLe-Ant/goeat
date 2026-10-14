"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChefHat,
  FileSpreadsheet,
  History,
  Mail,
  MessageCircle,
  Monitor,
  Network,
  Phone,
  ScanLine,
  ShieldCheck,
  ShoppingBag,
  Users,
} from "lucide-react"

import {
  CONTACT,
  CubeBackdrop,
  Eyebrow,
  FAQ,
  FEATURES_HREF,
  FEATURE_MODULES,
  GoEatFooter,
  GoEatHeader,
  GuideRails,
  HEADING_STYLE,
  PLANS,
  RailMarks,
  SoftGlow,
  TryDemoBand,
} from "./goeat-shared"
import { TRY_DEMO_HREF } from "./demo-url"

/* ============================================================================
 * Trang giới thiệu GoEat bản gọn: sản phẩm (slider) → dòng thời gian vận hành
 * → bảng giá → đăng ký. Chi tiết từng chức năng ở trang /chuc-nang.
 * ========================================================================== */

const SLIDE_MS = 6000

const SLIDES = [
  {
    id: "dat-mon",
    icon: CalendarCheck,
    tab: "Đặt món",
    title: "Đặt món theo từng ngày",
    text: "Chọn ca và món cho cả tuần. Tới giờ chốt thì tự khoá sửa.",
    url: "goeat.vn/ordering",
    src: "/images/goeat-dat-mon-ca-tuan.jpg",
    alt: "Màn hình đặt món theo từng ngày trong tuần, chọn Ca 1, Ca 2, Ca 3",
    fit: "object-cover object-center",
  },
  {
    id: "bao-bep",
    icon: ChefHat,
    tab: "Báo bếp",
    title: "Bếp có số nấu theo từng ca",
    text: "Tự chốt số mặn, chay, món nước cho Ca 1, Ca 2, Ca 3.",
    url: "goeat.vn/admin/reports/meal-day",
    src: "/images/goeat-bao-bep-ca.jpg",
    alt: "Báo cáo bếp theo ngày tách số lượng theo ca và theo món",
    fit: "object-cover object-center",
  },
  {
    id: "nhan-mon",
    icon: ScanLine,
    tab: "Nhận món",
    title: "Quẹt thẻ nhận món",
    text: "Màn hình hiện to tên món và tên người, không cần phiếu giấy.",
    url: "goeat.vn/pickup",
    src: "/images/goeat-nhan-mon-quay.jpg",
    alt: "Màn hình nhận món hiện tên món và tên nhân viên sau khi quẹt thẻ",
    fit: "object-cover object-center",
  },
  {
    id: "tai-quay",
    icon: Monitor,
    tab: "Tại quầy",
    title: "Lắp đặt tại quầy",
    text: "Một màn hình và một máy scan đặt trước quầy lấy khay cơm.",
    url: "Ảnh thực tế tại nhà máy",
    src: "/images/goeat-quay-nhan-mon.jpg",
    alt: "Máy tính bảng hiển thị màn hình nhận món cạnh máy scan thẻ đặt tại quầy",
    fit: "object-cover object-center",
  },
  {
    id: "can-tin",
    icon: ShoppingBag,
    tab: "Căn-tin",
    title: "Cửa hàng căn-tin nội bộ",
    text: "Đặt trước đồ ăn thêm, nước uống; thanh toán bằng mã QR.",
    url: "goeat.vn/canteen/order",
    src: "/images/goeat-can-tin-dat.jpg",
    alt: "Cửa hàng căn-tin nội bộ với danh sách món và giỏ hàng",
    fit: "object-cover object-center",
  },
  {
    id: "doi-soat",
    icon: FileSpreadsheet,
    tab: "Đối soát",
    title: "Đối soát cuối tháng",
    text: "Đăng ký, đã nhận, phát ngoại lệ theo ngày và ca — xuất Excel.",
    url: "goeat.vn/admin/reports/meal-reconcile",
    src: "/images/goeat-doi-soat-ky.jpg",
    alt: "Bảng đối soát suất ăn theo ngày và ca kèm nút xuất Excel",
    fit: "object-cover object-center",
  },
] as const

const HERO_POINTS = [
  "Chọn món theo tuần, tới giờ chốt tự khoá",
  "Tự chốt số báo bếp theo từng ca",
  "Quẹt thẻ nhận cơm, không nhận trùng",
  "Đối soát và xuất Excel cuối tháng",
] as const

const TRUST_ITEMS = [
  { icon: Users, label: "Phân quyền theo vai trò" },
  { icon: History, label: "Nhật ký thao tác đầy đủ" },
  { icon: Network, label: "Kết nối API hệ thống nhà máy" },
  { icon: ShieldCheck, label: "Triển khai & đào tạo tận nơi" },
] as const

const PLAN_OPTIONS = PLANS.map((p) => p.name)

/** Dòng thời gian trang chủ: căn-tin là phần cộng thêm nên ghi riêng bên dưới. */
const TIMELINE = FEATURE_MODULES.filter((m) => m.id !== "can-tin")

/* ---------- Phần đầu: chữ một hàng, ảnh sản phẩm to ở giữa ----------
 * Khung ảnh tự co theo chiều cao màn hình để vào trang là thấy trọn ảnh,
 * màn cao thì ảnh to ra tới hết bề ngang. Tab chức năng nằm trên thanh khung. */

function ProductHero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const touchX = useRef<number | null>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  const count = SLIDES.length
  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  )

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const autoplay = !paused && !reduceMotion

  useEffect(() => {
    if (!autoplay) return
    const t = window.setTimeout(() => go(index + 1), SLIDE_MS)
    return () => window.clearTimeout(t)
  }, [autoplay, index, go])

  // Điện thoại không đủ chỗ cho cả 6 tab: cuộn dải tab theo slide đang hiện.
  useEffect(() => {
    const list = tabsRef.current
    const tab = list?.children[index] as HTMLElement | undefined
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return
    list.scrollTo({ left: tab.offsetLeft - 8, behavior: "smooth" })
  }, [index])

  const active = SLIDES[index]

  return (
    <>
      <style>{`@keyframes goeat-slide-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes goeat-fade-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}`}</style>

      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
        {/* Chữ giới thiệu — cột trái */}
        <div className="min-w-0">
          <p className="font-mono text-xs font-medium tracking-[0.08em] text-[#BFDBFE] uppercase sysdark:text-[#8FB8FF]">
            Nhà máy · Cơ quan · Đơn vị thầu bếp
          </p>
          <h1
            className="mt-3 font-medium tracking-[-0.025em] text-white [text-wrap:balance]"
            style={{
              fontSize: "clamp(1.8rem, 2.6vw, 2.5rem)",
              lineHeight: 1.15,
            }}
          >
            Phần mềm quản lý suất ăn &amp; căn-tin
          </h1>
          <p className="mt-3 text-base text-[#EFF5FF] sysdark:text-[#A3AAB8] [text-wrap:pretty]">
            Chọn món, báo bếp, phát cơm, đối soát — đúng số, đủ dấu vết.
          </p>
          <ul className="mt-5 space-y-2.5 text-sm text-[#E3EDFF] sysdark:text-[#C9CED8]">
            {HERO_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#BFDBFE] sysdark:text-[#8FB8FF]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={TRY_DEMO_HREF}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#0B2A5B] sysdark:text-[#08090B] shadow-sm transition-colors hover:bg-[#EAF1FF]"
            >
              Dùng thử miễn phí 7 ngày
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#bang-gia"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sysdark:hover:bg-white/5"
            >
              Xem bảng giá
            </a>
          </div>
          <p className="mt-3 text-xs text-[#BFDBFE] sysdark:text-[#8FB8FF]">
            Chỉ cần email, nhận tài khoản ngay, không cần cài đặt.
          </p>
        </div>

        {/* Khung ảnh sản phẩm */}
        <div
          className="w-full lg:w-[clamp(560px,calc((100dvh-250px)*16/9),min(940px,calc(100vw-500px)))]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="overflow-hidden rounded-xl border border-white/20 bg-white sysdark:bg-[#111317] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)]">
            <div className="flex items-center gap-3 border-b border-[#E3E7EE] sysdark:border-[#1F232A] bg-[#F4F6FA] sysdark:bg-[#16191E] px-3 py-2">
              <div className="hidden gap-1.5 pl-1 sm:flex">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D3D9E2] sysdark:bg-[#343A44]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D3D9E2] sysdark:bg-[#343A44]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D3D9E2] sysdark:bg-[#343A44]" />
              </div>
              <div
                ref={tabsRef}
                role="tablist"
                aria-label="Chức năng sản phẩm"
                className="relative flex min-w-0 flex-1 snap-x gap-1 overflow-x-auto pr-8 [mask-image:linear-gradient(to_right,#000_80%,transparent)] sm:justify-center sm:pr-0 sm:[mask-image:none] [&::-webkit-scrollbar]:hidden"
              >
                {SLIDES.map((s, i) => {
                  const Icon = s.icon
                  const isActive = i === index
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="goeat-slide-panel"
                      onClick={() => go(i)}
                      className={`relative flex shrink-0 snap-start items-center gap-1.5 overflow-hidden rounded-md px-3 py-1.5 text-[13px] font-semibold transition-colors ${
                        isActive
                          ? "bg-white sysdark:bg-[#262B33] text-[#0B2A5B] shadow-sm sysdark:text-white sysdark:shadow-none ring-1 ring-[#D6DCE6] sysdark:ring-white/10"
                          : "text-[#5B6475] sysdark:text-[#8B93A3] hover:bg-white/70 sysdark:hover:bg-[#111317]/5 hover:text-[#0B2A5B] sysdark:hover:text-white"
                      }`}
                    >
                      <Icon
                        className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-[#1D4ED8] sysdark:text-[#6EA8FF]" : ""}`}
                      />
                      {s.tab}
                      {isActive && (
                        <span
                          key={`${index}-${autoplay}`}
                          aria-hidden
                          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#1D4ED8] sysdark:bg-[#2563EB]"
                          style={
                            autoplay
                              ? {
                                  animation: `goeat-slide-progress ${SLIDE_MS}ms linear forwards`,
                                }
                              : { transform: "scaleX(1)" }
                          }
                        />
                      )}
                    </button>
                  )
                })}
              </div>
              <span className="tnum hidden pr-1 text-xs font-semibold text-[#8B93A3] sysdark:text-[#6B7280] sm:inline">
                {index + 1}/{count}
              </span>
            </div>

            <div
              id="goeat-slide-panel"
              role="tabpanel"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${count}: ${active.title}`}
              className="relative overflow-hidden bg-[#F8FAFC]"
              onTouchStart={(e) => {
                touchX.current = e.touches[0]?.clientX ?? null
              }}
              onTouchEnd={(e) => {
                if (touchX.current === null) return
                const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current
                if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1))
                touchX.current = null
              }}
            >
              {/* Các ảnh chồng lên nhau, đổi slide bằng mờ dần thay vì trượt
               * ngang: không bị tua ngược qua cả dãy khi từ ảnh cuối về ảnh
               * đầu. Ảnh tải sẵn hết để lúc đổi không bị chớp trắng. */}
              <div className="grid">
                {SLIDES.map((s, i) => (
                  <div
                    key={s.id}
                    className={`[grid-area:1/1] transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
                      i === index
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                    aria-hidden={i !== index}
                  >
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={1440}
                      height={900}
                      priority={i === 0}
                      loading={i === 0 ? undefined : "eager"}
                      sizes="(min-width: 1024px) 940px, 100vw"
                      className={`block aspect-[16/9] w-full bg-white ${s.fit}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p
              key={active.id}
              className="text-sm text-[#E3EDFF] sysdark:text-[#C9CED8] motion-safe:animate-[goeat-fade-in_500ms_ease-out]"
            >
              <b className="font-semibold text-white">{active.title}.</b>{" "}
              {active.text}
            </p>
            <a
              href={FEATURES_HREF}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 text-sm font-semibold text-white hover:underline"
            >
              Xem chi tiết từng chức năng
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

/* ---------- Trang ---------- */

export function GoEatLandingPage() {
  const [plan, setPlan] = useState<string>("Tuỳ biến")
  const [showPhone, setShowPhone] = useState(false)

  return (
    <div className="min-h-dvh bg-white sysdark:bg-[#08090B] text-[#0B1220] sysdark:text-[#F5F7FA] antialiased selection:bg-[#1D4ED8] sysdark:selection:bg-[#2563EB] selection:text-white">
      <GoEatHeader wide />

      <div>
        {/* ---------- Hero + slider sản phẩm (ảnh nằm ngay màn hình đầu) ---------- */}
        <section
          id="san-pham"
          className="relative scroll-mt-20 overflow-hidden bg-[#1D4ED8] sysdark:bg-[#08090B] sysdark:bg-[radial-gradient(ellipse_70%_80%_at_85%_0%,rgba(37,99,235,0.38),transparent_70%)] pt-[100px] pb-10 lg:pt-[96px] lg:pb-12"
        >
          <CubeBackdrop />
          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <ProductHero />
          </div>
        </section>

        {/* Phần dưới đầu trang: chung một khung kẻ dọc. */}
        <div className="relative overflow-x-clip">
          <GuideRails />

          {/* ---------- Số liệu & dải tin cậy ---------- */}
          <section
            aria-label="Số liệu vận hành và cam kết"
            className="relative border-y border-[#E3E7EE] sysdark:border-[#1F232A] bg-[#F7F9FC] sysdark:bg-[#0E1014] bg-[radial-gradient(#D6DCE6_1px,transparent_1px)] sysdark:bg-[radial-gradient(#1F232A_1px,transparent_1px)] [background-size:16px_16px]"
          >
            <RailMarks />
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8">
              <dl className="grid grid-cols-3 divide-x divide-[#D6DCE6] sysdark:divide-[#262B33] lg:col-span-5">
                {[
                  { v: "1,37tr", l: "suất đã phục vụ" },
                  { v: "0,5s", l: "mỗi lượt quẹt thẻ" },
                  { v: "3 ca", l: "vận hành mỗi ngày" },
                ].map((s) => (
                  <div key={s.l} className="px-3 first:pl-0">
                    <dt className="sr-only">{s.l}</dt>
                    <dd className="font-mono text-2xl font-medium tracking-tight text-[#0B1220] sysdark:text-[#F5F7FA]">
                      {s.v}
                    </dd>
                    <dd className="mt-0.5 text-xs text-[#5B6475] sysdark:text-[#8B93A3]">
                      {s.l}
                    </dd>
                  </div>
                ))}
              </dl>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 lg:col-span-7">
                {TRUST_ITEMS.map((t) => {
                  const Icon = t.icon
                  return (
                    <li
                      key={t.label}
                      className="flex items-center gap-2.5 text-sm font-semibold text-[#1F2937] sysdark:text-[#E6E9EF]"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-[#1D4ED8] sysdark:text-[#6EA8FF]" />
                      {t.label}
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>

          {/* ---------- Chức năng: một ngày suất ăn theo dòng thời gian ----------
           * Chỉ sơ lược; chi tiết từng chức năng ở trang /chuc-nang. */}
          <section
            id="chuc-nang"
            className="relative scroll-mt-20 bg-white sysdark:bg-[#08090B] pt-16 pb-8 lg:pt-24 lg:pb-10"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <Eyebrow index="01">Cách vận hành</Eyebrow>
                  <h2
                    className="mt-2 font-medium tracking-[-0.02em] text-[#0B1220] sysdark:text-[#F5F7FA] [text-wrap:balance]"
                    style={HEADING_STYLE}
                  >
                    Từ lúc đặt món tới khi đối soát
                  </h2>
                </div>
                <Link
                  href={FEATURES_HREF}
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] sysdark:text-[#6EA8FF] hover:text-[#172554] sysdark:hover:text-white"
                >
                  Xem toàn bộ chức năng
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <ol className="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-6">
                <span
                  aria-hidden
                  className="absolute top-5 right-[10%] left-[10%] hidden border-t border-dashed border-[#9DB8EC] sysdark:border-[#1E3A8A] md:block"
                />
                {TIMELINE.map((m, i) => {
                  const Icon = m.icon
                  return (
                    <li
                      key={m.id}
                      className="relative flex gap-4 md:flex-col md:items-center md:gap-0 md:text-center"
                    >
                      <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C9D8F5] sysdark:border-[#1E3A8A] bg-white sysdark:bg-[#111317] text-[#1D4ED8] sysdark:text-[#6EA8FF] shadow-[0_0_0_6px_#fff] sysdark:shadow-[0_0_0_6px_#08090B]">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <div className="md:mt-4">
                        <p className="font-mono text-[11px] font-medium tracking-wide text-[#6B7485] uppercase sysdark:text-[#7A8292]">
                          {String(i + 1).padStart(2, "0")} · {m.when}
                        </p>
                        <h3 className="mt-1 text-base font-bold text-[#0B1220] sysdark:text-[#F5F7FA]">
                          <Link
                            href={`${FEATURES_HREF}#${m.id}`}
                            className="hover:text-[#1D4ED8] sysdark:hover:text-[#6EA8FF]"
                          >
                            {m.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-[#4B5565] sysdark:text-[#A3AAB8]">
                          {m.brief}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ol>

              <p className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-[#E3E7EE] sysdark:border-[#1F232A] pt-6 text-center text-sm text-[#4B5565] sysdark:text-[#A3AAB8]">
                <ShoppingBag className="h-4 w-4 text-[#1D4ED8] sysdark:text-[#6EA8FF]" />
                <b className="font-semibold text-[#0B1220] sysdark:text-[#F5F7FA]">
                  Thêm căn-tin nội bộ:
                </b>
                đặt trước đồ ăn thêm, trả bằng mã QR.
                <span className="rounded-full bg-[#0B1220] sysdark:bg-[#1E3A8A] px-2 py-0.5 text-xs font-semibold text-white">
                  Gói Nâng cao
                </span>
              </p>
            </div>
          </section>

          <TryDemoBand />

          {/* ---------- Bảng giá ---------- */}
          <section
            id="bang-gia"
            className="relative scroll-mt-24 border-t border-[#E3E7EE] py-12 lg:py-16 sysdark:border-[#1F232A]"
          >
            <RailMarks />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <Eyebrow index="02">Bảng giá</Eyebrow>
                <h2
                  className="mt-2 font-medium tracking-[-0.02em] text-[#0B1220] sysdark:text-[#F5F7FA] [text-wrap:balance]"
                  style={HEADING_STYLE}
                >
                  Chọn gói phù hợp với đơn vị bạn
                </h2>
              </div>

              <div className="relative isolate mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:items-stretch">
                <SoftGlow className="inset-x-1/4 -inset-y-10" />
                {PLANS.map((plan) => {
                  const dark = plan.tone === "dark"
                  const featured = plan.tone === "featured"
                  return (
                    <div
                      key={plan.id}
                      className={`relative flex flex-col rounded-xl border p-7 ${
                        dark
                          ? "border-[#0A1633] sysdark:border-[#1E3A8A] bg-[#0A1633] sysdark:bg-[#0F1A3A] text-white"
                          : featured
                            ? "border-[#1D4ED8] sysdark:border-[#3B82F6] bg-white sysdark:bg-[#111317] shadow-[0_30px_60px_-36px_rgba(10,22,51,0.5)] sysdark:shadow-[0_30px_60px_-36px_rgba(37,99,235,0.45)] ring-1 ring-[#1D4ED8] sysdark:ring-[#3B82F6]"
                            : "border-[#D6DCE6] sysdark:border-[#262B33] bg-white sysdark:bg-[#111317]"
                      }`}
                    >
                      {featured && (
                        <span className="absolute -top-3 left-7 rounded-full bg-[#1D4ED8] sysdark:bg-[#2563EB] px-3 py-1 text-[11px] font-semibold text-white">
                          Được chọn nhiều
                        </span>
                      )}
                      <h3
                        className={`text-sm font-semibold tracking-wide uppercase ${
                          dark
                            ? "text-[#BFDBFE] sysdark:text-[#8FB8FF]"
                            : "text-[#1D4ED8] sysdark:text-[#6EA8FF]"
                        }`}
                      >
                        {plan.name}
                      </h3>

                      <div className="mt-4 flex items-baseline gap-1">
                        <span className="tnum text-3xl font-bold tracking-tight">
                          {plan.price}
                        </span>
                        {plan.unit && (
                          <span
                            className={`text-sm ${dark ? "text-[#BFDBFE] sysdark:text-[#8FB8FF]" : "text-[#5B6475] sysdark:text-[#8B93A3]"}`}
                          >
                            {plan.unit}
                          </span>
                        )}
                      </div>
                      <p
                        className={`mt-2 text-sm ${dark ? "text-[#C7D7F5] sysdark:text-[#A3AAB8]" : "text-[#5B6475] sysdark:text-[#8B93A3]"}`}
                      >
                        {plan.note}
                      </p>

                      <ul
                        className={`mt-6 flex-1 space-y-2.5 border-t pt-6 text-sm ${
                          dark
                            ? "border-white/10 text-[#E3EDFF] sysdark:text-[#C9CED8]"
                            : "border-[#E3E7EE] sysdark:border-[#1F232A] text-[#1F2937] sysdark:text-[#E6E9EF]"
                        }`}
                      >
                        {plan.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <Check
                              className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-[#60A5FA]" : "text-[#1D4ED8] sysdark:text-[#6EA8FF]"}`}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href="#dang-ky"
                        onClick={() => setPlan(plan.name)}
                        className={`mt-7 inline-flex min-h-[44px] items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                          dark
                            ? "bg-white text-[#0A1633] sysdark:text-[#08090B] hover:bg-[#EAF1FF] sysdark:hover:bg-[#E6E9EF]"
                            : featured
                              ? "bg-[#1D4ED8] sysdark:bg-[#2563EB] text-white hover:bg-[#1E40AF] sysdark:hover:bg-[#3B82F6]"
                              : "border border-[#C9D0DC] sysdark:border-[#343A44] text-[#111827] sysdark:text-[#E6E9EF] hover:border-[#1D4ED8] sysdark:hover:border-[#3B82F6]"
                        }`}
                      >
                        {plan.cta}
                      </a>
                    </div>
                  )
                })}
              </div>

              <p className="mt-8 text-center text-sm text-[#5B6475] sysdark:text-[#8B93A3]">
                Chưa chắc gói nào hợp?{" "}
                <Link
                  href={TRY_DEMO_HREF}
                  className="font-semibold text-[#1D4ED8] sysdark:text-[#6EA8FF] hover:underline"
                >
                  Dùng thử miễn phí 7 ngày
                </Link>{" "}
                hoặc{" "}
                <a
                  href="#dang-ky"
                  className="font-semibold text-[#1D4ED8] sysdark:text-[#6EA8FF] hover:underline"
                >
                  nhắn Zalo để được tư vấn
                </a>
              </p>
            </div>
          </section>

          {/* ---------- Hỏi đáp (cùng nội dung với FAQPage trong goeat-seo) ---------- */}
          <section
            id="hoi-dap"
            aria-labelledby="hoi-dap-title"
            className="relative scroll-mt-24 border-t border-[#E3E7EE] py-12 lg:py-16 sysdark:border-[#1F232A]"
          >
            <RailMarks />
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
              <div className="lg:col-span-4">
                <Eyebrow index="03">Hỏi đáp</Eyebrow>
                <h2
                  id="hoi-dap-title"
                  className="mt-2 font-medium tracking-[-0.02em] text-[#0B1220] [text-wrap:balance] sysdark:text-[#F5F7FA]"
                  style={HEADING_STYLE}
                >
                  Câu hỏi thường gặp
                </h2>
              </div>
              <div className="divide-y divide-[#E3E7EE] border-y border-[#E3E7EE] lg:col-span-8 sysdark:divide-[#1F232A] sysdark:border-[#1F232A]">
                {FAQ.map((f, i) => (
                  <details key={f.q} open={i === 0} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-semibold text-[#0B1220] sysdark:text-[#F5F7FA] [&::-webkit-details-marker]:hidden">
                      <h3>{f.q}</h3>
                      <span
                        aria-hidden
                        className="font-mono text-lg leading-none text-[#1D4ED8] transition-transform group-open:rotate-45 sysdark:text-[#6EA8FF]"
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-5 text-sm leading-relaxed text-[#4B5565] sysdark:text-[#A3AAB8]">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- Đăng ký ---------- */}
          <section
            id="dang-ky"
            className="relative scroll-mt-24 overflow-hidden border-t border-[#E3E7EE] sysdark:border-[#1F232A] bg-[#F7F9FC] sysdark:bg-[#0E1014] py-14 lg:py-20"
          >
            <RailMarks />
            <CubeBackdrop id="goeat-cubes-contact" light />
            <div className="relative isolate mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <SoftGlow className="inset-x-10 -inset-y-6" />
              <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-[#D6DCE6] sysdark:border-[#262B33] bg-white sysdark:bg-[#111317] lg:grid-cols-5">
                <div className="bg-[#1D4ED8] sysdark:bg-[#2563EB] p-8 text-white sm:p-10 lg:col-span-2">
                  <h2
                    className="font-medium tracking-[-0.02em] [text-wrap:balance]"
                    style={{
                      fontSize: "clamp(1.5rem, 2.2vw, 1.9rem)",
                      lineHeight: 1.2,
                    }}
                  >
                    Liên hệ <span className="whitespace-nowrap">tư vấn</span>{" "}
                    &amp; <span className="whitespace-nowrap">báo giá</span>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#C7D7F5] sysdark:text-[#A3AAB8]">
                    Nhắn Zalo hoặc gọi trực tiếp, trả lời trong giờ làm việc.
                  </p>
                  <ul className="mt-6 space-y-2.5 text-sm text-[#E3EDFF] sysdark:text-[#C9CED8]">
                    {[
                      "Demo theo quy trình nhà ăn của bạn",
                      "Tư vấn chọn gói phù hợp",
                      "Đào tạo tận nơi khi triển khai",
                    ].map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#60A5FA]" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 sm:p-10 lg:col-span-3">
                  <p className="text-xs font-semibold text-[#111827] sysdark:text-[#E6E9EF]">
                    Gói quan tâm
                  </p>
                  <div className="mt-1.5 grid grid-cols-3 gap-2">
                    {PLAN_OPTIONS.map((name) => {
                      const checked = plan === name
                      return (
                        <button
                          key={name}
                          type="button"
                          aria-pressed={checked}
                          onClick={() => setPlan(name)}
                          className={`rounded-md border px-3 py-2.5 text-center text-sm font-semibold transition-colors ${
                            checked
                              ? "border-[#1D4ED8] sysdark:border-[#3B82F6] bg-[#1D4ED8] sysdark:bg-[#2563EB] text-white"
                              : "border-[#C9D0DC] sysdark:border-[#343A44] text-[#1F2937] sysdark:text-[#E6E9EF] hover:border-[#1D4ED8] sysdark:hover:border-[#3B82F6]"
                          }`}
                        >
                          {name}
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-6 space-y-3">
                    <a
                      href={CONTACT.zalo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-[#0068FF] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0057D6]"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Nhắn Zalo ngay
                    </a>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto_1fr]">
                      {/* Số điện thoại chỉ hiện khi khách bấm, bấm lần nữa là gọi. */}
                      {showPhone ? (
                        <a
                          href={`tel:${CONTACT.phone}`}
                          className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#1D4ED8] sysdark:border-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-[#1D4ED8] sysdark:text-[#6EA8FF] transition-colors hover:bg-[#EAF1FF]"
                        >
                          <Phone className="h-4 w-4" />
                          <span className="tnum">{CONTACT.phoneLabel}</span>
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowPhone(true)}
                          className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#C9D0DC] sysdark:border-[#343A44] px-4 py-2.5 text-sm font-semibold text-[#111827] sysdark:text-[#E6E9EF] transition-colors hover:border-[#1D4ED8] sysdark:hover:border-[#3B82F6] hover:text-[#1D4ED8] sysdark:hover:text-[#6EA8FF]"
                        >
                          <Phone className="h-4 w-4" />
                          Hiện số điện thoại
                        </button>
                      )}
                      <a
                        href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Tư vấn GoEat - gói ${plan}`)}`}
                        className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#C9D0DC] sysdark:border-[#343A44] px-4 py-2.5 text-sm font-semibold text-[#111827] sysdark:text-[#E6E9EF] transition-colors hover:border-[#1D4ED8] sysdark:hover:border-[#3B82F6] hover:text-[#1D4ED8] sysdark:hover:text-[#6EA8FF]"
                      >
                        <Mail className="h-4 w-4 shrink-0" />
                        {CONTACT.email}
                      </a>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-[#5B6475] sysdark:text-[#8B93A3]">
                    Khi nhắn, cho biết tên đơn vị và số suất mỗi ngày để báo giá
                    nhanh hơn.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <GoEatFooter />
    </div>
  )
}
