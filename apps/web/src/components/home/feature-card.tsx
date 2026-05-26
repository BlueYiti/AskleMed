import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  color,
}: FeatureCardProps) {
  const Icon = icon;

  return (
    <Card className="group h-full border-0 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <CardContent className="p-6 md:p-8">
        <div
          className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon
            className="h-7 w-7"
            style={{ color }}
            aria-hidden="true"
          />
        </div>

        <h3 className="mb-3 text-xl font-bold md:text-2xl">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
