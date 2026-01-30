import { Routes, Route } from "react-router-dom";
import useScorm from "./hooks/useScorm";
import { useProgressionStore } from "./store/progressionStore";
import ScormProgressTracker from "./components/ScormProgressTracker";
import PageTransition from "./components/PageTransition";
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
import Test from "./pages/Test";
import NotFoundPage from "./pages/NotFound";
import Level1 from "./pages/4-Levels/Level1";

function App() {
  const { isInitialized, isLoading, studentName } = useScorm();
  const { score } = useProgressionStore();

  // Loading state
  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>Inicializando SCORM...</LoadingText>
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
