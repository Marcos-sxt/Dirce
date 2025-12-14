import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mic, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StationCard, type Station } from "@/components/StationCard";
import { mockStations } from "@/data/mockStations";
import { getNearbyStations, type Station as ApiStation } from "@/lib/api";

const Stations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stations, setStations] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pegar coordenadas do usuário (se vier do Confirm)
  const userLocation = location.state?.userLocation;

  useEffect(() => {
    const loadStations = async () => {
      setIsLoading(true);
      
      try {
        if (userLocation) {
          console.log('📍 Buscando estações próximas a:', userLocation);
          
          // Buscar estações reais do backend - sempre pega as 5 mais próximas
          const nearbyStations = await getNearbyStations({
            lat: userLocation.lat,
            lng: userLocation.lng,
            radius: 50000, // 50km (raio grande para garantir que encontre)
            limit: 5, // Sempre mostrar 5 mais próximas
          });

          console.log('🏪 Estações encontradas:', nearbyStations.length, nearbyStations);

          if (nearbyStations.length === 0) {
            console.warn('⚠️ Nenhuma estação retornada do backend, usando fallback');
            setStations(mockStations);
            return;
          }

          // Converter formato da API para formato do componente
          const formattedStations: Station[] = nearbyStations.map((s: ApiStation) => {
            const distance = s.distance || 0;
            // Calcular tempo estimado: ~80m/min a pé = ~4.8km/h
            const timeMinutes = Math.max(1, Math.round(distance / 80));
            
            return {
              id: s.id,
              name: s.name,
              address: s.address,
              distance,
              time: timeMinutes,
            };
          });

          console.log('✅ Estações formatadas:', formattedStations);
          setStations(formattedStations);
        } else {
          console.log('⚠️ Sem userLocation, usando dados mockados');
          // Fallback: usar dados mockados
          setStations(mockStations);
        }
      } catch (error) {
        console.error('❌ Erro ao buscar estações:', error);
        // Fallback: usar dados mockados em caso de erro
        setStations(mockStations);
      } finally {
        setIsLoading(false);
      }
    };

    loadStations();
  }, [userLocation]);

  const handleNavigateToStation = (station: Station) => {
    // Passar localização do usuário para mostrar rota no mapa
    navigate(`/navigation?stationId=${station.id}`, {
      state: {
        userLocation: userLocation,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="flex items-center gap-4 p-4 max-w-lg mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            aria-label="Voltar"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="dirce-title text-xl flex-1">Estações Próximas</h1>
        </div>
      </header>

      {/* Station list */}
      <main className="p-4 max-w-lg mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Buscando estações próximas...</p>
          </div>
        ) : stations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <p className="text-muted-foreground text-center">
              Nenhuma estação encontrada próxima a você.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/listening")}
            >
              <Mic className="w-5 h-5" />
              Tentar outra localização
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {stations.map((station, index) => (
              <StationCard
                key={station.id}
                station={station}
                onNavigate={handleNavigateToStation}
                animationDelay={`delay-${(index + 1) * 100}`}
              />
            ))}
          </div>
        )}

        {/* Speak again button */}
        <div className="mt-6 animate-fade-in-up delay-400 opacity-0">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/listening")}
            className="w-full"
          >
            <Mic className="w-5 h-5" />
            Falar novamente
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Stations;
