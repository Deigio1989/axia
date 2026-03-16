import { useState, useRef, useEffect } from "react";
import { useProgressionStore } from "../../../store/progressionStore";
import {
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
import { GameplayInstructions } from "./components/GameplayInstructions";
import { useNavMaskCanvas } from "./hooks/useNavMaskCanvas";
import { usePlayerPosition } from "./hooks/usePlayerPosition";
import {
  getSVGRenderBounds,
  getRelativeCoords,
  gameplayToSvgCoords,
  svgToGameplayCoords,
} from "./utils/coordinates";
import { findPath, isWalkable } from "./utils/pathfinding";
import { animateElementDirect, getElementPosition } from "./utils/domAnimation";

export function Gameplay({ onComplete }) {
  const { playerAvatar } = useProgressionStore();

  // Refs
  const imgRef = useRef(null);
  const navMaskRef = useRef(null);
  const animationCancelRef = useRef(null);
  const playerRef = useRef(null); // Ref para animar diretamente
  const svgBoundsRef = useRef(null); // Guarda último bounds usado para reescalar
  const baseBoundsRef = useRef(null); // Bounds de referência inicial
  const basePlayerSizeRef = useRef(null); // Tamanho base do player (diâmetro)

  // Custom hooks
  const canvasRef = useNavMaskCanvas(imgRef);
  const [playerPosition] = usePlayerPosition(imgRef, navMaskRef);

  // Inicializa posição do player no DOM quando a posição for calculada
  useEffect(() => {
    if (!playerRef.current || !imgRef.current || !navMaskRef.current) return;

    // Usa posição calculada pelo hook (já em coordenadas de gameplay)
    const { x, y } = playerPosition;
    if (!x || !y) return;

    playerRef.current.style.left = `${x}px`;
    playerRef.current.style.top = `${y}px`;
    console.log("🔴 Posição inicial setada no DOM:", playerPosition);

    // Calcula e guarda bounds atuais como referência inicial
    const bounds = getSVGRenderBounds(imgRef.current, navMaskRef.current);
    if (bounds) {
      svgBoundsRef.current = bounds;

      if (!baseBoundsRef.current) {
        baseBoundsRef.current = bounds;
      }
      if (!basePlayerSizeRef.current && playerRef.current) {
        basePlayerSizeRef.current =
          playerRef.current.offsetWidth ||
          playerRef.current.offsetHeight ||
          50;
      }
    }
  }, [playerPosition, imgRef, navMaskRef]);

  // Função que recalcula posição e tamanho do player com base nos bounds
  const recomputePlayerLayout = () => {
    if (!imgRef.current || !navMaskRef.current || !playerRef.current) return;

    const newBounds = getSVGRenderBounds(imgRef.current, navMaskRef.current);
    if (!newBounds) return;

    if (!baseBoundsRef.current) {
      baseBoundsRef.current = newBounds;
    }
    if (!basePlayerSizeRef.current && playerRef.current) {
      basePlayerSizeRef.current =
        playerRef.current.offsetWidth || playerRef.current.offsetHeight || 50;
    }

    const prevBounds = baseBoundsRef.current || newBounds;

    // Posição atual em coordenadas de gameplay
    const currentPos = getElementPosition(playerRef);

    // Converte posição atual para coordenadas normalizadas dentro dos bounds base
    const normX =
      prevBounds.width > 0
        ? (currentPos.x - prevBounds.offsetX) / prevBounds.width
        : 0.5;
    const normY =
      prevBounds.height > 0
        ? (currentPos.y - prevBounds.offsetY) / prevBounds.height
        : 0.5;

    // Aplica mesmas coordenadas normalizadas nos novos bounds
    const newX = newBounds.offsetX + normX * newBounds.width;
    const newY = newBounds.offsetY + normY * newBounds.height;

    playerRef.current.style.left = `${newX}px`;
    playerRef.current.style.top = `${newY}px`;

    // Ajusta o tamanho (diâmetro) do player proporcionalmente à largura
    const baseBounds = baseBoundsRef.current;
    const baseSize = basePlayerSizeRef.current || 50;
    const scale =
      baseBounds && baseBounds.width > 0
        ? newBounds.width / baseBounds.width
        : 1;
    const newSize = baseSize * scale;

    playerRef.current.style.width = `${newSize}px`;
    playerRef.current.style.height = `${newSize}px`;

    svgBoundsRef.current = newBounds;
  };

  // Reposiciona/redimensiona o player quando a janela é redimensionada
  useEffect(() => {
    window.addEventListener("resize", recomputePlayerLayout);
    return () => {
      window.removeEventListener("resize", recomputePlayerLayout);
    };
  }, []);

  // Observa mudanças no tamanho da área de navegação (caso o layout mude sem resize de janela)
  useEffect(() => {
    if (!navMaskRef.current || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      recomputePlayerLayout();
    });

    observer.observe(navMaskRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // State - apenas para controle visual, não para animação
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
    // Lê posição diretamente do DOM ao invés de state
    const currentPlayerPos = getElementPosition(playerRef);
    const playerSVGPos = gameplayToSvgCoords(currentPlayerPos, svgBounds);

    // Calcula o caminho com A*
    const path = findPath(playerSVGPos, { x, y }, canvasRef.current, svgBounds);

    if (!path || path.length === 0) {
      console.log("❌ Nenhum caminho encontrado");
      return;
    }

    // Converte todos os pontos do caminho para coordenadas do gameplay-area
    const gameplayPath = path.map((p) => svgToGameplayCoords(p, svgBounds));

    console.log("🗺️ Path ajustado com offsets:", {
      playerGameplay: currentPlayerPos,
      playerSVG: playerSVGPos,
      destinationSVG: { x, y },
      offsetsUsed: { x: svgBounds.offsetX, y: svgBounds.offsetY },
    });

    // Inicia animação - ANIMA DIRETAMENTE NO DOM VIA REF
    setIsMoving(true);
    setCurrentPath(gameplayPath);

    animationCancelRef.current = animateElementDirect(
      playerRef,
      gameplayPath,
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
            <GamePlayer ref={playerRef} $isMoving={isMoving} />
            <PathDebugVisualizer path={currentPath} />
          </GameplayArea>
          <GameplayInfo>
            <GameplayInstructions />
          </GameplayInfo>
        </GameplayContent>
      </GameplayContainer>
    </MainContainer>
  );
}
