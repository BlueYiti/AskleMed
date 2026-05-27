import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section id="contact" className="container pb-20 pt-4 md:pb-32">
      <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-r from-[#0566bb] to-[#08c7cf] px-6 py-12 shadow-2xl md:rounded-[3rem] md:px-12 md:py-16 lg:px-16">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-black/5" />

        {/* Decorative Blur */}
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        {/* Doctor Image */}
        <div className="absolute bottom-0 right-0 hidden lg:block">
          <Image
            src="/images/doctors/doc1.png"
            alt="Doctor"
            width={300}
            height={300}
            className="h-auto w-90 object-contain xl:w-105 opacity-50"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left xl:max-w-3xl">
          <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
            Start Your Digital Healthcare Journey Today
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/90 md:text-lg">
            Experience secure and convenient online healthcare with
            AskleMed. Book consultations, manage appointments, and
            connect with trusted doctors from anywhere.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button
              size="lg"
              className="rounded-full bg-white px-8 text-[#0566bb] hover:bg-gray-100"
            >
              Create Account
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white bg-transparent px-8 text-white hover:bg-white hover:text-[#0566bb]"
            >
              Explore Doctors
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
