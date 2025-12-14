import { useState, useEffect, useRef } from 'react';

interface UseSpeechRecognitionOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (text: string) => void;
  onError?: (error: string) => void;
}

export function useSpeechRecognition({
  lang = 'pt-BR',
  continuous = false,
  interimResults = false,
  onResult,
  onError,
}: UseSpeechRecognitionOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  // Verificar suporte ANTES de tudo (sincronamente)
  const isSupported = typeof window !== 'undefined' && 
    (!!(window as any).SpeechRecognition || !!(window as any).webkitSpeechRecognition);

  useEffect(() => {
    if (!isSupported) {
      setError('Seu navegador não suporta reconhecimento de voz');
      return;
    }

    // Verificar suporte do navegador
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    // Criar instância
    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;

    // Event handlers
    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      // Processar todos os resultados
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      // Se houver resultado final, usar ele; senão usar interim
      const transcriptText = finalTranscript.trim() || interimTranscript;
      setTranscript(transcriptText);

      // Se houver resultado final, parar reconhecimento e chamar callback
      if (finalTranscript.trim()) {
        // Parar o reconhecimento imediatamente
        recognition.stop();
        setIsListening(false);
        if (onResult) {
          onResult(finalTranscript.trim());
        }
      } else if (onResult && interimTranscript) {
        // Mostrar resultado interim enquanto fala
        onResult(interimTranscript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsListening(false);
      const errorMessage = getErrorMessage(event.error);
      setError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isSupported, lang, continuous, interimResults, onResult, onError]);

  const start = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error: any) {
        setError('Erro ao iniciar reconhecimento de voz');
        if (onError) {
          onError('Erro ao iniciar reconhecimento de voz');
        }
      }
    }
  };

  const stop = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const reset = () => {
    setTranscript('');
    setError(null);
  };

  return {
    isListening,
    transcript,
    error,
    start,
    stop,
    reset,
    isSupported,
  };
}

function getErrorMessage(error: string): string {
  switch (error) {
    case 'no-speech':
      return 'Nenhum áudio detectado. Tente novamente.';
    case 'audio-capture':
      return 'Erro ao acessar o microfone. Verifique as permissões.';
    case 'not-allowed':
      return 'Permissão de microfone negada. Permita o acesso e tente novamente.';
    case 'network':
      return 'Erro de rede. Verifique sua conexão.';
    case 'aborted':
      return 'Reconhecimento cancelado.';
    default:
      return `Erro: ${error}`;
  }
}

