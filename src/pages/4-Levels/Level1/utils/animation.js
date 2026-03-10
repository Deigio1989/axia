/**
 * Utilitários para animação e interpolação de movimento
 */

/**
 * Interpolação Catmull-Rom para curvas suaves (Bezier-like)
 * @param {Object} p0 - Ponto anterior {x, y}
 * @param {Object} p1 - Ponto inicial do segmento {x, y}
 * @param {Object} p2 - Ponto final do segmento {x, y}
 * @param {Object} p3 - Ponto posterior {x, y}
 * @param {number} t - Parâmetro de interpolação (0-1)
 * @returns {Object} Ponto interpolado {x, y}
 */
export const catmullRom = (p0, p1, p2, p3, t) => {
  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x:
      0.5 *
      (2 * p1.x +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    y:
      0.5 *
      (2 * p1.y +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
  };
};

/**
 * Gera pontos suaves ao longo da curva usando interpolação Catmull-Rom
 * @param {Array} path - Array de waypoints {x, y}
 * @param {number} pointsPerSegment - Número de pontos por segmento (default: 10)
 * @returns {Array} Array de pontos suavizados
 */
export const generateSmoothCurve = (path, pointsPerSegment = 10) => {
  if (path.length < 3) return path;

  const smoothPoints = [];

  for (let i = 0; i < path.length - 1; i++) {
    const p0 = path[Math.max(0, i - 1)];
    const p1 = path[i];
    const p2 = path[i + 1];
    const p3 = path[Math.min(path.length - 1, i + 2)];

    for (let t = 0; t < 1; t += 1 / pointsPerSegment) {
      smoothPoints.push(catmullRom(p0, p1, p2, p3, t));
    }
  }

  smoothPoints.push(path[path.length - 1]); // Adiciona ponto final
  return smoothPoints;
};

/**
 * Cria uma animação suave ao longo de um caminho
 * @param {Array} path - Array de waypoints {x, y}
 * @param {Function} onUpdate - Callback chamado a cada frame com posição atual {x, y}
 * @param {Function} onComplete - Callback chamado ao finalizar
 * @param {number} speed - Velocidade em pixels por segundo (default: 150)
 * @returns {Function} Função para cancelar a animação
 */
export const animatePath = (path, onUpdate, onComplete, speed = 150) => {
  if (path.length <= 1) {
    onComplete?.();
    return () => {};
  }

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
      onUpdate(path[path.length - 1]);
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

    onUpdate({ x, y });

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
