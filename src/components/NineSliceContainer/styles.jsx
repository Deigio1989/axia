import styled from "styled-components";

export const Container = styled.div`
  /* 9-Slice Scaling usando border-image */
  border-style: solid;

  /* Border width - aceita 4 valores: top, right, bottom, left */
  border-width: ${(props) => {
    if (
      props.$borderTop ||
      props.$borderRight ||
      props.$borderBottom ||
      props.$borderLeft
    ) {
      const top = props.$borderTop || "40px";
      const right = props.$borderRight || "40px";
      const bottom = props.$borderBottom || "40px";
      const left = props.$borderLeft || "40px";
      return `${top} ${right} ${bottom} ${left}`;
    }
    return props.$borderWidth || "40px";
  }};

  border-image-source: url(${(props) =>
    props.$imageUrl || "/images/container.png"});

  /* Border slice - aceita 4 valores: top, right, bottom, left (em pixels ou %) */
  /* IMPORTANTE: 'fill' faz o centro da imagem ser renderizado também */
  border-image-slice: ${(props) => {
    if (
      props.$sliceTop ||
      props.$sliceRight ||
      props.$sliceBottom ||
      props.$sliceLeft
    ) {
      const top = props.$sliceTop || "40";
      const right = props.$sliceRight || "40";
      const bottom = props.$sliceBottom || "40";
      const left = props.$sliceLeft || "40";
      return `${top} ${right} ${bottom} ${left} fill`;
    }
    return `${props.$slice || "40"} fill`;
  }};

  border-image-repeat: ${(props) => props.$repeat || "stretch"};

  /* Estilos do conteúdo interno */
  padding: ${(props) => props.$padding || "0"};
  width: ${(props) => props.$width || "100%"};
  min-height: ${(props) => props.$minHeight || "200px"};

  /* Box model */
  box-sizing: border-box;

  /* Flexbox para conteúdo centralizado (opcional) */
  display: ${(props) => props.$display || "flex"};
  flex-direction: ${(props) => props.$flexDirection || "column"};
  align-items: ${(props) => props.$alignItems || "center"};
  justify-content: ${(props) => props.$justifyContent || "center"};
  gap: ${(props) => props.$gap || "1rem"};
`;
