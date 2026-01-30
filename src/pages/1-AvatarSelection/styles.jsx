import styled, { keyframes, css } from "styled-components";

// Multiplicador de escala para o glow
const GLOW_SCALE = 1.5;

// Animações
const slideInFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideOutToLeft = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100px);
  }
`;

const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideTextChange = keyframes`
  0% { opacity: 1; transform: translateX(0); }
  50% { opacity: 0; transform: translateX(-20px); }
  51% { opacity: 0; transform: translateX(20px); }
  100% { opacity: 1; transform: translateX(0); }
`;

const expandContainer = keyframes`
  from {
    opacity: 0;
    transform: scaleX(0.3);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
`;

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

const fadeInContent = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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

export const MainContainer = styled.div`
  background-image: url("/images/avatar-selection-bg.png");
  text-align: center;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  .logo {
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    left: 0;
    opacity: 0.75;
    width: 15%;
  }

  .top-bar-container {
    width: 100%;
    display: block;
    position: relative;
  }
  .top-bar {
    width: 100%;
    display: block;
    position: relative;
    z-index: 10;
    /* Box-shadow para baixo em dois pontos - simulando gradiente */
    filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.7))
      drop-shadow(0 15px 25px rgba(221, 230, 255, 0.5));
  }

  .bottom-bar {
    width: 100%;
    display: block;
    position: relative;
    filter: drop-shadow(0 8px 12px rgba(230, 234, 242, 0.7))
      drop-shadow(0 15px 25px rgba(118, 154, 255, 0.5));
  }
`;

export const SelectionTitle = styled.div`
  position: relative;
  width: fit-content;

  animation: ${(props) =>
      props.$isExiting
        ? slideOutToLeft
        : props.$step === 2
          ? slideInFromRight
          : slideInFromTop}
    0.5s ease-out;

  img {
    width: 350px;
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
    line-height: 1.2rem;
    pointer-events: none;
  }
`;

export const SelectionBox = styled.div`
  color: white;
  padding: 3rem 4rem;
  position: relative;
  width: fit-content;
  animation: ${(props) =>
      props.$isExiting
        ? slideOutToLeft
        : props.$step === 2
          ? slideInFromRight
          : expandContainer}
    ${(props) => (props.$isExiting ? "0.5s" : "0.5s")} ease-out
    ${(props) => (props.$isExiting ? "0s" : "0.4s")} both;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  filter: none;
  isolation: isolate;

  .question {
    font-size: 1.5rem;
    margin: 0;
    font-weight: 300;
    animation: ${fadeInContent} 0.5s ease-out 1s both;
  }

  .avatars {
    display: flex;
    gap: 3rem;
    animation: ${fadeInContent} 0.5s ease-out 1s both;
  }

  /* Sombra externa */
  &::before {
    content: "";
    position: absolute;
    top: 8px;
    left: 8px;
    right: -8px;
    bottom: -8px;
    background: rgba(0, 0, 0, 0.15);
    filter: blur(7px);
    z-index: -2;
    border-radius: 1.5rem;
  }

  /* Glassmorphism */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;

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

    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.15) 15%,
      rgba(255, 255, 255, 0.05) 30%,
      rgba(255, 255, 255, 0.1) 45%,
      rgba(255, 255, 255, 0.25) 60%,
      rgba(255, 255, 255, 0.08) 75%,
      rgba(255, 255, 255, 0.18) 90%,
      rgba(255, 255, 255, 0.05) 100%
    );
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(2px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-bottom: 3px solid transparent;
    border-image: linear-gradient(to right, transparent, #0099ff, transparent) 1;
    box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.25);
  }
`;

export const NameInput = styled.input`
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  text-align: center;
  outline: none;
  transition: all 0.3s ease;
  filter: none;
  isolation: isolate;
  animation: ${fadeInContent} 0.5s ease-out 1s both;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border-color: rgba(0, 153, 255, 0.8);
    box-shadow: 0 0 15px rgba(0, 153, 255, 0.4);
  }
`;

export const AvatarOption = styled.div`
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  width: 200px;
  height: 200px;

  .circle {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 200px;
  }

  .face {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  /* Hover */
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 8px rgba(0, 153, 255, 0.4))
      drop-shadow(0 0 15px rgba(0, 153, 255, 0.2));
  }

  /* Selected */
  ${(props) =>
    props.$selected &&
    css`
      animation: ${glowPulse} 2s ease-in-out infinite;
      transform: scale(1.05);
    `}
`;

export const AdvanceButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: transform 0.2s ease;
  padding: 0;
  margin-top: 1rem;
  isolation: isolate;
  animation:
    ${fadeInContent} 0.5s ease-out 1s both,
    ${(props) => (props.disabled ? "none" : buttonPulse)} 2s ease-in-out
      infinite;

  &:hover:not(:disabled) {
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

    /* Greyscale quando desabilitado */
    ${(props) =>
      props.disabled &&
      css`
        filter: grayscale(1);
        opacity: 0.5;
      `}
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

    /* Opacidade reduzida quando desabilitado */
    ${(props) =>
      props.disabled &&
      css`
        opacity: 0.5;
      `}
  }

  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
    `}
`;
