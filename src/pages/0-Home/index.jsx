import { useState } from "react";
import { useProgressionStore } from "../../store/progressionStore";
import {
  WelcomeContainer,
  Title,
  Subtitle,
  LogoFooter,
  LogoBackgroundWrapper,
  LogoBackground,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { AdvanceButton } from "../1-AvatarSelection/styles";

export function HomePage() {
  const { visitPage, navigateWithTransition } = useProgressionStore();
  const [isPressed, setIsPressed] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
    }, 175);

    // Navega com delay para animação do botão (175ms)
    visitPage(2);
    navigateWithTransition(navigate, "/avatar", {
      type: "fade",
      duration: 300,
      delay: 175, // Aguarda animação do botão
    });
  };

  return (
    <WelcomeContainer>
      <Title>JOGO DA ALTA VOLTAGEM</Title>

      <Subtitle>
        <h3>
          Participe da <br /> revolução <br /> energética da <br />{" "}
          <b>AXIA Energia!</b>
        </h3>
      </Subtitle>

      <LogoBackgroundWrapper>
        <LogoBackground src="/images/logo-axia.png" alt="Axia Energia" />
      </LogoBackgroundWrapper>

      <AdvanceButton className="start-button" onClick={handleStart}>
        INICIAR
      </AdvanceButton>

      <LogoFooter src="/images/logo-axia-footer.png" alt="Axia Energia" />
    </WelcomeContainer>
  );
}

export default HomePage;
