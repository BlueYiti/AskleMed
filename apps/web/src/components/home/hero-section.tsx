import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="container py-14 md:py-20 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <Badge className="mb-6 bg-[#08c7cf] rounded-full px-4 py-2">
            Modern Telehealth Platform
          </Badge>

          <h1 className="mx-auto max-w-xl text-4xl font-black leading-tight tracking-tight md:text-6xl lg:mx-0">
            <span className="text-[#0566bb]">
              Health
            </span>
            , Just an{" "}
            <span className="text-[#08c7cf]">
              Ask
            </span>{" "}
            Away
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg lg:mx-0">
            Connect with licensed doctors online,
            manage appointments, and access medical
            records seamlessly.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button
              size="lg"
              className="rounded-full bg-[#0566bb] px-8"
            >
              Get Started
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8"
            >
              <a href="#features">Learn More</a>
            </Button>
          </div>

          <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-4 md:gap-8 lg:mx-0">
            <Stat number="500+" label="Consultations" />
            <Stat number="100+" label="Doctors" />
            <Stat number="24/7" label="Support" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-137.5 lg:ml-auto">
          <div className="absolute inset-0 rounded-full bg-[#0566bb]/20 blur-3xl" />

          <div className="relative rounded-[2rem] bg-linear-to-br from-[#0566bb] to-[#08c7cf] p-2 shadow-2xl">
            <div className="rounded-[1.8rem] bg-white p-4 md:p-6">
              <Image
                src="/images/illustrations/doc-illus3.png"
                alt="Doctor Illustration"
                width={520}
                height={520}
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-[#0566bb] md:text-3xl">
        {number}
      </h3>

      <p className="mt-1 text-sm text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
