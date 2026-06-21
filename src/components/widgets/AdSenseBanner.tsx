"use client";

import { useEffect, useRef } from "react";
import { adsenseEnabled } from "@/lib/env";

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
    if (!adsenseEnabled || isLoaded.current) return;
    try {
      const w = window as unknown as { adsbygoogle?: { push: (config: object) => void } };
      if (w.adsbygoogle) {
        w.adsbygoogle.push({});
        isLoaded.current = true;
      }
    } catch {
      // AdSense not loaded yet - this is normal in development
    }
  }, []);

  // AdSense account not approved → render nothing so we never inject empty/invalid
  // ad slots (which throw "config is not valid"). Flip NEXT_PUBLIC_ADSENSE_ENABLED
  // to "true" once approved.
  if (!adsenseEnabled) return null;

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
