import styled, { css } from "styled-components";

/**
 * ActionButton - Botão de ação reutilizável
 * Usado para botões como "AVANÇAR", "INICIAR", etc.
 */

export const ActionButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: transform var(--transition-fast);
  padding: 0;
  margin-top: ${(props) => props.$marginTop || "1rem"};
  isolation: isolate;

  &:hover:not(:disabled) {
    transform: scale(1.02);
  }

  img {
    height: ${(props) =>
      props.$size === "large"
        ? "100px"
        : props.$size === "small"
          ? "60px"
          : "75px"};
    display: block;
    transition:
      filter var(--transition-normal),
      opacity var(--transition-normal);

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
    color: var(--color-primary-medium);
    font-family: var(--font-family-bold);
    font-weight: 700;
    font-size: ${(props) => props.$textSize || "1.2rem"};
    pointer-events: none;
    text-shadow: var(--text-shadow-button, 0 2px 4px rgba(0, 0, 0, 0.5));
    transition: opacity var(--transition-normal);

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

export default ActionButton;
