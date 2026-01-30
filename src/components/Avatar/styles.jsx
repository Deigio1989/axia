import styled, { css, keyframes } from "styled-components";

const glowPulse = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 10px rgba(0, 153, 255, 0.6))
           drop-shadow(0 0 20px rgba(0, 153, 255, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 15px rgba(0, 153, 255, 0.8))
           drop-shadow(0 0 30px rgba(0, 153, 255, 0.6));
  }
`;

// Tamanhos base
const SIZES = {
  small: 0.3,
  medium: 0.8,
  large: 1,
};

export const AvatarWrapper = styled.div`
  cursor: ${(props) => (props.$selectionScreen ? "pointer" : "default")};
  transition: all 0.3s ease;
  position: relative;
  width: ${(props) => 200 * SIZES[props.$size]}px;
  height: ${(props) => 200 * SIZES[props.$size]}px;
  transform: scale(1);
  isolation: isolate;

  .circle {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${(props) => 200 * SIZES[props.$size]}px;
    height: ${(props) => 200 * SIZES[props.$size]}px;
  }

  .face {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  /* Hover - apenas na tela de seleção */
  ${(props) =>
    props.$selectionScreen &&
    css`
      &:hover {
        transform: scale(1.05);
        filter: drop-shadow(0 0 8px rgba(0, 153, 255, 0.4))
          drop-shadow(0 0 15px rgba(0, 153, 255, 0.2));
      }
    `}

  /* Selected - apenas na tela de seleção */
  ${(props) =>
    props.$selectionScreen &&
    props.$selected &&
    css`
      animation: ${glowPulse} 2s ease-in-out infinite;
      transform: scale(1.05);
    `}
`;
