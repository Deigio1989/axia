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
    font-family: var(--font-family-bold);

    /* Melhora renderização de texto durante animações */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;

    /* Previne layout shift durante carregamento */
    font-synthesis: none;
    -webkit-font-synthesis: none;
  }

  .gameplay-info {
    max-width: 500px;
  }

  .flex-column {
    z-index: 36;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    /* Isola em camada separada */
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  /* Container do gameplay com imagem do level */
  .gameplay-area {
    position: relative;
    width: fit-content;
    height: fit-content;

    .house-image {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  /* Nav mask sobreposta exatamente sobre a imagem do level */
  .nav-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    pointer-events: auto; /* Habilita cliques para navegação */
    z-index: 10;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      pointer-events: none; /* A imagem não interfere nos cliques */
    }
  }
`;

const walkToHouse = keyframes`
  0% {
    top: 300px;
    left: 450px;
  }
  100% {
    top: 210px;
    left: 325px;
  }
`;

export const PlayerCharacter = styled.div`
  position: absolute;
  top: ${(props) =>
    props.$isWalking || props.$hasArrived ? "210px" : "300px"};
  left: ${(props) =>
    props.$isWalking || props.$hasArrived ? "325px" : "450px"};
  z-index: 74;
  transition: ${(props) =>
    props.$isWalking ? "top 2s linear, left 2s linear" : "none"};
  will-change: ${(props) => (props.$isWalking ? "top, left" : "auto")};

  /* Força GPU acceleration e previne flickering */
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  img {
    height: 100px;
    will-change: auto;
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
`;

export const TagElement = styled.span`
  background:
    radial-gradient(rgba(236, 230, 230, 1) 70%, #aca6a6) padding-box,
    linear-gradient(#3f68ef 0%, #0d43f4 50%, #3f68ef 70%) border-box;
  padding: 0.3rem 0.8rem;
  border: 4px solid transparent;
  border-radius: 12px;
  color: #1e2240;
  cursor: pointer;
  font-weight: 700;
  transition: transform 0.2s ease;
  box-shadow:
    0 0 4px 2px rgba(0, 0, 0, 0.5),
    inset 0 0 2px 1px rgba(0, 0, 0, 0.95),
    inset 0 0 4px 2px rgb(255, 255, 255);

  font-size: 1.5rem;

  text-transform: uppercase;
  &:hover {
    transform: scale(1.02);
    filter: drop-shadow(0 0 1px #fbffffba)
      drop-shadow(0 0 2px rgba(152, 182, 255, 0.4))
      drop-shadow(0 10px 30px rgba(0, 200, 255, 0.5));
    animation-play-state: paused;
  }
`;

export const HouseContainer = styled.div`
  position: absolute;
  width: 700px;
  height: 400px;
  top: 15%;
  left: 5%;
  z-index: 35;

  /* Isola em camada separada para prevenir repaints */
  transform: translateZ(0);

  .house {
    width: 700px;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;

    /* Otimização para imagens */
    transform: translateZ(0);
    backface-visibility: hidden;
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
    z-index: 52;
    height: 95px;
    position: absolute;
    top: ${(props) => (props.$doorsOpening ? "242px" : "230px")};
    left: ${(props) => (props.$doorsOpening ? "300px" : "327px")};
    transition: ${(props) =>
      props.$doorsOpening ? "top 1s ease, left 1s ease" : "none"};
    will-change: ${(props) => (props.$doorsOpening ? "top, left" : "auto")};

    /* Previne flickering durante animação */
    transform: translateZ(0);
    backface-visibility: hidden;
  }
  .door-2 {
    z-index: 52;
    height: 95px;
    position: absolute;
    top: ${(props) => (props.$doorsOpening ? "205px" : "217px")};
    left: ${(props) => (props.$doorsOpening ? "385px" : "355px")};
    transition: ${(props) =>
      props.$doorsOpening ? "top 1s ease, left 1s ease" : "none"};
    will-change: ${(props) => (props.$doorsOpening ? "top, left" : "auto")};

    /* Previne flickering durante animação */
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  /* Hotspots invisíveis para capturar hover */
  .door-hotspot {
    position: absolute;
    width: 95px;
    height: 95px;
    z-index: 100;
    cursor: pointer;
    background: transparent;
  }

  .door-hotspot-1 {
    top: 230px;
    left: 327px;
  }

  .door-hotspot-2 {
    top: 217px;
    left: 355px;
  }
`;
export const DoorMask = styled.img`
  width: 700px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 76;
  pointer-events: none;
  transition:
    filter 0.3s ease,
    opacity 0.3s ease;
  opacity: ${(props) => (props.$selectedDoor && !props.$isWalking ? "1" : "0")};
  filter: ${(props) =>
    props.$selectedDoor && !props.$isWalking
      ? "drop-shadow(0 0 3px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 6px rgba(0, 153, 255, 0.8)) drop-shadow(0 0 12px rgba(0, 153, 255, 0.6))"
      : "none"};

  /* Otimização para transições suaves */
  will-change: ${(props) => (props.$selectedDoor ? "opacity, filter" : "auto")};
  transform: translateZ(0);
  backface-visibility: hidden;
`;

export const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 36;

  /* Isola em camada separada para prevenir flickering */
  transform: translateZ(0);
  backface-visibility: hidden;
`;

export const InfoTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const GamePlayer = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 50%;
  transform: translate(-50%, -50%) translateZ(0);
  /* left e top são controlados diretamente via DOM (element.style) */
  /* Sem transitions: animação via requestAnimationFrame é mais smooth */
  will-change: left, top;
  z-index: 100;
  pointer-events: none;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  border: 2px solid #fff;

  /* Previne flickering durante animação */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

export const GameplayArea = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;

  /* Otimização para animações suaves */
  transform: translateZ(0);
`;
export const GameplayContent = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
  z-index: 36;
`;
export const GameplayHeader = styled.header`
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
`;

export const GameplayContainer = styled.div`
  text-align: center;
  justify-self: center;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

export const HouseImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

export const NavMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  pointer-events: auto;
  z-index: 10;
  cursor: ${(props) => (props.$isOverWalkable ? "pointer" : "not-allowed")};
`;

export const NavMaskImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
`;

export const PathVisualization = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 15;
`;

export const GameplayInfo = styled.div`
  max-width: 500px;

  /* Isola em camada separada para prevenir repaints durante animações */
  transform: translateZ(0);
  will-change: auto;
`;
