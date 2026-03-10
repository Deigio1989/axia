import { memo, useEffect, useRef } from "react";
import { useWalkingAnimation } from "../../../hooks/useWalkingAnimation";
import { PlayerCharacter } from "./styles";

// Componente isolado que contém TODA a lógica de animação
// O componente pai (Intro) NÃO re-renderiza durante a animação
export const WalkingPlayer = memo(({ shouldWalk, onWalkComplete }) => {
  const hasStartedRef = useRef(false);

  // Hook de animação DENTRO deste componente isolado
  const { isWalking, currentFrame, startWalking } = useWalkingAnimation({
    framesFolder: "/images/M-Diagonal-walking-cycle",
    framesPattern: "Armature_animtion0_{n}.png",
    frameNumbers: [0, 4, 8, 12, 16, 20, 24],
    fps: 8,
    duration: 2000,
  });

  // Inicia caminhada quando shouldWalk muda para true
  useEffect(() => {
    if (shouldWalk && !hasStartedRef.current) {
      hasStartedRef.current = true;
      startWalking();
    }
  }, [shouldWalk, startWalking]);

  // Detecta quando a caminhada termina
  useEffect(() => {
    if (hasStartedRef.current && !isWalking) {
      onWalkComplete?.();
    }
  }, [isWalking, onWalkComplete]);

  return (
    <PlayerCharacter
      $isWalking={isWalking || shouldWalk}
      $hasArrived={hasStartedRef.current && !isWalking}
    >
      <img src={currentFrame} alt="Personagem caminhando" />
    </PlayerCharacter>
  );
});

WalkingPlayer.displayName = "WalkingPlayer";
