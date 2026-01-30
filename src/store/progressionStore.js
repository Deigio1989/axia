import { create } from "zustand";
import scormService from "../services/scormService";

/**
 * Store Zustand para gerenciar progressão do aluno
 * Sincroniza automaticamente com SCORM
 */
export const useProgressionStore = create((set, get) => ({
  // ========== Estado ==========
  maxReached: 1,
  currentPage: 1,
  visitedPages: new Set([1]),
  score: 0,
  completedModules: [],
  quizScores: {},
  timestamp: null,
  playerName: "",
  playerAvatar: "", // "H" ou "M"

  // ========== Transições ==========
  transitionType: "fadeGlow", // none, fade, fadeGlow, fadeScale, slideLeft, slideRight, wipeHorizontal
  transitionDuration: 700,

  // ========== Ações de Navegação ==========

  /**
   * Atualiza página máxima alcançada
   */
  updateMaxReached: (pageId) => {
    set((state) => {
      if (pageId > state.maxReached) {
        // Salva no SCORM
        scormService.setLessonLocation(String(pageId));
        scormService.setLessonStatus("incomplete");
        scormService.commit();

        console.log(`📍 Nova página máxima alcançada: ${pageId}`);

        return { maxReached: pageId };
      }
      return state;
    });
  },

  /**
   * Registra visita a uma página
   */
  visitPage: (pageId) => {
    set((state) => {
      const visited = new Set(state.visitedPages);
      visited.add(pageId);

      // Atualiza max reached se necessário
      if (pageId > state.maxReached) {
        get().updateMaxReached(pageId);
      }

      return {
        currentPage: pageId,
        visitedPages: visited,
      };
    });
  },

  /**
   * Navega para página específica
   */
  goToPage: (pageId) => {
    const { maxReached } = get();

    // Só permite navegar até maxReached + 1
    if (pageId <= maxReached + 1) {
      get().visitPage(pageId);
      return true;
    } else {
      console.warn(`Não é possível pular para página ${pageId}`);
      return false;
    }
  },

  /**
   * Define o nome do jogador
   */
  setPlayerName: (name) => {
    set({ playerName: name });
    scormService.setSuspendData("playerName", name);
    scormService.commit();
    console.log(`👤 Nome do jogador definido: ${name}`);
  },

  /**
   * Define o avatar do jogador (H ou M)
   */
  setPlayerAvatar: (avatar) => {
    set({ playerAvatar: avatar });
    scormService.setSuspendData("playerAvatar", avatar);
    scormService.commit();
    console.log(`🎭 Avatar do jogador definido: ${avatar}`);
  },

  /**
   * Configura tipo e duração da próxima transição
   * @param {string} type - Tipo: "none", "fade", "fadeGlow", "fadeScale", "slideLeft", "slideRight", "wipeHorizontal"
   * @param {number} duration - Duração em ms
   */
  setTransition: (type = "fadeGlow", duration = 700) => {
    set({ transitionType: type, transitionDuration: duration });
  },

  /**
   * Navega com transição customizada
   * @param {function} navigate - Função navigate do react-router
   * @param {string} path - Caminho de destino
   * @param {object} options - { type, duration, resetAfter, delay }
   */
  navigateWithTransition: (navigate, path, options = {}) => {
    // Transições desabilitadas - navega imediatamente
    navigate(path);
  },

  // ========== Ações de Score ==========

  /**
   * Atualiza score geral (mantém o maior)
   */
  updateScore: (newScore) => {
    set((state) => {
      const validScore = Math.max(0, Math.min(100, Math.round(newScore)));
      const finalScore = Math.max(validScore, state.score);

      // Salva no SCORM
      scormService.setScore(finalScore);
      scormService.commit();

      console.log(`🎯 Score atualizado: ${finalScore}%`);

      return { score: finalScore };
    });
  },

  /**
   * Registra score de quiz específico
   */
  setQuizScore: (quizId, score) => {
    set((state) => {
      const newQuizScores = {
        ...state.quizScores,
        [quizId]: score,
      };

      // Calcula score médio de todos os quizzes
      const scores = Object.values(newQuizScores);
      const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;

      // Atualiza score geral
      get().updateScore(averageScore);

      return { quizScores: newQuizScores };
    });
  },

  // ========== Ações de Módulos ==========

  /**
   * Marca módulo como completo
   */
  completeModule: (moduleId) => {
    set((state) => {
      if (state.completedModules.includes(moduleId)) {
        return state;
      }

      const completed = [...state.completedModules, moduleId];
      console.log(`✅ Módulo ${moduleId} completo`);

      return { completedModules: completed };
    });
  },

  /**
   * Verifica se módulo está completo
   */
  isModuleComplete: (moduleId) => {
    return get().completedModules.includes(moduleId);
  },

  /**
   * Verifica se todos os módulos estão completos
   */
  areAllModulesComplete: (totalModules) => {
    return get().completedModules.length >= totalModules;
  },

  // ========== Persistência ==========

  /**
   * Salva progresso no SCORM (suspend_data)
   */
  saveProgress: () => {
    const state = get();

    const progressData = {
      maxReached: state.maxReached,
      currentPage: state.currentPage,
      visitedPages: Array.from(state.visitedPages),
      score: state.score,
      completedModules: state.completedModules,
      quizScores: state.quizScores,
      timestamp: new Date().toISOString(),
    };

    // Salva como JSON no suspend_data
    scormService.setSuspendData(JSON.stringify(progressData));

    console.log("💾 Progresso salvo:", progressData);

    return true;
  },

  /**
   * Carrega progresso do SCORM
   */
  loadProgress: () => {
    try {
      const data = scormService.getSuspendData();

      if (!data) {
        console.log("ℹ️ Nenhum progresso anterior encontrado");
        return false;
      }

      const parsed = JSON.parse(data);

      // Reconstrói Set de visitedPages
      if (Array.isArray(parsed.visitedPages)) {
        parsed.visitedPages = new Set(parsed.visitedPages);
      }

      set(parsed);

      console.log("✅ Progresso restaurado:", parsed);
      return true;
    } catch (e) {
      console.error("❌ Erro ao carregar progresso:", e);
      return false;
    }
  },

  /**
   * Reseta todo o progresso
   */
  resetProgress: () => {
    set({
      maxReached: 1,
      currentPage: 1,
      visitedPages: new Set([1]),
      score: 0,
      completedModules: [],
      quizScores: {},
      timestamp: null,
    });

    // Limpa no SCORM também
    scormService.setSuspendData("");
    scormService.setScore(0);
    scormService.setLessonStatus("incomplete");
    scormService.commit();

    console.log("🔄 Progresso resetado");
  },

  // ========== Getters ==========

  /**
   * Obtém porcentagem de conclusão
   */
  getCompletionPercentage: (totalPages) => {
    const { maxReached } = get();
    return Math.round((maxReached / totalPages) * 100);
  },

  /**
   * Obtém tempo desde última atualização
   */
  getTimeSinceLastUpdate: () => {
    const { timestamp } = get();
    if (!timestamp) return null;

    const now = new Date();
    const lastUpdate = new Date(timestamp);
    const diffMs = now - lastUpdate;

    return {
      milliseconds: diffMs,
      seconds: Math.floor(diffMs / 1000),
      minutes: Math.floor(diffMs / 60000),
    };
  },
}));

export default useProgressionStore;
