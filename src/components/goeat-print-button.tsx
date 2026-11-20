"use client"

import { Printer } from "lucide-react"

export function GoEatPrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="sysdark:border-[#3B82F6] sysdark:bg-[#2563EB] sysdark:hover:bg-[#3B82F6] inline-flex items-center gap-1.5 rounded-md border border-[#1D4ED8] bg-[#1D4ED8] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1E40AF] active:scale-[0.98]"
    >
      <Printer className="h-3.5 w-3.5" />
      In / Lưu PDF (A4)
    </button>
  )
}
