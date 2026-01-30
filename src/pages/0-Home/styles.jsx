import styled, { keyframes } from "styled-components";

// Multiplicador de escala para o glow - ajuste este valor para aumentar/diminuir todos os glows
const GLOW_SCALE = 1.5;

const Lightpulse = keyframes`
     0%   { box-shadow: 0 0 18px 4px rgba(255,255,255,0.50); }
  50%  { box-shadow: 0 0 19px 5px hsla(0, 0%, 100%, 0.55); }
  100% { box-shadow: 0 0 18px 4px rgba(255,255,255,0.50); }

`;
const Globepulse = keyframes`
     0%   { transform:scale(1);}
  50%  {transform: scale(1.07);}
  100% { transform:scale(1); }

`;
const Buttonpulse = keyframes`
     0%   { transform:translateX(-50%) scale(1) ;}
  50%  {transform: translateX(-50%) scale(1.035);}
  100% { transform:translateX(-50%) scale(1); }

`;
const GlowPulse = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 ${80 * GLOW_SCALE}px ${40 * GLOW_SCALE}px rgba(43, 0, 255, 0.8),
      0 ${-20 * GLOW_SCALE}px ${100 * GLOW_SCALE}px ${50 * GLOW_SCALE}px rgba(4, 0, 255, 0.6),
      0 ${-40 * GLOW_SCALE}px ${150 * GLOW_SCALE}px ${75 * GLOW_SCALE}px rgba(0, 55, 255, 0.4);
  }
  50% {
    box-shadow: 
      0 0 ${100 * GLOW_SCALE}px ${50 * GLOW_SCALE}px #0015ff,
      0 ${-20 * GLOW_SCALE}px ${130 * GLOW_SCALE}px ${65 * GLOW_SCALE}px rgba(0, 34, 255, 0.8),
      0 ${-40 * GLOW_SCALE}px ${180 * GLOW_SCALE}px ${90 * GLOW_SCALE}px rgba(0, 115, 255, 0.6);
  }
`;

export const WelcomeContainer = styled.div`
  background-image: url("/images/intro-background.png");
  text-align: center;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 2rem;

  .start-button {
    z-index: 10;
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    transition:
      transform 0.2s ease,
      filter 0.2s ease;
    /*     animation: ${Buttonpulse} 3s ease-in-out infinite;
 */
    &:hover {
      transform: translateX(-50%) scale(1.02);
      filter: drop-shadow(0 0 1px #fbffffba)
        drop-shadow(0 0 2px rgba(152, 182, 255, 0.4))
        drop-shadow(0 10px 30px rgba(0, 200, 255, 0.5));
    }

    img {
      height: 75px;
      display: block;
    }

    p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0;
      color: #1d33d8;
      font-weight: bold;
      font-size: 1.2rem;
      pointer-events: none;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
  }
`;

export const LogoBackgroundWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translate(-50%, -50%) scale(1.05);
  }

  /* Plataforma circular embaixo do globo - perspectiva elíptica */
  &::before {
    content: "";
    position: absolute;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1px;
    height: 1px;
    background: radial-gradient(
      ellipse,
      rgba(0, 200, 255, 0.6) 0%,
      rgba(0, 200, 255, 0.3) 40%,
      transparent 70%
    );
    border-radius: 50%;
    z-index: 0;
    animation: ${GlowPulse} 3s ease-in-out infinite;
  }

  /* Luz refletida embaixo do globo */
  &::after {
    content: "";
    position: absolute;
    bottom: -7rem;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 70px;
    background: radial-gradient(
      ellipse,
      rgba(99, 133, 255, 0.8) 0%,
      transparent 60%
    );
    border-radius: 50%;
    z-index: 0;
    filter: blur(20px);
  }
`;

export const LogoBackground = styled.img`
  width: 300px;
  display: block;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 0 1px #fbffffd1)
    drop-shadow(0 0 2px rgba(152, 182, 255, 0.4))
    drop-shadow(0 10px 30px rgba(0, 200, 255, 0.5));
  animation: ${Globepulse} 3s ease-in-out infinite;
  transition: filter 0.3s ease-in-out;
  &:hover {
    filter: drop-shadow(0 0 5px #fbffffd1)
      drop-shadow(0 0 15px rgba(152, 182, 255, 0.4))
      drop-shadow(0 10px 30px rgba(0, 200, 255, 0.5));
  }
`;

export const LogoFooter = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 9.5rem;
  /* Glow effect ao redor da imagem */
  filter: drop-shadow(0 0 10px rgba(0, 153, 255, 0.6))
    drop-shadow(0 0 20px rgba(0, 153, 255, 0.4))
    drop-shadow(0 0 30px rgba(0, 153, 255, 0.2));
`;

export const Title = styled.h1`
  color: white;
  background: linear-gradient(to bottom, rgba(0, 153, 255, 0.7), #0036cc);
  padding: 1rem 2rem;
  margin: 1rem auto var(--spacing-lg);
  border: 3px solid white;
  border-radius: 16px;
  width: fit-content;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.8);
  animation: ${Lightpulse} 2s infinite;
`;

export const Subtitle = styled.div`
  color: white;
  padding: 2rem 2.5rem;
  position: absolute;
  overflow: visible;
  z-index: 0;
  width: fit-content;
  top: 40%;
  left: 10%;

  /* Pseudo-elemento para sombra EXTERNA - SEM clip-path para não cortar */
  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    background: rgba(0, 0, 0, 0.25);
    filter: blur(7px);
    z-index: -2;
    border-radius: 1.5rem;
  }

  /* Pseudo-elemento para forma octogonal com glassmorphism - COM clip-path */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;

    /* Octógono com diagonais de tamanho fixo (1.5rem) */
    clip-path: polygon(
      1.5rem 0%,
      calc(100% - 1.5rem) 0%,
      100% 1.5rem,
      100% calc(100% - 1.5rem),
      calc(100% - 1.5rem) 100%,
      1.5rem 100%,
      0% calc(100% - 1.5rem),
      0% 1.5rem
    );

    /* Glassmorphism */
    background: rgba(255, 255, 255, 0.09);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(2px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 3px solid transparent;
    border-image: linear-gradient(to right, transparent, #0099ff, transparent) 1;
    box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.25);
  }
`;
