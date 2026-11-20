import { GUIDES, GoEatGuidesIndexPage } from "@/components/goeat-guides"
import {
  GUIDES_PATH,
  JsonLd,
  goEatMetadata,
  guidesIndexJsonLd,
} from "@/components/goeat-seo"

export const metadata = goEatMetadata({
  path: GUIDES_PATH,
  title:
    "Cẩm nang quản lý suất ăn công nghiệp & vận hành nhà ăn nhà máy — GoEat",
  description:
    "Kinh nghiệm vận hành thực tế cho Phòng HCNS, Kế toán và Đơn vị thầu bếp: quy trình quẹt thẻ nhân viên chống thất thoát suất ăn ảo, xử lý quên thẻ/khách/tăng ca không phiếu giấy và đối soát cuối kỳ.",
})

export default function GuidesPage() {
  return (
    <>
      <JsonLd data={guidesIndexJsonLd(GUIDES)} />
      <GoEatGuidesIndexPage />
    </>
  )
}
