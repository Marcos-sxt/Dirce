import { useNavigate } from "react-router-dom";
import { Mic, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DirceAvatar } from "@/components/DirceAvatar";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="dirce-container">
      <div className="flex flex-col items-center gap-8 max-w-sm w-full">
        {/* Avatar */}
        <DirceAvatar size="lg" className="animate-fade-in-up" />

        {/* Greeting */}
        <div className="text-center animate-fade-in-up delay-100 opacity-0">
          <h1 className="dirce-title mb-2">Olá! Sou a Dirce</h1>
          <p className="dirce-subtitle">Como posso ajudar você hoje?</p>
        </div>

        {/* Main CTA - Microphone */}
        <div className="flex flex-col items-center gap-4 animate-fade-in-up delay-200 opacity-0">
          <Button
            variant="mic"
            size="mic"
            onClick={() => navigate("/listening")}
            aria-label="Falar com Dirce"
          >
            <Mic className="w-10 h-10" />
          </Button>
          <p className="text-muted-foreground text-center">
            Toque para falar sua localização
          </p>
        </div>

        {/* Secondary action */}
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate("/stations")}
          className="w-full animate-fade-in-up delay-300 opacity-0"
        >
          <MapPin className="w-5 h-5" />
          Usar minha localização
        </Button>
      </div>
    </div>
  );
};

export default Index;
