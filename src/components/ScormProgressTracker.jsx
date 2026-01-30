import { useEffect } from "react";
import { useProgressionStore } from "../store/progressionStore";
import useScorm from "../hooks/useScorm";
import { useSessionTimer } from "../hooks/useSessionTimer";

/**
 * Componente wrapper que gerencia tracking SCORM
 * Envolve toda a aplicação para garantir salvamento automático
 */
export function ScormProgressTracker({ children, totalModules = 5 }) {
  const { isInitialized, reportProgress, completeLesson, loadSuspendData } =
    useScorm();

  const {
    currentPage,
    score,
    completedModules,
    saveProgress,
    loadProgress,
    areAllModulesComplete,
  } = useProgressionStore();

  // Inicia timer de sessão
  useSessionTimer(5000); // Atualiza a cada 5 segundos

  // Carrega progresso ao inicializar
  useEffect(() => {
    if (isInitialized) {
      const loaded = loadProgress();
      if (loaded) {
        console.log("✅ Progresso anterior restaurado");
      } else {
        console.log("ℹ️ Iniciando novo progresso");
      }
    }
  }, [isInitialized, loadProgress]);

  // Salva progresso automaticamente a cada mudança
  useEffect(() => {
    if (isInitialized) {
      saveProgress();
    }
  }, [currentPage, score, completedModules, isInitialized, saveProgress]);

  // Salvamento periódico (a cada 30 segundos)
  useEffect(() => {
    if (!isInitialized) return;

    const interval = setInterval(() => {
      saveProgress();
      console.log("💾 Auto-save executado");
    }, 30000);

    return () => clearInterval(interval);
  }, [isInitialized, saveProgress]);

  // Salva ao sair da página
  useEffect(() => {
    if (!isInitialized) return;

    const handleBeforeUnload = (e) => {
      saveProgress();

      // Determina status final
      const allComplete = areAllModulesComplete(totalModules);

      if (allComplete && score >= 80) {
        completeLesson(score, true); // Passou
      } else if (allComplete) {
        completeLesson(score, false); // Não passou
      } else {
        reportProgress(score, "incomplete"); // Incompleto
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [
    isInitialized,
    score,
    completedModules,
    totalModules,
    saveProgress,
    completeLesson,
    reportProgress,
    areAllModulesComplete,
  ]);

  // Salva ao pressionar Ctrl+S
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        saveProgress();
        console.log("💾 Progresso salvo manualmente");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [saveProgress]);

  return children;
}

export default ScormProgressTracker;
