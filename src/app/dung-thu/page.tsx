import { GoEatTryDemoPage } from "@/components/goeat-try-demo"
import { TRY_DEMO_PATH, goEatMetadata } from "@/components/goeat-seo"

export const metadata = goEatMetadata({
  path: TRY_DEMO_PATH,
  title: "Dùng thử GoEat miễn phí — nhận tài khoản demo trong 1 phút",
  description:
    "Nhập email để nhận tài khoản demo GoEat dùng 7 ngày: dữ liệu mẫu đầy đủ về đặt món, quẹt thẻ nhận cơm, căn-tin, voucher và báo cáo đối soát.",
})

export default function TryDemoPage() {
  return <GoEatTryDemoPage />
}
