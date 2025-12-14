import { MapPin, Clock, Navigation } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export interface Station {
  id: string;
  name: string;
  address: string;
  distance: number;
  time: number;
}

interface StationCardProps {
  station: Station;
  onNavigate: (station: Station) => void;
  className?: string;
  animationDelay?: string;
}

export function StationCard({ station, onNavigate, className, animationDelay }: StationCardProps) {
  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)}km`;
    }
    return `${meters}m`;
  };

  return (
    <div
      className={cn(
        "dirce-card flex flex-col gap-4 animate-fade-in-up opacity-0",
        animationDelay,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-dirce-green-light flex items-center justify-center shrink-0">
          <MapPin className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-lg leading-tight">{station.name}</h3>
          <p className="text-muted-foreground text-base mt-1 line-clamp-2">{station.address}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="flex items-center gap-1">
            <Navigation className="w-4 h-4" />
            {formatDistance(station.distance)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {station.time} min
          </span>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onNavigate(station)}
          className="shrink-0"
        >
          Ver no mapa
        </Button>
      </div>
    </div>
  );
}
