"use client";

import { useState } from "react";
import clsx from "clsx";

const methods = [
  {
    id: "card",
    label: "💳 Credit / Debit Card (Mock)",
  },
  {
    id: "gcash",
    label: "📱 GCash (Mock)",
  },
  {
    id: "bank",
    label: "🏦 Bank Transfer (Mock)",
  },
];

export default function PaymentMethodSelector() {
  const [selected, setSelected] = useState("card");

  return (
    <div className="space-y-2">
      <h2 className="font-semibold">Payment Method</h2>

      <div className="grid gap-2">
        {methods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => setSelected(method.id)}
            className={clsx(
              "border rounded-lg p-3 text-left transition cursor-pointer",
              selected === method.id
                ? "border-green-600 bg-green-50 ring-2 ring-green-200"
                : "hover:bg-gray-50"
            )}
          >
            {method.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground pt-2">
        Selected: {methods.find((m) => m.id === selected)?.label}
      </p>
    </div>
  );
}