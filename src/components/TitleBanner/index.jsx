import styled from "styled-components";
import { slideInFromTop } from "../../styles/animations";

/**
 * TitleBanner - Banner de título reutilizável
 * Usado para títulos como "DIGITE SEU NOME", "ESCOLHA SEU AVATAR", etc.
 */

export const TitleBanner = styled.div`
  position: relative;
  width: fit-content;
  animation: ${slideInFromTop} 0.6s ease-out;

  img {
    width: ${(props) => props.$width || "350px"};
    height: ${(props) => props.$height || "auto"};
    display: block;
  }

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    color: var(--color-primary-medium);
    font-family: var(--font-family-bold);
    font-weight: 700;
    font-size: ${(props) => props.$textSize || "1.2rem"};
    line-height: 1.2rem;
    pointer-events: none;
    white-space: nowrap;
  }
`;

export default TitleBanner;
