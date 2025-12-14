import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DirceAvatar } from "@/components/DirceAvatar";
import { AudioWaves } from "@/components/AudioWaves";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

const Listening = () => {
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState('');
  
  const { isListening, transcript: recognizedText, error, start, stop, isSupported } = useSpeechRecognition({
    lang: 'pt-BR',
    continuous: false, // Não contínuo - para após resultado final
    interimResults: true, // Mostrar resultados enquanto fala
    onResult: (text) => {
      setTranscript(text);
    },
    onError: (errorMsg) => {
      console.error('Erro no reconhecimento:', errorMsg);
      // Se erro, aguardar um pouco e tentar navegar com o que temos
      if (transcript.trim()) {
        setTimeout(() => {
          navigate("/confirm", { state: { transcript } });
        }, 1000);
      }
    },
  });

  // Iniciar reconhecimento quando componente monta
  useEffect(() => {
    if (isSupported) {
      start();
      
      // Timeout de segurança: parar após 10 segundos se não tiver resultado
      const safetyTimer = setTimeout(() => {
        if (isListening && !transcript.trim()) {
          stop();
          // Se tiver algum transcript, usar; senão mostrar erro
          if (transcript.trim()) {
            navigate("/confirm", { state: { transcript } });
          } else {
            setTranscript('Não foi possível entender. Tente novamente.');
          }
        }
      }, 10000); // 10 segundos
      
      return () => {
        clearTimeout(safetyTimer);
        stop();
      };
    } else {
      // Fallback: simular se não suportado
      const timer = setTimeout(() => {
        setTranscript('Praça Tiradentes, 100');
        setTimeout(() => {
          navigate("/confirm");
        }, 1000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSupported, start, stop, navigate, isListening, transcript]);

  // Quando reconhecimento termina, ir para confirmação
  useEffect(() => {
    if (recognizedText && !isListening && recognizedText.trim() !== '') {
      // Parar reconhecimento se ainda estiver rodando
      stop();
      
      // Aguardar um pouco antes de navegar (dar feedback visual)
      const timer = setTimeout(() => {
        navigate("/confirm", { state: { transcript: recognizedText } });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [recognizedText, isListening, navigate, stop]);

  const handleCancel = () => {
    stop();
    navigate("/");
  };

  return (
    <div className="dirce-container">
      <div className="flex flex-col items-center gap-8 max-w-sm w-full">
        {/* Avatar with speaking animation */}
        <DirceAvatar size="lg" speaking={isListening} className="animate-fade-in-up" />

        {/* Title */}
        <div className="text-center animate-fade-in-up delay-100 opacity-0">
          <h1 className="dirce-title mb-2">Estou ouvindo...</h1>
          <p className="dirce-subtitle">Fale sua localização</p>
        </div>

        {/* Audio waves */}
        <div className="animate-fade-in-up delay-200 opacity-0">
          <AudioWaves active={isListening} />
        </div>

        {/* Transcription preview */}
        <div className="w-full min-h-16 bg-muted rounded-xl p-4 animate-fade-in-up delay-300 opacity-0">
          {error ? (
            <p className="text-destructive text-center text-sm">{error}</p>
          ) : transcript ? (
            <p className="text-foreground text-center font-medium">{transcript}</p>
          ) : (
            <p className="text-muted-foreground text-center italic">
              {isListening ? "Aguardando..." : "Processando..."}
            </p>
          )}
        </div>

        {/* Info sobre suporte */}
        {!isSupported && (
          <p className="text-muted-foreground text-center text-sm animate-fade-in-up delay-300 opacity-0">
            Usando modo simulado (navegador não suporta reconhecimento de voz)
          </p>
        )}

        {/* Cancel button */}
        <Button
          variant="cancel"
          size="lg"
          onClick={handleCancel}
          className="w-full animate-fade-in-up delay-400 opacity-0"
        >
          <X className="w-5 h-5" />
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default Listening;
