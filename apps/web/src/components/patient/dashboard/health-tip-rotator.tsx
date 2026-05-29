"use client";

import { useState, useEffect, useMemo } from "react";

type Tip = {
  text: string;
  category: "hydration" | "activity" | "sleep" | "nutrition" | "mental" | "preventive";
  icon: string;
};

const TIPS: Tip[] = [
  { text: "Drink a glass of water when you wake up to kickstart hydration.", category: "hydration", icon: "💧" },
  { text: "Aim for 7–9 hours of sleep for recovery and immunity.", category: "sleep", icon: "😴" },
  { text: "Take a 5–10 minute walk after meals to support digestion.", category: "activity", icon: "🚶‍♂️" },
  { text: "Add vegetables to at least 2 meals today for better fiber intake.", category: "nutrition", icon: "🥗" },
  { text: "Practice deep breathing for 2 minutes to reduce stress.", category: "mental", icon: "🧘" },
  { text: "Sit less: stand or stretch every 60 minutes if you work at a desk.", category: "activity", icon: "🪑" },
  { text: "Book your annual check-up if you haven’t had one this year.", category: "preventive", icon: "🩺" },
  { text: "Limit screen time 30–60 minutes before bed for better sleep quality.", category: "sleep", icon: "📵" },
];

export const HealthTipRotator = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const currentTip = useMemo(() => TIPS[currentTipIndex], [currentTipIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Health Tip</h2>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
          {currentTip.category}
        </span>
      </div>

      {/* Tip */}
      <div className="mt-4 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-lg">
          {currentTip.icon}
        </div>

        <p className="text-sm text-slate-600 leading-relaxed transition-all duration-300">
          {currentTip.text}
        </p>
      </div>

      {/* Indicators */}
      <div className="mt-5 flex justify-center gap-1.5">
        {TIPS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentTipIndex(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentTipIndex
                ? "bg-emerald-500 w-4"
                : "bg-slate-300 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
};