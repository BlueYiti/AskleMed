"use client";

import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => router.push("/")}
      aria-label="Back to home"
      className="
        fixed
        left-4
        top-4
        z-50

        h-11
        w-11

        cursor-pointer

        rounded-full

        border
        border-slate-200

        bg-blue-300
        text-slate-700

        shadow-md

        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:bg-blue-600
        hover:text-white
        hover:shadow-lg

        active:scale-95

        focus-visible:ring-2
        focus-visible:ring-blue-500
        focus-visible:ring-offset-2

        md:left-6
        md:top-6
      "
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;