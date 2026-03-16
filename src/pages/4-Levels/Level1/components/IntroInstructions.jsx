import { memo } from "react";
import { NineSliceContainer } from "../../../../components/NineSliceContainer";

/**
 * Componente memoizado para as instruções da Intro
 * Previne re-renders durante animações
 */
export const IntroInstructions = memo(() => {
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
        <p>
          Clique na porta da casa <br />
          e veja que importância tem <br />
          a energia elétrica no <br /> nosso dia a dia
        </p>
      </div>
    </NineSliceContainer>
  );
});

IntroInstructions.displayName = "IntroInstructions";
