"use client";

import { CelebrationIdea } from "@/types/boda";
import { Locale } from "@/types/common";
import { localize, formatCurrency } from "@/lib/utils";

interface CelebrationCardProps {
  idea: CelebrationIdea;
  locale: Locale;
}

export default function CelebrationCard({ idea, locale }: CelebrationCardProps) {
  return (
    <div className="bg-white rounded-xl border border-arena-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{idea.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-bold text-arena-900 text-sm">
            {localize(idea.name, locale)}
          </h4>
          <p className="text-arena-600 text-xs mt-1 line-clamp-3">
            {localize(idea.description, locale)}
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-arena-500">
            <span className="font-semibold text-terracotta-600">
              {formatCurrency(idea.priceRange.min)}-{formatCurrency(idea.priceRange.max)}
            </span>
            <span>{localize(idea.duration, locale)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
