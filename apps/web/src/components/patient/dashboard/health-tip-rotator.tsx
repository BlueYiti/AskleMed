"use client";

import { useState, useEffect } from "react";

const TIPS = [
  "💧 Stay hydrated! Aim for 8 glasses of water today.",
  "🏃‍♂️ Take a 5-minute walk after each meal to aid digestion.",
  "😴 Get 7-9 hours of sleep for better immunity and focus.",
  "🥗 Add one extra serving of vegetables to your lunch.",
  "🧘 Breathe deeply for 2 minutes to reduce stress.",
  "📵 Put away screens 30 minutes before bedtime.",
  "🩺 Don't skip your annual physical check‑up.",
  "🍎 An apple a day provides fiber and antioxidants.",
];

export const HealthTipRotator = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 8000); // change tip every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Health Tip</h2>
      <div className="mt-4 flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          💡
        </div>
        <p className="text-sm text-slate-600 transition-all duration-300">
          {TIPS[currentTipIndex]}
        </p>
      </div>
      {/* Optional: dot indicators */}
      <div className="mt-4 flex justify-center gap-1">
        {TIPS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentTipIndex(idx)}
            className={`h-1.5 w-1.5 rounded-full transition-all ${
              idx === currentTipIndex ? "bg-emerald-500 w-3" : "bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};