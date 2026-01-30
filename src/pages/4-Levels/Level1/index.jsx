import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgressionStore } from "../../../store/progressionStore";
import { Avatar } from "../../../components/Avatar";
import { NineSliceContainer } from "../../../components/NineSliceContainer";
import { MainContainer, AdvanceButton, HouseContainer } from "./styles";
import { PageLayout } from "../../../components";

export function Level1() {
  const { visitPage, playerName, navigateWithTransition } =
    useProgressionStore();
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleAdvance = () => {
    setIsButtonPressed(true);

    setTimeout(() => {
      setIsButtonPressed(false);
      visitPage(4);
      navigateWithTransition(navigate, "/", {
        type: "fade",
        duration: 300,
        delay: 0,
      });
    }, 175);
  };

  return (
    <PageLayout backgroundImage="/images/fundo-azul.png">
      <MainContainer>
        <div className="flex-column">
          <NineSliceContainer
            $imageUrl="/images/container.png"
            // Pixels a cortar da imagem original
            $sliceTop="30"
            $sliceRight="35"
            $sliceBottom="35"
            $sliceLeft="35"
            $repeat="stretch"
            $minHeight="10px"
            $padding="1rem"
          >
            <div className="slice-content">
              <p>
                Clique na porta da casa <br />
                e veja que importância tem <br />
                a energia elétrica no <br /> nosso dia a dia
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
            <span>PLACEHOLDER</span>
          </AdvanceButton>
        </div>
        <HouseContainer>
          <img className="house-base house" src="/images/house-base.png" />
          <img className="door-1" src="/images/house-door-1.png" />
          <img className="door-2" src="/images/house-door-2.png" />
          <img className="platibanda house" src="/images/platibanda.png" />
          <img className="floor house" src="/images/house-floor.png" />
        </HouseContainer>
      </MainContainer>
    </PageLayout>
  );
}

export default Level1;
