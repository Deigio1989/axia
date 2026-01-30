import { useEffect, useState } from "react";
import scormService from "../services/scormService";

/**
 * Hook principal para gerenciar SCORM
 * Inicializa conexão, obtém dados do aluno e fornece métodos de tracking
 */
export default function useScorm() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Inicializa SCORM
    const initScorm = async () => {
      try {
        const success = await scormService.initialize();
        setIsInitialized(success);

        if (success) {
          // Obtém dados do aluno
          const name = scormService.getStudentName();
          const id = scormService.getStudentId();

          setStudentName(name || "Visitante");
          setStudentId(id || "guest");

          console.log("✅ SCORM inicializado:", { name, id });
        }
      } catch (error) {
        console.error("❌ Erro ao inicializar SCORM:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initScorm();

    // Cleanup: finaliza SCORM ao desmontar
    return () => {
      if (isInitialized) {
        scormService.setExit("suspend");
        scormService.finish();
      }
    };
  }, []);

  /**
   * Reporta progresso do aluno
   */
  const reportProgress = (score, status = "incomplete") => {
    if (!isInitialized) {
      console.warn("SCORM não inicializado");
      return false;
    }

    scormService.setScore(score);
    scormService.setLessonStatus(status);
    scormService.commit();

    return true;
  };

  /**
   * Completa a lição com score final
   */
  const completeLesson = (score, passed = false) => {
    if (!isInitialized) {
      console.warn("SCORM não inicializado");
      return false;
    }

    const status = passed ? "passed" : "failed";
    scormService.setScore(score);
    scormService.setLessonStatus(status);
    scormService.commit();

    console.log(`🏆 Lição completada: ${status} (${score}%)`);
    return true;
  };

  /**
   * Salva localização atual (bookmark)
   */
  const saveLocation = (location) => {
    if (!isInitialized) return false;

    scormService.setLessonLocation(location);
    return true;
  };

  /**
   * Obtém localização salva
   */
  const getLocation = () => {
    if (!isInitialized) return null;
    return scormService.getLessonLocation();
  };

  /**
   * Salva dados customizados
   */
  const saveSuspendData = (data) => {
    if (!isInitialized) return false;

    scormService.setSuspendData(data);
    return true;
  };

  /**
   * Carrega dados customizados
   */
  const loadSuspendData = () => {
    if (!isInitialized) return null;

    const data = scormService.getSuspendData();
    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Erro ao parsear suspend_data:", e);
      return null;
    }
  };

  return {
    isInitialized,
    isLoading,
    studentName,
    studentId,
    reportProgress,
    completeLesson,
    saveLocation,
    getLocation,
    saveSuspendData,
    loadSuspendData,
  };
}
