import styled, { css } from "styled-components";
import { shapes } from "../../styles/theme";

/**
 * GlassCard - Componente de card com efeito glassmorphism e forma octogonal
 * Reutilizável para qualquer contexto que precise do efeito de vidro
 */

export const GlassCard = styled.div`
  color: white;
  padding: ${(props) => props.$padding || "3rem 4rem"};
  position: relative;
  width: ${(props) => props.$width || "fit-content"};
  display: flex;
  flex-direction: ${(props) => props.$direction || "column"};
  align-items: ${(props) => props.$align || "center"};
  gap: ${(props) => props.$gap || "2rem"};
  filter: none;
  isolation: isolate;

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
    border-radius: var(--border-radius-xl);
  }

  /* Glassmorphism com forma octogonal */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;

    clip-path: ${(props) => shapes.octagon(props.$cornerSize || "1.5rem")};

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
    backdrop-filter: var(--backdrop-blur-medium);
    -webkit-backdrop-filter: var(--backdrop-blur-light);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-bottom: 3px solid transparent;
    border-image: linear-gradient(
        to right,
        transparent,
        var(--color-primary-light),
        transparent
      )
      1;
    box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.25);
  }

  /* Variações de tamanho */
  ${(props) =>
    props.$size === "small" &&
    css`
      padding: 1.5rem 2rem;
      gap: 1rem;
    `}

  ${(props) =>
    props.$size === "large" &&
    css`
      padding: 4rem 5rem;
      gap: 3rem;
    `}
`;

export default GlassCard;
