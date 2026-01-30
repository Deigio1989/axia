/**
 * Sistema de Design - Variáveis de Tema
 * Cores extraídas do projeto para uso consistente
 */

export const colors = {
  // Azuis principais (arroxeados - tom sci-fi)
  primary: {
    deep: "#0015ff", // Azul profundo arroxeado
    dark: "#0036cc", // Azul escuro
    medium: "#1d33d8", // Azul médio (texto botões)
    light: "#0099ff", // Azul claro (bordas, glows)
    cyan: "#00c8ff", // Ciano (glow plataforma)
  },

  // Roxos/Violetas
  purple: {
    deep: "rgba(43, 0, 255, 0.8)", // Roxo profundo
    medium: "rgba(0, 34, 255, 0.8)", // Roxo médio
    light: "rgba(0, 55, 255, 0.4)", // Roxo claro
    glow: "rgba(0, 115, 255, 0.6)", // Roxo glow
  },

  // Azuis claros/Ciano
  cyan: {
    bright: "rgba(152, 182, 255, 0.4)", // Azul claro brilhante
    medium: "rgba(99, 133, 255, 0.8)", // Ciano médio
    glow: "rgba(0, 200, 255, 0.6)", // Ciano glow
    soft: "rgba(0, 200, 255, 0.3)", // Ciano suave
  },

  // Neutros
  white: {
    pure: "#ffffff",
    soft: "#fbffff",
    rgba: (opacity) => `rgba(255, 255, 255, ${opacity})`,
  },

  black: {
    pure: "#000000",
    rgba: (opacity) => `rgba(0, 0, 0, ${opacity})`,
  },

  // Gradientes reutilizáveis
  gradients: {
    primaryButton:
      "linear-gradient(to bottom, rgba(0, 153, 255, 0.7), #0036cc)",
    glassmorphism: `linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.15) 15%,
      rgba(255, 255, 255, 0.05) 30%,
      rgba(255, 255, 255, 0.1) 45%,
      rgba(255, 255, 255, 0.25) 60%,
      rgba(255, 255, 255, 0.08) 75%,
      rgba(255, 255, 255, 0.18) 90%,
      rgba(255, 255, 255, 0.05) 100%
    )`,
    borderGlow: "linear-gradient(to right, transparent, #0099ff, transparent)",
  },
};

export const fonts = {
  family: {
    regular: "'DM Sans Regular', sans-serif",
    bold: "'DM Sans Bold', sans-serif",
    extraBold: "'DM Sans ExtraBold', sans-serif",
  },
  size: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
  },
  weight: {
    regular: 400,
    bold: 700,
    extraBold: 800,
  },
};

export const spacing = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
};

export const effects = {
  // Sombras de glow
  glow: {
    blue: {
      soft: "0 0 10px rgba(0, 153, 255, 0.6), 0 0 20px rgba(0, 153, 255, 0.4)",
      medium:
        "0 0 15px rgba(0, 153, 255, 0.8), 0 0 30px rgba(0, 153, 255, 0.6)",
      strong: "0 5px 15px rgba(255, 255, 255, 0.8)",
    },
    white: {
      soft: "0 0 18px 4px rgba(255,255,255,0.50)",
      medium: "0 0 19px 5px hsla(0, 0%, 100%, 0.55)",
    },
  },

  // Drop shadows
  dropShadow: {
    logo: "drop-shadow(0 0 1px #fbffffd1) drop-shadow(0 0 2px rgba(152, 182, 255, 0.4)) drop-shadow(0 10px 30px rgba(0, 200, 255, 0.5))",
    button:
      "drop-shadow(0 0 1px #fbffffba) drop-shadow(0 0 2px rgba(152, 182, 255, 0.4)) drop-shadow(0 10px 30px rgba(0, 200, 255, 0.5))",
    avatar:
      "drop-shadow(0 0 8px rgba(0, 153, 255, 0.4)) drop-shadow(0 0 15px rgba(0, 153, 255, 0.2))",
  },

  // Backdrop filter
  backdropBlur: {
    light: "blur(2px)",
    medium: "blur(5px)",
    strong: "blur(10px)",
  },

  // Text shadow
  textShadow: {
    button: "0 2px 4px rgba(0, 0, 0, 0.5)",
  },
};

export const borderRadius = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "1.5rem",
  full: "50%",
};

export const transitions = {
  fast: "0.2s ease",
  normal: "0.3s ease",
  slow: "0.5s ease",
  verySlow: "0.8s ease",
};

// Configuração do octágono (clip-path reutilizável)
export const shapes = {
  octagon: (cornerSize = "1.5rem") => `polygon(
    ${cornerSize} 0%,
    calc(100% - ${cornerSize}) 0%,
    100% ${cornerSize},
    100% calc(100% - ${cornerSize}),
    calc(100% - ${cornerSize}) 100%,
    ${cornerSize} 100%,
    0% calc(100% - ${cornerSize}),
    0% ${cornerSize}
  )`,
};

export default {
  colors,
  fonts,
  spacing,
  effects,
  borderRadius,
  transitions,
  shapes,
};
