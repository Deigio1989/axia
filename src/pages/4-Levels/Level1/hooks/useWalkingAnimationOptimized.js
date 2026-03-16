import { useRef, useEffect, useCallback } from "react";

/**
 * Hook otimizado para animação de caminhada usando CSS steps() e sprite sheet
 * Não causa re-renders - anima via CSS
 *
 * @param {Object} config - Configuração da animação
 * @returns {Object} { containerRef, imgRef, isWalking, startWalking }
 */
export function useWalkingAnimationOptimized({ duration = 2000 } = {}) {
  const containerRef = useRef(null);
  const isWalkingRef = useRef(false);
  const timeoutRef = useRef(null);

  const startWalking = useCallback(() => {
    if (isWalkingRef.current) return;

    console.log("🚶 Iniciando caminhada otimizada");
    isWalkingRef.current = true;

    // Adiciona classe CSS que inicia a animação
    if (containerRef.current) {
      containerRef.current.classList.add("walking");
    }

    // Remove a classe após a duração
    timeoutRef.current = setTimeout(() => {
      console.log("✅ Caminhada finalizada");
      if (containerRef.current) {
        containerRef.current.classList.remove("walking");
        containerRef.current.classList.add("arrived");
      }
      isWalkingRef.current = false;
    }, duration);
  }, [duration]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    containerRef,
    isWalking: isWalkingRef.current,
    startWalking,
  };
}
