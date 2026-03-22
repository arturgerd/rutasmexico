"use client";

import { useState } from "react";
import { Guide } from "@/types/guide";
import { Locale } from "@/types/common";
import { localize, formatCurrency } from "@/lib/utils";
import LocationPin from "@/components/map/LocationPin";

interface StepByStepGuideProps {
  guide: Guide;
  locale: Locale;
}

const stepTypeStyles: Record<string, { icon: string; color: string }> = {
  departure_preparation: { icon: "🚏", color: "bg-azul-100 text-azul-700 border-azul-200" },
  transit_segment: { icon: "🚀", color: "bg-terracotta-100 text-terracotta-700 border-terracotta-200" },
  layover: { icon: "⏸️", color: "bg-oro-100 text-oro-700 border-oro-200" },
  arrival_navigation: { icon: "📍", color: "bg-jade-500/10 text-jade-600 border-jade-500/20" },
  local_transport: { icon: "🚕", color: "bg-arena-100 text-arena-700 border-arena-200" },
};

const stepTypeLabels: Record<string, { es: string; en: string }> = {
  departure_preparation: { es: "Preparación de salida", en: "Departure preparation" },
  transit_segment: { es: "Trayecto principal", en: "Main journey" },
  layover: { es: "Escala / Parada", en: "Layover / Stop" },
  arrival_navigation: { es: "Llegada y traslado", en: "Arrival & transfer" },
  local_transport: { es: "Transporte local", en: "Local transport" },
};

export default function StepByStepGuide({ guide, locale }: StepByStepGuideProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set([0]));

  const toggleStep = (order: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(order)) {
        next.delete(order);
      } else {
        next.add(order);
      }
      return next;
    });
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-arena-900 mb-2">
        {locale === "es" ? "Guía paso a paso" : "Step-by-step guide"}
      </h2>
      <p className="text-arena-500 mb-6">{localize(guide.overview, locale)}</p>

      {/* Steps */}
      <div className="space-y-4">
        {guide.steps.map((step, index) => {
          const isExpanded = expandedSteps.has(index);
          const style = stepTypeStyles[step.type] || stepTypeStyles.local_transport;
          const typeLabel = stepTypeLabels[step.type]?.[locale] || step.type;

          return (
            <div key={index} className="bg-white rounded-2xl border border-arena-200 overflow-hidden shadow-sm">
              {/* Step Header */}
              <button
                onClick={() => toggleStep(index)}
                className="w-full p-5 flex items-start gap-4 text-left hover:bg-arena-50 transition-colors"
              >
                {/* Step number */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-terracotta-500 text-white flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`badge border text-xs ${style.color}`}>
                      {style.icon} {typeLabel}
                    </span>
                    {step.duration && (
                      <span className="text-xs text-arena-400">
                        ⏱️ {localize(step.duration.label, locale)}
                      </span>
                    )}
                    {step.cost && (
                      <span className="text-xs text-terracotta-500 font-semibold">
                        💰 {formatCurrency(step.cost.min)}-{formatCurrency(step.cost.max)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-arena-900">
                    {localize(step.title, locale)}
                  </h3>
                </div>
                <svg
                  className={`w-5 h-5 text-arena-400 transition-transform flex-shrink-0 mt-1 ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Step Content (expanded) */}
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-arena-100">
                  <div className="pl-14 pt-4">
                    {/* Description */}
                    <p className="text-arena-700 leading-relaxed whitespace-pre-line">
                      {localize(step.description, locale)}
                    </p>

                    {/* Location with map */}
                    {step.location && (
                      <div className="mt-4 border border-arena-200 rounded-xl overflow-hidden">
                        <div className="p-3 bg-arena-50">
                          <p className="font-semibold text-sm text-arena-900">
                            📍 {localize(step.location.name, locale)}
                          </p>
                          <p className="text-xs text-arena-500 mt-1">
                            {localize(step.location.address, locale)}
                          </p>
                        </div>
                        <LocationPin
                          lat={step.location.coordinates.lat}
                          lng={step.location.coordinates.lng}
                          name={step.location.name}
                          address={step.location.address}
                        />
                      </div>
                    )}

                    {/* Tips */}
                    {step.tips && step.tips.length > 0 && (
                      <div className="mt-4 bg-oro-50 rounded-xl p-4">
                        <p className="text-xs font-semibold text-oro-700 mb-2">
                          💡 {locale === "es" ? "Consejos" : "Tips"}
                        </p>
                        <ul className="space-y-1">
                          {step.tips.map((tip, i) => (
                            <li key={i} className="text-sm text-arena-700 flex items-start gap-2">
                              <span className="text-oro-400 mt-0.5">•</span>
                              {localize(tip, locale)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* General tips */}
      {guide.tips.length > 0 && (
        <div className="mt-8 bg-azul-50 rounded-2xl p-6">
          <h3 className="font-display font-bold text-azul-800 mb-3">
            💡 {locale === "es" ? "Consejos generales para esta ruta" : "General tips for this route"}
          </h3>
          <ul className="space-y-2">
            {guide.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-arena-700">
                <span className="text-azul-400 mt-0.5">✦</span>
                {localize(tip, locale)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
