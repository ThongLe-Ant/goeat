import { GoEatBrochurePage } from "@/components/goeat-brochure"
import {
  BROCHURE_PATH,
  JsonLd,
  brochureJsonLd,
  goEatMetadata,
} from "@/components/goeat-seo"

export const metadata = goEatMetadata({
  path: BROCHURE_PATH,
  title:
    "Hồ sơ giải pháp GoEat (Brochure PDF A4) — Quản lý suất ăn công nghiệp & căn-tin nhà máy",
  description:
    "Tài liệu tóm tắt giải pháp chuẩn A4 cho Phòng HCNS, Kế toán và IT trình ký Ban Giám đốc: quy trình kiểm soát suất ăn khép kín, 6 phân hệ cốt lõi, hạ tầng bảo mật và biểu phí theo quy mô nhân sự.",
})

export default function BrochureRoutePage() {
  return (
    <>
      <JsonLd data={brochureJsonLd()} />
      <GoEatBrochurePage />
    </>
  )
}
