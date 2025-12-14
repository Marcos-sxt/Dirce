import { useState, useRef, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface UseTextToSpeechOptions {
  onComplete?: () => void;
  onError?: (error: string) => void;
}

export function useTextToSpeech({ onComplete, onError }: UseTextToSpeechOptions = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null); // Para limpar URLs de blob

  // Cleanup: parar áudio quando componente desmonta
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      // Limpar URL do blob se existir
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }
      setIsPlaying(false);
      setIsLoading(false);
    };
  }, []);

  const speak = async (text: string, flash: boolean = false) => {
    // Parar áudio anterior se estiver tocando
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    // Limpar URL anterior se existir
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Chamar backend API
      const response = await fetch(`${API_URL}/elevenlabs/text-to-speech`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, flash }),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar áudio');
      }

      // Converter resposta para blob
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      audioUrlRef.current = audioUrl; // Guardar para cleanup

      // Criar elemento de áudio
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onplay = () => {
        setIsPlaying(true);
        setIsLoading(false);
      };

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl); // Limpar memória
        audioUrlRef.current = null;
        audioRef.current = null;
        if (onComplete) {
          onComplete();
        }
      };

      audio.onerror = () => {
        setIsPlaying(false);
        setIsLoading(false);
        const errorMsg = 'Erro ao reproduzir áudio';
        setError(errorMsg);
        URL.revokeObjectURL(audioUrl);
        audioUrlRef.current = null;
        audioRef.current = null;
        if (onError) {
          onError(errorMsg);
        }
      };

      // Reproduzir
      await audio.play();

      return audio;
    } catch (err: any) {
      setIsLoading(false);
      const errorMsg = err.message || 'Erro ao gerar áudio';
      setError(errorMsg);
      audioRef.current = null;
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }
      if (onError) {
        onError(errorMsg);
      }
      throw err;
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      audioRef.current = null;
    }
    // Limpar URL do blob
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
  };

  return {
    speak,
    stop,
    isPlaying,
    isLoading,
    error,
  };
}

