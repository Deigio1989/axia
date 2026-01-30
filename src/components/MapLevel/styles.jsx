import styled, { keyframes, css } from "styled-components";

const gentlePulse = keyframes`
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.02);
  }
`;

export const LevelContainer = styled.div`
  position: absolute;
  top: ${(props) => props.$top || "50%"};
  left: ${(props) => props.$left || "50%"};
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.$isUnlocked ? "pointer" : "not-allowed")};
  transition: transform 0.3s ease;
  width: ${(props) =>
    props.$type === "final" ? "300px" : props.$size || "120px"};
  height: ${(props) =>
    props.$type === "final" ? "170px" : props.$size || "120px"};

  /* Selecionado - pulso e glow permanente */
  ${(props) =>
    props.$isSelected &&
    css`
      animation: ${gentlePulse} 2s ease-in-out infinite;

      .level {
        filter: drop-shadow(0 0 8px rgba(100, 200, 255, 0.6))
          drop-shadow(0 0 15px rgba(100, 200, 255, 0.4));
      }
    `}

  /* Hover apenas quando desbloqueado */
  ${(props) =>
    props.$isUnlocked &&
    !props.$isSelected &&
    `
    &:hover {
      transform: translate(-50%, -50%) scale(1.05);
      
      .level {
        filter: 
          drop-shadow(0 0 8px rgba(100, 200, 255, 0.6))
          drop-shadow(0 0 15px rgba(100, 200, 255, 0.4));
      }
    }
  `}

  /* Bloqueado - filtro azul escuro acinzentado */
  ${(props) =>
    !props.$isUnlocked &&
    `
    pointer-events: none;
    
    img {
      filter: 
        grayscale(0.5) 
        brightness(0.6) 
        sepia(0.3) 
        hue-rotate(180deg);
      opacity: 0.7;
    }
  `}

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    height: ${(props) =>
      props.$type === "final" ? "170px" : props.$size || "120px"};
    width: ${(props) =>
      props.$type === "final" ? "300px" : props.$size || "120px"};
    object-fit: contain;
    transition: filter 0.3s ease;
  }

  .level {
    z-index: 1;
  }

  .number {
    z-index: 2;
    width: 50px !important;
    height: 50px !important;
    top: ${(props) => props.$numberTop || "70%"} !important;
    left: ${(props) => props.$numberLeft || "50%"} !important;
  }
`;
