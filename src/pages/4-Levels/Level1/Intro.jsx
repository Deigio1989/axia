import { useState, useCallback } from "react";
import { useProgressionStore } from "../../../store/progressionStore";
import { Avatar } from "../../../components/Avatar";
import { WalkingPlayer } from "./WalkingPlayer";
import { IntroInstructions } from "./components/IntroInstructions";
import {
  MainContainer,
  HouseContainer,
  PlayerInfo,
  TagElement,
  DoorMask,
} from "./styles";

export function Intro({ onComplete }) {
  const { playerName, playerAvatar } = useProgressionStore();
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [shouldWalk, setShouldWalk] = useState(false);
  const [doorsOpening, setDoorsOpening] = useState(false);

  // Callback stable para evitar re-renders
  const handleWalkComplete = useCallback(() => {
    // Após caminhada completa, espera mais 500ms e chama onComplete
    setTimeout(() => {
      onComplete?.();
    }, 500);
  }, [onComplete]);

  const handleDoorClick = useCallback(
    (doorNumber) => {
      if (!shouldWalk) {
        setSelectedDoor(null); // Remove o highlight ao clicar
        setShouldWalk(true); // Inicia caminhada

        // Espera 1 segundo, depois anima as portas
        setTimeout(() => {
          setDoorsOpening(true);
        }, 1000);
      }
    },
    [shouldWalk],
  );

  return (
    <MainContainer>
      <div className="flex-column">
        <IntroInstructions />
        <PlayerInfo>
          <Avatar type={playerAvatar || "M"} size="medium" epi={true} />
          <TagElement>{playerName || "Jogador"}</TagElement>
        </PlayerInfo>
      </div>
      <HouseContainer $selectedDoor={selectedDoor} $doorsOpening={doorsOpening}>
        <img
          className="house-base house"
          src="/images/house-base.png"
          alt="Casa base"
        />
        <img className="door-1" src="/images/house-door-1.png" alt="Porta 1" />
        <img className="door-2" src="/images/house-door-2.png" alt="Porta 2" />
        <img
          className="platibanda house"
          src="/images/platibanda.png"
          alt="Platibanda"
        />
        <img className="floor house" src="/images/house-floor.png" alt="Piso" />

        {/* Máscara única para ambas as portas */}
        <DoorMask
          src="/images/door-select.png"
          $selectedDoor={selectedDoor}
          $isWalking={shouldWalk}
          alt="Destaque da porta"
        />

        {/* Hotspots invisíveis para capturar hover */}
        <div
          className="door-hotspot door-hotspot-1"
          onMouseEnter={() => !shouldWalk && setSelectedDoor(1)}
          onMouseLeave={() => setSelectedDoor(null)}
          onClick={() => handleDoorClick(1)}
        />
        <div
          className="door-hotspot door-hotspot-2"
          onMouseEnter={() => !shouldWalk && setSelectedDoor(2)}
          onMouseLeave={() => setSelectedDoor(null)}
          onClick={() => handleDoorClick(2)}
        />

        {/* Player animado - animação isolada neste componente */}
        <WalkingPlayer
          shouldWalk={shouldWalk}
          onWalkComplete={handleWalkComplete}
        />
      </HouseContainer>
    </MainContainer>
  );
}
