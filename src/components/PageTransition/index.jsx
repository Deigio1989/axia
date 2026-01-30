import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useProgressionStore } from "../../store/progressionStore";
import { TransitionWrapper, PageWrapper } from "./styles";

/**
 * PageTransition - Componente de transição entre páginas
 * Renderiza página antiga e nova simultaneamente durante transição
 *
 * Lê configurações do store (transitionType, transitionDuration)
 * ou usa props como fallback
 *
 * Tipos disponíveis:
 *   - "none" - Sem transição (instantâneo)
 *   - "fade" - Fade simples
 *   - "fadeGlow" - Fade com glow azul (sci-fi holográfico) ⭐ RECOMENDADO
 *   - "fadeScale" - Fade + zoom (portal/teletransporte)
 *   - "slideLeft" - Slide lateral esquerda
 *   - "slideRight" - Slide lateral direita
 *   - "wipeHorizontal" - Wipe com barra azul (scanner)
 *
 * @param {string} type - Tipo de transição (fallback se store não definir)
 * @param {number} duration - Duração total em ms (fallback, default: 700)
 * @param {ReactNode} children - Conteúdo da página
 */
export function PageTransition({
  type: propType,
  duration: propDuration,
  children,
}) {
  const location = useLocation();
  const { transitionType, transitionDuration } = useProgressionStore();
  const [transitionStage, setTransitionStage] = useState("idle");
  const [oldChildren, setOldChildren] = useState(children);
  const [newChildren, setNewChildren] = useState(null);

  // Ref para "travar" type/duration durante a transição
  const activeTransitionRef = useRef({
    type: transitionType || propType || "fadeGlow",
    duration: transitionDuration || propDuration || 700,
  });
  const previousLocationRef = useRef(location);

  useEffect(() => {
    if (location !== previousLocationRef.current) {
      // Captura type/duration do store APENAS quando location muda
      const type = transitionType || propType || "fadeGlow";
      const duration = transitionDuration || propDuration || 700;

      // Atualiza ref com valores da nova transição
      activeTransitionRef.current = { type, duration };

      console.log("🔄 PageTransition - Nova navegação detectada", {
        from: previousLocationRef.current.pathname,
        to: location.pathname,
        type,
        duration,
      });

      // Se tipo é "none", muda instantaneamente
      if (type === "none") {
        console.log("⚡ Transição NONE - mudança instantânea");
        setOldChildren(children);
        setNewChildren(null);
        previousLocationRef.current = location;
        setTransitionStage("idle");
        return;
      }

      // Prepara nova página (ainda invisível)
      setNewChildren(children);
      setTransitionStage("exiting");

      console.log(`🎬 Fase 1: Saindo (${duration / 2}ms)`);

      // Após metade da duração, começa entrada da nova página
      const enterTimeout = setTimeout(() => {
        console.log(`✨ Fase 2: Entrando (${duration / 2}ms)`);
        setTransitionStage("entering");

        // Após completar entrada, limpa página antiga
        const cleanupTimeout = setTimeout(() => {
          console.log("✅ Transição completa");
          setOldChildren(children);
          setNewChildren(null);
          previousLocationRef.current = location;
          setTransitionStage("idle");
        }, duration / 2);

        return () => clearTimeout(cleanupTimeout);
      }, duration / 2);

      return () => clearTimeout(enterTimeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Usa valores "travados" da ref durante renderização
  const { type: activeType, duration: activeDuration } =
    activeTransitionRef.current;

  // Se tipo é "none", renderiza sem wrapper
  if (activeType === "none") {
    return <>{oldChildren}</>;
  }

  return (
    <TransitionWrapper>
      {/* Página antiga saindo */}
      {transitionStage === "exiting" && (
        <PageWrapper
          key="exiting-page"
          $type={activeType}
          $stage="exit"
          $duration={activeDuration}
        >
          {oldChildren}
        </PageWrapper>
      )}

      {/* Página nova entrando */}
      {transitionStage === "entering" && newChildren && (
        <PageWrapper
          key="entering-page"
          $type={activeType}
          $stage="enter"
          $duration={activeDuration}
        >
          {newChildren}
        </PageWrapper>
      )}

      {/* Página estável (idle) */}
      {transitionStage === "idle" && (
        <PageWrapper key="stable-page" $stage="idle">
          {oldChildren}
        </PageWrapper>
      )}
    </TransitionWrapper>
  );
}

export default PageTransition;
