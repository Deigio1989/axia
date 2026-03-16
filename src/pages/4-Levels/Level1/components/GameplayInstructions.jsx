import { memo } from "react";
import { NineSliceContainer } from "../../../../components/NineSliceContainer";
import { InfoTitle } from "../styles";

/**
 * Componente memoizado que nunca re-renderiza durante animações
 * Previne flickering no texto
 */
export const GameplayInstructions = memo(() => {
  return (
    <NineSliceContainer
      $imageUrl="/images/container.png"
      $sliceTop="30"
      $sliceRight="35"
      $sliceBottom="35"
      $sliceLeft="35"
      $repeat="stretch"
      $minHeight="10px"
      $padding="1rem"
    >
      <div className="slice-content">
        <InfoTitle>
          VAMOS FAZER UMA ATIVIDADE SIMPLES PARA VOCÊ SE FAMILIARIZAR COM SEU
          AVATAR.
        </InfoTitle>
        <p>
          Clique nos cômodos da casa, para coletar os ícones de raios e revelar
          o que depende de energia elétrica nesse local.
        </p>
        <span>Cuidado: um dos cômodos é uma armadilha e deve ser evitado!</span>
      </div>
    </NineSliceContainer>
  );
});

GameplayInstructions.displayName = "GameplayInstructions";
