import { useEffect, useRef } from "react";

/**
 * Hook para carregar e processar a máscara de navegação em um canvas
 * @param {React.RefObject} imgRef - Ref da imagem SVG
 * @returns {React.RefObject} Ref do canvas
 */
export function useNavMaskCanvas(imgRef) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadNavMask = async () => {
      const img = imgRef.current;
      if (!img) return;

      // Aguarda a imagem carregar
      if (!img.complete) {
        img.onload = () => loadNavMask();
        return;
      }

      const canvas = document.createElement("canvas");

      // Usa um tamanho fixo de referência baseado no tamanho natural do SVG
      // ou um tamanho grande padrão para manter qualidade
      const referenceWidth = img.naturalWidth || 1200;
      const referenceHeight = img.naturalHeight || 800;

      canvas.width = referenceWidth;
      canvas.height = referenceHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      // Desenha a imagem SVG no canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvasRef.current = canvas;

      console.log("✅ Nav-mask carregada no canvas:", {
        width: canvas.width,
        height: canvas.height,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      });
    };

    loadNavMask();
  }, [imgRef]);

  return canvasRef;
}
