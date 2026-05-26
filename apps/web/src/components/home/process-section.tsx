import { ProcessStep } from "./process-step";

const processSteps = [
  {
    step: 1,
    title: "Create Account",
    description:
      "Register securely with your personal information and health profile.",
    color: "#0566bb",
  },
  {
    step: 2,
    title: "Find a Doctor",
    description:
      "Browse specialists, check availability, and choose the right healthcare professional.",
    color: "#08c7cf",
  },
  {
    step: 3,
    title: "Book Consultation",
    description:
      "Schedule appointments and receive instant confirmations and reminders.",
    color: "#ff3131",
  },
  {
    step: 4,
    title: "Join Online Session",
    description:
      "Meet with your doctor virtually and access prescriptions afterward.",
    color: "#0566bb",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="container py-20 md:py-28 lg:py-32">
      {/* Header */}
      <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
          How AskleMed Works
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-lg">
          Get healthcare support in just a few simple steps.
        </p>
      </div>

      {/* Steps */}
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {processSteps.map((step) => (
          <ProcessStep
            key={step.step}
            step={step.step}
            title={step.title}
            description={step.description}
            color={step.color}
          />
        ))}
      </div>
    </section>
  );
}
