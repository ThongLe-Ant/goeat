/** Bản demo chạy thật (app GoEat với dữ liệu mẫu, DB riêng) — repo
 * tanloc-spartronics deploy thêm một bản với DEMO_MODE=true. */
export const DEMO_ORIGIN = (
  process.env.NEXT_PUBLIC_DEMO_URL || "https://demo.goeat.vn"
).replace(/\/+$/, "")

/** Cấp tài khoản demo theo email (POST JSON, có CORS cho goeat.vn). */
export const DEMO_ACCOUNTS_API = `${DEMO_ORIGIN}/api/public/demo-accounts`

/** Đăng nhập sẵn bằng tài khoản vừa cấp (POST form, chuyển trang). */
export const DEMO_LOGIN_URL = `${DEMO_ORIGIN}/api/public/demo-login`

/** Trang đăng nhập tay của bản demo. */
export const DEMO_SIGN_IN_URL = `${DEMO_ORIGIN}/vi/sign-in`

/** Trang nhận tài khoản demo trên goeat.vn — mọi nút "Dùng thử" trỏ về đây. */
export const TRY_DEMO_HREF = "/dung-thu"
