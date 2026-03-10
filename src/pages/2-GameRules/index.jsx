import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgressionStore } from "../../store/progressionStore";
import { Avatar } from "../../components/Avatar";
import { NineSliceContainer } from "../../components/NineSliceContainer";
import {
  MainContainer,
  SelectionTitle,
  SelectionBox,
  AdvanceButton,
  RulesGrid,
  RuleCard,
} from "./styles";
import { PageLayout } from "../../components";

const rulesData = [
  {
    iconSrc: "/images/regras-01.png", // Substitua pelo caminho correto
    text: "Use o mouse para clicar em botões, mover seu avatar e coletar ícones.",
  },
  {
    iconSrc: "/images/regras-02.png",
    text: "Tarefas cumpridas garantem pontuação em quilowatts (kW), para iluminar sua jornada e avançar nas fases.",
  },
  {
    iconSrc: "/images/regras-03.png",
    text: "Leia com atenção as informações para cumprir as tarefas e avançar de fase.",
  },
  {
    iconSrc: "/images/regras-04.png",
    text: "Armadilhas levam à perda de energia e a bloqueios.",
  },
  {
    iconSrc: "/images/regras-05.png",
    text: "Clique nas setas para avançar ou retornar se quiser resgatar alguma informação.",
  },
];

export function GameRules() {
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
    <PageLayout backgroundImage="/images/fundo-claro.jpg">
      <MainContainer>
        <h1>Atenção às regras do jogo {playerName || "Jogador"}!</h1>
        <div className="flex-column">
          <RulesGrid>
            {rulesData.map((rule, index) => (
              <RuleCard key={index}>
                <div className="icon">
                  <img src={rule.iconSrc} alt="" />
                </div>
                <div className="text-container">
                  <span className="text">{rule.text}</span>
                </div>
              </RuleCard>
            ))}
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
          </RulesGrid>
        </div>
      </MainContainer>
    </PageLayout>
  );
}

export default GameRules;
