import { cn } from "@/lib/utils";

interface DirceAvatarProps {
  size?: "sm" | "md" | "lg";
  speaking?: boolean;
  className?: string;
}

export function DirceAvatar({ size = "md", speaking = false, className }: DirceAvatarProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <div className={cn("relative", className)}>
      {speaking && (
        <>
          <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-ring" />
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring delay-300" />
        </>
      )}
      <div
        className={cn(
          "relative rounded-full bg-gradient-to-br from-primary to-dirce-green-dark flex items-center justify-center shadow-button overflow-hidden",
          sizeClasses[size]
        )}
      >
        <img
          src="/Dircê.jpeg"
          alt="Dirce"
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            // Fallback se a imagem não carregar
            const target = e.target as HTMLImageElement;
            target.src = "/Dircê.png";
          }}
        />
      </div>
    </div>
  );
}
