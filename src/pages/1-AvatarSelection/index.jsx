import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgressionStore } from "../../store/progressionStore";
import { Avatar } from "../../components/Avatar";
import {
  MainContainer,
  SelectionTitle,
  SelectionBox,
  NameInput,
  AdvanceButton,
} from "./styles";

export function AvatarSelection() {
  const { visitPage, setPlayerName, setPlayerAvatar, navigateWithTransition } =
    useProgressionStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = nome, 2 = avatar
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const canAdvanceStep1 = name.length >= 2;
  const canAdvanceStep2 = selectedAvatar !== null;

  const handleAdvanceStep1 = () => {
    console.log("handleAdvanceStep1 chamado", { canAdvanceStep1, name });
    if (!canAdvanceStep1 || isTransitioning) return;

    setPlayerName(name);
    setIsButtonPressed(true);
    setIsTransitioning(true);

    // Animação de saída
    setTimeout(() => {
      setIsButtonPressed(false);
      setStep(2);
      // Permite nova transição após animação de entrada
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600); // Tempo da animação de entrada
    }, 500); // Tempo da animação de saída
  };

  const handleAdvanceStep2 = () => {
    if (!canAdvanceStep2 || isTransitioning) return;

    setPlayerAvatar(selectedAvatar);
    setIsButtonPressed(true);
    setIsTransitioning(true);

    setTimeout(() => {
      setIsButtonPressed(false);
      visitPage(3);
      navigateWithTransition(navigate, "/intro", {
        type: "fade",
        duration: 300,
        delay: 0,
      });
    }, 175);
  };

  return (
    <MainContainer>
      <div className="top-bar-container">
        <img className="top-bar" src="images/barra-sup.png" alt="" />
        <img className="logo" src="/images/avatar-selection-logo.png" alt="" />
      </div>

      <div className="content">
        {step === 1 ? (
          <>
            <SelectionBox $step={step} $isExiting={isTransitioning}>
              <p className="question">Como podemos te chamar?</p>
              <NameInput
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome..."
                maxLength={20}
              />
              <AdvanceButton
                onClick={handleAdvanceStep1}
                disabled={!canAdvanceStep1 || isTransitioning}
                $isPressed={isButtonPressed}
              >
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
            </SelectionBox>
          </>
        ) : (
          <>
            <SelectionBox $step={step} $isExiting={false}>
              {" "}
              <p className="question">Clique para selecionar seu avatar:</p>
              <div className="avatars">
                <Avatar
                  type="M"
                  size="medium"
                  selected={selectedAvatar === "M"}
                  selectionScreen={true}
                  onClick={() => setSelectedAvatar("M")}
                />
                <Avatar
                  type="H"
                  size="medium"
                  selected={selectedAvatar === "H"}
                  selectionScreen={true}
                  onClick={() => setSelectedAvatar("H")}
                />
              </div>
              <AdvanceButton
                onClick={handleAdvanceStep2}
                disabled={!canAdvanceStep2 || isTransitioning}
                $isPressed={isButtonPressed}
              >
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
            </SelectionBox>
          </>
        )}
      </div>
      <img className="bottom-bar" src="/images/barra-inf.png" alt="" />
    </MainContainer>
  );
}

export default AvatarSelection;
