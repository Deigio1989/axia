import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgressionStore } from "../../store/progressionStore";
import { NineSliceContainer, MapLevel } from "../../components";
import { MainContainer, AdvanceButton, MapContainer, Title } from "./styles";
import { PageLayout } from "../../components";

export function LevelSelection() {
  const { visitPage, playerName, navigateWithTransition, maxReached } =
    useProgressionStore();
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);

  // Determina quais níveis estão desbloqueados
  // Se maxReached >= 3, desbloqueia os níveis até maxReached - 2
  // Exemplo: se está na página 3 (GameIntro), maxReached = 3, então unlockedLevels = 1
  // Se está na página 4, maxReached = 4, então unlockedLevels = 2
  const unlockedLevels = maxReached > 3 ? Math.min(maxReached - 2, 10) : 1;

  console.log("maxReached:", maxReached, "unlockedLevels:", unlockedLevels);

  const levelTexts = {
    1: {
      title: "A importância do setor elétrico no Brasil",
      objectives: [
        "Descobrir a importância da energia elétrica hoje.",
        "Desvendar o tamanho da demanda por energia elétrica no Brasil.",
        "Identificar o papel da AXIA Energia nesse setor.",
      ],
    },
    2: {
      title: "O avanço na legislação do setor",
      objectives: [
        "Conhecer a evolução histórica do marco legal e regulatório do Setor Elétrico Brasileiro (SEB).",
        "Identificar as leis e decretos mais relevantes que formaram o modelo atual.",
        "Descobrir como está o sistema elétrico brasileiro hoje.",
      ],
    },
  };

  const handleLevelClick = (levelNumber) => {
    console.log(`Nível ${levelNumber} clicado!`);
    setSelectedLevel(levelNumber);
  };

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
          {selectedLevel && (
            <>
              <Title>FASE {selectedLevel}</Title>
              <p>{levelTexts[selectedLevel]?.title || "Selecione uma fase"}</p>
            </>
          )}
          <NineSliceContainer
            $imageUrl="/images/container.png"
            $sliceTop="30"
            $sliceRight="45"
            $sliceBottom="35"
            $sliceLeft="50"
            $repeat="stretch"
            $minHeight="10px"
            $padding="1rem"
            style={{ width: "350px" }}
          >
            <div className="slice-content">
              {selectedLevel ? (
                <div>
                  <b>Objetivos:</b>
                  <ul>
                    {levelTexts[selectedLevel]?.objectives.map((obj, index) => (
                      <li key={index}>{obj}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <b>
                    Selecione uma fase no mapa!
                    <br />
                    <i>Para fins de teste a fase 1 e 2 estão desbloqueadas.</i>
                  </b>
                </div>
              )}
            </div>
          </NineSliceContainer>
        </div>
        <MapContainer>
          {/* Fileira 4 - Mais ao fundo */}
          <div className="map-row f4">
            <MapLevel
              levelNumber={5}
              row={4}
              isUnlocked={unlockedLevels >= 5}
              isSelected={selectedLevel === 5}
              onClick={handleLevelClick}
              top="95px"
              left="170px"
              size="127px"
              numberTop="-5%"
              numberLeft="30%"
            />
            <MapLevel
              levelNumber={6}
              row={4}
              isUnlocked={unlockedLevels >= 6}
              isSelected={selectedLevel === 6}
              onClick={handleLevelClick}
              top="90px"
              left="300px"
              size="127px"
              numberTop="-5%"
              numberLeft="70%"
            />
          </div>

          {/* Fileira 3 */}
          <div className="map-row f3">
            <MapLevel
              levelNumber={4}
              row={3}
              isUnlocked={unlockedLevels >= 4}
              isSelected={selectedLevel === 4}
              onClick={handleLevelClick}
              top="140px"
              left="65px"
              size="127px"
              numberTop="65%"
              numberLeft="0%"
            />
            <MapLevel
              levelNumber={7}
              row={3}
              isUnlocked={unlockedLevels >= 7}
              isSelected={selectedLevel === 7}
              onClick={handleLevelClick}
              top="130px"
              left="410px"
              size="127px"
              numberTop="65%"
              numberLeft="100%"
            />
          </div>

          {/* Fileira 2 */}
          <div className="map-row f2">
            <MapLevel
              levelNumber={3}
              row={2}
              isUnlocked={unlockedLevels >= 3}
              onClick={handleLevelClick}
              top="235px"
              left="65px"
              size="127px"
              isSelected={selectedLevel === 3}
              numberTop="70%"
              numberLeft="10%"
            />
            <MapLevel
              levelNumber={8}
              row={2}
              isUnlocked={unlockedLevels >= 8}
              isSelected={selectedLevel === 8}
              onClick={handleLevelClick}
              top="235px"
              left="440px"
              size="127px"
              numberTop="70%"
              numberLeft="90%"
            />
            <MapLevel
              levelNumber={10}
              row={2}
              isUnlocked={unlockedLevels >= 10}
              isSelected={selectedLevel === 10}
              onClick={handleLevelClick}
              top="210px"
              left="250px"
              type="final"
              numberTop="75%"
              numberLeft="50%"
            />
          </div>

          {/* Fileira 1 - Mais na frente */}
          <div className="map-row f1">
            <MapLevel
              levelNumber={2}
              row={1}
              isUnlocked={unlockedLevels >= 2}
              isSelected={selectedLevel === 2}
              onClick={handleLevelClick}
              top="310px"
              left="130px"
              size="127px"
              numberTop="95%"
              numberLeft="50%"
            />
            <MapLevel
              levelNumber={9}
              row={1}
              isUnlocked={unlockedLevels >= 9}
              isSelected={selectedLevel === 9}
              onClick={handleLevelClick}
              top="310px"
              left="375px"
              size="127px"
              numberTop="95%"
              numberLeft="50%"
            />
            <MapLevel
              levelNumber={1}
              row={1}
              isUnlocked={unlockedLevels >= 1}
              isSelected={selectedLevel === 1}
              onClick={handleLevelClick}
              top="350px"
              left="250px"
              size="127px"
              numberTop="95%"
              numberLeft="50%"
            />
          </div>
          <AdvanceButton onClick={handleAdvance} $isPressed={isButtonPressed}>
            <img
              src={
                isButtonPressed
                  ? "/images/start-button-pressed.png"
                  : "/images/start-button.png"
              }
              alt=""
            />
            <span>INICIAR</span>
          </AdvanceButton>
        </MapContainer>
      </MainContainer>
    </PageLayout>
  );
}

export default LevelSelection;
