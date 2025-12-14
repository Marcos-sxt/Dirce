import { useState, useRef, useEffect } from 'react';

// Tentar usar Eleven Labs primeiro, fallback para Web Speech API se falhar
const PREFER_ELEVENLABS = true; // Tentar Eleven Labs primeiro
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
      // Tentar usar Eleven Labs primeiro (se preferido)
      if (PREFER_ELEVENLABS) {
        try {
          // Tentar chamar backend API
          const response = await fetch(`${API_URL}/elevenlabs/text-to-speech`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, flash }),
          });

          if (response.ok) {
            // Sucesso! Usar áudio do Eleven Labs
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            audioUrlRef.current = audioUrl;

            const audio = new Audio(audioUrl);
            audioRef.current = audio;
            
            audio.onplay = () => {
              setIsPlaying(true);
              setIsLoading(false);
            };

            audio.onended = () => {
              setIsPlaying(false);
              URL.revokeObjectURL(audioUrl);
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

            await audio.play();
            return audio;
          } else {
            // Backend falhou, usar fallback
            console.warn('⚠️ Eleven Labs falhou, usando Web Speech API como fallback');
            throw new Error('Eleven Labs unavailable');
          }
        } catch (elevenLabsError) {
          // Se Eleven Labs falhar, usar Web Speech API
          console.warn('⚠️ Fallback para Web Speech API:', elevenLabsError);
          // Continuar para o código do Web Speech API abaixo
        }
      }

      // Fallback: Usar Web Speech API nativo do navegador (100% offline)
      if (!('speechSynthesis' in window)) {
        throw new Error('Web Speech API não suportada neste navegador');
      }

      console.log('🎭 Usando Web Speech API para TTS:', text);
        // Usar Web Speech API nativo do navegador (100% offline)
        console.log('🎭 Usando Web Speech API para TTS:', text);
        
        if (!('speechSynthesis' in window)) {
          throw new Error('Web Speech API não suportada neste navegador');
        }

        // Função para configurar voz (pode precisar aguardar vozes carregarem)
        const setupVoice = (utterance: SpeechSynthesisUtterance) => {
          const voices = speechSynthesis.getVoices();
          const ptBRVoice = voices.find(v => 
            v.lang.includes('pt-BR') || 
            v.lang.includes('pt') || 
            v.name.includes('Brazil') ||
            v.name.includes('Portuguese')
          );
          if (ptBRVoice) {
            utterance.voice = ptBRVoice;
            console.log('✅ Voz selecionada:', ptBRVoice.name);
          } else if (voices.length > 0) {
            // Fallback: usar primeira voz disponível
            utterance.voice = voices[0];
            console.log('⚠️ Voz PT-BR não encontrada, usando:', voices[0].name);
          }
          utterance.lang = 'pt-BR';
          utterance.rate = 0.9; // Velocidade ligeiramente mais lenta
          utterance.pitch = 1.0;
          utterance.volume = 1.0;
        };

        // Criar utterance
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Tentar configurar voz imediatamente
        setupVoice(utterance);
        
        // Se vozes ainda não carregaram, aguardar evento
        if (speechSynthesis.getVoices().length === 0) {
          speechSynthesis.onvoiceschanged = () => {
            setupVoice(utterance);
            speechSynthesis.onvoiceschanged = null; // Limpar listener
          };
        }

        // Simular loading
        setIsLoading(false);
        setIsPlaying(true);

        // Reproduzir
        speechSynthesis.speak(utterance);

        // Aguardar término
        utterance.onend = () => {
          setIsPlaying(false);
          if (onComplete) {
            onComplete();
          }
        };

        utterance.onerror = (event) => {
          setIsPlaying(false);
          const errorMsg = 'Erro ao reproduzir áudio';
          setError(errorMsg);
          if (onError) {
            onError(errorMsg);
          }
        };

      return null; // Web Speech API não retorna Audio element
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
    // Parar áudio tradicional (Eleven Labs)
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
    // Parar Web Speech API (fallback)
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  return {
    speak,
    stop,
    isPlaying,
    isLoading,
    error,
  };
}

