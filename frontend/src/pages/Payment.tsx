import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CreditCard, Smartphone, Check, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DirceAvatar } from "@/components/DirceAvatar";
import { mockStations } from "@/data/mockStations";
import { cn } from "@/lib/utils";
import { useAutoSpeak } from "@/hooks/useAutoSpeak";

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const stationId = searchParams.get("stationId");
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const station = mockStations.find((s) => s.id === stationId) || mockStations[0];
  
  const mockBalance = 100;
  const mockHash = "0x7f9e...8b3a";
  
  // Gerar texto para TTS baseado no estado
  const paymentText = useMemo(() => {
    if (isPaid) {
      return `Pagamento confirmado! Aproveite sua refeição.`;
    }
    
    return `Você chegou em ${station.name}! Seu saldo: ${mockBalance} refeições. Aproxime seu cartão para pagar.`;
  }, [isPaid, station.name, mockBalance]);
  
  // Falar instruções de pagamento automaticamente
  // Quando isPaid muda, o texto muda e será falado novamente
  useAutoSpeak({
    text: paymentText,
    enabled: true,
    delay: isPaid ? 1200 : 800, // Delay maior após pagamento confirmado
  });

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsPaid(true);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (isPaid) {
    return (
      <div className="dirce-container">
        <div className="flex flex-col items-center gap-8 max-w-sm w-full">
          {/* Success icon */}
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center animate-fade-in-up shadow-button">
            <Check className="w-12 h-12 text-primary-foreground" />
          </div>

          {/* Success message */}
          <div className="text-center animate-fade-in-up delay-100 opacity-0">
            <h1 className="dirce-title mb-2">Pagamento Confirmado!</h1>
            <p className="dirce-subtitle">Aproveite sua refeição</p>
          </div>

          {/* Transaction details */}
          <div className="w-full dirce-card animate-fade-in-up delay-200 opacity-0">
            <div className="text-center">
              <p className="text-muted-foreground text-sm mb-1">Transação</p>
              <p className="font-mono text-foreground">{mockHash}</p>
            </div>
            <div className="border-t border-border my-4" />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Valor</span>
              <span className="font-bold text-foreground">1 REFEIÇÃO</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-muted-foreground">Novo saldo</span>
              <span className="font-bold text-foreground">{mockBalance - 1} REFEIÇÃO</span>
            </div>
          </div>

          {/* Go home button */}
          <Button
            variant="default"
            size="lg"
            onClick={handleGoHome}
            className="w-full animate-fade-in-up delay-300 opacity-0"
          >
            <Home className="w-5 h-5" />
            Voltar ao início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="dirce-container">
      <div className="flex flex-col items-center gap-8 max-w-sm w-full">
        {/* Avatar */}
        <DirceAvatar size="md" className="animate-fade-in-up" />

        {/* Title */}
        <div className="text-center animate-fade-in-up delay-100 opacity-0">
          <h1 className="dirce-title mb-2">Você chegou!</h1>
          <p className="dirce-subtitle">{station.name}</p>
        </div>

        {/* NFC indicator */}
        <div className="w-full dirce-card animate-fade-in-up delay-200 opacity-0">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-dirce-orange-light flex items-center justify-center">
              <Smartphone className="w-10 h-10 text-secondary" />
            </div>
            <p className="text-center text-muted-foreground">
              Aproxime seu cartão ou celular
            </p>
          </div>
        </div>

        {/* Balance */}
        <div className="w-full dirce-card animate-fade-in-up delay-300 opacity-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-primary" />
              <span className="text-muted-foreground">Saldo disponível</span>
            </div>
            <span className="font-bold text-xl text-foreground">{mockBalance} REFEIÇÃO</span>
          </div>
        </div>

        {/* Payment button */}
        <Button
          variant="action"
          size="xl"
          onClick={handlePayment}
          disabled={isProcessing}
          className={cn(
            "w-full animate-fade-in-up delay-400 opacity-0",
            isProcessing && "animate-pulse"
          )}
        >
          <CreditCard className="w-6 h-6" />
          {isProcessing ? "Processando..." : "Pagar 1 REFEIÇÃO"}
        </Button>

        {/* Simulate NFC */}
        <Button
          variant="outline"
          size="lg"
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full animate-fade-in-up delay-400 opacity-0"
        >
          <Smartphone className="w-5 h-5" />
          Simular NFC
        </Button>
      </div>
    </div>
  );
};

export default Payment;
