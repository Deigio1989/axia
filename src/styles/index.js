/**
 * Estilos Globais - Índice Central
 * Exportações organizadas para fácil importação
 */

export { GlobalStyles } from "./GlobalStyles";
export { default as theme } from "./theme";
export * as animations from "./animations";

// Exportações individuais do tema para uso direto
export {
  colors,
  fonts,
  spacing,
  effects,
  borderRadius,
  transitions,
  shapes,
} from "./theme";

// Exportações de animações mais usadas
export {
  Lightpulse,
  Globepulse,
  GlowPulse,
  slideInFromTop,
  slideOutToLeft,
  slideInFromRight,
  fadeIn,
  fadeOut,
  expandContainer,
} from "./animations";
