import styled from "styled-components";

/**
 * Wrapper otimizado para conteúdo de texto dentro do NineSliceContainer
 * Previne flickering e layout shifts durante animações
 */
export const ContentWrapper = styled.div`
  /* Estabiliza dimensões */
  width: 100%;
  min-height: fit-content;

  /* Isola completamente o layout */
  contain: layout style paint;

  /* GPU acceleration */
  transform: translateZ(0);
  backface-visibility: hidden;

  /* Renderização de texto otimizada */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;

  /* Previne síntese de peso de fonte (force usar bold real) */
  font-synthesis: none;
  -webkit-font-synthesis: none;

  /* Estabiliza kerning */
  font-feature-settings: "kern" 1;
  font-kerning: normal;

  /* Previne mudanças de linha durante carregamento */
  overflow-wrap: break-word;
  word-break: normal;
  hyphens: none;

  /* Todos os textos herdam otimizações */
  *,
  *::before,
  *::after {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-synthesis: none;
    -webkit-font-synthesis: none;
    transform: translateZ(0);
  }
`;
