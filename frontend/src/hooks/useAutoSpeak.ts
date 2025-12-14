import { useEffect, useRef } from 'react';
import { useTextToSpeech } from './useTextToSpeech';

interface UseAutoSpeakOptions {
  text: string | null | undefined;
  enabled?: boolean;
  delay?: number; // Delay em ms antes de falar (para animações)
  onComplete?: () => void;
}

/**
 * Hook para falar automaticamente um texto quando ele muda
 * Útil para acessibilidade - fala textos da tela para pessoas que não leem
 */
export function useAutoSpeak({
  text,
  enabled = true,
  delay = 500,
  onComplete,
}: UseAutoSpeakOptions) {
  const { speak, stop, isPlaying, isLoading } = useTextToSpeech({
    onComplete,
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTextRef = useRef<string | null>(null);

  useEffect(() => {
    // Limpar timeout anterior se existir
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Não falar se:
    // - Desabilitado
    // - Texto vazio/null/undefined
    // - Texto não mudou
    if (!enabled || !text || text.trim() === '' || text === lastTextRef.current) {
      return;
    }

    // Atualizar referência do último texto
    lastTextRef.current = text;

    // Aguardar delay antes de falar (para animações carregarem)
    timeoutRef.current = setTimeout(() => {
      speak(text).catch((error) => {
        console.warn('Erro ao falar texto automaticamente:', error);
      });
    }, delay);

    // Cleanup: parar áudio e limpar timeout quando componente desmonta ou texto muda
    return () => {
      // Parar áudio imediatamente quando sair da tela
      stop();
      
      // Limpar timeout se ainda não executou
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [text, enabled, delay, speak, stop]);

  return {
    isPlaying,
    isLoading,
  };
}

