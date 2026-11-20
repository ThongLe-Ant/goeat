"use client"

import { useEffect, useState } from "react"

import type { ReactNode } from "react"

/**
 * Khung thanh đầu trang dạng nổi bo tròn: nằm đè lên nội dung (cao 0 trong
 * luồng trang), cách mép trên 12px; cuộn xuống thì thu hẹp lại và đậm nền hơn.
 */
export function GoEatHeaderShell({
  wide,
  children,
}: {
  wide: boolean
  children: ReactNode
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const width = scrolled ? "max-w-5xl" : wide ? "max-w-[1400px]" : "max-w-6xl"

  return (
    <div className="sticky top-0 z-30 h-0">
      <div className="px-3 pt-3 sm:px-4">
        <header
          className={`relative mx-auto flex h-14 ${width} items-center justify-between gap-4 rounded-2xl border px-3 pl-4 transition-all duration-300 sm:px-4 sm:pl-5 ${
            scrolled
              ? "sysdark:border-[#262B33] sysdark:bg-[#0E1014]/85 sysdark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.28)] border-[#D6DCE6] bg-white/90 shadow-[0_10px_30px_-12px_rgba(11,18,32,0.28)] backdrop-blur-md"
              : "sysdark:border-white/10 sysdark:bg-[#0E1014]/90 sysdark:shadow-[0_8px_24px_-14px_rgba(0,0,0,0.35)] border-white/60 bg-white/95 shadow-[0_8px_24px_-14px_rgba(11,18,32,0.35)] backdrop-blur-sm"
          }`}
        >
          {children}
        </header>
      </div>
    </div>
  )
}
