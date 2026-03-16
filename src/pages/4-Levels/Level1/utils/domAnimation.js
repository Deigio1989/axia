/**
 * Versão otimizada de animatePath que anima diretamente no DOM via ref
 * Não causa re-renders - zero impacto no React
 */

import { generateSmoothCurve } from "./animation";

/**
 * Anima um elemento diretamente no DOM via ref
 * @param {React.RefObject} elementRef - Ref do elemento a animar
 * @param {Array} path - Array de waypoints {x, y}
 * @param {Function} onComplete - Callback ao finalizar
 * @param {number} speed - Velocidade em pixels por segundo (default: 150)
 * @returns {Function} Função para cancelar a animação
 */
export const animateElementDirect = (
  elementRef,
  path,
  onComplete,
  speed = 150,
) => {
  if (!elementRef.current || path.length <= 1) {
    onComplete?.();
    return () => {};
  }

  const element = elementRef.current;

  // Gera curva suave a partir dos waypoints
  const smoothPath = generateSmoothCurve(path);

  let currentIndex = 0;
  let startTime = null;
  let animationId = null;

  const animate = (timestamp) => {
    if (!startTime) startTime = timestamp;

    const currentPoint = smoothPath[currentIndex];
    const nextPoint = smoothPath[currentIndex + 1];

    if (!nextPoint) {
      // Chegou ao final - garante posição final exata
      const finalPos = path[path.length - 1];
      element.style.left = `${finalPos.x}px`;
      element.style.top = `${finalPos.y}px`;
      onComplete?.();
      console.log("✅ Animação concluída!");
      return;
    }

    // Calcula distância até próximo ponto da curva
    const dx = nextPoint.x - currentPoint.x;
    const dy = nextPoint.y - currentPoint.y;
    const segmentDistance = Math.sqrt(dx * dx + dy * dy);
    const segmentDuration = (segmentDistance / speed) * 1000;

    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / segmentDuration, 1);

    // Interpolação entre pontos da curva
    const x = currentPoint.x + dx * progress;
    const y = currentPoint.y + dy * progress;

    // ATUALIZA DIRETAMENTE O DOM - SEM ESTADO
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;

    if (progress >= 1) {
      currentIndex++;
      startTime = timestamp;
    }

    animationId = requestAnimationFrame(animate);
  };

  animationId = requestAnimationFrame(animate);

  // Retorna função de cancelamento
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
};

/**
 * Hook para obter posição atual de um elemento animado
 * Útil para cálculos sem causar re-renders
 */
export const getElementPosition = (elementRef) => {
  if (!elementRef.current) return { x: 0, y: 0 };

  const style = elementRef.current.style;
  const x = parseFloat(style.left) || 0;
  const y = parseFloat(style.top) || 0;

  return { x, y };
};
