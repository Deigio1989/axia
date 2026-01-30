import styled, { css, keyframes } from "styled-components";

// ========== ANIMAÇÕES FADE ==========

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

// ========== ANIMAÇÕES FADE + GLOW (SCI-FI) ==========

const fadeInGlow = keyframes`
  0% { 
    opacity: 0;
    filter: brightness(1.5) drop-shadow(0 0 20px rgba(0, 153, 255, 0.8));
  }
  50% {
    filter: brightness(1.3) drop-shadow(0 0 15px rgba(0, 153, 255, 0.5));
  }
  100% { 
    opacity: 1;
    filter: brightness(1) drop-shadow(0 0 0px transparent);
  }
`;

const fadeOutGlow = keyframes`
  0% { 
    opacity: 1;
    filter: brightness(1) drop-shadow(0 0 0px transparent);
  }
  50% {
    filter: brightness(1.3) drop-shadow(0 0 15px rgba(0, 153, 255, 0.5));
  }
  100% { 
    opacity: 0;
    filter: brightness(1.5) drop-shadow(0 0 20px rgba(0, 153, 255, 0.8));
  }
`;

// ========== ANIMAÇÕES FADE + SCALE (PORTAL) ==========

const fadeInScale = keyframes`
  from { 
    opacity: 0;
    transform: scale(0.8);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOutScale = keyframes`
  from { 
    opacity: 1;
    transform: scale(1);
  }
  to { 
    opacity: 0;
    transform: scale(1.2);
  }
`;

// ========== ANIMAÇÕES SLIDE ==========

const slideInLeft = keyframes`
  from { 
    opacity: 0;
    transform: translateX(-100px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideOutLeft = keyframes`
  from { 
    opacity: 1;
    transform: translateX(0);
  }
  to { 
    opacity: 0;
    transform: translateX(-100px);
  }
`;

const slideInRight = keyframes`
  from { 
    opacity: 0;
    transform: translateX(100px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideOutRight = keyframes`
  from { 
    opacity: 1;
    transform: translateX(0);
  }
  to { 
    opacity: 0;
    transform: translateX(100px);
  }
`;

// ========== ANIMAÇÕES WIPE (SCANNER) ==========

const wipeIn = keyframes`
  0% { 
    opacity: 0;
    clip-path: inset(0 100% 0 0);
  }
  100% { 
    opacity: 1;
    clip-path: inset(0 0 0 0);
  }
`;

const wipeOut = keyframes`
  0% { 
    opacity: 1;
    clip-path: inset(0 0 0 0);
  }
  100% { 
    opacity: 0;
    clip-path: inset(0 0 0 100%);
  }
`;

// ========== COMPONENTES ==========

export const TransitionWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  will-change: opacity, transform;

  /* Estado idle - página estável sem transição */
  ${(props) =>
    props.$stage === "idle" &&
    css`
      opacity: 1;
    `}

  /* ========== FADE SIMPLES ========== */
  
  /* Entrada */
  ${(props) =>
    props.$type === "fade" &&
    props.$stage === "enter" &&
    css`
      animation: ${fadeIn} ${props.$duration / 2}ms ease-out forwards;
    `}

  /* Saída */
  ${(props) =>
    props.$type === "fade" &&
    props.$stage === "exit" &&
    css`
      animation: ${fadeOut} ${props.$duration / 2}ms ease-in forwards;
    `}

  /* ========== FADE + GLOW (SCI-FI) ⭐ ========== */
  
  /* Entrada */
  ${(props) =>
    props.$type === "fadeGlow" &&
    props.$stage === "enter" &&
    css`
      animation: ${fadeInGlow} ${props.$duration / 2}ms ease-out forwards;
    `}

  /* Saída */
  ${(props) =>
    props.$type === "fadeGlow" &&
    props.$stage === "exit" &&
    css`
      animation: ${fadeOutGlow} ${props.$duration / 2}ms ease-in forwards;
    `}

  /* ========== FADE + SCALE (PORTAL) ========== */
  
  /* Entrada */
  ${(props) =>
    props.$type === "fadeScale" &&
    props.$stage === "enter" &&
    css`
      animation: ${fadeInScale} ${props.$duration / 2}ms ease-out forwards;
    `}

  /* Saída */
  ${(props) =>
    props.$type === "fadeScale" &&
    props.$stage === "exit" &&
    css`
      animation: ${fadeOutScale} ${props.$duration / 2}ms ease-in forwards;
    `}

  /* ========== SLIDE LEFT ========== */
  
  /* Entrada */
  ${(props) =>
    props.$type === "slideLeft" &&
    props.$stage === "enter" &&
    css`
      animation: ${slideInLeft} ${props.$duration / 2}ms ease-out forwards;
    `}

  /* Saída */
  ${(props) =>
    props.$type === "slideLeft" &&
    props.$stage === "exit" &&
    css`
      animation: ${slideOutLeft} ${props.$duration / 2}ms ease-in forwards;
    `}

  /* ========== SLIDE RIGHT ========== */
  
  /* Entrada */
  ${(props) =>
    props.$type === "slideRight" &&
    props.$stage === "enter" &&
    css`
      animation: ${slideInRight} ${props.$duration / 2}ms ease-out forwards;
    `}

  /* Saída */
  ${(props) =>
    props.$type === "slideRight" &&
    props.$stage === "exit" &&
    css`
      animation: ${slideOutRight} ${props.$duration / 2}ms ease-in forwards;
    `}

  /* ========== WIPE HORIZONTAL (SCANNER) ========== */
  
  /* Entrada */
  ${(props) =>
    props.$type === "wipeHorizontal" &&
    props.$stage === "enter" &&
    css`
      animation: ${wipeIn} ${props.$duration / 2}ms ease-out forwards;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(0, 153, 255, 0.3) 50%,
          transparent 100%
        );
        pointer-events: none;
        animation: ${keyframes`
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        `} ${props.$duration / 2}ms ease-out;
      }
    `}

  /* Saída */
  ${(props) =>
    props.$type === "wipeHorizontal" &&
    props.$stage === "exit" &&
    css`
      animation: ${wipeOut} ${props.$duration / 2}ms ease-in forwards;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(0, 153, 255, 0.3) 50%,
          transparent 100%
        );
        pointer-events: none;
        animation: ${keyframes`
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        `} ${props.$duration / 2}ms ease-in;
      }
    `}
`;
