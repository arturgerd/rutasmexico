"use client";

import AirlineGrid from "@/components/widgets/AirlineGrid";

export default function AirlineComparisonSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <AirlineGrid showTitle />
      </div>
    </section>
  );
}
