"use client"

import { usePathname } from "next/navigation"
import Script from "next/script"
import { useEffect } from "react"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ""
const GADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || ""
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || ""

const PRIMARY_GTAG_ID = GA_ID || GADS_ID

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

function getContentCategory(pathname: string): string | null {
  if (pathname.startsWith("/cam-nang/")) return "guide_article"
  if (pathname === "/cam-nang") return "guide_hub"
  if (pathname.startsWith("/ho-so-giai-phap")) return "solution_brochure"
  if (pathname.startsWith("/dung-thu")) return "demo_signup"
  if (pathname.startsWith("/chuc-nang")) return "features_detail"
  return null
}

/** Gọi khi khách tạo thành công tài khoản dùng thử 7 ngày tại /dung-thu. */
export function trackGoEatDemoLead(kind?: "new" | "renewed" | "existing") {
  if (typeof window === "undefined") return
  if (typeof window.fbq === "function") {
    window.fbq("track", "StartTrial", {
      content_name: "goeat_7day_demo",
      status: kind || "new",
    })
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      event_category: "demo_signup",
      event_label: kind || "new",
    })
  }
}

export function GoEatAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return

    // Các thẻ <Script> bên dưới là con trực tiếp của GoEatAnalytics nên effect
    // của <Script> khởi tạo stub hàng đợi window.fbq trước khi ViewContent chạy.
    // Không gọi thủ công fbq("track", "PageView") hay gtag("config", ...) khi đổi
    // route SPA vì fbevents.js và GA4 Enhanced Measurement đã tự theo dõi pushState.
    const category = getContentCategory(pathname)
    if (category && typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", {
        content_category: category,
        content_ids: [pathname],
      })
    }
  }, [pathname])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest("a")
      if (!target) return
      const href = target.getAttribute("href") || ""

      let channel: "zalo" | "phone" | "email" | null = null
      if (href.includes("zalo.me")) channel = "zalo"
      else if (href.startsWith("tel:")) channel = "phone"
      else if (href.startsWith("mailto:")) channel = "email"

      if (!channel) return

      if (typeof window.gtag === "function") {
        window.gtag("event", "goeat_contact_click", {
          event_category: "engagement",
          event_label: channel,
          contact_channel: channel,
          page_path: window.location.pathname,
        })
      }
      if (typeof window.fbq === "function") {
        window.fbq("track", "Contact", {
          content_name: channel,
          content_category: window.location.pathname,
        })
      }
    }

    document.addEventListener("click", onClick, { passive: true })
    return () => document.removeEventListener("click", onClick)
  }, [])

  return (
    <>
      {PRIMARY_GTAG_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${PRIMARY_GTAG_ID}`}
            strategy="afterInteractive"
          />
          <Script id="goeat-gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              ${GA_ID ? `gtag('config', '${GA_ID}');` : ""}
              ${GADS_ID ? `gtag('config', '${GADS_ID}');` : ""}
            `}
          </Script>
        </>
      ) : null}

      {FB_PIXEL_ID ? (
        <>
          <Script id="goeat-fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      ) : null}
    </>
  )
}
