"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { GoEatThemeToggle } from "./goeat-theme-toggle"

/** Menu cho màn hình hẹp: thanh điều hướng ở đầu trang bị ẩn dưới md. */
export function GoEatMobileMenu({
  links,
  active,
}: {
  links: ReadonlyArray<{ href: string; label: string }>
  active?: string
}) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="goeat-mobile-menu"
        aria-label={open ? "Đóng menu" : "Mở menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#111827] sysdark:text-[#E6E9EF] hover:bg-[#F1F4F9] sysdark:hover:bg-[#111317]/5"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <nav
          id="goeat-mobile-menu"
          aria-label="Điều hướng trang giới thiệu"
          className="absolute inset-x-0 top-[calc(100%+8px)] rounded-2xl border border-[#E3E7EE] sysdark:border-[#1F232A] bg-white sysdark:bg-[#111317] px-4 pb-2 shadow-[0_12px_24px_-12px_rgba(11,18,32,0.25)] sysdark:shadow-[0_12px_24px_-12px_rgba(0,0,0,0.25)]"
        >
          <ul className="divide-y divide-[#EEF1F6] sysdark:divide-[#1F232A]">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={close}
                  aria-current={active === l.label ? "page" : undefined}
                  className="block py-3 text-base font-medium text-[#1F2937] sysdark:text-[#E6E9EF] aria-[current=page]:font-semibold aria-[current=page]:text-[#1D4ED8] sysdark:aria-[current=page]:text-[#6EA8FF]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#dang-ky"
                onClick={close}
                className="block py-3 text-base font-medium text-[#1F2937] sysdark:text-[#E6E9EF]"
              >
                Liên hệ tư vấn
              </Link>
            </li>
            <li className="flex items-center justify-between py-3">
              <span className="text-base font-medium text-[#1F2937] sysdark:text-[#E6E9EF]">
                Giao diện
              </span>
              <GoEatThemeToggle />
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}
