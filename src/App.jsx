import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useScorm from "./hooks/useScorm";
import { useProgressionStore } from "./store/progressionStore";
import ScormProgressTracker from "./components/ScormProgressTracker";
import { preloadImages, GLOBAL_ASSETS } from "./services/imagePreloader";
import {
  AppContainer,
  Header,
  HeaderContent,
  Logo,
  StudentInfo,
  StudentName,
  ProgressBadge,
  Main,
  LoadingContainer,
  Spinner,
  LoadingText,
} from "./components/StyledComponents";
import HomePage from "./pages/0-Home";
import AvatarSelection from "./pages/1-AvatarSelection";
import GameIntro from "./pages/2-GameIntro";
import LevelSelection from "./pages/3-LevelSelection";
import NotFoundPage from "./pages/NotFound";
import Level1 from "./pages/4-Levels/Level1";
import GameRules from "./pages/2-GameRules";

function App() {
  const { isInitialized, isLoading, studentName } = useScorm();
  const { score } = useProgressionStore();
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Pré-carregamento global de imagens base
  useEffect(() => {
    if (isLoading || assetsLoaded) return;

    let cancelled = false;

    preloadImages(GLOBAL_ASSETS).finally(() => {
      if (!cancelled) {
        setAssetsLoaded(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [isLoading, assetsLoaded]);

  // Loading state
  if (isLoading || !assetsLoaded) {
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>Inicializando curso...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <ScormProgressTracker totalModules={10}>
      <AppContainer>
        <Main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/avatar" element={<AvatarSelection />} />
            <Route path="/intro" element={<GameIntro />} />
            <Route path="/rules" element={<GameRules />} />
            <Route path="/levels" element={<LevelSelection />} />
            <Route path="/levels/1" element={<Level1 />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Main>
      </AppContainer>
    </ScormProgressTracker>
  );
}

export default App;
