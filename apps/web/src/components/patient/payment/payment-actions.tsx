"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import AppointmentsButton from "@/components/navigation/back-to-appointments";

interface Props {
  calLink?: string;
  cancelHref: string;
}

export default function PaymentActions({ calLink, cancelHref }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePayment = async () => {
    if (!calLink) return;

    setLoading(true);
    setProgress(0);

    const duration = 1200;
    const intervalTime = 30;
    const steps = duration / intervalTime;

    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      const percent = Math.min((current / steps) * 100, 100);
      setProgress(percent);
    }, intervalTime);

    await new Promise((resolve) => setTimeout(resolve, duration));

    clearInterval(interval);
    setProgress(100);

    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      window.open(calLink, "_blank", "noopener,noreferrer");
    }, 2500);
  };

  return (
    <>
      {/* Top Progress Bar */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-muted overflow-hidden z-[9999]">
          <div
            className="h-full bg-green-600 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Overlay */}
      {(loading || success) && (
        <div className="fixed inset-0 z-[9999] bg-background/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border shadow-2xl rounded-3xl p-10 w-full max-w-md text-center relative">

            {/* LOADING */}
            {loading && (
              <>
                <Loader2 className="mx-auto h-14 w-14 animate-spin text-green-600" />

                <h2 className="mt-6 text-2xl font-bold">
                  Processing Payment
                </h2>

                <p className="text-muted-foreground mt-2">
                  Please wait while we confirm your transaction...
                </p>
              </>
            )}

            {/* SUCCESS */}
            {success && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
                  <CheckCircle2 className="relative mx-auto h-20 w-20 text-green-600" />
                </div>

                <div className="mt-6 space-y-3">
                  <h2 className="text-3xl font-bold text-green-700">
                    Payment Successful!
                  </h2>

                  <p className="text-muted-foreground leading-relaxed">
                    Your consultation payment has been confirmed successfully.
                  </p>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                    <p className="text-sm font-semibold text-amber-800">
                      Important
                    </p>
                    <p className="text-sm text-amber-700 mt-1 leading-relaxed">
                      Please use the <span className="font-semibold">same name and email</span>{" "}
                      as your account when booking your appointment to avoid verification issues.
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-left space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-medium text-green-700">Paid</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Booking</span>
                      <span className="font-medium">Ready</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Redirect</span>
                      <span className="font-medium">Opening scheduler...</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground pt-2">
                    Please wait while we securely redirect you to the appointment booking page.
                  </p>

                  <AppointmentsButton />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={handlePayment}
          disabled={loading || success || !calLink}
          className="flex-1 bg-green-600 hover:bg-green-700 transition text-white px-4 py-3 rounded-xl font-medium disabled:opacity-50"
        >
          Pay & Continue
        </button>

        <Link
          href={cancelHref}
          className="flex-1 border hover:bg-muted transition px-4 py-3 rounded-xl text-center font-medium"
        >
          Cancel
        </Link>
      </div>
    </>
  );
}