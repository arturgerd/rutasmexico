"use client";

import { useTranslations } from "next-intl";

export default function HowItWorks() {
  const t = useTranslations("home");

  const steps = [
    { icon: "🗺️", title: t("step1Title"), desc: t("step1Desc") },
    { icon: "⚖️", title: t("step2Title"), desc: t("step2Desc") },
    { icon: "📍", title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-arena-900 text-center mb-12">
          {t("howItWorks")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-terracotta-50 flex items-center justify-center text-4xl mb-4 shadow-sm">
                {step.icon}
              </div>
              <div className="w-8 h-8 mx-auto rounded-full bg-terracotta-500 text-white flex items-center justify-center font-bold text-sm mb-4">
                {i + 1}
              </div>
              <h3 className="font-display font-bold text-lg text-arena-900 mb-2">
                {step.title}
              </h3>
              <p className="text-arena-500 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
