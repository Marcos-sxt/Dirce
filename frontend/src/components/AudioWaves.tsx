import { cn } from "@/lib/utils";

interface AudioWavesProps {
  active?: boolean;
  className?: string;
}

export function AudioWaves({ active = true, className }: AudioWavesProps) {
  const bars = [
    { height: "h-8", delay: "" },
    { height: "h-12", delay: "animate-wave-delay-1" },
    { height: "h-16", delay: "animate-wave-delay-2" },
    { height: "h-20", delay: "animate-wave-delay-3" },
    { height: "h-16", delay: "animate-wave-delay-4" },
    { height: "h-12", delay: "animate-wave-delay-1" },
    { height: "h-8", delay: "animate-wave-delay-2" },
  ];

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {bars.map((bar, index) => (
        <div
          key={index}
          className={cn(
            "w-2 rounded-full bg-primary transition-all duration-300",
            bar.height,
            active ? `animate-wave ${bar.delay}` : "scale-y-50 opacity-50"
          )}
        />
      ))}
    </div>
  );
}
