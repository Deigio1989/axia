import styled, { keyframes, css } from "styled-components";

// Multiplicador de escala para o glow
const GLOW_SCALE = 1.5;

// Animações

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

const buttonPulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
`;

const fadeInContent = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const MainContainer = styled.div`
  text-align: center;
  justify-self: center;
  width: 90%;
  height: 100%;
  justify-content: flex-end;

  gap: 5rem;

  display: flex;
  .slice-content {
    color: #000;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 700;
  }
  .flex-column {
    z-index: 36;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5rem;
  }
`;

export const AdvanceButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
  padding: 0;
  margin-top: 1rem;
  isolation: isolate;
  animation:
    ${fadeInContent} 0.5s ease-out 1s both,
    ${buttonPulse} 2s ease-in-out infinite;

  &:hover {
    transform: scale(1.02);
    filter: drop-shadow(0 0 1px #fbffffba)
      drop-shadow(0 0 2px rgba(152, 182, 255, 0.4))
      drop-shadow(0 10px 30px rgba(0, 200, 255, 0.5));
    animation-play-state: paused;
  }

  img {
    height: 75px;
    display: block;
    transition:
      filter 0.3s ease,
      opacity 0.3s ease;
  }

  span {
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
    transition: opacity 0.3s ease;
  }
`;

export const HouseContainer = styled.div`
  position: absolute;
  background-color: white;
  width: 700px;
  height: 400px;
  top: 15%;
  left: 5%;
  z-index: 35;
  .house {
    width: 700px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .platibanda {
    z-index: 75;
  }
  .house-base {
    z-index: 55;
  }
  .floor {
    z-index: 50;
  }

  .door-1 {
    z-index: 57;
    height: 95px;
    position: absolute;
    top: 230px;
    left: 327px;
  }
  .door-2 {
    z-index: 75;
    height: 95px;
    position: absolute;
    top: 217px;
    left: 355px;
    &:hover {
      cursor: pointer;
      top: 214px;
      left: 370px;
    }
  }
`;
