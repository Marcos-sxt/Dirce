import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface UseTextToSpeechOptions {
  onComplete?: () => void;
  onError?: (error: string) => void;
}

export function useTextToSpeech({ onComplete, onError }: UseTextToSpeechOptions = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useState<HTMLAudioElement | null>(null)[0];

  const speak = async (text: string, flash: boolean = false) => {
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

      // Criar elemento de áudio
      const audio = new Audio(audioUrl);
      
      audio.onplay = () => {
        setIsPlaying(true);
        setIsLoading(false);
      };

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl); // Limpar memória
        if (onComplete) {
          onComplete();
        }
      };

      audio.onerror = () => {
        setIsPlaying(false);
        setIsLoading(false);
        const errorMsg = 'Erro ao reproduzir áudio';
        setError(errorMsg);
        if (onError) {
          onError(errorMsg);
        }
        URL.revokeObjectURL(audioUrl);
      };

      // Reproduzir
      await audio.play();

      return audio;
    } catch (err: any) {
      setIsLoading(false);
      const errorMsg = err.message || 'Erro ao gerar áudio';
      setError(errorMsg);
      if (onError) {
        onError(errorMsg);
      }
      throw err;
    }
  };

  const stop = () => {
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
      setIsPlaying(false);
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

