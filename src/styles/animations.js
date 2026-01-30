import { keyframes } from "styled-components";

/**
 * Animações Globais Reutilizáveis
 */

// Pulsos e Glows
export const Lightpulse = keyframes`
  0%   { box-shadow: 0 0 18px 4px rgba(255,255,255,0.50); }
  50%  { box-shadow: 0 0 19px 5px hsla(0, 0%, 100%, 0.55); }
  100% { box-shadow: 0 0 18px 4px rgba(255,255,255,0.50); }
`;

export const Globepulse = keyframes`
  0%   { transform: scale(1); }
  50%  { transform: scale(1.07); }
  100% { transform: scale(1); }
`;

export const Buttonpulse = keyframes`
  0%   { transform: translateX(-50%) scale(1); }
  50%  { transform: translateX(-50%) scale(1.035); }
  100% { transform: translateX(-50%) scale(1); }
`;

export const GlowPulse = (glowScale = 1.5) => keyframes`
  0%, 100% {
    box-shadow: 
      0 0 ${80 * glowScale}px ${40 * glowScale}px rgba(43, 0, 255, 0.8),
      0 ${-20 * glowScale}px ${100 * glowScale}px ${50 * glowScale}px rgba(4, 0, 255, 0.6),
      0 ${-40 * glowScale}px ${150 * glowScale}px ${75 * glowScale}px rgba(0, 55, 255, 0.4);
  }
  50% {
    box-shadow: 
      0 0 ${100 * glowScale}px ${50 * glowScale}px #0015ff,
      0 ${-20 * glowScale}px ${130 * glowScale}px ${65 * glowScale}px rgba(0, 34, 255, 0.8),
      0 ${-40 * glowScale}px ${180 * glowScale}px ${90 * glowScale}px rgba(0, 115, 255, 0.6);
  }
`;

export const glowPulseAvatar = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 10px rgba(0, 153, 255, 0.6))
           drop-shadow(0 0 20px rgba(0, 153, 255, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 15px rgba(0, 153, 255, 0.8))
           drop-shadow(0 0 30px rgba(0, 153, 255, 0.6));
  }
`;

// Slides e Fades
export const slideInFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideOutToLeft = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100px);
  }
`;

export const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const slideTextChange = keyframes`
  0% { opacity: 1; transform: translateX(0); }
  50% { opacity: 0; transform: translateX(-20px); }
  51% { opacity: 0; transform: translateX(20px); }
  100% { opacity: 1; transform: translateX(0); }
`;

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

// Expands
export const expandContainer = keyframes`
  from {
    opacity: 0;
    transform: scaleX(0.3);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
`;

export const expandVertical = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
`;

// Bounces e Shakes
export const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

// Rotations
export const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

export default {
  Lightpulse,
  Globepulse,
  Buttonpulse,
  GlowPulse,
  glowPulseAvatar,
  slideInFromTop,
  slideOutToLeft,
  slideInFromRight,
  slideTextChange,
  fadeIn,
  fadeOut,
  expandContainer,
  expandVertical,
  bounce,
  shake,
  rotate,
  pulse,
};
