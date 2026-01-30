import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgressionStore } from "../../store/progressionStore";
import { Avatar } from "../../components/Avatar";
import { NineSliceContainer } from "../../components/NineSliceContainer";
import {
  MainContainer,
  SelectionTitle,
  SelectionBox,
  NameInput,
  AdvanceButton,
} from "./styles";
import { PageLayout } from "../../components";

export function GameIntro() {
  const { visitPage, playerName, playerAvatar, navigateWithTransition } =
    useProgressionStore();
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleAdvance = () => {
    setIsButtonPressed(true);

    setTimeout(() => {
      setIsButtonPressed(false);
      visitPage(4);
      navigateWithTransition(navigate, "/levels", {
        type: "fade",
        duration: 300,
        delay: 0,
      });
    }, 175);
  };

  return (
    <PageLayout backgroundImage="/images/fundo-azul.png">
      <MainContainer>
        <SelectionBox $isExiting={isTransitioning}>
          <Avatar type={playerAvatar || "M"} size="large" epi={true} />

          <p className="question">Boas-vindas, {playerName || "Jogador"}!</p>
        </SelectionBox>
        <div className="flex-column">
          <NineSliceContainer
            $imageUrl="/images/container.png"
            // Pixels a cortar da imagem original
            $sliceTop="30"
            $sliceRight="45"
            $sliceBottom="35"
            $sliceLeft="50"
            $repeat="stretch"
            $minHeight="10px"
            $padding="1rem"
          >
            <div className="slice-content">
              <p>
                <b>Neste jogo, sua missão será:</b>
                <ul>
                  <li>explorar o setor elétrico brasileiro</li>
                  <li>conhecer a atuação da AXIA Energia </li>
                  <li>
                    conhecer as etapas da geração <br /> até o consumo da
                    energia elétrica
                  </li>
                  <li>
                    desvendar boas-práticas e novas <br /> tecnologias do setor
                  </li>
                </ul>
              </p>
            </div>
          </NineSliceContainer>
          <AdvanceButton onClick={handleAdvance} $isPressed={isButtonPressed}>
            <img
              src={
                isButtonPressed
                  ? "/images/start-button-pressed.png"
                  : "/images/start-button.png"
              }
              alt=""
            />
            <span>AVANÇAR</span>
          </AdvanceButton>
        </div>
      </MainContainer>
    </PageLayout>
  );
}

export default GameIntro;
