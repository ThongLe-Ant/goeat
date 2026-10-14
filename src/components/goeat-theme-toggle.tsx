"use client"

import { useSyncExternalStore } from "react"
import { Monitor, Moon, Sun } from "lucide-react"

/* Chọn giao diện cho trang giới thiệu: theo máy (mặc định), sáng, tối.
 * Lựa chọn ghi vào <html data-goeat-theme> và localStorage; biến thể
 * `sysdark:` trong globals.css đọc thuộc tính đó. */

const STORAGE_KEY = "goeat-theme"

type ThemeChoice = "system" | "light" | "dark"

const OPTIONS = [
  { value: "system", label: "Theo hệ thống", icon: Monitor },
  { value: "light", label: "Sáng", icon: Sun },
  { value: "dark", label: "Tối", icon: Moon },
] as const

/** Đặt thuộc tính trước khi trang hiện ra để không nháy màu khi tải lại. */
export const GOEAT_THEME_SCRIPT = `try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.goeatTheme=t}catch(e){}`

function read(): ThemeChoice {
  const t = document.documentElement.dataset.goeatTheme
  return t === "light" || t === "dark" ? t : "system"
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-goeat-theme"],
  })
  return () => observer.disconnect()
}

function apply(choice: ThemeChoice) {
  const root = document.documentElement
  try {
    if (choice === "system") localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    /* trình duyệt chặn lưu: vẫn đổi được trong lần xem này */
  }
  if (choice === "system") delete root.dataset.goeatTheme
  else root.dataset.goeatTheme = choice
}

export function GoEatThemeToggle({ className = "" }: { className?: string }) {
  const current = useSyncExternalStore(subscribe, read, () => "system")

  return (
    <div
      role="radiogroup"
      aria-label="Giao diện"
      className={`inline-flex items-center gap-0.5 rounded-full border border-[#E3E7EE] p-0.5 sysdark:border-[#262B33] ${className}`}
    >
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const on = current === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={label}
            title={label}
            onClick={() => apply(value)}
            className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
              on
                ? "bg-[#EAF1FF] text-[#1D4ED8] sysdark:bg-[#1F232A] sysdark:text-white"
                : "text-[#6B7485] hover:text-[#0B1220] sysdark:text-[#8B93A3] sysdark:hover:text-white"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        )
      })}
    </div>
  )
}
