import { forwardRef } from "react";
import { NavMask, NavMaskImage } from "../styles";

/**
 * Componente para a área de navegação com máscara de colisão
 */
export const NavigationArea = forwardRef(
  ({ maskImageSrc, isOverWalkable, onClick, onMouseMove, imgRef }, ref) => {
    return (
      <NavMask
        ref={ref}
        $isOverWalkable={isOverWalkable}
        onClick={onClick}
        onMouseMove={onMouseMove}
      >
        <NavMaskImage src={maskImageSrc} alt="" ref={imgRef} />
      </NavMask>
    );
  },
);

NavigationArea.displayName = "NavigationArea";
