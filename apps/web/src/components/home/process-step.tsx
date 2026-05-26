import { Card, CardContent } from "@/components/ui/card";

interface Props {
  step: number;
  title: string;
  description: string;
  color: string;
}

export function ProcessStep({
  step,
  title,
  description,
  color,
}: Props) {
  return (
    <Card className="h-full border-0 shadow-md">
      <CardContent className="p-6 md:p-8">
        <div
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {step}
        </div>

        <h3 className="mb-3 text-xl font-bold">
          {title}
        </h3>

        <p className="leading-relaxed text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}