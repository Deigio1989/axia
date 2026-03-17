// Utilitário simples para pré-carregar imagens e evitar atrasos visíveis
// no carregamento em runtime (especialmente em pacotes SCORM).

const loadedImages = new Set();

/**
 * Pré-carrega uma lista de imagens.
 * Resolve mesmo se alguma falhar ou se estourar o timeout.
 *
 * @param {string[]} urls
 * @param {{ timeout?: number }} options
 * @returns {Promise<void>}
 */
export function preloadImages(urls = [], { timeout = 10000 } = {}) {
  const unique = urls.filter((url) => url && !loadedImages.has(url));
  if (unique.length === 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    let remaining = unique.length;

    const done = () => {
      if (remaining <= 0) {
        resolve();
      }
    };

    const timer = setTimeout(() => {
      // Em caso de rede lenta, não travar a navegação
      remaining = 0;
      resolve();
    }, timeout);

    unique.forEach((url) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loadedImages.add(url);
        remaining -= 1;
        if (remaining === 0) {
          clearTimeout(timer);
          resolve();
        }
      };
      img.src = url;
    });
  });
}

// Conjunto de assets globais usados em múltiplas telas
export const GLOBAL_ASSETS = [
  // Home / layout base
  "/images/fundo-azul.png",
  "/images/fundo-claro.jpg",
  "/images/logo-axia.png",
  "/images/logo-axia-footer.png",
  "/images/start-button.png",
  "/images/start-button-pressed.png",

  // Avatar selection
  "/images/avatar-selection-logo.png",
  "/images/barra-sup.png",
  "/images/barra-inf.png",

  // Regras
  "/images/regras-01.png",
  "/images/regras-02.png",
  "/images/regras-03.png",
  "/images/regras-04.png",
  "/images/regras-05.png",
];

// Assets específicos por fase
export const LEVEL_ASSETS = {
  1: [
    // Intro da fase 1
    "/images/house-base.png",
    "/images/house-door-1.png",
    "/images/house-door-2.png",
    "/images/platibanda.png",
    "/images/house-floor.png",
    "/images/door-select.png",

    // Gameplay da fase 1
    "/images/level-1/game-level-1.png",
    "/images/level-1/nav-mask.svg",

    // Sprite de caminhada
    "/images/M-Diagonal-walking-cycle/Armature_animtion0_0.png",
    "/images/M-Diagonal-walking-cycle/Armature_animtion0_4.png",
    "/images/M-Diagonal-walking-cycle/Armature_animtion0_8.png",
    "/images/M-Diagonal-walking-cycle/Armature_animtion0_12.png",
    "/images/M-Diagonal-walking-cycle/Armature_animtion0_16.png",
    "/images/M-Diagonal-walking-cycle/Armature_animtion0_20.png",
    "/images/M-Diagonal-walking-cycle/Armature_animtion0_24.png",
  ],
};
