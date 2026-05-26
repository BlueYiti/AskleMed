import { CalendarCheck, MonitorPlay, Search } from "lucide-react";
import { FeatureCard } from "./feature-card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Search,
    title: "Discover Doctors",
    description:
      "Search and filter doctors by specialization and availability.",
    color: "#0566bb",
  },
  {
    icon: CalendarCheck,
    title: "Easy Appointment Booking",
    description:
      "Book and manage appointments seamlessly.",
    color: "#08c7cf",
  },
  {
    icon: MonitorPlay,
    title: "Online Consultations",
    description:
      "Secure virtual healthcare sessions anytime.",
    color: "#ff3131",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="container py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <Badge
          variant="secondary"
          className="mb-6 rounded-full px-4 py-2"
        >
          Everything You Need in One Platform
        </Badge>

        <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
          A Better Way to Access{" "}
          <span className="text-[#0566bb]">
            Healthcare
          </span>
        </h2>

        <p className="mt-6 text-muted-foreground md:text-lg">
          AskleMed simplifies consultations, booking,
          prescriptions, and records into one platform.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            {...feature}
          />
        ))}
      </div>
    </section>
  );
}
