import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Minus } from "lucide-react"

import { TRY_DEMO_HREF } from "./demo-url"
import { GoEatPrintButton } from "./goeat-print-button"
import {
  CONTACT,
  Eyebrow,
  FEATURES_HREF,
  FEATURE_MODULES,
  GoEatFooter,
  GoEatHeader,
  GuideRails,
  HEADING_STYLE,
  PLANS,
  PLAN_MATRIX,
  RailMarks,
} from "./goeat-shared"

/* ============================================================================
 * Hồ sơ giải pháp B2B chuẩn in A4 (/ho-so-giai-phap) dành cho Trưởng phòng
 * HCNS, Kế toán trưởng và IT Manager trình ký Ban Giám đốc nhà máy / CFO.
 * ========================================================================== */

const FACTORY_PROBLEMS = [
  {
    code: "01 · Trước giờ ăn",
    title: "Loại bỏ báo cơm thủ công & dự phòng dư suất",
    problem:
      "Tổ trưởng gom danh sách giấy hoặc nhắn nhóm Zalo thường cộng dư 5–10% phòng thiếu, người nghỉ phép đột xuất không kịp trừ.",
    solution:
      "Công nhân tự chọn món cả tuần trên điện thoại (hoặc quản lý đặt thay). Tới giờ chốt hệ thống tự khoá, cộng chính xác số suất từng ca báo bếp.",
  },
  {
    code: "02 · Trong giờ ăn",
    title: "Quẹt thẻ 0,5 giây, chặn nhận trùng & kiểm soát ngoại lệ",
    problem:
      "Phát cơm tự do hoặc dùng phiếu giấy dễ thất lạc, lấy hộ nhiều khay; người quên thẻ và khách ghi sổ tay cuối tháng không ai kiểm chứng.",
    solution:
      "Quẹt thẻ nhân viên hiện to tên món trên màn hình quầy, mỗi thẻ chỉ nhận 1 lần/ca. Quên thẻ, người mới, khách đều cấp thẻ tạm hoặc phát tay có ghi lý do.",
  },
  {
    code: "03 · Cuối kỳ thanh toán",
    title: "Đối soát 3 bên minh bạch trong 1 phút",
    problem:
      "Cuối tháng HCNS, Kế toán và Đơn vị thầu bếp mất nhiều ngày đối chiếu số báo nấu trên Zalo với sổ ký tay tại quầy do chênh lệch số liệu.",
    solution:
      "Tách bạch 4 cột trên một báo cáo: Số chốt báo bếp, Số thực nhận qua thẻ, Số đăng ký bỏ bữa và Số phát ngoại lệ kèm lý do — xuất Excel chuẩn A4.",
  },
] as const

const DAILY_CLOSED_LOOP = [
  {
    step: "B1 · Trước giờ chốt",
    name: "Đặt món tuần",
    detail:
      "Công nhân tự chọn ca & món (mặn, chay, thay thế); tổ trưởng đặt thay.",
  },
  {
    step: "B2 · Đúng giờ chốt",
    name: "Khoá sổ báo bếp",
    detail:
      "Tự chốt số nấu từng ca; mở cửa sổ 30 phút nhập suất tăng ca phát sinh.",
  },
  {
    step: "B3 · Giờ ăn tại quầy",
    name: "Quẹt thẻ 0,5 giây",
    detail:
      "Hiện tên món cỡ lớn để múc khay nhanh; tự động chặn quẹt thẻ lần hai.",
  },
  {
    step: "B4 · Tình huống phát sinh",
    name: "Thẻ tạm & ngoại lệ",
    detail:
      "Cấp thẻ tạm quên thẻ hết ca tự huỷ; phát khách/người mới bắt buộc chọn lý do.",
  },
  {
    step: "B5 · Cuối kỳ",
    name: "Xuất đối soát A4",
    detail:
      "Đối chiếu đăng ký – thực nhận – bỏ bữa – ngoại lệ theo phòng ban, xuất Excel.",
  },
] as const

const INFRA_SECURITY = [
  {
    code: "Hạ tầng & Thiết bị quầy",
    title: "Tận dụng thẻ nhân viên sẵn có, lắp gọn trong 1 buổi",
    points: [
      "Vận hành trên Web Cloud tốc độ cao hoặc máy chủ riêng (On-premise / VPS độc lập ở gói Enterprise).",
      "Mỗi làn phát cơm chỉ cần 1 màn hình/máy tính bảng và 1 đầu đọc thẻ từ USB (RFID 125KHz / Mifare 13.56MHz).",
      "Đọc trực tiếp mã thẻ nhân viên hiện hữu của nhà máy mà không phải phát hành lại thẻ mới.",
    ],
  },
  {
    code: "Bảo mật & Cô lập dữ liệu",
    title: "Cơ sở dữ liệu độc lập, nhật ký lưu vết 100%",
    points: [
      "Mỗi doanh nghiệp vận hành trên không gian dữ liệu riêng biệt; chỉ lưu mã UID thẻ phục vụ nhà ăn.",
      "Phân quyền chặt theo vai trò: Quản trị HCNS, Kế toán đối soát, Tổ trưởng đặt thay, Bếp trưởng, Quầy phát cơm.",
      "Audit Log ghi nhận đầy đủ người thao tác, thời gian sửa thực đơn, nhập suất tăng ca và phát ngoại lệ.",
    ],
  },
  {
    code: "Lộ trình triển khai 3–5 ngày",
    title: "Dùng thử 7 ngày trước, đào tạo trực tiếp tại quầy",
    points: [
      "Ngày 1–2: Khởi tạo sơ đồ phòng ban, nhập danh sách mã thẻ nhân viên, thiết lập ca ăn và giờ chốt.",
      "Ngày 3: Hướng dẫn nhân sự bếp & quầy phát cơm (30 phút), vận hành thực tế ngay tại nhà ăn.",
      "Cấp ngay tài khoản Demo chạy thật 7 ngày tại goeat.vn/dung-thu để kiểm thử trước khi trình ký.",
    ],
  },
] as const

export function GoEatBrochurePage() {
  return (
    <div className="sysdark:bg-[#08090B] sysdark:text-[#F5F7FA] sysdark:selection:bg-[#2563EB] min-h-dvh bg-white text-[#0B1220] antialiased selection:bg-[#1D4ED8] selection:text-white print:bg-white print:text-[#0B1220]">
      <div className="goeat-no-print">
        <GoEatHeader active="Hồ sơ PDF" />
        <div aria-hidden="true" className="h-[76px]" />
      </div>

      <div className="relative overflow-x-clip">
        <GuideRails />

        {/* ---------- Đầu Hồ sơ giải pháp ---------- */}
        <section className="sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] pt-10 lg:pt-14 print:pt-0">
          <RailMarks />
          <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8 lg:pb-10 print:px-0 print:pb-5">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between print:flex-row print:items-start print:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 hidden items-center gap-3 print:flex">
                  <Image
                    src="/images/logos/goeat_logo.png"
                    alt="GoEat"
                    width={96}
                    height={28}
                    className="h-6 w-auto object-contain"
                  />
                  <span className="font-mono text-[11px] font-semibold tracking-[0.08em] text-[#1D4ED8] uppercase">
                    Hồ sơ giải pháp &amp; Biểu phí B2B · goeat.vn
                  </span>
                </div>
                <div className="print:hidden">
                  <Eyebrow>Hồ sơ giải pháp B2B · goeat.vn</Eyebrow>
                </div>
                <h1
                  className="sysdark:text-[#F5F7FA] mt-2.5 font-semibold tracking-[-0.02em] [text-wrap:balance] text-[#0B1220] print:mt-1 print:text-[22px]"
                  style={HEADING_STYLE}
                >
                  GoEat — Phần mềm quản lý suất ăn công nghiệp &amp; căn-tin nội
                  bộ nhà máy
                </h1>
                <p className="sysdark:text-[#A3AAB8] mt-2.5 text-sm leading-relaxed text-[#4B5565] print:text-xs">
                  Tài liệu tóm tắt quy trình kiểm soát suất ăn khép kín, 6 phân
                  hệ nghiệp vụ cốt lõi, hạ tầng bảo mật và biểu phí theo quy mô
                  nhân sự — chuẩn định dạng A4 phục vụ Phòng HCNS, Kế toán và IT
                  trình ký Ban Giám đốc.
                </p>
              </div>

              <div className="flex flex-col items-start gap-2.5 lg:items-end print:items-end">
                <div className="goeat-no-print flex flex-wrap items-center gap-2">
                  <GoEatPrintButton />
                  <Link
                    href={TRY_DEMO_HREF}
                    className="sysdark:border-[#262B33] sysdark:bg-[#111317] sysdark:text-[#E6E9EF] sysdark:hover:border-[#3B82F6] inline-flex items-center gap-1.5 rounded-md border border-[#D6DCE6] bg-white px-3.5 py-2 text-xs font-semibold text-[#0B1220] transition-colors hover:border-[#1D4ED8] hover:text-[#1D4ED8]"
                  >
                    Dùng thử 7 ngày
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={CONTACT.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sysdark:border-[#262B33] sysdark:bg-[#111317] sysdark:text-[#6EA8FF] inline-flex items-center rounded-md border border-[#D6DCE6] bg-[#F7F9FC] px-3.5 py-2 text-xs font-semibold text-[#1D4ED8] transition-colors hover:border-[#1D4ED8]"
                  >
                    Nhắn Zalo tư vấn
                  </a>
                </div>
                <p className="tnum sysdark:text-[#8B93A3] font-mono text-xs text-[#5B6475] print:text-[11px]">
                  Hotline / Zalo:{" "}
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="sysdark:text-[#F5F7FA] font-semibold text-[#0B1220] hover:underline"
                  >
                    {CONTACT.phoneLabel}
                  </a>{" "}
                  · Email:{" "}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="sysdark:text-[#F5F7FA] font-semibold text-[#0B1220] hover:underline"
                  >
                    {CONTACT.email}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Dải 3 thông số kỹ thuật trọng tâm */}
          <div className="sysdark:border-[#1F232A] sysdark:bg-[#0E1014] mx-auto max-w-6xl border-t border-[#E3E7EE] bg-[#F7F9FC] print:bg-[#F7F9FC]">
            <dl className="sysdark:divide-[#1F232A] grid grid-cols-1 divide-y divide-[#E3E7EE] sm:grid-cols-3 sm:divide-x sm:divide-y-0 print:grid-cols-3 print:divide-x print:divide-y-0">
              {[
                {
                  k: "Kiến trúc dữ liệu",
                  v: "1 Cơ sở dữ liệu độc lập / doanh nghiệp",
                },
                {
                  k: "Tốc độ phát cơm tại quầy",
                  v: "< 0,5 giây / lượt quẹt thẻ · Chặn nhận trùng",
                },
                {
                  k: "Chuẩn đối soát tài chính",
                  v: "Khớp 3 bên HCNS – Kế toán – Thầu bếp (Excel A4)",
                },
              ].map((spec) => (
                <div
                  key={spec.k}
                  className="px-6 py-3.5 print:px-4 print:py-2.5"
                >
                  <dt className="sysdark:text-[#8B93A3] font-mono text-[10px] font-semibold tracking-[0.08em] text-[#5B6475] uppercase">
                    {spec.k}
                  </dt>
                  <dd className="tnum sysdark:text-[#F5F7FA] mt-0.5 text-xs font-semibold text-[#0B1220]">
                    {spec.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------- 01. Bài toán kiểm soát suất ăn & quy trình khép kín 1 ngày ---------- */}
        <section className="sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] pt-9 lg:pt-11 print:pt-5">
          <RailMarks />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 print:px-0">
            <Eyebrow index="01">
              Bài toán kiểm soát suất ăn nhà máy &amp; quy trình khép kín 1 ngày
            </Eyebrow>
          </div>

          <div className="sysdark:border-[#1F232A] mx-auto mt-4 max-w-6xl border-t border-[#E3E7EE]">
            <div className="sysdark:divide-[#1F232A] grid grid-cols-1 divide-y divide-[#E3E7EE] lg:grid-cols-3 lg:divide-x lg:divide-y-0 print:grid-cols-3 print:divide-x print:divide-y-0">
              {FACTORY_PROBLEMS.map((item) => (
                <div
                  key={item.code}
                  className="goeat-avoid-break p-6 print:p-3.5"
                >
                  <p className="tnum sysdark:text-[#6EA8FF] font-mono text-[11px] font-semibold tracking-[0.06em] text-[#1D4ED8] uppercase">
                    {item.code}
                  </p>
                  <h2 className="sysdark:text-[#F5F7FA] mt-1.5 text-sm font-bold text-[#0B1220]">
                    {item.title}
                  </h2>
                  <p className="sysdark:text-[#8B93A3] mt-2 text-xs leading-relaxed text-[#5B6475]">
                    <b className="sysdark:text-[#C9CED8] font-semibold text-[#374151]">
                      Thực trạng:{" "}
                    </b>
                    {item.problem}
                  </p>
                  <p className="sysdark:border-[#1F232A] sysdark:text-[#E6E9EF] mt-2.5 border-t border-[#E3E7EE] pt-2.5 text-xs leading-relaxed text-[#1F2937]">
                    <b className="sysdark:text-[#6EA8FF] font-semibold text-[#1D4ED8]">
                      Trên GoEat:{" "}
                    </b>
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Luồng 5 bước khép kín trong 1 ngày */}
          <div className="sysdark:border-[#1F232A] sysdark:bg-[#0E1014] mx-auto max-w-6xl border-t border-[#E3E7EE] bg-[#F7F9FC] print:bg-[#F7F9FC]">
            <ol className="sysdark:divide-[#1F232A] grid grid-cols-1 divide-y divide-[#E3E7EE] sm:grid-cols-5 sm:divide-x sm:divide-y-0 print:grid-cols-5 print:divide-x print:divide-y-0">
              {DAILY_CLOSED_LOOP.map((s) => (
                <li
                  key={s.step}
                  className="goeat-avoid-break px-4 py-3.5 print:px-3 print:py-2.5"
                >
                  <p className="tnum sysdark:text-[#6EA8FF] font-mono text-[10px] font-semibold tracking-[0.06em] text-[#1D4ED8] uppercase">
                    {s.step}
                  </p>
                  <p className="sysdark:text-[#F5F7FA] mt-0.5 text-xs font-bold text-[#0B1220]">
                    {s.name}
                  </p>
                  <p className="sysdark:text-[#8B93A3] mt-1 text-[11px] leading-snug text-[#4B5565]">
                    {s.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- 02. 6 phân hệ nghiệp vụ cốt lõi ---------- */}
        <section className="sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] pt-9 lg:pt-11 print:pt-5">
          <RailMarks />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 print:px-0">
            <div className="flex items-baseline justify-between gap-4">
              <Eyebrow index="02">6 phân hệ nghiệp vụ cốt lõi</Eyebrow>
              <Link
                href={FEATURES_HREF}
                className="goeat-no-print sysdark:text-[#6EA8FF] text-xs font-semibold text-[#1D4ED8] hover:underline"
              >
                Xem ảnh chụp màn hình từng phân hệ →
              </Link>
            </div>
          </div>

          <div className="sysdark:border-[#1F232A] mx-auto mt-4 max-w-6xl border-t border-[#E3E7EE]">
            <div className="sysdark:bg-[#1F232A] grid grid-cols-1 gap-px bg-[#E3E7EE] md:grid-cols-2 print:grid-cols-2">
              {FEATURE_MODULES.map((m, i) => (
                <div
                  key={m.id}
                  className="goeat-avoid-break sysdark:bg-[#08090B] flex flex-col justify-between bg-white px-6 py-4 print:bg-white print:px-4 print:py-2.5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="sysdark:text-[#F5F7FA] text-sm font-bold text-[#0B1220]">
                        <span className="tnum sysdark:text-[#6EA8FF] mr-2 font-mono text-xs text-[#1D4ED8]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {m.name} — {m.title}
                      </p>
                      <span className="sysdark:text-[#8B93A3] shrink-0 font-mono text-[11px] text-[#5B6475]">
                        {"addon" in m ? m.addon : m.when}
                      </span>
                    </div>
                    <p className="sysdark:text-[#A3AAB8] mt-1 text-xs leading-relaxed text-[#4B5565]">
                      {m.text}
                    </p>
                  </div>
                  <p className="sysdark:text-[#8B93A3] mt-2 font-mono text-[11px] text-[#5B6475]">
                    {m.points.map((p) => p.t).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 03. Biểu phí theo quy mô nhân sự & bảng đối chiếu phạm vi ---------- */}
        <section className="goeat-print-break sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] py-9 lg:py-11 print:py-4">
          <RailMarks />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 print:px-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <Eyebrow index="03">
                Biểu phí theo quy mô nhân sự &amp; bảng đối chiếu phạm vi từng
                gói
              </Eyebrow>
              <span className="tnum sysdark:text-[#8B93A3] font-mono text-xs text-[#5B6475]">
                Đơn vị tiền tệ: VNĐ · Thanh toán theo kỳ 6 hoặc 12 tháng
              </span>
            </div>

            {/* Tóm tắt 3 gói & Ưu đãi khởi tạo */}
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3 print:grid-cols-3">
              {PLANS.map((p) => {
                const featured = p.tone === "featured"
                return (
                  <div
                    key={p.id}
                    className={`goeat-avoid-break rounded-lg border p-4 print:p-3 ${
                      featured
                        ? "sysdark:border-[#3B82F6] sysdark:bg-[#111317] border-[#1D4ED8] bg-[#EFF6FF]/40 print:bg-[#EFF6FF]/40"
                        : "sysdark:border-[#262B33] sysdark:bg-[#111317] border-[#D6DCE6] bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="sysdark:text-[#6EA8FF] text-xs font-bold tracking-wide text-[#1D4ED8] uppercase">
                        Gói {p.name}
                      </span>
                      <span className="tnum sysdark:text-[#8B93A3] font-mono text-[11px] text-[#5B6475]">
                        {p.listPrice ? (
                          <>
                            Niêm yết{" "}
                            <span className="line-through">{p.listPrice}</span>
                          </>
                        ) : (
                          "Theo khảo sát"
                        )}
                      </span>
                    </div>
                    <p className="tnum sysdark:text-[#F5F7FA] mt-1 text-lg font-bold text-[#0B1220]">
                      {p.price}
                      <span className="sysdark:text-[#8B93A3] text-xs font-normal text-[#5B6475]">
                        {p.unit}
                      </span>
                    </p>
                    <p className="tnum sysdark:text-[#A3AAB8] mt-0.5 font-mono text-[11px] font-medium text-[#374151]">
                      {p.scaleTag}
                    </p>
                    <p className="sysdark:border-[#1F232A] sysdark:text-[#C9CED8] mt-2 border-t border-[#E3E7EE] pt-2 text-[11px] leading-snug text-[#1F2937]">
                      {p.setupBonus}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Bảng đối chiếu phạm vi */}
            <div className="sysdark:border-[#1F232A] mt-4 overflow-x-auto rounded-lg border border-[#D6DCE6]">
              <table className="w-full min-w-[600px] text-left text-xs sm:text-sm print:text-xs">
                <thead>
                  <tr className="sysdark:bg-[#0E1014] bg-[#F7F9FC] print:bg-[#F7F9FC]">
                    <th
                      scope="col"
                      className="sysdark:text-[#8B93A3] px-4 py-3 font-semibold text-[#5B6475] print:py-2"
                    >
                      Phạm vi chức năng &amp; hạ tầng
                    </th>
                    {PLANS.map((p) => (
                      <th
                        key={p.id}
                        scope="col"
                        className={`w-[20%] px-3 py-3 text-center print:py-2 ${
                          p.tone === "featured"
                            ? "sysdark:bg-[#2563EB] bg-[#1D4ED8] [&>span]:!text-white"
                            : ""
                        }`}
                      >
                        <span className="sysdark:text-[#F5F7FA] block font-bold text-[#0B1220]">
                          {p.name}
                        </span>
                        <span className="tnum sysdark:text-[#6EA8FF] mt-0.5 block font-mono text-[11px] font-semibold text-[#1D4ED8]">
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
                      className="goeat-avoid-break sysdark:border-[#1F232A] border-t border-[#E3E7EE]"
                    >
                      <th
                        scope="row"
                        className="sysdark:text-[#E6E9EF] px-4 py-2.5 font-medium text-[#1F2937] print:py-1.5"
                      >
                        {r.label}
                      </th>
                      {r.cells.map((c, idx) => {
                        const isFeaturedCol = PLANS[idx].tone === "featured"
                        return (
                          <td
                            key={PLANS[idx].id}
                            className={`px-3 py-2.5 text-center print:py-1.5 ${
                              isFeaturedCol
                                ? "sysdark:bg-[#16203A]/35 bg-[#EFF6FF]/45 print:bg-[#EFF6FF]/45"
                                : ""
                            }`}
                          >
                            {c === true ? (
                              <Check
                                aria-label="Có"
                                className="sysdark:text-[#6EA8FF] mx-auto h-4 w-4 text-[#1D4ED8] print:h-3.5 print:w-3.5"
                              />
                            ) : c === false ? (
                              <Minus
                                aria-label="Không"
                                className="sysdark:text-[#3A404A] mx-auto h-4 w-4 text-[#C4CBD6] print:h-3.5 print:w-3.5"
                              />
                            ) : (
                              <span className="tnum sysdark:text-[#A3AAB8] text-[11px] font-medium text-[#4B5565]">
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

            <p className="tnum sysdark:border-[#1E3A8A] sysdark:bg-[#16203A]/50 sysdark:text-[#BFDBFE] mt-3 rounded-md border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-2.5 text-xs leading-relaxed text-[#1E3A8A] print:py-2">
              <b>Đánh giá hiệu quả đầu tư (ROI):</b> Chỉ cần chặn thất thoát
              10–15 suất ăn ảo mỗi ngày (đơn giá 25.000đ–35.000đ/suất), nhà máy
              đã tiết kiệm 7–10 triệu đồng/tháng — vượt xa chi phí vận hành hệ
              thống.
            </p>
          </div>
        </section>

        {/* ---------- 04. Hạ tầng triển khai, bảo mật dữ liệu nhân sự & liên hệ ---------- */}
        <section className="sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] py-9 lg:py-11 print:py-4">
          <RailMarks />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 print:px-0">
            <Eyebrow index="04">
              Hạ tầng triển khai, bảo mật dữ liệu nhân sự &amp; thông tin liên
              hệ khảo sát
            </Eyebrow>
          </div>

          <div className="sysdark:border-[#1F232A] mx-auto mt-4 max-w-6xl border-t border-[#E3E7EE]">
            <div className="sysdark:divide-[#1F232A] grid grid-cols-1 divide-y divide-[#E3E7EE] lg:grid-cols-3 lg:divide-x lg:divide-y-0 print:grid-cols-3 print:divide-x print:divide-y-0">
              {INFRA_SECURITY.map((block) => (
                <div
                  key={block.code}
                  className="goeat-avoid-break p-6 print:p-3.5"
                >
                  <p className="sysdark:text-[#6EA8FF] font-mono text-[11px] font-semibold tracking-[0.06em] text-[#1D4ED8] uppercase">
                    {block.code}
                  </p>
                  <h2 className="sysdark:text-[#F5F7FA] mt-1 text-sm font-bold text-[#0B1220]">
                    {block.title}
                  </h2>
                  <ul className="sysdark:text-[#C9CED8] mt-2.5 space-y-1.5 text-xs leading-relaxed text-[#374151]">
                    {block.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2">
                        <span className="sysdark:text-[#6EA8FF] font-mono text-[#1D4ED8]">
                          —
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-4 pt-5 sm:px-6 lg:px-8 print:px-0 print:pt-3">
            <div className="sysdark:border-[#1F232A] sysdark:bg-[#0E1014] flex flex-col justify-between gap-2 rounded-lg border border-[#E3E7EE] bg-[#F7F9FC] px-4 py-3 text-xs sm:flex-row sm:items-center print:flex-row print:items-center print:bg-[#F7F9FC]">
              <span className="sysdark:text-[#A3AAB8] text-[#4B5565]">
                Dùng thử miễn phí 7 ngày tại{" "}
                <strong className="sysdark:text-[#F5F7FA] text-[#0B1220]">
                  https://goeat.vn/dung-thu
                </strong>{" "}
                · Hỗ trợ khảo sát quy trình nhà ăn &amp; demo trực tiếp cho Ban
                Giám đốc.
              </span>
              <span className="tnum sysdark:text-[#F5F7FA] shrink-0 font-mono font-semibold text-[#0B1220]">
                Zalo/ĐT: {CONTACT.phoneLabel} · {CONTACT.email}
              </span>
            </div>
          </div>
        </section>
      </div>

      <div className="goeat-no-print">
        <GoEatFooter />
      </div>
    </div>
  )
}
