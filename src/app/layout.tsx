import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"

import { SITE_URL } from "@/components/goeat-seo"

import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "GoEat", template: "%s | GoEat" },
  icons: { icon: "/images/logos/goeat_logo.png" },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1D4ED8" },
    { media: "(prefers-color-scheme: dark)", color: "#08090B" },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <main className="min-h-screen w-full">{children}</main>
      </body>
    </html>
  )
}
