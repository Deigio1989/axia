import { useState, useEffect } from "react";
import { getSVGRenderBounds, svgToGameplayCoords } from "../utils/coordinates";

/**
 * Hook para gerenciar a posição do player com ajuste automático para offsets do SVG
 * @param {React.RefObject} imgRef - Ref da imagem
 * @param {React.RefObject} containerRef - Ref do container
 * @param {Object} initialSVGPosition - Posição inicial no SVG {x, y}
 * @returns {[Object, Function]} [position, setPosition]
 */
export function usePlayerPosition(
  imgRef,
  containerRef,
  initialSVGPosition = { x: 650, y: 225 },
) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const adjustInitialPosition = () => {
      const svgBounds = getSVGRenderBounds(
        imgRef.current,
        containerRef.current,
      );
      if (!svgBounds) {
        // SVG ainda não carregou, tenta novamente
        setTimeout(adjustInitialPosition, 100);
        return;
      }

      // Converte para coordenadas do gameplay-area (com offsets)
      const initialGameplayPos = svgToGameplayCoords(
        initialSVGPosition,
        svgBounds,
      );

      setPosition(initialGameplayPos);

      console.log("🔴 Player posição inicial ajustada:", {
        svgCoords: initialSVGPosition,
        gameplayCoords: initialGameplayPos,
        offsets: { x: svgBounds.offsetX, y: svgBounds.offsetY },
      });
    };

    adjustInitialPosition();
  }, [imgRef, containerRef, initialSVGPosition.x, initialSVGPosition.y]);

  return [position, setPosition];
}
