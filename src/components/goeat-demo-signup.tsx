"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Check, Copy, KeyRound, Loader2 } from "lucide-react"

import {
  DEMO_ACCOUNTS_API,
  DEMO_LOGIN_URL,
  DEMO_SIGN_IN_URL,
} from "./demo-url"

/* ============================================================================
 * Form "Nhận tài khoản demo": khách nhập email → bản demo cấp một tài khoản
 * riêng có hạn (mỗi email một tài khoản, hết hạn nhập lại là được cấp lại).
 * API ở tanloc-spartronics: /api/public/demo-accounts.
 * ========================================================================== */

interface IssuedAccount {
  username: string
  password: string
  expiresAt: string
  kind: "new" | "renewed" | "existing"
}

/** Giữ tài khoản vừa cấp khi khách tải lại trang (chỉ trong tab này). */
const STORAGE_KEY = "goeat-demo-account"

const INPUT =
  "mt-1.5 block w-full rounded-lg border border-[#D6DCE6] sysdark:border-[#262B33] bg-white sysdark:bg-[#0E1014] px-3.5 py-2.5 text-[15px] text-[#0B1220] sysdark:text-[#F5F7FA] placeholder:text-[#9AA3B2] sysdark:placeholder:text-[#5B6372] focus:border-[#1D4ED8] sysdark:focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20"

const LABEL = "block text-sm font-medium text-[#1F2937] sysdark:text-[#E6E9EF]"

function formatExpiry(iso: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(iso))
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div>
      <dt className="text-xs font-medium text-[#5B6577] sysdark:text-[#8B93A1]">
        {label}
      </dt>
      <dd className="mt-1 flex items-center justify-between gap-2 rounded-lg border border-[#D6DCE6] sysdark:border-[#262B33] bg-[#F7F9FC] sysdark:bg-[#0E1014] py-1.5 pr-1.5 pl-3.5">
        <span className="font-mono text-base font-semibold tracking-wide break-all text-[#0B1220] sysdark:text-[#F5F7FA]">
          {value}
        </span>
        <button
          type="button"
          onClick={() => {
            void navigator.clipboard?.writeText(value).then(() => {
              setCopied(true)
              setTimeout(() => setCopied(false), 1500)
            })
          }}
          className="inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-md px-2.5 text-xs font-semibold text-[#1D4ED8] sysdark:text-[#6EA8FF] hover:bg-[#EAF1FF] sysdark:hover:bg-[#16203A]"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Đã chép" : "Chép"}
        </button>
      </dd>
    </div>
  )
}

export function GoEatDemoSignup() {
  const [account, setAccount] = useState<IssuedAccount | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (!saved) return
      const parsed = JSON.parse(saved) as IssuedAccount
      if (new Date(parsed.expiresAt) > new Date()) setAccount(parsed)
    } catch {
      // Trình duyệt chặn bộ nhớ: khách chỉ phải nhập lại email.
    }
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setPending(true)
    setError(null)
    try {
      const res = await fetch(DEMO_ACCOUNTS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          name: form.get("name") || null,
          company: form.get("company") || null,
          phone: form.get("phone") || null,
        }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.username) {
        setError(
          data?.message ||
            "Chưa cấp được tài khoản demo, vui lòng thử lại sau ít phút."
        )
        return
      }
      const issued: IssuedAccount = {
        username: data.username,
        password: data.password,
        expiresAt: data.expiresAt,
        kind: data.kind,
      }
      setAccount(issued)
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(issued))
      } catch {
        // Không lưu được thì thôi, tài khoản vẫn hiện trên màn hình.
      }
    } catch {
      setError(
        "Không kết nối được tới bản demo. Vui lòng kiểm tra mạng rồi thử lại."
      )
    } finally {
      setPending(false)
    }
  }

  if (account) {
    return (
      <div className="rounded-2xl border border-[#D6DCE6] sysdark:border-[#262B33] bg-white sysdark:bg-[#12151B] p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF1FF] sysdark:bg-[#16203A] text-[#1D4ED8] sysdark:text-[#6EA8FF]">
            <KeyRound className="h-4.5 w-4.5" />
          </span>
          <h2 className="text-lg font-semibold text-[#0B1220] sysdark:text-[#F5F7FA]">
            {account.kind === "existing"
              ? "Tài khoản demo của bạn (đã đổi mật khẩu mới)"
              : account.kind === "renewed"
                ? "Đã cấp lại tài khoản demo"
                : "Tài khoản demo của bạn"}
          </h2>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <CopyField label="Tên đăng nhập" value={account.username} />
          <CopyField label="Mật khẩu" value={account.password} />
        </dl>
        <p className="tnum mt-4 text-sm text-[#4B5563] sysdark:text-[#A3ABB8]">
          Dùng được tới <strong>{formatExpiry(account.expiresAt)}</strong>. Hãy
          lưu lại tên đăng nhập và mật khẩu: trang này chỉ hiện chúng một lần.
        </p>

        <form
          action={DEMO_LOGIN_URL}
          method="post"
          target="_blank"
          className="mt-6 flex flex-wrap items-center gap-3"
        >
          <input type="hidden" name="username" value={account.username} />
          <input type="hidden" name="password" value={account.password} />
          <button
            type="submit"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#1D4ED8] sysdark:bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E40AF] sysdark:hover:bg-[#3B82F6]"
          >
            Vào demo ngay
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href={DEMO_SIGN_IN_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-[44px] items-center px-2 text-sm font-semibold text-[#1D4ED8] sysdark:text-[#6EA8FF] hover:underline"
          >
            Hoặc tự đăng nhập tại demo.goeat.vn
          </a>
        </form>

        <button
          type="button"
          onClick={() => {
            setAccount(null)
            try {
              sessionStorage.removeItem(STORAGE_KEY)
            } catch {
              // bỏ qua
            }
          }}
          className="mt-5 text-xs text-[#5B6577] sysdark:text-[#8B93A1] underline-offset-2 hover:underline"
        >
          Dùng email khác
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[#D6DCE6] sysdark:border-[#262B33] bg-white sysdark:bg-[#12151B] p-6 shadow-sm sm:p-8"
    >
      <h2 className="text-lg font-semibold text-[#0B1220] sysdark:text-[#F5F7FA]">
        Nhận tài khoản demo
      </h2>
      <p className="mt-1.5 text-sm text-[#4B5563] sysdark:text-[#A3ABB8]">
        Mỗi email được một tài khoản riêng. Hết hạn thì nhập lại email để được
        cấp lại.
      </p>

      <div className="mt-6 space-y-4">
        <label className={LABEL}>
          Email <span className="text-[#DC2626]">*</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="ban@congty.vn"
            className={INPUT}
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={LABEL}>
            Họ tên
            <input
              name="name"
              autoComplete="name"
              maxLength={120}
              className={INPUT}
            />
          </label>
          <label className={LABEL}>
            Số điện thoại
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={30}
              className={INPUT}
            />
          </label>
        </div>
        <label className={LABEL}>
          Đơn vị (công ty, căn-tin, cơ quan…)
          <input
            name="company"
            autoComplete="organization"
            maxLength={200}
            className={INPUT}
          />
        </label>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-[#FEF2F2] sysdark:bg-[#2A1215] px-3.5 py-2.5 text-sm text-[#B91C1C] sysdark:text-[#FCA5A5]"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#1D4ED8] sysdark:bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E40AF] sysdark:hover:bg-[#3B82F6] disabled:opacity-70"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {pending ? "Đang cấp tài khoản…" : "Nhận tài khoản demo"}
      </button>
      <p className="mt-3 text-xs text-[#5B6577] sysdark:text-[#8B93A1]">
        Thông tin chỉ dùng để cấp tài khoản và liên hệ tư vấn khi bạn cần.
      </p>
    </form>
  )
}
