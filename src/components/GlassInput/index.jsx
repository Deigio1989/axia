import styled from "styled-components";

/**
 * GlassInput - Input com efeito glassmorphism
 * Reutilizável para campos de texto com estilo de vidro
 */

export const GlassInput = styled.input`
  padding: ${(props) => props.$padding || "1rem 1.5rem"};
  font-size: ${(props) => props.$fontSize || "1.2rem"};
  font-family: var(--font-family-regular);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--border-radius-md);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: var(--backdrop-blur-strong);
  color: white;
  text-align: ${(props) => props.$textAlign || "center"};
  outline: none;
  transition: all var(--transition-normal);
  filter: none;
  isolation: isolate;
  width: ${(props) => props.$width || "auto"};

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border-color: rgba(0, 153, 255, 0.8);
    box-shadow: 0 0 15px rgba(0, 153, 255, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default GlassInput;
