# goeat-web

Trang giới thiệu sản phẩm GoEat — goeat.vn. Next.js độc lập, không phụ thuộc `@goerp/core`.

- `/` trang chủ, `/chuc-nang` chi tiết chức năng; `robots.txt`, `sitemap.xml`, `llms.txt`.
- Trang `/dung-thu`: khách nhập email → gọi `NEXT_PUBLIC_DEMO_URL/api/public/demo-accounts` (mặc định https://demo.goeat.vn) để nhận tài khoản demo riêng dùng 7 ngày; nút "Vào demo ngay" gửi form tới `/api/public/demo-login`. Hai route này nằm ở repo tanloc-spartronics, chỉ bật khi `DEMO_MODE=true`, và CORS phải có tên miền của trang này (`DEMO_ALLOWED_ORIGINS`).
- Cấu hình máy chủ demo hiện trên trang (2 CPU, 4 GB RAM, 10 GB, hạn 7 ngày) khai ở `DEMO_SERVER` trong `src/components/goeat-try-demo.tsx`; đổi hạn thì đổi cả env `DEMO_ACCOUNT_DAYS` bên bản demo.
- Giao diện sáng/tối: biến thể Tailwind `sysdark:` khai ở `src/app/globals.css`, công tắc ở `src/components/goeat-theme-toggle.tsx`.
- `public/images/chua-dung/`: ảnh chụp màn hình cũ chưa dùng tới, giữ lại để thay ảnh sau này.

```bash
pnpm install
pnpm dev        # http://localhost:3040
pnpm build && pnpm start
```

Biến môi trường: xem `.env.example`.
