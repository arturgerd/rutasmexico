// Minimal layout — strips Header/Footer for Google Ads landing pages.
// Higher Quality Score = lower CPC. No nav distractions, single CTA above the fold.

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-white">{children}</main>;
}
