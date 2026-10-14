import { GoEatLandingPage } from "@/components/goeat-landing"
import {
  JsonLd,
  LANDING_PATH,
  goEatMetadata,
  landingJsonLd,
} from "@/components/goeat-seo"

export const metadata = goEatMetadata({
  path: LANDING_PATH,
  title: "GoEat — Phần mềm quản lý suất ăn công nghiệp và căn-tin nội bộ",
  description:
    "Phần mềm quản lý suất ăn cho nhà máy, cơ quan, đơn vị thầu bếp: chọn món theo tuần, tự chốt số báo bếp theo ca, quẹt thẻ nhận cơm, đối soát xuất Excel. Gói Cơ bản 1.000.000đ/tháng.",
})

export default function HomePage() {
  return (
    <>
      <JsonLd data={landingJsonLd()} />
      <GoEatLandingPage />
    </>
  )
}
