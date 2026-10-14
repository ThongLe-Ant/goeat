import { GoEatFeaturesPage } from "@/components/goeat-features"
import {
  FEATURES_PATH,
  JsonLd,
  featuresJsonLd,
  goEatMetadata,
} from "@/components/goeat-seo"

export const metadata = goEatMetadata({
  path: FEATURES_PATH,
  title: "Chức năng GoEat — đặt món, báo bếp, quẹt thẻ nhận cơm, đối soát",
  description:
    "Chi tiết từng chức năng GoEat: chọn món theo tuần, tự chốt số báo bếp theo ca, quẹt thẻ nhận cơm, xử lý quên thẻ và khách tại quầy, căn-tin thanh toán QR, đối soát xuất Excel. Kèm bảng so sánh các gói.",
})

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={featuresJsonLd()} />
      <GoEatFeaturesPage />
    </>
  )
}
