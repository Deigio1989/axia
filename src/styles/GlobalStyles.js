import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* Importação de Fontes */
  @font-face {
    font-family: 'DM Sans Regular';
    src: url('/fonts/DMSans_18pt-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'DM Sans Bold';
    src: url('/fonts/DMSans_18pt-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'DM Sans ExtraBold';
    src: url('/fonts/DMSans_18pt-ExtraBold.ttf') format('truetype');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    /* === Cores Primárias (Azuis Arroxeados - Tema Sci-Fi) === */
    --color-primary-deep: #0015ff;
    --color-primary-dark: #0036cc;
    --color-primary-medium: #1d33d8;
    --color-primary-light: #0099ff;
    --color-primary-cyan: #00c8ff;
    
    /* === Roxos/Violetas === */
    --color-purple-deep: rgba(43, 0, 255, 0.8);
    --color-purple-medium: rgba(0, 34, 255, 0.8);
    --color-purple-light: rgba(0, 55, 255, 0.4);
    --color-purple-glow: rgba(0, 115, 255, 0.6);
    
    /* === Ciano/Azuis Claros === */
    --color-cyan-bright: rgba(152, 182, 255, 0.4);
    --color-cyan-medium: rgba(99, 133, 255, 0.8);
    --color-cyan-glow: rgba(0, 200, 255, 0.6);
    --color-cyan-soft: rgba(0, 200, 255, 0.3);
    
    /* === Neutros === */
    --color-white: #ffffff;
    --color-white-soft: #fbffff;
    --color-black: #000000;
    
    /* === Cores de Estado (mantidas do original) === */
    --color-success: #28a745;
    --color-warning: #ffc107;
    --color-error: #dc3545;
    --color-info: #17a2b8;
    
    /* === Espaçamentos === */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    --spacing-3xl: 4rem;
    
    /* === Tipografia === */
    --font-family-regular: 'DM Sans Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-family-bold: 'DM Sans Bold', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-family-extrabold: 'DM Sans ExtraBold', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
    --font-size-4xl: 2.25rem;
    
    /* === Bordas === */
    --border-radius-sm: 8px;
    --border-radius-md: 12px;
    --border-radius-lg: 16px;
    --border-radius-xl: 1.5rem;
    --border-radius-full: 50%;
    
    /* === Transições === */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
    --transition-very-slow: 0.8s ease;
    
    /* === Efeitos === */
    --glow-scale: 1.5;
    --backdrop-blur-light: blur(2px);
    --backdrop-blur-medium: blur(5px);
    --backdrop-blur-strong: blur(10px);
  }

  html, body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: var(--font-family-regular);
    font-size: var(--font-size-md);
    line-height: 1.6;
    color: var(--color-white);
    background-color: var(--color-black);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    height: 100%;
    width: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: var(--spacing-md);
    font-family: var(--font-family-bold);
    font-weight: 700;
    line-height: 1.2;
  }

  h1 { font-size: var(--font-size-4xl); }
  h2 { font-size: var(--font-size-3xl); }
  h3 { font-size: var(--font-size-2xl); }
  h4 { font-size: var(--font-size-xl); }
  h5 { font-size: var(--font-size-lg); }
  h6 { font-size: var(--font-size-md); }

  p {
    margin-bottom: var(--spacing-md);
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-primary-dark);
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Scrollbar customizada */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-background);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: var(--border-radius-md);

    &:hover {
      background: var(--color-text-secondary);
    }
  }
`;
