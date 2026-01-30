import { useState, useCallback } from "react";
import { useProgressionStore } from "../store/progressionStore";
import scormService from "../services/scormService";

/**
 * Hook para rastreamento de quizzes
 * Calcula score, registra no SCORM e atualiza store de progressão
 */
export function useQuizTracking(quizId, totalQuestions, passingScore = 80) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateScore, completeModule, saveProgress } = useProgressionStore();

  /**
   * Submete quiz e calcula resultado
   * @param {Array} answers - Array de respostas { questionId, selectedAnswer, isCorrect }
   * @returns {Object} - { score, correct, total, passed }
   */
  const submitQuiz = useCallback(
    async (answers) => {
      if (isSubmitting) return null;

      setIsSubmitting(true);

      try {
        // Calcula respostas corretas
        let correctAnswers = 0;
        answers.forEach((answer) => {
          if (answer.isCorrect) {
            correctAnswers++;
          }
        });

        // Calcula porcentagem
        const percentage = (correctAnswers / totalQuestions) * 100;
        const score = Math.round(percentage);
        const passed = score >= passingScore;

        // Atualiza score no store (mantém o maior)
        const currentScore = scormService.getScore();
        const finalScore = Math.max(score, currentScore);

        updateScore(finalScore);

        // Registra no SCORM
        scormService.setScore(finalScore);
        scormService.setLessonStatus(passed ? "passed" : "incomplete");
        scormService.commit();

        // Marca módulo como completo se passou
        if (passed) {
          completeModule(quizId);
        }

        // Salva progresso geral
        saveProgress();

        console.log(
          `📊 Quiz ${quizId}: ${correctAnswers}/${totalQuestions} (${score}%) - ${passed ? "PASSOU" : "NÃO PASSOU"}`,
        );

        return {
          score,
          correct: correctAnswers,
          total: totalQuestions,
          passed,
          percentage,
        };
      } catch (error) {
        console.error("Erro ao submeter quiz:", error);
        return null;
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      quizId,
      totalQuestions,
      passingScore,
      updateScore,
      completeModule,
      saveProgress,
      isSubmitting,
    ],
  );

  /**
   * Valida resposta individual
   */
  const validateAnswer = useCallback((userAnswer, correctAnswer) => {
    return userAnswer === correctAnswer;
  }, []);

  /**
   * Calcula score parcial (durante o quiz)
   */
  const calculatePartialScore = useCallback((answeredSoFar) => {
    const correct = answeredSoFar.filter((a) => a.isCorrect).length;
    const total = answeredSoFar.length;
    return {
      correct,
      total,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
    };
  }, []);

  return {
    submitQuiz,
    validateAnswer,
    calculatePartialScore,
    isSubmitting,
  };
}

export default useQuizTracking;
