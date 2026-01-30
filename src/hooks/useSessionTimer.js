import { useEffect, useRef } from "react";
import scormService from "../services/scormService";

/**
 * Hook para rastrear tempo de sessão
 * Atualiza automaticamente o SCORM a cada intervalo definido
 */
export function useSessionTimer(intervalMs = 5000) {
  const sessionStartRef = useRef(Date.now());
  const intervalRef = useRef(null);

  useEffect(() => {
    // Inicia contador de tempo
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - sessionStartRef.current;
      scormService.setSessionTime(elapsed);
    }, intervalMs);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);

        // Salva tempo final
        const totalTime = Date.now() - sessionStartRef.current;
        scormService.setSessionTime(totalTime);
        scormService.commit();
      }
    };
  }, [intervalMs]);

  /**
   * Obtém tempo decorrido em milissegundos
   */
  const getElapsedTime = () => {
    return Date.now() - sessionStartRef.current;
  };

  /**
   * Obtém tempo formatado (HH:MM:SS)
   */
  const getFormattedTime = () => {
    const elapsed = getElapsedTime();
    return scormService.msToScormTime(elapsed);
  };

  /**
   * Reseta o timer
   */
  const resetTimer = () => {
    sessionStartRef.current = Date.now();
  };

  return {
    getElapsedTime,
    getFormattedTime,
    resetTimer,
  };
}

export default useSessionTimer;
