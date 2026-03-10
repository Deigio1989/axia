/**
 * Utilitários para pathfinding e navegação
 */

import { screenToCanvasCoords } from "./coordinates";

/**
 * Verifica se um pixel está em área navegável (coordenadas de TELA)
 * @param {number} screenX - Coordenada X na tela
 * @param {number} screenY - Coordenada Y na tela
 * @param {HTMLCanvasElement} canvas - Canvas com a nav mask
 * @param {Object} svgBounds - Bounds do SVG renderizado
 * @returns {boolean} True se é área navegável
 */
export const isWalkable = (screenX, screenY, canvas, svgBounds) => {
  if (!canvas) return false;

  // Converte coordenadas de tela para coordenadas do canvas
  const { x, y } = screenToCanvasCoords(screenX, screenY, canvas, svgBounds);

  const ctx = canvas.getContext("2d", {
    willReadFrequently: true,
  });
  const width = canvas.width;
  const height = canvas.height;

  if (x < 0 || y < 0 || x >= width || y >= height) return false;

  const pixelData = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
  return pixelData[3] > 10; // Alpha > 10 = área navegável
};

/**
 * Verifica se há linha de visão entre dois pontos (sem obstáculos)
 * @param {Object} pointA - Ponto inicial {x, y}
 * @param {Object} pointB - Ponto final {x, y}
 * @param {HTMLCanvasElement} canvas - Canvas com a nav mask
 * @param {Object} svgBounds - Bounds do SVG renderizado
 * @returns {boolean} True se há linha de visão direta
 */
export const hasLineOfSight = (pointA, pointB, canvas, svgBounds) => {
  const dx = pointB.x - pointA.x;
  const dy = pointB.y - pointA.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const steps = Math.ceil(distance / 3); // Verifica a cada 3 pixels

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = pointA.x + dx * t;
    const y = pointA.y + dy * t;

    if (!isWalkable(x, y, canvas, svgBounds)) {
      return false;
    }
  }

  return true;
};

/**
 * Suaviza o caminho removendo waypoints desnecessários (path smoothing)
 * @param {Array} path - Array de pontos {x, y}
 * @param {HTMLCanvasElement} canvas - Canvas com a nav mask
 * @param {Object} svgBounds - Bounds do SVG renderizado
 * @returns {Array} Path suavizado
 */
export const smoothPath = (path, canvas, svgBounds) => {
  if (path.length <= 2) return path;

  const smoothed = [path[0]];
  let current = 0;

  while (current < path.length - 1) {
    // Tenta pular o máximo de pontos possível mantendo linha de visão
    let farthest = current + 1;

    for (let i = path.length - 1; i > current + 1; i--) {
      if (hasLineOfSight(path[current], path[i], canvas, svgBounds)) {
        farthest = i;
        break;
      }
    }

    smoothed.push(path[farthest]);
    current = farthest;
  }

  return smoothed;
};

/**
 * Algoritmo A* otimizado para pathfinding
 * @param {Object} start - Ponto inicial {x, y}
 * @param {Object} end - Ponto final {x, y}
 * @param {HTMLCanvasElement} canvas - Canvas com a nav mask
 * @param {Object} svgBounds - Bounds do SVG renderizado
 * @param {number} gridSize - Tamanho da grid (default: 5)
 * @returns {Array|null} Array de pontos do caminho ou null se não encontrado
 */
export const findPath = (start, end, canvas, svgBounds, gridSize = 5) => {
  // Quantiza posições para a grid de busca
  const startNode = {
    x: Math.round(start.x / gridSize) * gridSize,
    y: Math.round(start.y / gridSize) * gridSize,
  };

  const endNode = {
    x: Math.round(end.x / gridSize) * gridSize,
    y: Math.round(end.y / gridSize) * gridSize,
  };

  // Heurística Manhattan (mais rápida que Euclidiana)
  const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

  const openSet = [{ ...startNode, g: 0, h: 0, f: 0, parent: null }];
  const closedSet = new Set();
  const openSetMap = new Map();
  openSetMap.set(`${startNode.x},${startNode.y}`, openSet[0]);

  // 8 direções (incluindo diagonais)
  const directions = [
    { x: gridSize, y: 0, cost: gridSize },
    { x: -gridSize, y: 0, cost: gridSize },
    { x: 0, y: gridSize, cost: gridSize },
    { x: 0, y: -gridSize, cost: gridSize },
    { x: gridSize, y: gridSize, cost: gridSize * 1.414 },
    { x: -gridSize, y: -gridSize, cost: gridSize * 1.414 },
    { x: gridSize, y: -gridSize, cost: gridSize * 1.414 },
    { x: -gridSize, y: gridSize, cost: gridSize * 1.414 },
  ];

  while (openSet.length > 0) {
    // Pega o nó com menor f (já eficiente com array pequeno)
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift();
    const currentKey = `${current.x},${current.y}`;
    openSetMap.delete(currentKey);

    // Chegou ao destino
    if (
      Math.abs(current.x - endNode.x) < gridSize / 2 &&
      Math.abs(current.y - endNode.y) < gridSize / 2
    ) {
      const path = [];
      let node = current;
      while (node) {
        path.unshift({ x: node.x, y: node.y });
        node = node.parent;
      }

      // Adiciona o ponto final exato clicado (não arredondado)
      path[path.length - 1] = { x: end.x, y: end.y };

      // Suaviza o caminho
      const smoothed = smoothPath(path, canvas, svgBounds);
      console.log(
        `🗺️ Caminho: ${path.length} pontos → ${smoothed.length} suavizados`,
      );
      return smoothed;
    }

    closedSet.add(currentKey);

    // Explora vizinhos
    for (const dir of directions) {
      const neighbor = {
        x: current.x + dir.x,
        y: current.y + dir.y,
      };

      const neighborKey = `${neighbor.x},${neighbor.y}`;
      if (closedSet.has(neighborKey)) continue;
      if (!isWalkable(neighbor.x, neighbor.y, canvas, svgBounds)) continue;

      const g = current.g + dir.cost;
      const h = heuristic(neighbor, endNode);
      const f = g + h;

      const existing = openSetMap.get(neighborKey);
      if (existing && existing.g <= g) continue;

      if (existing) {
        existing.g = g;
        existing.h = h;
        existing.f = f;
        existing.parent = current;
      } else {
        const newNode = { ...neighbor, g, h, f, parent: current };
        openSet.push(newNode);
        openSetMap.set(neighborKey, newNode);
      }
    }

    // Timeout para evitar travamento
    if (closedSet.size > 3000) {
      console.log("⚠️ Pathfinding timeout");
      return null;
    }
  }

  console.log("❌ Nenhum caminho encontrado");
  return null;
};
