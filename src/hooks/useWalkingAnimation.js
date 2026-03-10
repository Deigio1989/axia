import { useState, useEffect, useRef, useMemo } from "react";

/**
 * Gera array de frames a partir de uma pasta e padrão de nomenclatura
 * @param {string} folder - Caminho da pasta (ex: "/images/M-Diagonal-walking-cycle")
 * @param {string} pattern - Padrão do nome dos arquivos com {n} para o número
 * @param {number[]} frameNumbers - Array com os números dos frames a usar
 * @returns {string[]} Array com os caminhos completos dos frames
 */
function generateFrames(folder, pattern, frameNumbers) {
  return frameNumbers.map((num) => {
    const paddedNum = String(num).padStart(2, "0");
    return `${folder}/${pattern.replace("{n}", paddedNum)}`;
  });
}

export function useWalkingAnimation({
  framesFolder,
  framesPattern = "Armature_animtion0_{n}.png",
  frameNumbers = [0, 4, 8, 12, 16, 20, 24],
  fps = 8,
  duration = 2000,
} = {}) {
  const [isWalking, setIsWalking] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // Gera os frames baseado na pasta fornecida
  const frames = useMemo(() => {
    if (!framesFolder) {
      console.warn("useWalkingAnimation: framesFolder não foi fornecido");
      return [];
    }
    return generateFrames(framesFolder, framesPattern, frameNumbers);
  }, [framesFolder, framesPattern, frameNumbers]);

  const stopWalking = () => {
    console.log("🛑 [useWalkingAnimation] stopWalking chamado");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsWalking(false);
    setCurrentFrame(0); // Volta para o frame inicial
    console.log("✅ [useWalkingAnimation] Caminhada parada");
  };

  const startWalking = () => {
    if (isWalking || frames.length === 0) return;

    console.log(
      "🚶 [useWalkingAnimation] Iniciando caminhada com",
      frames.length,
      "frames",
    );
    setIsWalking(true);
    setCurrentFrame(0);

    // Intervalo para trocar os frames (1000ms / fps)
    const frameInterval = 1000 / fps;
    console.log(
      "⏱️ [useWalkingAnimation] Intervalo entre frames:",
      frameInterval,
      "ms",
    );

    intervalRef.current = setInterval(() => {
      setCurrentFrame((prev) => {
        const next = (prev + 1) % frames.length;
        console.log("🎬 [useWalkingAnimation] Frame:", prev, "→", next);
        return next;
      });
    }, frameInterval);

    // Para a animação após a duração especificada
    timeoutRef.current = setTimeout(() => {
      console.log("⏹️ [useWalkingAnimation] Parando caminhada");
      stopWalking();
    }, duration);
  };

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const frameUrl = frames[currentFrame] || frames[0];

  // Log do estado retornado
  useEffect(() => {
    console.log("📤 [useWalkingAnimation] Retornando:", {
      isWalking,
      currentFrameIndex: currentFrame,
      frameUrl: frameUrl?.substring(frameUrl.lastIndexOf("/") + 1),
    });
  }, [isWalking, currentFrame, frameUrl]);

  return {
    isWalking,
    currentFrame: frameUrl,
    startWalking,
    stopWalking,
  };
}
