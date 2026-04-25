type GtagFn = (...args: unknown[]) => void;

function getGtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { gtag?: GtagFn };
  return typeof w.gtag === "function" ? w.gtag : null;
}

export type AffiliateNetwork = "travelpayouts" | "aviasales" | "booking" | "other";

export type AffiliateProduct = "flight" | "hotel" | "bus" | "car" | "tour";

export interface AffiliateClickEvent {
  product: AffiliateProduct;
  network: AffiliateNetwork;
  partner?: string;
  origin?: string;
  destination?: string;
  page?: string;
}

export function trackAffiliateClick(e: AffiliateClickEvent): void {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", "affiliate_click", {
    affiliate_product: e.product,
    affiliate_network: e.network,
    affiliate_partner: e.partner,
    origin: e.origin,
    destination: e.destination,
    page_path: e.page ?? (typeof window !== "undefined" ? window.location.pathname : undefined),
  });
}

export function trackOutboundClick(url: string, label?: string): void {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", "click", {
    event_category: "outbound",
    event_label: label ?? url,
    transport_type: "beacon",
    outbound_url: url,
  });
}
