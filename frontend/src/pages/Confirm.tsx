import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Check, X, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DirceAvatar } from "@/components/DirceAvatar";
import { mockLocation } from "@/data/mockStations";
import { geocodeAddress } from "@/lib/api";

const Confirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isGeocoding, setIsGeocoding] = useState(false);
  
  // Pegar transcript do estado de navegação (se vier do Listening)
  const transcriptFromState = location.state?.transcript;
  const locationText = transcriptFromState || `${mockLocation.address}, ${mockLocation.neighborhood}, ${mockLocation.city}`;

  const handleConfirm = async () => {
    setIsGeocoding(true);
    
    try {
      // Geocodificar endereço para obter coordenadas
      const geocodeResult = await geocodeAddress(locationText);
      
      // Navegar para Stations com coordenadas
      navigate("/stations", {
        state: {
          userLocation: {
            lat: geocodeResult.lat,
            lng: geocodeResult.lng,
          },
          address: geocodeResult.formattedAddress || locationText,
        },
      });
    } catch (error) {
      console.error('Erro ao geocodificar:', error);
      // Mesmo com erro, navegar (usará fallback no Stations - RJ)
      navigate("/stations", {
        state: {
          userLocation: {
            lat: -22.9068, // Rio de Janeiro centro (fallback)
            lng: -43.1729,
          },
          address: locationText,
        },
      });
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleRetry = () => {
    navigate("/listening");
  };

  return (
    <div className="dirce-container">
      <div className="flex flex-col items-center gap-8 max-w-sm w-full">
        {/* Avatar */}
        <DirceAvatar size="md" className="animate-fade-in-up" />

        {/* Title */}
        <div className="text-center animate-fade-in-up delay-100 opacity-0">
          <h1 className="dirce-title mb-2">Entendi!</h1>
          <p className="dirce-subtitle">É esse o local?</p>
        </div>

        {/* Location card */}
        <div className="w-full dirce-card animate-fade-in-up delay-200 opacity-0">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-dirce-green-light flex items-center justify-center shrink-0">
              <MapPin className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="font-bold text-xl text-foreground">{locationText}</p>
              {!transcriptFromState && (
                <p className="text-muted-foreground text-lg">
                  {mockLocation.neighborhood}, {mockLocation.city}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full flex gap-4 animate-fade-in-up delay-300 opacity-0">
          <Button
            variant="cancel"
            size="lg"
            onClick={handleRetry}
            className="flex-1"
          >
            <X className="w-6 h-6" />
            Errado
          </Button>
          <Button
            variant="confirm"
            size="lg"
            onClick={handleConfirm}
            disabled={isGeocoding}
            className="flex-1"
          >
            {isGeocoding ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Buscando...
              </>
            ) : (
              <>
                <Check className="w-6 h-6" />
                Correto
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
