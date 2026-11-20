import Image from "next/image"
import Link from "next/link"
import { ArrowRight, FileSpreadsheet } from "lucide-react"

import { TRY_DEMO_HREF } from "./demo-url"
import {
  BROCHURE_HREF,
  Eyebrow,
  FEATURES_HREF,
  GoEatFooter,
  GoEatHeader,
  GuideRails,
  HEADING_STYLE,
  RailMarks,
  TryDemoBand,
} from "./goeat-shared"

export const GUIDES_PATH = "/cam-nang"

export interface GuideSection {
  heading: string
  paragraphs: string[]
  bullets?: Array<{ title: string; detail: string }>
  table?: {
    caption?: string
    headers: string[]
    rows: string[][]
  }
  figure?: {
    src: string
    alt: string
    caption: string
  }
}

export interface GuideArticle {
  slug: string
  category: string
  readTime: string
  publishedAt: string
  title: string
  description: string
  heroImage: string
  heroAlt: string
  relatedFeatureId: string
  relatedFeatureName: string
  recommendedPlan: string
  keyTakeaways: string[]
  sections: GuideSection[]
}

export const GUIDES: ReadonlyArray<GuideArticle> = [
  {
    slug: "quy-trinh-quan-ly-suat-an-cong-nghiep-chong-that-thoat",
    category: "Quy trình vận hành",
    readTime: "7 phút đọc",
    publishedAt: "2026-11-10",
    title:
      "Quy trình quản lý suất ăn công nghiệp bằng thẻ nhân viên: Cắt giảm 100% suất ăn ảo & chênh lệch cuối tháng",
    description:
      "Phân tích nguyên nhân gây thất thoát 5–12% ngân sách bếp ăn nhà máy mỗi tháng và quy trình 4 bước khép kín từ đặt món theo tuần, tự chốt số báo bếp đến quẹt thẻ nhận cơm dưới 0,5 giây.",
    heroImage: "/images/goeat-nhan-mon-quay-v2.jpg",
    heroAlt:
      "Màn hình nhận món tại quầy nhà ăn GoEat: quẹt thẻ nhân viên hiện tên món cỡ lớn, tên người nhận và chặn nhận trùng trong ca",
    relatedFeatureId: "nhan-mon",
    relatedFeatureName: "Quẹt thẻ nhận món tại quầy",
    recommendedPlan: "Standard",
    keyTakeaways: [
      "Loại bỏ hoàn toàn khoản báo dư dự phòng 5–10% mỗi ngày do tổ trưởng đếm tay hoặc nhắn qua nhóm Zalo.",
      "Tự động khoá sổ đặt món đúng giờ quy định của từng ca (Ca 1, Ca 2, Ca 3 / Ca đêm), tách sẵn số lượng mặn – chay – món thay thế cho bếp.",
      "Quẹt thẻ nhân viên RFID/Mifare sẵn có tại đầu chuyền phát cơm trong 0,5 giây; hệ thống chặn cứng thẻ quẹt lần thứ hai trong cùng ca.",
      "Ghi nhận chính xác danh sách đăng ký nhưng không đến ăn (No-show) để Phòng HCNS nhắc nhở theo tổ/chuyền.",
    ],
    sections: [
      {
        heading:
          "1. Vì sao nhà máy mất từ 5–12% chi phí suất ăn mỗi tháng dù vẫn điểm danh hàng ngày?",
        paragraphs: [
          "Tại các nhà máy quy mô 300 đến hơn 1.000 lao động, ngân sách suất ăn công nghiệp thường nằm trong nhóm chi phí vận hành lớn nhất của Phòng Hành chính – Nhân sự (HCNS). Với đơn giá phổ biến 25.000đ – 35.000đ/suất và 26 ngày công/tháng, một nhà máy 500 nhân sự chi khoảng 325 – 455 triệu đồng mỗi tháng riêng cho bữa ăn ca.",
          "Khi kiểm tra thực tế tại các đơn vị còn báo cơm qua nhóm Zalo tổ trưởng, bảng Excel rời hoặc phát phiếu ăn giấy, phần thất thoát hiếm khi đến từ một khoản lớn dễ thấy mà rò rỉ đều đặn mỗi ngày qua ba lỗ hổng vận hành:",
        ],
        bullets: [
          {
            title: "Tâm lý báo dư phòng thiếu của tổ trưởng",
            detail:
              "Đầu giờ sáng tổ trưởng vừa bố trí chuyền vừa đếm người nên thường cộng dư 2–3 suất mỗi tổ phòng khi có người đi muộn hoặc điều chuyển chuyền. Nhà máy có 10 tổ sản xuất là mỗi ca đã dư 20–30 suất ảo.",
          },
          {
            title: "Bếp không nắm được tỷ lệ món mặn – món chay – món thay thế",
            detail:
              "Báo tổng số người chung chung khiến bếp nấu thừa món chính nhưng lại thiếu món cải thiện hoặc món chay vào ngày rằm, mùng một, dẫn đến công nhân xếp hàng sau hết món đã chọn.",
          },
          {
            title:
              "Không đối chiếu được người đăng ký với người thực nhận tại quầy",
            detail:
              "Nếu đầu quầy không quẹt thẻ gắn danh tính từng người, nhà máy không biết ai lấy hộ hai khay, ai đăng ký rồi bỏ ra ngoài ăn nhưng công ty vẫn phải thanh toán đủ tiền cho nhà thầu bếp.",
          },
        ],
      },
      {
        heading:
          "2. Quy trình 4 bước khép kín từ điện thoại công nhân tới khay cơm tại quầy",
        paragraphs: [
          "Để cắt đứt suất ăn ảo mà không gây ùn tắc giờ tan ca (thường có 200–400 công nhân xuống nhà ăn cùng lúc trong 15 phút đầu), hệ thống không thể chỉ kiểm soát ở khâu phát cơm mà phải nối liền mạch từ bước đăng ký trước giờ chốt.",
        ],
        bullets: [
          {
            title: "Bước 1 — Đặt món cả tuần & đặt thay theo tổ",
            detail:
              "Nhà thầu bếp hoặc HCNS công bố thực đơn tuần sau. Công nhân mở điện thoại chọn ca và món ăn cho từng ngày. Với công nhân lớn tuổi không dùng điện thoại thông minh, tổ trưởng mở màn hình Đặt thay để tích chọn cho cả tổ trong vài phút.",
          },
          {
            title: "Bước 2 — Giờ chốt tự động khoá sửa và xuất lệnh báo bếp",
            detail:
              "Mỗi ca ăn có mốc khoá riêng (ví dụ Ca trưa khoá lúc 09:00 sáng hoặc 15:00 hôm trước). Đúng phút chốt, hệ thống khoá quyền đổi/huỷ món của người ăn và tổng hợp bảng số nấu gửi thẳng cho bếp: Ca 1 bao nhiêu suất mặn A, mặn B, món chay.",
          },
          {
            title:
              "Bước 3 — Quẹt thẻ nhân viên 0,5 giây tại đầu chuyền múc cơm",
            detail:
              "Công nhân đi qua đầu quầy chạm thẻ nhân viên đang đeo trên cổ vào máy đọc USB. Màn hình hướng về phía nhân viên bếp hiện chữ to rõ tên món và họ tên người nhận để múc khay ngay, đồng thời phát cảnh báo đỏ nếu thẻ đó vừa nhận cơm trước đó vài phút.",
          },
          {
            title: "Bước 4 — Chốt số liệu thực tế ngay khi đóng ca ăn",
            detail:
              "Kết thúc giờ ăn, số suất đã phát, số suất đăng ký chưa nhận và danh sách ngoại lệ được chốt tự động trên hệ thống mà nhân sự HCNS không cần cộng sổ.",
          },
        ],
        figure: {
          src: "/images/goeat-bao-bep-ca-v2.jpg",
          alt: "Màn hình báo cáo suất ăn trong ngày trên GoEat tách riêng số cần nấu theo từng ca và từng nhóm món",
          caption:
            "Màn hình báo bếp theo ngày trên GoEat: tách rõ số suất cần nấu của từng ca (mặn, chay, thay thế) và cập nhật số đã nhận theo thời gian thực.",
        },
      },
      {
        heading:
          "3. Quản trị tỷ lệ đăng ký bỏ bữa (No-show) bằng dữ liệu định danh",
        paragraphs: [
          "Trong hợp đồng thầu bếp công nghiệp, nhà máy thường phải thanh toán theo số suất đã chốt báo bếp trước giờ nấu (vì thực phẩm tươi sống đã sơ chế). Do đó, nếu công nhân đăng ký suất ăn nhưng tự ý bỏ bữa không báo huỷ trước giờ chốt, nhà máy vẫn mất nguyên chi phí suất đó.",
          "Khi quẹt thẻ nhận cơm trên GoEat, hệ thống tự động lọc ra danh sách chi tiết từng cá nhân có trạng thái Đăng ký nhưng không nhận trong kỳ. Phòng HCNS chỉ cần xuất danh sách này theo từng bộ phận gửi trưởng xưởng nhắc nhở hàng tuần; thực tế triển khai cho thấy tỷ lệ bỏ bữa giảm từ 6–8% xuống dưới 1% chỉ sau hai tuần áp dụng.",
        ],
      },
    ],
  },
  {
    slug: "xu-ly-cong-nhan-quen-the-suat-an-tang-ca-va-khach",
    category: "Kiểm soát ngoại lệ",
    readTime: "6 phút đọc",
    publishedAt: "2026-11-12",
    title:
      "Cách xử lý công nhân quên thẻ, nhân viên mới, khách & suất tăng ca tại nhà ăn nhà máy không cần phiếu giấy",
    description:
      "Hướng dẫn thiết lập quy trình xử lý 4 tình huống phát sinh thực tế mỗi ngày tại nhà ăn công nghiệp bằng thẻ tạm theo ca và phát ngoại lệ có ghi lý do, thay thế hoàn toàn sổ ký tay.",
    heroImage: "/images/goeat-phat-ngoai-le.jpg",
    heroAlt:
      "Màn hình phát suất ngoại lệ tại quầy nhà ăn GoEat: chọn lý do quên thẻ, nhân viên mới hoặc khách và lưu lịch sử trong ngày",
    relatedFeatureId: "ngoai-le",
    relatedFeatureName: "Xử lý ngoại lệ & thẻ tạm tại quầy",
    recommendedPlan: "Professional",
    keyTakeaways: [
      "Không làm tắc hàng xếp khay giờ cao điểm khi có công nhân để quên thẻ trong tủ đồ hoặc mất thẻ.",
      "Cấp thẻ tạm định danh tại quầy chỉ trong vài giây; thẻ tạm tự động hết hiệu lực ngay khi khép ca ăn.",
      "Mở cửa sổ 30 phút sau giờ chốt để tổ trưởng nhập bổ sung suất tăng ca đột xuất mà không làm xáo trộn số chốt gốc đã báo bếp.",
      "Mọi lượt phát cho nhân viên mới nhận việc và đoàn khách thăm nhà máy đều gắn mã lý do riêng để kế toán hạch toán đúng trung tâm chi phí.",
    ],
    sections: [
      {
        heading:
          "1. Điểm gãy của các hệ thống quẹt thẻ cứng nhắc: ngoại lệ đẩy nhà ăn quay lại phiếu giấy",
        paragraphs: [
          "Nhiều nhà máy đầu tư đầu đọc thẻ ở cửa nhà ăn nhưng chỉ sau một tháng lại phải đặt thêm cuốn sổ ký tay hoặc xấp phiếu ăn dự phòng bên cạnh. Nguyên nhân rất thực tế: trong một ca 600 công nhân, ngày nào cũng có 5–15 trường hợp phát sinh hợp lệ — người để quên thẻ ở xưởng, công nhân thời vụ mới vào sáng nay chưa kịp in thẻ từ, chuyên gia khách hàng sang kiểm tra chất lượng (Audit) ở lại ăn trưa, hoặc tổ bảo trì phải ở lại xử lý máy hỏng sau giờ chốt cơm.",
          "Nếu phần mềm không có luồng xử lý ngoại lệ ngay trên màn hình quầy, nhân viên nhà bếp buộc phải phát cơm ngoài hệ thống rồi ghi tay vào sổ. Cuối tháng, chính cuốn sổ ghi tay này là nơi phát sinh tranh cãi vì chữ viết vội không đọc được mã nhân viên hoặc cộng dồn thiếu căn cứ.",
        ],
      },
      {
        heading:
          "2. Quy trình chuẩn xử lý 4 nhóm ngoại lệ trực tiếp trên màn hình quầy GoEat",
        paragraphs: [
          "Trên GoEat, toàn bộ các tình huống phát sinh trong ca ăn được số hoá thành thao tác chạm chọn trên cùng màn hình máy tính bảng đặt tại quầy, tuyệt đối không dùng giấy trung gian:",
        ],
        bullets: [
          {
            title: "Trường hợp 1 — Công nhân quên thẻ: Cấp thẻ tạm trong ca",
            detail:
              "Nhà ăn chuẩn bị sẵn một xấp 10–20 phôi thẻ nhựa đánh số (Thẻ tạm 01 đến 20). Khi công nhân báo quên thẻ, phụ trách quầy tìm tên/mã nhân viên trên màn hình rồi chạm Thẻ tạm số 09 vào đầu đọc. Công nhân cầm thẻ tạm quẹt lấy đúng món mình đã đặt; hết ca thẻ tạm tự động huỷ liên kết.",
          },
          {
            title: "Trường hợp 2 — Nhân viên mới chưa có hồ sơ thẻ",
            detail:
              "Công nhân mới nhận việc ngày đầu hoặc thẻ mới phát chưa kịp đồng bộ vẫn được quầy ghi nhận phát 1 suất trong ca kèm mã lý do Nhân viên mới để đối chiếu với danh sách nhận việc của HCNS.",
          },
          {
            title:
              "Trường hợp 3 — Khách thăm nhà máy, nhà thầu phụ, đoàn Audit",
            detail:
              "Phòng HCNS hoặc lễ tân báo trước số suất khách, hoặc quầy chọn phát ngoại lệ với lý do Khách công ty. Cuối kỳ, kế toán lọc riêng nhóm lý do này để hạch toán vào chi phí tiếp khách thay vì tính lẫn vào chi phí nhân công trực tiếp.",
          },
          {
            title: "Trường hợp 4 — Báo thêm suất tăng ca đột xuất sau giờ chốt",
            detail:
              "Sau giờ khoá sổ chính thức, GoEat cho phép mở khung giờ Nhập phát sinh (ví dụ 30 phút sau giờ chốt) dành riêng cho tài khoản được phân quyền. Số suất tăng ca được cộng thẳng vào hạn mức quầy và ghi dấu tách biệt với số chốt ban đầu.",
          },
        ],
        figure: {
          src: "/images/goeat-the-tam.jpg",
          alt: "Màn hình cấp thẻ tạm cho công nhân quên thẻ trên phần mềm GoEat",
          caption:
            "Giao diện cấp thẻ tạm tại quầy GoEat: tra cứu nhân viên và chạm thẻ tạm vào đầu đọc chỉ trong vài giây.",
        },
      },
      {
        heading:
          "3. Kiểm soát gian lận phát tay bằng danh mục lý do bắt buộc & nhật ký tài khoản",
        paragraphs: [
          "Để ngăn việc lạm dụng nút phát ngoại lệ tại quầy, GoEat áp dụng hai chốt kiểm soát: thứ nhất, chỉ tài khoản được cấp quyền tại quầy mới mở được màn hình ngoại lệ và bắt buộc phải chọn lý do từ danh mục chuẩn do HCNS thiết lập (không cho phát trống lý do); thứ hai, mỗi lượt phát đều lưu thời điểm chính xác tới từng giây.",
          "Ngoài ra, Phòng HCNS dễ dàng tra cứu tần suất quên thẻ của từng cá nhân trong tháng. Những trường hợp quên thẻ lặp lại quá 3 lần/tháng sẽ hiển thị rõ trên báo cáo để nhắc nhở nội quy đeo thẻ an toàn lao động.",
        ],
      },
    ],
  },
  {
    slug: "mau-doi-soat-suat-an-nha-may-giua-hcns-va-nha-thau-bep",
    category: "Kế toán & Đối soát",
    readTime: "7 phút đọc",
    publishedAt: "2026-11-15",
    title:
      "Hướng dẫn đối soát suất ăn công nghiệp cuối kỳ giữa Phòng HCNS, Kế toán và Đơn vị thầu bếp",
    description:
      "Công thức đối chiếu số liệu 3 bên cuối tháng không tranh cãi, cách quy định điều khoản thanh toán suất đăng ký bỏ bữa trong hợp đồng thầu bếp và mẫu xuất Excel A4 trình ký.",
    heroImage: "/images/goeat-doi-soat-ky-v2.jpg",
    heroAlt:
      "Bảng báo cáo đối soát suất ăn theo kỳ trên GoEat thể hiện tổng đăng ký, đã nhận, không nhận, ngoại lệ và nút xuất Excel A4",
    relatedFeatureId: "doi-soat",
    relatedFeatureName: "Báo cáo & đối soát cuối kỳ",
    recommendedPlan: "Professional",
    keyTakeaways: [
      "Rút ngắn thời gian chốt biên bản nghiệm thu suất ăn cuối tháng từ 3–5 ngày xuống còn 15 phút xuất file Excel A4.",
      "Tách bạch minh bạch 4 nhóm số liệu: Số chốt báo bếp, Số phát sinh được duyệt, Số thực nhận qua thẻ và Số phát ngoại lệ.",
      "Phân bổ chính xác chi phí suất ăn theo từng phòng ban, phân xưởng (Cost Center) phục vụ kế toán quản trị tại doanh nghiệp FDI.",
      "Truy vết ngược bất kỳ ngày/ca nào có chênh lệch tới tận danh sách từng người ăn và giờ quẹt thẻ.",
    ],
    sections: [
      {
        heading: "1. Ba con số luôn lệch nhau vào ngày mùng 1 đầu tháng",
        paragraphs: [
          "Vào kỳ chốt công nợ từ ngày 01 đến ngày 05 hàng tháng, chuyên viên HCNS phụ trách nhà ăn thường rơi vào thế kẹt giữa Kế toán nội bộ và Quản lý đơn vị thầu bếp vì ba nguồn số liệu không khớp nhau:",
          "Nhà thầu bếp cộng các tin nhắn báo suất hàng ngày trên nhóm Zalo ra 12.480 suất; tổ bảo vệ hoặc nhân viên đứng quầy bấm máy đếm tay ghi sổ được 12.190 khay; trong khi bảng chấm công thực tế của HCNS lại ra 12.310 công đi làm. Khi không có dữ liệu chi tiết theo từng ca của từng ngày, cả hai bên phải lục lại từng trang sổ và tin nhắn cũ để tìm chỗ lệch.",
        ],
      },
      {
        heading:
          "2. Cấu trúc bảng đối soát chuẩn 5 cột giữa HCNS – Kế toán – Nhà thầu bếp",
        paragraphs: [
          "Để biên bản nghiệm thu cuối kỳ rõ ràng ngay từ đầu, báo cáo đối soát trên GoEat chuẩn hoá cấu trúc dữ liệu thành các cột độc lập theo từng ngày và từng ca ăn (Ca 1, Ca 2, Ca 3, Ca hành chính):",
        ],
        table: {
          caption:
            "Cấu trúc đối chiếu số liệu suất ăn chuẩn trên báo cáo đối soát GoEat",
          headers: [
            "Chỉ tiêu trên bảng đối soát",
            "Nguồn ghi nhận trên hệ thống",
            "Ý nghĩa nghiệm thu & hạch toán",
          ],
          rows: [
            [
              "1. Số đăng ký chốt báo bếp (A)",
              "Khoá tự động tại giờ chốt của từng ca",
              "Căn cứ gốc xác nhận số lượng nhà máy đã đặt bếp nấu đúng hạn.",
            ],
            [
              "2. Suất phát sinh duyệt thêm (B)",
              "Nhập trong khung giờ tăng ca có phân quyền",
              "Suất tăng ca/đột xuất được HCNS xác nhận bổ sung cho bếp.",
            ],
            [
              "3. Thực nhận bằng thẻ nhân viên (C)",
              "Máy quẹt thẻ tại quầy ghi nhận trực tiếp",
              "Số suất công nhân có đăng ký và đã thực tế lấy khay cơm.",
            ],
            [
              "4. Đăng ký nhưng không nhận (A - C)",
              "Hệ thống tự động đối trừ khi đóng ca",
              "Phản ánh lượng suất bỏ phí do người ăn vắng mặt sau giờ chốt.",
            ],
            [
              "5. Phát ngoại lệ có lý do (D)",
              "Thẻ tạm quên thẻ, người mới, khách",
              "Tách riêng khách/người mới để cộng nghiệm thu hợp lệ nếu vượt dự phòng.",
            ],
          ],
        },
      },
      {
        heading:
          "3. Nguyên tắc quy định điều khoản thanh toán trong hợp đồng thầu bếp",
        paragraphs: [
          "Khi cả nhà máy và đơn vị thầu bếp cùng nhìn vào một màn hình số liệu GoEat (nhà thầu bếp được cấp tài khoản chỉ xem số báo nấu và số thực phát của bếp), hai bên rất dễ thống nhất nguyên tắc thanh toán trong hợp đồng:",
        ],
        bullets: [
          {
            title: "Căn cứ thanh toán cho nhà thầu bếp",
            detail:
              "Thanh toán theo Tổng số suất đã chốt báo bếp hợp lệ cộng với Số suất phát sinh/khách được phê duyệt (hoặc thanh toán theo thực nhận cộng biên độ dung sai thoả thuận). Nhờ số liệu chốt cứng theo mốc thời gian hệ thống, không bên nào tự ý sửa được số cũ.",
          },
          {
            title: "Hạch toán chi phí theo phòng ban (Cost Center)",
            detail:
              "File Excel xuất từ GoEat phân nhóm sẵn số suất theo từng phòng ban, chuyền sản xuất và tách riêng suất ăn khách, giúp kế toán nhà máy FDI định khoản chi phí tháng mà không cần làm lại bảng phân bổ.",
          },
          {
            title: "Biên bản định dạng chuẩn in A4 trình ký",
            detail:
              "Báo cáo xuất thẳng ra tệp Excel căn sẵn khổ giấy A4 kèm khung chữ ký đại diện Nhà thầu bếp – Phòng HCNS – Phòng Kế toán – Ban Giám đốc.",
          },
        ],
      },
    ],
  },
  {
    slug: "so-sanh-phieu-an-giay-van-tay-khuon-mat-va-quet-the-dat-mon",
    category: "Tư vấn triển khai",
    readTime: "8 phút đọc",
    publishedAt: "2026-11-18",
    title:
      "So sánh 4 phương pháp kiểm soát nhà ăn nhà máy: Phiếu giấy, Vân tay, Khuôn mặt và Quẹt thẻ kết hợp đặt món trước",
    description:
      "Đánh giá thực tế ưu nhược điểm về tốc độ xả hàng giờ cao điểm, độ bền thiết bị trong môi trường dầu mỡ/bụi xưởng, chi phí đầu tư và khả năng báo số nấu trước cho bếp của 4 phương pháp phổ biến.",
    heroImage: "/images/goeat-dat-mon-ca-tuan-v2.jpg",
    heroAlt:
      "Màn hình đặt món tuần trước trên điện thoại và máy tính kết hợp quẹt thẻ nhận cơm tại quầy của GoEat",
    relatedFeatureId: "dat-mon",
    relatedFeatureName: "Đặt món theo tuần & quẹt thẻ tại quầy",
    recommendedPlan: "Professional",
    keyTakeaways: [
      "Phiếu ăn giấy không tốn thiết bị ban đầu nhưng tốn nhân công in cắt, đếm phiếu mỗi ngày và không chặn được việc gom phiếu ảo.",
      "Máy vân tay dễ bị từ chối nhận diện (kẹt hàng) khi tay công nhân dính dầu máy, bột, mồ hôi hoặc trầy xước vân tay.",
      "Camera nhận diện khuôn mặt (FaceID) có chi phí đầu tư phần cứng cao trên mỗi làn và vẫn không giải quyết được bài toán báo trước số lượng từng món cho bếp nếu thiếu phân hệ đặt món.",
      "Quẹt thẻ từ nhân viên sẵn có kết hợp đặt món trước trên GoEat đạt tốc độ < 0,5 giây/người, tận dụng thẻ hiện hữu và giải quyết trọn vẹn từ báo bếp đến đối soát.",
    ],
    sections: [
      {
        heading:
          "1. Bốn tiêu chí sống còn khi chọn giải pháp kiểm soát nhà ăn công nghiệp",
        paragraphs: [
          "Khác với chấm công ở cổng nhà máy (công nhân đi rải rác trong 30 phút đầu ca và chỉ cần ghi nhận giờ vào), quầy phát cơm nhà ăn chịu áp lực lớn hơn nhiều: hàng trăm người dồn xuống cùng một lúc khi chuông tan ca reo, môi trường nhà ăn có hơi nóng, dầu mỡ, và nhân viên bếp cần nhìn thấy ngay người đối diện ăn món gì (mặn 1, mặn 2 hay chay) để đưa đúng khay.",
          "Vì vậy, khi Phòng IT và HCNS thẩm định phương án cho nhà ăn, việc chỉ nhìn vào công nghệ nhận diện là chưa đủ mà phải chấm điểm đồng thời trên 4 tiêu chí: (1) Tốc độ thông qua mỗi làn phát cơm, (2) Độ ổn định trong môi trường xưởng sản xuất, (3) Khả năng chốt số lượng từng món trước giờ nấu, và (4) Chi phí đầu tư – bảo trì trên mỗi quầy.",
        ],
      },
      {
        heading:
          "2. Bảng đối chiếu trực diện 4 phương pháp kiểm soát nhà ăn hiện nay",
        paragraphs: [
          "Bảng tổng hợp dưới đây đúc kết từ thực tế vận hành tại các nhà máy cơ khí, may mặc, điện tử, thuỷ sản và chế biến gỗ tại các khu công nghiệp:",
        ],
        table: {
          caption:
            "So sánh thực tế 4 phương pháp quản lý phát suất ăn tại nhà máy sản xuất",
          headers: [
            "Tiêu chí đánh giá",
            "Phiếu ăn giấy / Sổ ký",
            "Đầu đọc Vân tay",
            "Camera Khuôn mặt (FaceID)",
            "Quẹt thẻ nhân viên + Đặt món GoEat",
          ],
          rows: [
            [
              "Tốc độ mỗi lượt lấy cơm",
              "2 – 4 giây (thu phiếu, xé cuống)",
              "2 – 5 giây (dễ phải đặt lại ngón tay)",
              "1 – 2 giây (cần đứng đúng tầm camera)",
              "< 0,5 giây (chạm thẻ qua đầu đọc)",
            ],
            [
              "Độ ổn định môi trường xưởng",
              "Phiếu dễ rách, ướt, thất lạc",
              "Kém với xưởng cơ khí, dầu mỡ, hoá chất, thuỷ sản",
              "Nhạy cảm ngược sáng; chi phí thay thế cao khi ẩm hỏng",
              "Rất bền; đầu đọc USB kín, không phụ thuộc da tay hay ánh sáng",
            ],
            [
              "Báo trước số nấu từng món cho bếp",
              "Không (phải đếm tay báo riêng)",
              "Không (chỉ ghi nhận lúc đến ăn)",
              "Không nếu chỉ lắp thiết bị chấm công rời",
              "Tự chốt số mặn, chay, thay thế trước giờ nấu",
            ],
            [
              "Hiển thị tên món cho người múc cơm",
              "Phải in phiếu màu khác nhau",
              "Không hiển thị hoặc màn hình quá nhỏ",
              "Thường chỉ hiện trên màn hình nhỏ phía người ăn",
              "Màn hình quay về phía bếp hiện chữ to rõ tên món",
            ],
            [
              "Chi phí phần cứng mỗi làn phát",
              "0đ (nhưng tốn chi phí in phiếu hàng tháng)",
              "3 – 6 triệu đồng / máy",
              "8 – 20 triệu đồng / thiết bị chuyên dụng",
              "Chỉ cần 1 máy đọc thẻ USB phổ thông + màn hình/tablet sẵn có",
            ],
          ],
        },
        figure: {
          src: "/images/goeat-quay-nhan-mon.jpg",
          alt: "Lắp đặt thực tế máy tính bảng và đầu đọc thẻ nhân viên tại quầy phát cơm nhà máy",
          caption:
            "Bố trí gọn nhẹ thực tế tại quầy phát cơm nhà máy: một màn hình hiển thị món ăn và một đầu đọc thẻ nhân viên đặt ngay đầu chuyền.",
        },
      },
      {
        heading:
          "3. Khi nào nên chọn mô hình Quẹt thẻ nhân viên kết hợp đặt món tuần?",
        paragraphs: [
          "Hầu hết các nhà máy trong khu công nghiệp hiện nay đều đã trang bị thẻ nhân viên tích hợp chip RFID (125KHz) hoặc Mifare (13.56MHz) để mở cổng an ninh và chấm công. Việc tận dụng chính chiếc thẻ đang đeo trên cổ công nhân giúp doanh nghiệp tiết kiệm hàng chục triệu đồng tiền mua thiết bị sinh trắc học mới và không mất công thu thập lại dữ liệu khuôn mặt hay vân tay.",
        ],
        bullets: [
          {
            title: "Phù hợp cho nhà máy từ 100 đến trên 2.000 lao động",
            detail:
              "Mỗi quầy múc cơm gắn 1 đầu đọc thẻ riêng biệt. Với tốc độ quẹt dưới 0,5 giây, một làn phát cơm giải phóng 25–30 người mỗi phút mà không bị nghẽn hàng.",
          },
          {
            title:
              "Linh hoạt mở rộng Kiosk tại xưởng và tích hợp API chấm công",
            detail:
              "Khi quy mô nhà máy tăng lên hoặc muốn công nhân không dùng điện thoại tự chọn món, doanh nghiệp chỉ cần bổ sung màn hình cảm ứng Kiosk ở lối ra xưởng và nối API đồng bộ danh sách nhân sự từ phần mềm HRM mà không phải thay đổi quy trình tại quầy ăn.",
          },
        ],
      },
    ],
  },
] as const

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return GUIDES.find((g) => g.slug === slug)
}

export function GoEatGuidesIndexPage() {
  return (
    <div className="sysdark:bg-[#08090B] sysdark:text-[#F5F7FA] sysdark:selection:bg-[#2563EB] min-h-dvh bg-white text-[#0B1220] antialiased selection:bg-[#1D4ED8] selection:text-white">
      <GoEatHeader active="Cẩm nang" />

      <div>
        <div aria-hidden="true" className="h-[76px]" />
        <div className="relative overflow-x-clip">
          <GuideRails />

          {/* Đầu trang Cẩm nang chuẩn Swiss-grid */}
          <section className="sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] pt-12 pb-10 lg:pt-16 lg:pb-12">
            <RailMarks />
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
              <div className="max-w-2xl">
                <Eyebrow index="01">Cẩm nang vận hành B2B</Eyebrow>
                <h1
                  className="sysdark:text-[#F5F7FA] mt-2.5 font-semibold tracking-[-0.02em] [text-wrap:balance] text-[#0B1220]"
                  style={HEADING_STYLE}
                >
                  Nghiệp vụ quản lý suất ăn công nghiệp &amp; nhà ăn nhà máy
                </h1>
                <p className="sysdark:text-[#A3AAB8] mt-2.5 text-sm leading-relaxed text-[#4B5565] sm:text-base">
                  Tài liệu thực tiễn dành cho Trưởng phòng HCNS, Kế toán, IT nhà
                  máy và Đơn vị thầu bếp: quy trình chống thất thoát suất ăn ảo,
                  xử lý ngoại lệ không phiếu giấy và chuẩn hoá biên bản đối soát
                  cuối kỳ.
                </p>
              </div>
              <Link
                href={BROCHURE_HREF}
                className="sysdark:border-[#262B33] sysdark:bg-[#111317] sysdark:text-[#E6E9EF] sysdark:hover:border-[#3B82F6] sysdark:hover:text-[#6EA8FF] inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[#D6DCE6] bg-white px-4 py-2.5 font-mono text-xs font-semibold text-[#1F2937] uppercase transition-colors hover:border-[#1D4ED8] hover:text-[#1D4ED8]"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" />
                Hồ sơ giải pháp (In A4 / PDF)
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>

          {/* Danh sách bài viết kẻ khung kiến trúc (ăn khớp GuideRails) */}
          <section className="sysdark:border-[#1F232A] relative border-b border-[#E3E7EE]">
            <RailMarks />
            <div className="sysdark:divide-[#1F232A] mx-auto max-w-6xl divide-y divide-[#E3E7EE]">
              {GUIDES.map((g, idx) => (
                <article
                  key={g.slug}
                  className="group grid grid-cols-1 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-10 lg:px-8 lg:py-12"
                >
                  <div className="lg:col-span-3">
                    <p className="tnum sysdark:text-[#6EA8FF] font-mono text-xs font-semibold tracking-[0.06em] text-[#1D4ED8] uppercase">
                      [{String(idx + 1).padStart(2, "0")}] · {g.category}
                    </p>
                    <p className="tnum sysdark:text-[#8B93A3] mt-1 font-mono text-xs text-[#5B6475]">
                      {g.readTime} · Gói {g.recommendedPlan}
                    </p>
                    <p className="sysdark:text-[#8B93A3] mt-4 text-xs text-[#5B6475]">
                      Phân hệ áp dụng:{" "}
                      <Link
                        href={`${FEATURES_HREF}#${g.relatedFeatureId}`}
                        className="sysdark:text-[#E6E9EF] sysdark:decoration-[#343A44] sysdark:hover:decoration-[#6EA8FF] font-medium text-[#1F2937] underline decoration-[#C9D0DC] underline-offset-4 hover:decoration-[#1D4ED8]"
                      >
                        {g.relatedFeatureName}
                      </Link>
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    <h2 className="sysdark:text-[#F5F7FA] text-xl leading-snug font-bold text-[#0B1220] sm:text-2xl">
                      <Link
                        href={`${GUIDES_PATH}/${g.slug}`}
                        className="sysdark:hover:text-[#6EA8FF] transition-colors hover:text-[#1D4ED8]"
                      >
                        {g.title}
                      </Link>
                    </h2>
                    <p className="sysdark:text-[#A3AAB8] mt-2.5 text-sm leading-relaxed text-[#4B5565]">
                      {g.description}
                    </p>
                    <div className="mt-4">
                      <Link
                        href={`${GUIDES_PATH}/${g.slug}`}
                        className="sysdark:text-[#6EA8FF] inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#1D4ED8] uppercase hover:underline"
                      >
                        Đọc bài hướng dẫn
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <Link
                      href={`${GUIDES_PATH}/${g.slug}`}
                      className="sysdark:border-[#262B33] sysdark:bg-[#111317] sysdark:group-hover:border-[#3B82F6] block overflow-hidden rounded-lg border border-[#D6DCE6] bg-white transition-colors group-hover:border-[#1D4ED8]"
                    >
                      <div className="sysdark:border-[#1F232A] sysdark:bg-[#16191E] flex h-6 items-center justify-between border-b border-[#E3E7EE] bg-[#F4F6FA] px-2.5">
                        <div className="flex items-center gap-1">
                          <span className="sysdark:bg-[#343A44] h-2 w-2 rounded-full bg-[#D6DCE6]" />
                          <span className="sysdark:bg-[#343A44] h-2 w-2 rounded-full bg-[#D6DCE6]" />
                          <span className="sysdark:bg-[#343A44] h-2 w-2 rounded-full bg-[#D6DCE6]" />
                        </div>
                        <span className="tnum sysdark:text-[#8B93A3] font-mono text-[10px] text-[#5B6475]">
                          goeat.vn · #{g.relatedFeatureId}
                        </span>
                      </div>
                      <Image
                        src={g.heroImage}
                        alt={g.heroAlt}
                        width={1280}
                        height={720}
                        sizes="(min-width: 1024px) 340px, 100vw"
                        className="block aspect-video w-full bg-white object-cover object-center"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <TryDemoBand />
        </div>
      </div>

      <GoEatFooter />
    </div>
  )
}

export function GoEatGuideDetailPage({ article }: { article: GuideArticle }) {
  const otherGuides = GUIDES.filter((g) => g.slug !== article.slug)

  return (
    <div className="sysdark:bg-[#08090B] sysdark:text-[#F5F7FA] sysdark:selection:bg-[#2563EB] min-h-dvh bg-white text-[#0B1220] antialiased selection:bg-[#1D4ED8] selection:text-white">
      <GoEatHeader active="Cẩm nang" />

      <div>
        <div aria-hidden="true" className="h-[76px]" />
        <div className="relative overflow-x-clip">
          <GuideRails />

          {/* Đầu bài viết chuẩn Editorial, ăn khớp khung max-w-6xl */}
          <header className="sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] pt-10 pb-10 lg:pt-14 lg:pb-12">
            <RailMarks />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl">
                <p className="tnum sysdark:text-[#8B93A3] font-mono text-xs text-[#5B6475]">
                  <Link
                    href={GUIDES_PATH}
                    className="sysdark:text-[#6EA8FF] font-semibold text-[#1D4ED8] hover:underline"
                  >
                    Cẩm nang
                  </Link>
                  {" / "}
                  <span>{article.category}</span>
                  {" · "}
                  <span>{article.readTime}</span>
                  {" · "}
                  <span>Cập nhật {article.publishedAt}</span>
                </p>

                <h1
                  className="sysdark:text-[#F5F7FA] mt-3.5 font-semibold tracking-[-0.02em] [text-wrap:balance] text-[#0B1220]"
                  style={HEADING_STYLE}
                >
                  {article.title}
                </h1>

                <p className="sysdark:text-[#A3AAB8] mt-3 max-w-3xl text-base leading-relaxed text-[#4B5565]">
                  {article.description}
                </p>
              </div>
            </div>
          </header>

          {/* Nội dung bài viết: Bố cục 2 cột Editorial (8 cột nội dung + 4 cột mục lục dính) */}
          <article className="sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] py-10 lg:py-14">
            <RailMarks />
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-12 lg:px-8">
              {/* Cột đọc chính (8/12) */}
              <div className="lg:col-span-8">
                <figure className="sysdark:border-[#262B33] sysdark:bg-[#111317] overflow-hidden rounded-lg border border-[#D6DCE6] bg-white">
                  <div className="sysdark:border-[#1F232A] sysdark:bg-[#16191E] flex h-8 items-center justify-between border-b border-[#E3E7EE] bg-[#F4F6FA] px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="sysdark:bg-[#343A44] h-2.5 w-2.5 rounded-full bg-[#D6DCE6]" />
                      <span className="sysdark:bg-[#343A44] h-2.5 w-2.5 rounded-full bg-[#D6DCE6]" />
                      <span className="sysdark:bg-[#343A44] h-2.5 w-2.5 rounded-full bg-[#D6DCE6]" />
                    </div>
                    <span className="tnum sysdark:text-[#8B93A3] font-mono text-[11px] text-[#5B6475]">
                      goeat.vn · #{article.relatedFeatureId}
                    </span>
                  </div>
                  <Image
                    src={article.heroImage}
                    alt={article.heroAlt}
                    width={1440}
                    height={810}
                    priority
                    sizes="(min-width: 1024px) 768px, 100vw"
                    className="block aspect-video w-full bg-white object-cover object-center"
                  />
                  <figcaption className="sysdark:border-[#1F232A] sysdark:bg-[#0E1014] sysdark:text-[#8B93A3] border-t border-[#E3E7EE] bg-[#F7F9FC] px-4 py-2.5 text-xs text-[#5B6475]">
                    {article.heroAlt}
                  </figcaption>
                </figure>

                {/* Hộp Tóm tắt cốt lõi phẳng 1px */}
                <div className="sysdark:border-[#1F232A] sysdark:bg-[#0E1014] mt-8 border border-[#E3E7EE] bg-[#F7F9FC]">
                  <div className="sysdark:border-[#1F232A] flex items-center justify-between border-b border-[#E3E7EE] px-5 py-2.5">
                    <span className="tnum sysdark:text-[#6EA8FF] font-mono text-xs font-semibold tracking-[0.06em] text-[#1D4ED8] uppercase">
                      Tóm tắt cốt lõi
                    </span>
                    <span className="tnum sysdark:text-[#8B93A3] font-mono text-xs text-[#5B6475]">
                      {article.keyTakeaways.length} điểm chính
                    </span>
                  </div>
                  <ul className="sysdark:divide-[#1F232A] sysdark:text-[#E6E9EF] divide-y divide-[#E3E7EE] px-5 text-sm leading-relaxed text-[#1F2937]">
                    {article.keyTakeaways.map((point, idx) => (
                      <li key={point} className="flex items-start gap-3 py-3">
                        <span className="tnum sysdark:text-[#6EA8FF] mt-0.5 font-mono text-xs font-semibold text-[#1D4ED8]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 space-y-11">
                  {article.sections.map((sec, idx) => (
                    <section
                      key={sec.heading}
                      id={`muc-${idx + 1}`}
                      className="scroll-mt-24 space-y-3.5"
                    >
                      <h2 className="sysdark:text-[#F5F7FA] text-xl leading-snug font-bold text-[#0B1220] sm:text-2xl">
                        {sec.heading}
                      </h2>
                      {sec.paragraphs.map((p) => (
                        <p
                          key={p}
                          className="sysdark:text-[#E6E9EF] max-w-[68ch] text-[15px] leading-relaxed text-[#1F2937]"
                        >
                          {p}
                        </p>
                      ))}
                      {sec.bullets ? (
                        <dl className="sysdark:border-[#1F232A] sysdark:divide-[#1F232A] sysdark:bg-[#0E1014]/70 mt-4 divide-y divide-[#E3E7EE] border border-[#E3E7EE] bg-[#F7F9FC]/70 px-5">
                          {sec.bullets.map((b) => (
                            <div key={b.title} className="py-3.5">
                              <dt className="sysdark:text-[#F5F7FA] text-sm font-semibold text-[#0B1220]">
                                {b.title}
                              </dt>
                              <dd className="sysdark:text-[#A3AAB8] mt-1 text-sm leading-relaxed text-[#4B5565]">
                                {b.detail}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      ) : null}
                      {sec.table ? (
                        <div className="sysdark:border-[#1F232A] mt-5 overflow-x-auto rounded-lg border border-[#D6DCE6]">
                          <table className="w-full min-w-[560px] text-left text-xs sm:text-sm">
                            {sec.table.caption ? (
                              <caption className="sysdark:border-[#1F232A] sysdark:bg-[#0E1014] sysdark:text-[#8B93A3] border-b border-[#E3E7EE] bg-[#F7F9FC] px-4 py-2 text-left font-mono text-[11px] text-[#5B6475]">
                                {sec.table.caption}
                              </caption>
                            ) : null}
                            <thead>
                              <tr className="sysdark:bg-[#111317] bg-[#F4F6FA]">
                                {sec.table.headers.map((h) => (
                                  <th
                                    key={h}
                                    scope="col"
                                    className="sysdark:border-[#1F232A] sysdark:text-[#F5F7FA] border-b border-[#E3E7EE] px-3.5 py-3 font-semibold text-[#0B1220]"
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {sec.table.rows.map((row) => (
                                <tr
                                  key={row[0]}
                                  className="sysdark:border-[#1F232A] border-t border-[#E3E7EE]"
                                >
                                  {row.map((cell, cIdx) => (
                                    <td
                                      key={`${row[0]}-${cIdx}`}
                                      className={`px-3.5 py-3 align-top leading-relaxed ${
                                        cIdx === 0
                                          ? "sysdark:text-[#F5F7FA] font-semibold text-[#0B1220]"
                                          : "sysdark:text-[#C9CED8] text-[#374151]"
                                      }`}
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : null}
                      {sec.figure ? (
                        <figure className="sysdark:border-[#262B33] sysdark:bg-[#111317] mt-5 overflow-hidden rounded-lg border border-[#D6DCE6] bg-white">
                          <Image
                            src={sec.figure.src}
                            alt={sec.figure.alt}
                            width={1280}
                            height={720}
                            sizes="(min-width: 1024px) 768px, 100vw"
                            className="block aspect-video w-full bg-white object-cover object-center"
                          />
                          <figcaption className="sysdark:border-[#1F232A] sysdark:bg-[#0E1014] sysdark:text-[#8B93A3] border-t border-[#E3E7EE] bg-[#F7F9FC] px-4 py-2.5 text-xs text-[#5B6475]">
                            {sec.figure.caption}
                          </figcaption>
                        </figure>
                      ) : null}
                    </section>
                  ))}
                </div>
              </div>

              {/* Cột bên phải dính (4/12): Mục lục & Thẻ chuyển đổi phân hệ */}
              <aside className="space-y-5 lg:sticky lg:top-24 lg:col-span-4">
                <nav
                  aria-label="Mục lục bài viết"
                  className="sysdark:border-[#1F232A] sysdark:bg-[#0E1014] rounded-lg border border-[#E3E7EE] bg-[#F7F9FC] p-5"
                >
                  <p className="sysdark:text-[#8B93A3] font-mono text-[11px] font-semibold tracking-[0.08em] text-[#5B6475] uppercase">
                    Trên trang này
                  </p>
                  <ol className="mt-3 space-y-2.5 text-sm">
                    {article.sections.map((sec, idx) => (
                      <li key={sec.heading}>
                        <a
                          href={`#muc-${idx + 1}`}
                          className="sysdark:text-[#A3AAB8] sysdark:hover:text-[#6EA8FF] flex items-start gap-2 leading-snug text-[#4B5565] transition-colors hover:text-[#1D4ED8]"
                        >
                          <span className="tnum sysdark:text-[#6B7280] mt-0.5 font-mono text-xs text-[#8B93A3]">
                            0{idx + 1}
                          </span>
                          <span>{sec.heading.replace(/^\d+\.\s*/, "")}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="sysdark:border-[#262B33] sysdark:bg-[#111317] rounded-lg border border-[#D6DCE6] bg-white p-5">
                  <p className="sysdark:text-[#6EA8FF] font-mono text-[11px] font-semibold tracking-[0.08em] text-[#1D4ED8] uppercase">
                    Phân hệ áp dụng trực tiếp
                  </p>
                  <h3 className="sysdark:text-[#F5F7FA] mt-1.5 text-base font-bold text-[#0B1220]">
                    {article.relatedFeatureName}
                  </h3>
                  <p className="sysdark:text-[#8B93A3] mt-1 text-xs leading-relaxed text-[#5B6475]">
                    Triển khai sẵn từ gói{" "}
                    <b className="sysdark:text-[#E6E9EF] font-semibold text-[#1F2937]">
                      {article.recommendedPlan}
                    </b>{" "}
                    trên hệ thống GoEat.
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <Link
                      href={TRY_DEMO_HREF}
                      className="sysdark:bg-[#2563EB] sysdark:hover:bg-[#3B82F6] inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-md bg-[#1D4ED8] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1E40AF]"
                    >
                      Dùng thử 7 ngày trên dữ liệu mẫu
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href={`${FEATURES_HREF}#${article.relatedFeatureId}`}
                      className="sysdark:border-[#343A44] sysdark:text-[#E6E9EF] sysdark:hover:border-[#3B82F6] inline-flex min-h-[40px] items-center justify-center rounded-md border border-[#C9D0DC] px-4 py-2 text-xs font-semibold text-[#1F2937] transition-colors hover:border-[#1D4ED8] hover:text-[#1D4ED8]"
                    >
                      Xem chi tiết màn hình chức năng
                    </Link>
                    <Link
                      href={BROCHURE_HREF}
                      className="sysdark:text-[#6EA8FF] inline-flex min-h-[36px] items-center justify-center gap-1.5 pt-1 text-xs font-semibold text-[#1D4ED8] hover:underline"
                    >
                      <FileSpreadsheet className="h-3.5 w-3.5" />
                      Tải Hồ sơ giải pháp PDF (A4)
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </article>

          {/* Bài viết khác */}
          <section className="sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] py-12 lg:py-14">
            <RailMarks />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <Eyebrow>Bài viết khác trong cẩm nang</Eyebrow>
              <div className="sysdark:border-[#1F232A] sysdark:divide-[#1F232A] mt-6 grid grid-cols-1 divide-y divide-[#E3E7EE] border-t border-[#E3E7EE] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                {otherGuides.map((g, i) => (
                  <Link
                    key={g.slug}
                    href={`${GUIDES_PATH}/${g.slug}`}
                    className={`group block py-6 ${
                      i === 0 ? "lg:pr-6" : i === 1 ? "lg:px-6" : "lg:pl-6"
                    }`}
                  >
                    <p className="tnum sysdark:text-[#8B93A3] font-mono text-xs text-[#5B6475]">
                      {g.category} · {g.readTime}
                    </p>
                    <h3 className="sysdark:text-[#F5F7FA] sysdark:group-hover:text-[#6EA8FF] mt-2 text-base leading-snug font-bold text-[#0B1220] transition-colors group-hover:text-[#1D4ED8]">
                      {g.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <TryDemoBand />
        </div>
      </div>

      <GoEatFooter />
    </div>
  )
}
