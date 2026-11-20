import Link from "next/link"

import { TRY_DEMO_HREF } from "@/components/demo-url"
import { PRIVACY_PATH, goEatMetadata } from "@/components/goeat-seo"
import {
  CONTACT,
  Eyebrow,
  GoEatFooter,
  GoEatHeader,
  GuideRails,
  HEADING_STYLE,
  RailMarks,
} from "@/components/goeat-shared"

export const metadata = goEatMetadata({
  path: PRIVACY_PATH,
  title: "Chính sách bảo mật & quyền riêng tư dữ liệu doanh nghiệp — GoEat",
  description:
    "Cam kết bảo mật và cô lập dữ liệu đăng ký suất ăn nhân sự, mã định danh thẻ từ nhân viên, quy định sử dụng email cấp tài khoản dùng thử 7 ngày và chính sách cookie trên goeat.vn.",
})

export default function PrivacyPolicyPage() {
  return (
    <div className="sysdark:bg-[#08090B] sysdark:text-[#F5F7FA] sysdark:selection:bg-[#2563EB] min-h-dvh bg-white text-[#0B1220] antialiased selection:bg-[#1D4ED8] selection:text-white">
      <GoEatHeader />

      <div aria-hidden="true" className="h-[76px]" />

      <div className="relative overflow-x-clip">
        <GuideRails />

        <section className="sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] py-12 lg:py-16">
          <RailMarks />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Eyebrow>Thông báo pháp lý &amp; bảo mật dữ liệu B2B</Eyebrow>
            <h1
              className="sysdark:text-[#F5F7FA] mt-2.5 font-semibold tracking-[-0.02em] text-[#0B1220]"
              style={HEADING_STYLE}
            >
              Chính sách bảo mật &amp; Quyền riêng tư
            </h1>
            <p className="sysdark:text-[#A3AAB8] mt-3 text-sm leading-relaxed text-[#4B5565]">
              Cập nhật lần cuối: 20/11/2026 · Áp dụng cho website giới thiệu
              giải pháp <strong>goeat.vn</strong>, cổng cấp tài khoản dùng thử{" "}
              <Link
                href={TRY_DEMO_HREF}
                className="sysdark:text-[#6EA8FF] font-medium text-[#1D4ED8] underline underline-offset-4"
              >
                goeat.vn/dung-thu
              </Link>{" "}
              và nguyên tắc cô lập dữ liệu khi triển khai phần mềm quản lý suất
              ăn công nghiệp GoEat cho doanh nghiệp.
            </p>
          </div>
        </section>

        <section className="relative py-12 lg:py-16">
          <RailMarks />
          <div className="sysdark:text-[#E6E9EF] mx-auto max-w-4xl space-y-8 px-4 text-sm leading-relaxed text-[#1F2937] sm:px-6 lg:px-8">
            <div>
              <h2 className="sysdark:text-[#F5F7FA] text-lg font-semibold text-[#0B1220]">
                1. Phạm vi thu thập thông tin trên website &amp; tài khoản dùng
                thử 7 ngày
              </h2>
              <p className="mt-2">
                Website <strong>goeat.vn</strong> cung cấp thông tin chức năng,
                hồ sơ giải pháp và tài liệu hướng dẫn vận hành nhà ăn công
                nghiệp. Khi bạn đăng ký nhận tài khoản trải nghiệm miễn phí 7
                ngày tại trang{" "}
                <Link
                  href={TRY_DEMO_HREF}
                  className="sysdark:text-[#6EA8FF] font-medium text-[#1D4ED8] underline underline-offset-4"
                >
                  Dùng thử
                </Link>{" "}
                hoặc chủ động liên hệ qua Zalo, điện thoại, email, hệ thống chỉ
                ghi nhận các thông tin liên hệ do bạn cung cấp (địa chỉ email
                công việc, họ tên, số điện thoại và tên đơn vị) nhằm:
              </p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>
                  Cấp phát tự động một tài khoản dùng thử có thời hạn 7 ngày
                  trên máy chủ demo độc lập (mỗi địa chỉ email gắn với một tài
                  khoản riêng và có thể gia hạn lại khi hết hạn).
                </li>
                <li>
                  Phản hồi yêu cầu báo giá, khảo sát quy trình ca ăn và hỗ trợ
                  kỹ thuật khi doanh nghiệp có nhu cầu triển khai.
                </li>
                <li>
                  Chúng tôi tuyệt đối không bán, cho thuê hoặc chia sẻ danh sách
                  email đăng ký dùng thử cho bất kỳ bên thứ ba nào phục vụ mục
                  đích tiếp thị ngoài phạm vi GoEat.
                </li>
              </ul>
              <p className="sysdark:text-[#A3AAB8] mt-2 text-xs text-[#4B5565]">
                Lưu ý về môi trường Demo: Máy chủ demo sử dụng bộ dữ liệu mẫu
                dùng chung và tự động làm mới định kỳ hàng đêm. Quý khách vui
                lòng không tải danh sách nhân sự thật lên môi trường dùng thử
                công khai.
              </p>
            </div>

            <div>
              <h2 className="sysdark:text-[#F5F7FA] text-lg font-semibold text-[#0B1220]">
                2. Cô lập dữ liệu đăng ký suất ăn &amp; bảo mật mã thẻ nhân viên
              </h2>
              <p className="mt-2">
                Đối với các nhà máy, doanh nghiệp FDI, cơ quan và đơn vị thầu
                bếp ký hợp đồng sử dụng chính thức hệ thống GoEat:
              </p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>
                  <strong>Cô lập cơ sở dữ liệu theo từng đơn vị:</strong> Toàn
                  bộ danh mục phòng ban, danh sách nhân sự, lịch đăng ký món ăn,
                  lượt phát ngoại lệ, đơn hàng căn-tin và biên bản đối soát
                  thuộc quyền sở hữu riêng biệt của doanh nghiệp, được phân tách
                  độc lập giữa các khách hàng. Với gói Enterprise, doanh nghiệp
                  có thể lựa chọn triển khai trên máy chủ riêng (Dedicated VPS
                  hoặc On-premise nội bộ nhà máy).
                </li>
                <li>
                  <strong>Bảo mật mã định danh thẻ từ (Card UID):</strong> Đầu
                  đọc tại quầy ăn chỉ đọc mã số định danh công khai của thẻ nhân
                  viên (RFID 125KHz / Mifare 13.56MHz) để tra cứu suất ăn đã
                  đăng ký trong ca. Hệ thống không ghi đè dữ liệu lên thẻ, không
                  can thiệp vào phân vùng kiểm soát ra vào cổng (Access Control)
                  và không lưu trữ dữ liệu tiền lương hay hồ sơ nhạy cảm ngoài
                  phạm vi nhà ăn.
                </li>
                <li>
                  <strong>Phân quyền &amp; nhật ký kiểm toán:</strong> Quyền
                  truy cập dữ liệu được giới hạn theo đúng vai trò (HCNS, Kế
                  toán, Tổ trưởng đặt thay, Bếp, Quầy phát cơm). Mọi thao tác
                  chỉnh sửa sau giờ chốt hoặc phát suất ngoại lệ đều lưu nhật ký
                  thời gian và tài khoản thực hiện.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="sysdark:text-[#F5F7FA] text-lg font-semibold text-[#0B1220]">
                3. Cookie và công cụ đo lường truy cập trên trang giới thiệu
              </h2>
              <p className="mt-2">
                Để đánh giá chất lượng tài liệu hướng dẫn và tối ưu tốc độ truy
                cập trên <strong>goeat.vn</strong>, website có thể sử dụng các
                công cụ phân tích tiêu chuẩn (Google Analytics, Google Ads và
                Meta Pixel khi được cấu hình). Các công cụ này ghi nhận dữ liệu
                tổng hợp như:
              </p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>
                  Lượt xem các chuyên mục giới thiệu chức năng, hồ sơ giải pháp
                  và bài viết trong Cẩm nang vận hành nhà ăn.
                </li>
                <li>
                  Sự kiện chuyển đổi tổng hợp khi người dùng khởi tạo tài khoản
                  dùng thử tại trang Dùng thử hoặc nhấp vào liên kết liên hệ tư
                  vấn (Zalo, điện thoại, email).
                </li>
                <li>
                  Thông số trình duyệt, kích thước màn hình và thời gian phản
                  hồi trang nhằm cải thiện trải nghiệm đọc trên máy tính và điện
                  thoại.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="sysdark:text-[#F5F7FA] text-lg font-semibold text-[#0B1220]">
                4. Quyền kiểm soát cookie &amp; xoá thông tin liên hệ
              </h2>
              <p className="mt-2">
                Người truy cập có thể chặn hoặc xoá cookie bất kỳ lúc nào thông
                qua phần cài đặt quyền riêng tư của trình duyệt mà không ảnh
                hưởng tới việc xem bảng giá, đọc cẩm nang hay in Hồ sơ giải pháp
                PDF trên website. Nếu muốn yêu cầu xoá địa chỉ email đã đăng ký
                nhận tài khoản demo khỏi hệ thống dùng thử, bạn chỉ cần gửi yêu
                cầu tới địa chỉ liên hệ bên dưới.
              </p>
            </div>

            <div>
              <h2 className="sysdark:text-[#F5F7FA] text-lg font-semibold text-[#0B1220]">
                5. Thông tin liên hệ
              </h2>
              <p className="mt-2">
                Mọi câu hỏi về chính sách bảo mật dữ liệu, yêu cầu thẩm định an
                toàn thông tin IT trước khi triển khai hoặc hỗ trợ kỹ thuật, vui
                lòng liên hệ trực tiếp bộ phận phát triển GoEat qua Zalo / Điện
                thoại{" "}
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="tnum sysdark:text-[#F5F7FA] font-semibold text-[#0B1220] underline underline-offset-4"
                >
                  {CONTACT.phoneLabel}
                </a>{" "}
                hoặc email{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="sysdark:text-[#F5F7FA] font-semibold text-[#0B1220] underline underline-offset-4"
                >
                  {CONTACT.email}
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </div>

      <GoEatFooter />
    </div>
  )
}
