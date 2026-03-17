/**
 * Utilitários para conversão e manipulação de coordenadas
 */

/**
 * Calcula o espaço real ocupado pela imagem SVG considerando object-fit: contain
 * @param {HTMLImageElement} img - Elemento da imagem
 * @param {HTMLElement} container - Container da imagem
 * @returns {Object|null} Bounds renderizados ou null se não disponível
 */
export const getSVGRenderBounds = (img, container) => {
  if (!img || !container) return null;

  const containerRect = container.getBoundingClientRect();

  // Pega dimensões naturais do SVG
  const naturalWidth = img.naturalWidth || 1200;
  const naturalHeight = img.naturalHeight || 800;

  // Calcula aspect ratio
  const imgAspect = naturalWidth / naturalHeight;
  const containerAspect = containerRect.width / containerRect.height;

  let renderWidth, renderHeight, offsetX, offsetY;

  // object-fit: contain - a imagem se ajusta mantendo proporções
  if (imgAspect > containerAspect) {
    // Imagem mais larga - ajusta pela largura
    renderWidth = containerRect.width;
    renderHeight = containerRect.width / imgAspect;
    offsetX = 0;
    offsetY = (containerRect.height - renderHeight) / 2;
  } else {
    // Imagem mais alta - ajusta pela altura
    renderHeight = containerRect.height;
    renderWidth = containerRect.height * imgAspect;
    offsetX = (containerRect.width - renderWidth) / 2;
    offsetY = 0;
  }
  const result = {
    left: containerRect.left + offsetX,
    top: containerRect.top + offsetY,
    width: renderWidth,
    height: renderHeight,
    offsetX,
    offsetY,
  };

  // Log detalhado uma vez por sessão para diagnosticar diferenças entre local/server
  try {
    const win = typeof window !== "undefined" ? window : null;
    if (win && !win.__loggedSVGRenderBounds) {
      win.__loggedSVGRenderBounds = true;
      console.log("[getSVGRenderBounds]", {
        natural: { w: naturalWidth, h: naturalHeight },
        container: {
          left: containerRect.left,
          top: containerRect.top,
          width: containerRect.width,
          height: containerRect.height,
        },
        result,
      });
    }
  } catch {
    // Ignora falhas em ambientes sem window
  }

  return result;
};

/**
 * Converte coordenadas de tela (pixels visuais) para coordenadas do canvas
 * @param {number} screenX - Coordenada X na tela
 * @param {number} screenY - Coordenada Y na tela
 * @param {HTMLCanvasElement} canvas - Canvas de referência
 * @param {Object} svgBounds - Bounds do SVG renderizado
 * @returns {Object} Coordenadas no canvas {x, y}
 */
export const screenToCanvasCoords = (screenX, screenY, canvas, svgBounds) => {
  if (!canvas || !svgBounds) {
    return { x: screenX, y: screenY };
  }

  // Calcula fator de escala entre tamanho visual do SVG e tamanho do canvas
  const scaleX = canvas.width / svgBounds.width;
  const scaleY = canvas.height / svgBounds.height;

  const canvasCoords = {
    x: screenX * scaleX,
    y: screenY * scaleY,
  };

  // Debug: mostra conversão ocasionalmente
  if (Math.random() < 0.1) {
    console.log("📐 Conversão:", {
      screen: { x: Math.floor(screenX), y: Math.floor(screenY) },
      canvas: {
        x: Math.floor(canvasCoords.x),
        y: Math.floor(canvasCoords.y),
      },
      scale: { x: scaleX.toFixed(2), y: scaleY.toFixed(2) },
      visualSize: {
        w: Math.floor(svgBounds.width),
        h: Math.floor(svgBounds.height),
      },
      canvasSize: { w: canvas.width, h: canvas.height },
    });
  }

  return canvasCoords;
};

/**
 * Converte coordenadas do canvas para coordenadas de tela
 * @param {number} canvasX - Coordenada X no canvas
 * @param {number} canvasY - Coordenada Y no canvas
 * @param {HTMLCanvasElement} canvas - Canvas de referência
 * @param {Object} svgBounds - Bounds do SVG renderizado
 * @returns {Object} Coordenadas na tela {x, y}
 */
export const canvasToScreenCoords = (canvasX, canvasY, canvas, svgBounds) => {
  if (!canvas || !svgBounds) {
    return { x: canvasX, y: canvasY };
  }

  const scaleX = svgBounds.width / canvas.width;
  const scaleY = svgBounds.height / canvas.height;

  return {
    x: canvasX * scaleX,
    y: canvasY * scaleY,
  };
};

/**
 * Extrai coordenadas relativas a um elemento a partir de um evento de mouse
 * @param {MouseEvent} e - Evento de mouse
 * @param {Object} svgBounds - Bounds do SVG renderizado
 * @returns {Object|null} Coordenadas relativas {x, y} ou null se fora dos bounds
 */
export const getRelativeCoords = (e, svgBounds) => {
  if (!svgBounds) return null;

  const x = e.clientX - svgBounds.left;
  const y = e.clientY - svgBounds.top;

  // Verifica se clique está dentro dos bounds do SVG
  if (x < 0 || y < 0 || x > svgBounds.width || y > svgBounds.height) {
    return null;
  }

  return { x, y };
};

/**
 * Converte posição SVG para coordenadas de gameplay (adiciona offsets)
 * @param {Object} svgPos - Posição no SVG {x, y}
 * @param {Object} svgBounds - Bounds do SVG renderizado
 * @returns {Object} Posição no gameplay {x, y}
 */
export const svgToGameplayCoords = (svgPos, svgBounds) => {
  if (!svgBounds) return svgPos;

  return {
    x: svgPos.x + svgBounds.offsetX,
    y: svgPos.y + svgBounds.offsetY,
  };
};

/**
 * Converte posição gameplay para coordenadas SVG (remove offsets)
 * @param {Object} gameplayPos - Posição no gameplay {x, y}
 * @param {Object} svgBounds - Bounds do SVG renderizado
 * @returns {Object} Posição no SVG {x, y}
 */
export const gameplayToSvgCoords = (gameplayPos, svgBounds) => {
  if (!svgBounds) return gameplayPos;

  return {
    x: gameplayPos.x - svgBounds.offsetX,
    y: gameplayPos.y - svgBounds.offsetY,
  };
};
