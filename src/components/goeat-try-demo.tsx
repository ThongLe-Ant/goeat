import { Clock, Cpu, HardDrive, MemoryStick } from "lucide-react"

import { GoEatDemoSignup } from "./goeat-demo-signup"
import {
  Eyebrow,
  GoEatFooter,
  GoEatHeader,
  GuideRails,
  HEADING_STYLE,
  SoftGlow,
} from "./goeat-shared"

/* ============================================================================
 * Trang /dung-thu: nhận tài khoản demo theo email + cấu hình máy chủ demo +
 * hướng dẫn thao tác theo đúng tên menu trong app.
 * ========================================================================== */

/** Cấu hình máy chủ chạy demo.goeat.vn và hạn tài khoản. Hạn phải khớp env
 *  DEMO_ACCOUNT_DAYS của bản demo. */
export const DEMO_SERVER = [
  { icon: Cpu, label: "CPU", value: "2 nhân" },
  { icon: MemoryStick, label: "RAM", value: "4 GB" },
  { icon: HardDrive, label: "Lưu trữ", value: "10 GB" },
  { icon: Clock, label: "Hạn tài khoản", value: "7 ngày" },
] as const

const STEPS = [
  {
    title: "Xem thực đơn và đặt món",
    menu: "Suất ăn → Thực đơn, Đặt món",
    body: "Thực đơn đã lên sẵn ba tuần. Chọn món cho từng ngày, từng ca như một nhân viên, rồi xem số suất được đếm lại ngay.",
  },
  {
    title: "Phát cơm tại quầy",
    menu: "Suất ăn → Nhận món, Thẻ nhân viên",
    body: "Lấy một mã thẻ ở trang Thẻ nhân viên, nhập vào màn Nhận món để thấy quầy nhận diện người ăn, món đã đăng ký và chuyển suất sang đã dùng.",
  },
  {
    title: "Căn-tin và voucher",
    menu: "Căn-tin → Đặt món Căn-tin, Quản lý Voucher",
    body: "Đặt món căn-tin, thanh toán, áp mã voucher và theo dõi đơn từ phía quản lý.",
  },
  {
    title: "Báo cáo và đối soát",
    menu: "Báo cáo → BC suất ăn trong ngày, BC đối soát suất ăn",
    body: "Xem số suất theo ca, theo phòng ban, đối chiếu đăng ký với thực nhận và xuất Excel.",
  },
] as const

const NOTES = [
  "Dữ liệu mẫu dùng chung cho mọi khách dùng thử và được làm mới mỗi đêm. Vui lòng không nhập thông tin thật.",
  "Bạn được thao tác thoải mái với dữ liệu, nhưng không đổi được mật khẩu và thông tin của tài khoản demo.",
  "Hết hạn, tài khoản tự khoá. Quay lại trang này, nhập đúng email cũ để được cấp lại.",
] as const

export function GoEatTryDemoPage() {
  return (
    <div className="min-h-dvh bg-white sysdark:bg-[#08090B] text-[#0B1220] sysdark:text-[#F5F7FA] antialiased selection:bg-[#1D4ED8] sysdark:selection:bg-[#2563EB] selection:text-white">
      <GoEatHeader active="Dùng thử" />
      <div aria-hidden="true" className="h-[76px]" />

      <main className="relative isolate overflow-hidden">
        <GuideRails />
        <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-14 lg:px-8 lg:pt-16">
          <div>
            <Eyebrow>Dùng thử miễn phí</Eyebrow>
            <h1
              style={HEADING_STYLE}
              className="mt-4 text-3xl font-semibold tracking-tight text-[#0B1220] sysdark:text-[#F5F7FA] sm:text-4xl"
            >
              Trải nghiệm GoEat với dữ liệu mẫu đầy đủ
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4B5563] sysdark:text-[#A3ABB8]">
              Nhập email để nhận tài khoản riêng vào bản demo chạy thật: đã có
              sẵn nhân viên, ca ăn, thực đơn, lượt quẹt thẻ, đơn căn-tin và báo
              cáo để bạn xem và thao tác ngay.
            </p>

            <div className="mt-8">
              <h2 className="text-sm font-semibold text-[#1F2937] sysdark:text-[#E6E9EF]">
                Cấu hình máy chủ demo
              </h2>
              <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {DEMO_SERVER.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-[#E3E7EE] sysdark:border-[#1F232A] bg-[#F7F9FC] sysdark:bg-[#0E1014] p-3.5"
                  >
                    <dt className="flex items-center gap-1.5 text-xs font-medium text-[#5B6577] sysdark:text-[#8B93A1]">
                      <Icon className="h-3.5 w-3.5 text-[#1D4ED8] sysdark:text-[#6EA8FF]" />
                      {label}
                    </dt>
                    <dd className="tnum mt-1.5 text-lg font-semibold text-[#0B1220] sysdark:text-[#F5F7FA]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-2.5 text-xs text-[#5B6577] sysdark:text-[#8B93A1]">
                Bản demo dùng máy chủ nhỏ, chia sẻ cho nhiều khách cùng lúc.
                Tốc độ thực tế khi triển khai cho đơn vị của bạn sẽ theo cấu
                hình riêng.
              </p>
            </div>
          </div>

          <div className="relative isolate">
            <SoftGlow />
            <GoEatDemoSignup />
          </div>
        </section>

        <section className="border-t border-[#E3E7EE] sysdark:border-[#1F232A] bg-[#F7F9FC] sysdark:bg-[#0B0D11]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <Eyebrow>Hướng dẫn</Eyebrow>
            <h2
              style={HEADING_STYLE}
              className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Vào demo rồi thử theo các bước này
            </h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2">
              {STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-[#E3E7EE] sysdark:border-[#1F232A] bg-white sysdark:bg-[#12151B] p-5"
                >
                  <p className="font-mono text-xs text-[#9AA8C2] sysdark:text-[#4B5363]">
                    [{String(i + 1).padStart(2, "0")}]
                  </p>
                  <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
                  <p className="mt-1 text-xs font-medium text-[#1D4ED8] sysdark:text-[#6EA8FF]">
                    {step.menu}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#4B5563] sysdark:text-[#A3ABB8]">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>

            <h3 className="mt-10 text-sm font-semibold">Lưu ý</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#4B5563] sysdark:text-[#A3ABB8]">
              {NOTES.map((note) => (
                <li key={note} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#1D4ED8] sysdark:bg-[#6EA8FF]" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <GoEatFooter />
    </div>
  )
}
