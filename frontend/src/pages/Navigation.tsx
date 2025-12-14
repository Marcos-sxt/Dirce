import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { MapPin, X, Volume2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DirceAvatar } from "@/components/DirceAvatar";
import { getStationById, type Station } from "@/lib/api";
import { useAutoSpeak } from "@/hooks/useAutoSpeak";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const stationId = searchParams.get("stationId");
  const [station, setStation] = useState<Station | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pegar localização do usuário (se vier do Stations)
  const userLocation = location.state?.userLocation;
  
  // Gerar texto para TTS com instruções de navegação
  const navigationText = useMemo(() => {
    if (isLoading) {
      return "Carregando rota...";
    }
    
    if (!station) {
      return "";
    }
    
    return `Navegando para ${station.name}. Quando chegar, toque em Cheguei.`;
  }, [station, isLoading]);
  
  // Falar instruções de navegação automaticamente
  useAutoSpeak({
    text: navigationText,
    enabled: !isLoading && !!station,
    delay: 1000,
  });

  useEffect(() => {
    const loadStation = async () => {
      if (!stationId) {
        navigate("/stations");
        return;
      }

      setIsLoading(true);
      try {
        const stationData = await getStationById(stationId);
        if (stationData) {
          setStation(stationData);
        } else {
          console.error('Estação não encontrada');
          navigate("/stations");
        }
      } catch (error) {
        console.error('Erro ao buscar estação:', error);
        navigate("/stations");
      } finally {
        setIsLoading(false);
      }
    };

    loadStation();
  }, [stationId, navigate]);

  const handleArrived = () => {
    if (station) {
      navigate(`/payment?stationId=${station.id}`);
    }
  };

  const handleCancel = () => {
    navigate("/stations");
  };

  const openInMaps = () => {
    if (!station) return;
    
    // Usar coordenadas se disponível, senão usar endereço
    if (station.latitude && station.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;
      window.open(url, "_blank");
    } else {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(station.address)}`;
      window.open(url, "_blank");
    }
  };

  // Gerar URL do Google Maps Embed com coordenadas reais
  // Usa formato simples que funciona sem API key
  const getMapsEmbedUrl = () => {
    if (!station || !station.latitude || !station.longitude) {
      // Fallback: Rio de Janeiro centro
      return `https://www.google.com/maps?q=-22.9068,-43.1729&output=embed&zoom=13`;
    }

    // Usar coordenadas reais da estação
    const lat = station.latitude;
    const lng = station.longitude;
    
    // Formato simples do Google Maps (funciona sem API key)
    // Mostra apenas a localização da estação
    // Para ver rota, usuário pode clicar em "Abrir no Google Maps"
    return `https://www.google.com/maps?q=${lat},${lng}&output=embed&zoom=15`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando rota...</p>
        </div>
      </div>
    );
  }

  if (!station) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <DirceAvatar size="sm" speaking />
            <div className="flex-1">
              <h1 className="font-bold text-lg">Navegando...</h1>
              <p className="text-primary-foreground/80 text-sm">{station.name}</p>
            </div>
            <div className="flex items-center gap-1 text-primary-foreground/80">
              <Volume2 className="w-5 h-5" />
              <span className="text-sm">Voz ativa</span>
            </div>
          </div>
        </div>
      </header>

      {/* Map */}
      <div className="flex-1 relative">
        <iframe
          src={getMapsEmbedUrl()}
          className="w-full h-full min-h-[300px] border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de navegação"
        />
        
        {/* Overlay button to open in Maps app */}
        <button
          onClick={openInMaps}
          className="absolute bottom-4 right-4 bg-card text-foreground px-4 py-2 rounded-lg shadow-card text-sm font-medium hover:bg-muted transition-colors"
        >
          Abrir no Google Maps
        </button>
      </div>

      {/* Destination card */}
      <div className="bg-card border-t border-border p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-dirce-green-light flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{station.name}</p>
              <p className="text-muted-foreground text-sm">{station.address}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button
              variant="cancel"
              size="lg"
              onClick={handleCancel}
              className="flex-1"
            >
              <X className="w-5 h-5" />
              Cancelar
            </Button>
            <Button
              variant="action"
              size="lg"
              onClick={handleArrived}
              className="flex-1"
            >
              <MapPin className="w-5 h-5" />
              Cheguei!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
