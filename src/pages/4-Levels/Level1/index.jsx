import { useState } from "react";
import { PageLayout } from "../../../components";
import { Intro } from "./Intro";
import { Gameplay } from "./gameplay";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const SceneContainer = styled.div`
  animation: ${(props) => (props.$isFadingOut ? fadeOut : fadeIn)} 500ms
    ease-in-out;
  width: 100%;
  height: 100%;
`;

export function Level1() {
  const [scene, setScene] = useState("intro"); // 'intro', 'gameplay'
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleSceneTransition = (nextScene) => {
    setIsFadingOut(true);
    setTimeout(() => {
      setScene(nextScene);
      setIsFadingOut(false);
    }, 500); // Tempo do fade out
  };

  return (
    <PageLayout backgroundImage="/images/fundo-azul.png">
      <SceneContainer $isFadingOut={isFadingOut}>
        {scene === "intro" && (
          <Intro onComplete={() => handleSceneTransition("gameplay")} />
        )}
        {scene === "gameplay" && (
          <Gameplay onComplete={() => console.log("Level completo!")} />
        )}
      </SceneContainer>
    </PageLayout>
  );
}

export default Level1;
