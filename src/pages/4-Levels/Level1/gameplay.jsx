import { useState, useRef } from "react";
import { useProgressionStore } from "../../../store/progressionStore";
import { NineSliceContainer } from "../../../components/NineSliceContainer";
import {
  InfoTitle,
  MainContainer,
  GamePlayer,
  GameplayArea,
  HouseImage,
  GameplayInfo,
  GameplayContent,
  GameplayHeader,
  GameplayContainer,
} from "./styles";
import { NavigationArea } from "./components/NavigationArea";
import { PathDebugVisualizer } from "./components/PathDebugVisualizer";
import { useNavMaskCanvas } from "./hooks/useNavMaskCanvas";
import { usePlayerPosition } from "./hooks/usePlayerPosition";
import {
  getSVGRenderBounds,
  getRelativeCoords,
  gameplayToSvgCoords,
  svgToGameplayCoords,
} from "./utils/coordinates";
import { findPath, isWalkable } from "./utils/pathfinding";
import { animatePath } from "./utils/animation";

export function Gameplay({ onComplete }) {
  const { playerName, playerAvatar } = useProgressionStore();

  // Refs
  const imgRef = useRef(null);
  const navMaskRef = useRef(null);
  const animationCancelRef = useRef(null);

  // Custom hooks
  const canvasRef = useNavMaskCanvas(imgRef);
  const [playerPosition, setPlayerPosition] = usePlayerPosition(
    imgRef,
    navMaskRef,
  );

  // State
  const [isMoving, setIsMoving] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);
  const [isOverWalkable, setIsOverWalkable] = useState(true);

  /**
   * Handler para clique na área de navegação
   */
  const handleNavMaskClick = (e) => {
    // Cancela movimento anterior se clicar novamente
    if (animationCancelRef.current) {
      animationCancelRef.current();
      animationCancelRef.current = null;
      setIsMoving(false);
    }

    // Pega coordenadas relativas ao SVG renderizado
    const svgBounds = getSVGRenderBounds(imgRef.current, navMaskRef.current);
    const relativeCoords = getRelativeCoords(e, svgBounds);

    if (!relativeCoords) {
      console.log("❌ Clique fora do SVG");
      return;
    }

    const { x, y } = relativeCoords;

    console.log("🖱️ Clique:", {
      x: Math.floor(x),
      y: Math.floor(y),
      offset: {
        x: Math.floor(svgBounds.offsetX),
        y: Math.floor(svgBounds.offsetY),
      },
      svgSize: {
        w: Math.floor(svgBounds.width),
        h: Math.floor(svgBounds.height),
      },
    });

    // Verifica se clicou em área navegável
    if (!isWalkable(x, y, canvasRef.current, svgBounds)) {
      console.log("❌ Clique fora da área navegável - ignorado");
      return;
    }

    console.log("✅ Clique em área navegável! Calculando caminho...");

    // Converte posição atual do player para coordenadas do SVG
    const playerSVGPos = gameplayToSvgCoords(playerPosition, svgBounds);

    // Calcula o caminho com A*
    const path = findPath(playerSVGPos, { x, y }, canvasRef.current, svgBounds);

    if (!path || path.length === 0) {
      console.log("❌ Nenhum caminho encontrado");
      return;
    }

    // Converte todos os pontos do caminho para coordenadas do gameplay-area
    const gameplayPath = path.map((p) => svgToGameplayCoords(p, svgBounds));

    console.log("🗺️ Path ajustado com offsets:", {
      playerGameplay: playerPosition,
      playerSVG: playerSVGPos,
      destinationSVG: { x, y },
      offsetsUsed: { x: svgBounds.offsetX, y: svgBounds.offsetY },
    });

    // Inicia animação
    setIsMoving(true);
    setCurrentPath(gameplayPath);

    animationCancelRef.current = animatePath(
      gameplayPath,
      (pos) => setPlayerPosition(pos),
      () => {
        setIsMoving(false);
        setCurrentPath([]);
        animationCancelRef.current = null;
      },
    );
  };

  /**
   * Handler para movimento do mouse sobre a área de navegação
   */
  const handleNavMaskMouseMove = (e) => {
    const svgBounds = getSVGRenderBounds(imgRef.current, navMaskRef.current);
    const relativeCoords = getRelativeCoords(e, svgBounds);

    if (!relativeCoords) {
      setIsOverWalkable(false);
      return;
    }

    const { x, y } = relativeCoords;
    const walkable = isWalkable(x, y, canvasRef.current, svgBounds);
    setIsOverWalkable(walkable);
  };

  return (
    <MainContainer>
      <GameplayContainer>
        <GameplayHeader></GameplayHeader>

        <GameplayContent>
          <GameplayArea>
            <HouseImage src="/images/level-1/game-level-1.png" alt="Casa" />
            <NavigationArea
              ref={navMaskRef}
              imgRef={imgRef}
              maskImageSrc="/images/level-1/nav-mask.svg"
              isOverWalkable={isOverWalkable}
              onClick={handleNavMaskClick}
              onMouseMove={handleNavMaskMouseMove}
            />
            <GamePlayer
              $x={playerPosition.x}
              $y={playerPosition.y}
              $isMoving={isMoving}
            />
            <PathDebugVisualizer path={currentPath} />
          </GameplayArea>
          <GameplayInfo>
            <NineSliceContainer
              $imageUrl="/images/container.png"
              $sliceTop="30"
              $sliceRight="35"
              $sliceBottom="35"
              $sliceLeft="35"
              $repeat="stretch"
              $minHeight="10px"
              $padding="1rem"
            >
              <div className="slice-content">
                <InfoTitle>
                  VAMOS FAZER UMA ATIVIDADE SIMPLES PARA VOCÊ SE FAMILIARIZAR
                  COM SEU AVATAR.
                </InfoTitle>
                <p>
                  Clique nos cômodos da casa, para coletar os ícones de raios e
                  revelar o que depende de energia elétrica nesse local.
                </p>
                <span>
                  Cuidado: um dos cômodos é uma armadilha e deve ser evitado!
                </span>
              </div>
            </NineSliceContainer>
          </GameplayInfo>
        </GameplayContent>
      </GameplayContainer>
    </MainContainer>
  );
}
