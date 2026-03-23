"use client";

import { useEffect, useRef } from "react";

interface AdSenseBannerProps {
  adSlot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  className?: string;
  style?: React.CSSProperties;
}

// Google AdSense component - will display ads once AdSense account is approved
// To activate: Replace "ca-pub-6589074911542620" with your real AdSense publisher ID
// in src/app/layout.tsx
export default function AdSenseBanner({
  adSlot,
  format = "auto",
  className = "",
  style,
}: AdSenseBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const adsbygoogle = (window as any).adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
        isLoaded.current = true;
      }
    } catch {
      // AdSense not loaded yet - this is normal in development
    }
  }, []);

  const formatMap: Record<string, React.CSSProperties> = {
    auto: { display: "block" },
    horizontal: { display: "inline-block", width: "728px", height: "90px" },
    vertical: { display: "inline-block", width: "160px", height: "600px" },
    rectangle: { display: "inline-block", width: "336px", height: "280px" },
  };

  return (
    <div
      ref={adRef}
      className={`ad-container overflow-hidden ${className}`}
      style={{ textAlign: "center", ...style }}
    >
      <ins
        className="adsbygoogle"
        style={formatMap[format] || formatMap.auto}
        data-ad-client="ca-pub-6589074911542620"
        data-ad-slot={adSlot}
        data-ad-format={format === "auto" ? "auto" : undefined}
        data-full-width-responsive={format === "auto" ? "true" : undefined}
      />
    </div>
  );
}

// Inline ad that blends with content - for between sections
export function InlineAd({ className = "" }: { className?: string }) {
  return (
    <div className={`my-6 ${className}`}>
      <AdSenseBanner adSlot="INLINE_AD_SLOT" format="auto" />
    </div>
  );
}

// Sidebar ad - for destination detail pages
export function SidebarAd({ className = "" }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <AdSenseBanner adSlot="SIDEBAR_AD_SLOT" format="rectangle" />
    </div>
  );
}
