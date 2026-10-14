import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChefHat,
  FileSpreadsheet,
  Monitor,
  ScanLine,
  ShoppingBag,
} from "lucide-react"

import type React from "react"

import { TRY_DEMO_HREF } from "./demo-url"
import { GoEatHeaderShell } from "./goeat-header-shell"
import { GoEatMobileMenu } from "./goeat-mobile-menu"
import { GOEAT_THEME_SCRIPT, GoEatThemeToggle } from "./goeat-theme-toggle"

/* ============================================================================
 * Phần dùng chung giữa trang chủ GoEat và trang chức năng: liên hệ, bảng giá,
 * nội dung từng chức năng, nền khối lập phương, đầu trang, chân trang.
 * ========================================================================== */

export const FEATURES_HREF = "/chuc-nang"

export const CONTACT = {
  phone: "0396870644",
  phoneLabel: "0396 870 644",
  zalo: "https://zalo.me/0396870644",
  email: "thongproleminh@gmail.com",
}

export const HEADING_STYLE = {
  fontSize: "clamp(1.65rem, 2.6vw, 2.25rem)",
  lineHeight: 1.15,
} as const

/* ---------- Nền khối lập phương ----------
 * Cùng hình học với nền trang đăng nhập (AuthBrandPattern trong core), nhưng vẽ
 * theo đơn vị pixel thay vì viewBox 600×900 co giãn: dùng thẳng component của
 * core trên dải ngang toàn màn hình thì khối bị phóng to gấp đôi, lệch hẳn với
 * trang đăng nhập. */

const CUBE_A = 72
const CUBE_DX = (CUBE_A * Math.sqrt(3)) / 2
const CUBE_DY = CUBE_A / 2
const CUBE_TILE_W = CUBE_A * Math.sqrt(3)
const CUBE_TILE_H = CUBE_A * 3

const r2 = (n: number) => Math.round(n * 100) / 100

function cubeAt(cx: number, cy: number) {
  const [t, b, up, dn] = [
    cy - CUBE_A,
    cy + CUBE_A,
    cy - CUBE_DY,
    cy + CUBE_DY,
  ].map(r2)
  const [l, rt, x, y] = [cx - CUBE_DX, cx + CUBE_DX, cx, cy].map(r2)
  return (
    `M${x} ${t}L${rt} ${up}L${rt} ${dn}L${x} ${b}L${l} ${dn}L${l} ${up}Z` +
    `M${x} ${t}L${x} ${y}M${x} ${y}L${l} ${dn}M${x} ${y}L${rt} ${dn}`
  )
}

function cubeTopAt(cx: number, cy: number) {
  const [t, up, y] = [cy - CUBE_A, cy - CUBE_DY, cy].map(r2)
  const [l, rt, x] = [cx - CUBE_DX, cx + CUBE_DX, cx].map(r2)
  return `M${x} ${t}L${rt} ${up}L${x} ${y}L${l} ${up}Z`
}

const CUBE_TILE_CENTERS: Array<[number, number]> = [
  [0, 0],
  [CUBE_TILE_W, 0],
  [0, CUBE_TILE_H],
  [CUBE_TILE_W, CUBE_TILE_H],
  [CUBE_TILE_W / 2, CUBE_TILE_H / 2],
  [CUBE_TILE_W / 2, -CUBE_TILE_H / 2],
  [CUBE_TILE_W / 2, CUBE_TILE_H * 1.5],
]

// [cột, nửa hàng, độ đậm] — nằm đúng lưới tổ ong nên mặt tô khớp khối vẽ sẵn.
const CUBE_HIGHLIGHTS: Array<[number, number, number]> = [
  [2, 1, 0.1],
  [3, 2, 0.14],
  [11, 1, 0.12],
  [12, 2, 0.08],
  [13, 3, 0.13],
  [7, 4, 0.07],
]

/** `id` phải khác nhau khi một trang có nhiều nền khối. `light`: khối xanh
 * mờ trên nền sáng, không phủ tối phía dưới. */
export function CubeBackdrop({
  id = "goeat-cubes",
  light = false,
}: {
  id?: string
  light?: boolean
}) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${light ? "text-[#1D4ED8] sysdark:text-[#6EA8FF] opacity-40 sysdark:opacity-30" : "text-white sysdark:opacity-60"}`}
    >
      <defs>
        <pattern
          id={id}
          width={CUBE_TILE_W}
          height={CUBE_TILE_H}
          patternUnits="userSpaceOnUse"
        >
          {CUBE_TILE_CENTERS.map(([cx, cy]) => (
            <path
              key={`${cx}-${cy}`}
              d={cubeAt(cx, cy)}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.13"
              strokeWidth="1.25"
            />
          ))}
        </pattern>
        <radialGradient id={`${id}-glow`} cx="0.8" cy="0" r="0.9">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.12" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-foot`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <g fill="currentColor">
        {CUBE_HIGHLIGHTS.map(([col, half, opacity]) => (
          <path
            key={`${col}-${half}`}
            d={cubeTopAt(
              col * CUBE_TILE_W + (half % 2 ? CUBE_TILE_W / 2 : 0),
              (half * CUBE_TILE_H) / 2
            )}
            fillOpacity={opacity}
          />
        ))}
      </g>
      <rect width="100%" height="100%" fill={`url(#${id}-glow)`} />
      {!light && <rect width="100%" height="100%" fill={`url(#${id}-foot)`} />}
    </svg>
  )
}

/** Hai đường kẻ dọc ở mép khung nội dung, chạy suốt phần dưới trang để các
 * mục nối thành một khung. Cha phải là `relative`. Chỉ hiện trên màn rộng. */
export function GuideRails() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
    >
      <div className="mx-auto h-full max-w-6xl border-x border-[#DCE2EC] sysdark:border-[#1A1D23]" />
    </div>
  )
}

/** Dấu "+" ở hai mép khung nội dung, đặt ngay trên đường kẻ ngang đầu một mục
 * — chỗ đường kẻ dọc (GuideRails) cắt đường kẻ ngang. Cha phải là `relative`. */
export function RailMarks() {
  const mark =
    "absolute -top-[6px] h-[11px] w-[11px] text-[#7F8EAA] sysdark:text-[#4B5363]"
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden lg:block"
    >
      <div className="relative mx-auto max-w-6xl">
        {["-left-[5.5px]", "-right-[5.5px]"].map((side) => (
          <svg key={side} viewBox="0 0 11 11" className={`${mark} ${side}`}>
            <path
              d="M5.5 0v11M0 5.5h11"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        ))}
      </div>
    </div>
  )
}

/** Nhãn nhỏ đầu mục kiểu kỹ thuật: số thứ tự trong ngoặc vuông + chữ mono. */
export function Eyebrow({
  index,
  children,
  className = "",
}: {
  index?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.08em] text-[#1D4ED8] uppercase sysdark:text-[#6EA8FF] ${className}`}
    >
      {index ? (
        <span className="text-[#9AA8C2] sysdark:text-[#4B5363]">[{index}]</span>
      ) : (
        <span className="h-1.5 w-1.5 bg-current" />
      )}
      {children}
    </p>
  )
}

/** Quầng xanh rất nhạt phía sau một khối cần nhấn (ảnh, bảng giá, liên hệ).
 * Cha phải là `relative isolate`. */
export function SoftGlow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(29,78,216,0.24),transparent)] sysdark:bg-[radial-gradient(closest-side,rgba(37,99,235,0.32),transparent)] blur-2xl ${className || "-inset-x-12 -inset-y-16"}`}
    />
  )
}

export const PLANS = [
  {
    id: "co-ban",
    name: "Cơ bản",
    price: "1.000.000đ",
    unit: "/tháng",
    note: "Dùng ngay chức năng cơ bản, không tuỳ chỉnh.",
    items: [
      "Chọn món theo tuần",
      "Tự chốt số báo bếp",
      "Quẹt thẻ nhận cơm tại quầy",
      "Báo cáo và xuất Excel",
    ],
    cta: "Chọn gói Cơ bản",
    tone: "plain",
  },
  {
    id: "tuy-bien",
    name: "Tuỳ biến",
    price: "2.500.000đ",
    unit: "/tháng",
    note: "Chức năng cơ bản, chỉnh theo quy trình của đơn vị.",
    items: [
      "Toàn bộ gói Cơ bản",
      "Ca ăn, giờ chốt, nhóm món theo đơn vị",
      "Mẫu báo cáo theo yêu cầu",
    ],
    cta: "Chọn gói Tuỳ biến",
    tone: "featured",
  },
  {
    id: "nang-cao",
    name: "Nâng cao",
    price: "Liên hệ",
    unit: "",
    note: "Chức năng nâng cao, báo giá theo nhu cầu.",
    items: [
      "Kết nối máy chấm công, phần mềm nhân sự",
      "Căn-tin nội bộ, thanh toán QR",
      "Màn hình cảm ứng tại xưởng",
      "Nhiều nhà máy, nhiều bếp",
    ],
    cta: "Liên hệ báo giá",
    tone: "dark",
  },
] as const

/* ---------- Chức năng theo từng bước ----------
 * Dùng cho dòng thời gian ở trang chủ và các mục ở trang /chuc-nang.
 * Chỉ ghi điều app làm thật — không có phiếu ăn, không tự giữ suất mặc định.
 * `addon` = chức năng chỉ có ở gói cao hơn. Ảnh màn hình đều đúng 16:9. */

export const FEATURE_MODULES = [
  {
    id: "dat-mon",
    icon: CalendarCheck,
    name: "Đặt món",
    when: "Trước giờ chốt",
    brief: "Công nhân chọn ca và món cho cả tuần.",
    title: "Công nhân tự chọn món cả tuần, tới giờ là khoá",
    text: "Mỗi người xem thực đơn từng ngày, chọn ca và món trên điện thoại. Quản lý đặt thay cho người không dùng điện thoại.",
    points: [
      {
        t: "Chọn theo tuần",
        d: "Chọn trước cho cả tuần, đổi món tới giờ chốt.",
      },
      {
        t: "Giờ chốt theo ca",
        d: "Mỗi ca chốt theo giờ riêng, qua giờ chỉ xem.",
      },
      { t: "Đặt thay", d: "Quản lý chọn món cho người không có điện thoại." },
      {
        t: "Nhận danh sách qua API",
        d: "Người đi làm từng ngày lấy từ hệ thống nhân sự.",
      },
    ],
    example:
      "Ca 1 chốt trước 2 ngày lúc 10:30 — sáng thứ Hai là món thứ Tư đã khoá, chỉ xem được.",
    src: "/images/goeat-dat-mon-ca-tuan-v2.jpg",
    alt: "Màn hình đặt món tuần sau trên máy tính và điện thoại: mỗi ngày chọn ca, chọn món chính hoặc đổi sang món thay thế, món chay",
  },
  {
    id: "bao-bep",
    icon: ChefHat,
    name: "Báo bếp",
    when: "Giờ chốt",
    brief: "Tự tính số suất cần nấu cho từng ca.",
    title: "Bếp biết số suất cần nấu ngay khi chốt",
    text: "Tới giờ chốt, phần mềm tự cộng số suất của từng ca, tách riêng từng món. Bếp không phải đếm tay.",
    points: [
      { t: "Số nấu theo ca", d: "Tổng riêng cho Ca 1, Ca 2, Ca 3." },
      { t: "Tách theo món", d: "Mặn, chay, món thay thế tính riêng." },
      {
        t: "Số đã báo không đổi",
        d: "Người huỷ muộn không làm thay đổi số bếp đã nhận.",
      },
      { t: "Nhập phát sinh", d: "Mở 30 phút sau giờ chốt, cộng vào quầy." },
    ],
    example:
      "Chốt Ca 2 xong, tổ bảo trì báo thêm 6 người tăng ca — nhập phát sinh, quầy và báo cáo tự cộng thêm 6 suất.",
    src: "/images/goeat-bao-bep-ca-v2.jpg",
    alt: "Báo cáo theo ngày: số cần nấu của Ca 1, Ca 2, Ca 3 tách mặn, chay, thay thế, kèm số đã phát và chưa nhận",
  },
  {
    id: "nhan-mon",
    icon: ScanLine,
    name: "Nhận món",
    when: "Giờ ăn",
    brief: "Quẹt thẻ, hiện tên món, chặn nhận trùng.",
    title: "Quẹt thẻ là biết đúng người, đúng món",
    text: "Quẹt thẻ nhân viên ở đầu quầy. Màn hình hiện to tên món và tên người để bếp múc ngay.",
    points: [
      { t: "Hiện tên món", d: "Chữ to, đứng xa vẫn đọc được." },
      { t: "Chỉ đúng quầy", d: "Xếp nhầm quầy thì báo sang quầy đúng." },
      { t: "Chặn nhận trùng", d: "Mỗi thẻ nhận một lần trong ca." },
      { t: "Lắp gọn tại quầy", d: "Một màn hình và một máy scan thẻ." },
    ],
    example:
      "Thẻ đã nhận lúc 11:19 quẹt lại lúc 11:41 → màn hình báo “đã nhận lúc 11:19”, không phát thêm.",
    src: "/images/goeat-nhan-mon-quay-v2.jpg",
    alt: "Màn hình nhận món sau khi quẹt thẻ: tên món chữ to, tên người nhận, số đã nhận và còn lại của ca",
    extra: [
      {
        src: "/images/goeat-quay-nhan-mon.jpg",
        alt: "Máy tính bảng và máy scan thẻ đặt tại quầy phát cơm",
        caption: "Lắp đặt thực tế tại quầy",
      },
    ],
  },
  {
    id: "ngoai-le",
    icon: Monitor,
    name: "Ngoại lệ",
    when: "Trong ca",
    brief: "Quên thẻ, người mới, khách — xử lý tại quầy.",
    title: "Quên thẻ, người mới, khách: quầy xử lý ngay",
    text: "Quầy cấp thẻ tạm hoặc phát tay ngay trên màn hình. Lượt nào cũng ghi lý do, không phải ghi sổ tay.",
    points: [
      {
        t: "Thẻ tạm trong ca",
        d: "Cấp ngay tại quầy, hết ca tự hết hiệu lực.",
      },
      { t: "Người mới", d: "Thẻ chưa có hồ sơ vẫn nhận một suất trong ca." },
      { t: "Khách", d: "Phát cho khách ghi lý do riêng, dễ tách số." },
      {
        t: "Phát tay có lý do",
        d: "Chọn lý do từ danh mục, cuối tháng lọc ra.",
      },
    ],
    example:
      "Công nhân quên thẻ: quầy cấp thẻ tạm số 09, nhận cơm như thẻ thật, lượt phát ghi lý do “quên thẻ”.",
    src: "/images/goeat-phat-ngoai-le.jpg",
    alt: "Màn hình phát suất ngoại lệ: chọn lý do, chọn món và lịch sử phát ngoại lệ trong ngày",
    extra: [
      {
        src: "/images/goeat-the-tam.jpg",
        alt: "Màn hình cấp thẻ tạm: nhận diện nhân viên rồi chạm thẻ tạm vào đầu đọc",
        caption: "Cấp thẻ tạm cho người quên thẻ",
      },
    ],
  },
  {
    id: "can-tin",
    icon: ShoppingBag,
    name: "Căn-tin",
    when: "Giờ nghỉ",
    addon: "Gói Nâng cao",
    brief: "Đặt trước đồ ăn thêm, trả bằng mã QR.",
    title: "Căn-tin nội bộ, trả tiền bằng mã QR",
    text: "Đặt trước đồ ăn thêm, nước uống; chọn giờ nhận và thanh toán bằng mã QR ngân hàng.",
    points: [
      { t: "Đặt trước theo ngày", d: "Hôm trước đặt, hôm sau ra quầy lấy." },
      { t: "Chọn giờ nhận", d: "Chọn khung giờ, quầy chuẩn bị sẵn." },
      {
        t: "Thanh toán QR",
        d: "Chuyển khoản xong, đơn tự chuyển sang đã trả.",
      },
      { t: "Quầy theo dõi đơn", d: "Đơn hiện theo trạng thái để phát nhanh." },
    ],
    example:
      "Hôm trước đặt 1 bánh giò 15.000đ, chọn giờ nhận 07:30, quét QR trả tiền; sáng hôm sau ra quầy căn-tin nhận.",
    src: "/images/goeat-can-tin-dat-v2.jpg",
    alt: "Cửa hàng căn-tin: chọn ngày nhận, chọn món, giỏ hàng và giờ nhận món",
    extra: [
      {
        src: "/images/goeat-can-tin-qr.jpg",
        alt: "Hộp thanh toán mã QR: số tiền, số tài khoản, nội dung chuyển khoản và thời gian còn lại",
        caption: "Thanh toán bằng mã QR ngân hàng",
      },
    ],
  },
  {
    id: "doi-soat",
    icon: FileSpreadsheet,
    name: "Đối soát",
    when: "Cuối tháng",
    brief: "Báo cáo đầy đủ theo ngày, ca; xuất Excel.",
    title: "Báo cáo đầy đủ cho vận hành và đối soát",
    text: "Báo cáo theo ngày và ca: bao nhiêu suất đăng ký, bao nhiêu đã nhận, bao nhiêu không đến nhận, bao nhiêu phát ngoại lệ. Cuối tháng dùng luôn để đối soát với bếp.",
    points: [
      { t: "Theo ngày và ca", d: "Số đăng ký, đã nhận, không đến nhận." },
      { t: "Lọc theo kỳ", d: "Chọn khoảng ngày, từng bữa." },
      { t: "Xuất Excel A4", d: "In ra trình ký được ngay." },
      {
        t: "Xem chi tiết từng người",
        d: "Ai nhận, nhận lúc nào, phát tay vì lý do gì.",
      },
    ],
    example:
      "Ngày 15 lệch 3 suất giữa số bếp và số nhận → mở ra thấy đủ 3 lượt phát tay kèm lý do và giờ phát.",
    src: "/images/goeat-doi-soat-ky-v2.jpg",
    alt: "Bảng đối soát suất ăn theo ngày và ca: tổng đăng ký, đã nhận, không ai nhận, kèm nút xuất Excel",
  },
] as const

/* ---------- Đầu trang & chân trang ---------- */

/** Hỏi đáp: hiện trên trang chính và khai lại trong dữ liệu có cấu trúc
 * (FAQPage) — hai chỗ phải cùng một nội dung nên dùng chung mảng này. */
export const FAQ = [
  {
    q: "GoEat là phần mềm gì?",
    a: "GoEat là phần mềm quản lý suất ăn công nghiệp và căn-tin nội bộ: người ăn chọn món theo tuần, bếp nhận số suất theo từng ca, quầy quẹt thẻ phát cơm và cuối tháng đối soát bằng Excel.",
  },
  {
    q: "Giá GoEat bao nhiêu?",
    a: "Gói Cơ bản 1.000.000đ/tháng, gói Tuỳ biến 2.500.000đ/tháng. Gói Nâng cao báo giá theo nhu cầu.",
  },
  {
    q: "Người không dùng điện thoại có đặt món được không?",
    a: "Được. Quản lý đặt thay cho người không có điện thoại ngay trên màn hình đặt món.",
  },
  {
    q: "Quên thẻ, người mới hoặc khách thì nhận cơm thế nào?",
    a: "Quầy cấp thẻ tạm trong ca hoặc phát tay ngay trên màn hình. Lượt nào cũng ghi lý do để cuối tháng lọc ra đối soát.",
  },
  {
    q: "Có kết nối với máy chấm công, phần mềm nhân sự không?",
    a: "Có, ở gói Nâng cao. Hệ thống nhân sự gửi danh sách người ăn mỗi ngày qua API, quầy và bếp dùng ngay, không cần nhập tay.",
  },
] as const

export const NAV_LINKS = [
  { href: "/#san-pham", label: "Sản phẩm" },
  { href: FEATURES_HREF, label: "Chức năng" },
  { href: "/#bang-gia", label: "Bảng giá" },
] as const

/** `wide`: trang chủ có khung ảnh rộng 1440px, logo thẳng mép với khung đó;
 * các trang khác dùng khung 6xl như phần nội dung. */
export function GoEatHeader({
  active,
  wide = false,
}: {
  active?: string
  wide?: boolean
}) {
  return (
    <GoEatHeaderShell wide={wide}>
      {/* Chạy ngay khi đọc tới đây, trước khi phần thân trang hiện ra. */}
      <script dangerouslySetInnerHTML={{ __html: GOEAT_THEME_SCRIPT }} />
      <Link
        href="/"
        className="flex shrink-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] sysdark:focus-visible:outline-[#6EA8FF]"
      >
        <Image
          src="/images/logos/goeat_logo.png"
          alt="Logo thương hiệu GoEat"
          width={112}
          height={32}
          className="h-7 w-auto object-contain"
        />
      </Link>

      <nav
        aria-label="Điều hướng trang giới thiệu"
        className="hidden items-center gap-7 text-sm font-medium text-[#3B4555] sysdark:text-[#C9CED8] md:flex"
      >
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active === l.label ? "page" : undefined}
            className="hover:text-[#172554] sysdark:hover:text-white aria-[current=page]:font-semibold aria-[current=page]:text-[#1D4ED8] sysdark:aria-[current=page]:text-[#6EA8FF]"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-2">
        <GoEatThemeToggle className="hidden md:inline-flex" />
        <Link
          href="/#dang-ky"
          className="hidden rounded-full px-3 py-2 text-sm font-semibold text-[#111827] sysdark:text-[#E6E9EF] hover:text-[#1D4ED8] sysdark:hover:text-[#6EA8FF] md:inline-flex"
        >
          Liên hệ tư vấn
        </Link>
        <Link
          href={TRY_DEMO_HREF}
          aria-current={active === "Dùng thử" ? "page" : undefined}
          className="inline-flex items-center rounded-full bg-[#1D4ED8] sysdark:bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1E40AF] sysdark:hover:bg-[#3B82F6] aria-[current=page]:ring-2 aria-[current=page]:ring-[#1D4ED8]/30 aria-[current=page]:ring-offset-2"
        >
          Dùng thử miễn phí
        </Link>
        <GoEatMobileMenu links={NAV_LINKS} active={active} />
      </div>
    </GoEatHeaderShell>
  )
}

const TRY_DEMO_POINTS = [
  "Nhận tài khoản ngay, chỉ cần email",
  "Dữ liệu mẫu đầy đủ: thực đơn, quẹt thẻ, căn-tin, báo cáo",
  "Dùng thoải mái trong 7 ngày, không cần cài đặt",
] as const

/** Dải mời dùng thử demo — đặt giữa các trang để khách luôn thấy lối vào. */
export function TryDemoBand() {
  return (
    <section className="relative overflow-hidden bg-[#1D4ED8] sysdark:bg-[#12204A] py-12 lg:py-14">
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-7 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-mono text-xs font-medium tracking-[0.08em] text-[#BFDBFE] uppercase">
            Dùng thử miễn phí 7 ngày
          </p>
          <h2
            style={HEADING_STYLE}
            className="mt-3 font-medium tracking-[-0.02em] text-white [text-wrap:balance]"
          >
            Tự tay đặt món, quẹt thẻ, xem báo cáo trên bản demo chạy thật
          </h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-[#E3EDFF] sm:flex-row sm:flex-wrap sm:gap-x-6">
            {TRY_DEMO_POINTS.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#BFDBFE]" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <Link
          href={TRY_DEMO_HREF}
          className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3 text-[15px] font-semibold text-[#1D4ED8] shadow-sm transition-colors hover:bg-[#EAF1FF]"
        >
          Nhận tài khoản demo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

export function GoEatFooter() {
  return (
    <footer className="bg-[#0A1633] sysdark:border-t sysdark:border-[#1F232A] sysdark:bg-[#08090B] py-8 text-xs text-[#BFDBFE] sysdark:text-[#8FB8FF]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <span>© 2026 GoEat · Suất ăn công nghiệp &amp; căn-tin</span>
        <div className="flex flex-wrap items-center gap-4">
          <a href={CONTACT.zalo} className="tnum hover:text-white">
            Nhắn Zalo
          </a>
          <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
            {CONTACT.email}
          </a>
          <Link href={FEATURES_HREF} className="hover:text-white">
            Chức năng
          </Link>
          <Link href={TRY_DEMO_HREF} className="hover:text-white">
            Dùng thử demo
          </Link>
        </div>
      </div>
    </footer>
  )
}
