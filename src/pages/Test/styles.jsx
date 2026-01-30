import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
  padding: 40px 20px;
  gap: 40px;
`;

export const Title = styled.h1`
  font-family: "DM Sans", sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(0, 200, 255, 0.5);
  margin: 0;
`;

export const HeliceContainer = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  border-radius: 20px;
  background: rgba(10, 14, 39, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 200, 255, 0.3);
  box-shadow:
    0 0 40px rgba(0, 200, 255, 0.2),
    inset 0 0 40px rgba(0, 200, 255, 0.05);
  overflow: hidden;
`;

export const NetworkCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const ParticlesCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const Controls = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 600px;
`;

export const ControlButton = styled.button`
  font-family: "DM Sans", sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: 12px;
  border: 1px solid
    ${(props) =>
      props.$active ? "rgba(0, 200, 255, 0.6)" : "rgba(255, 255, 255, 0.2)"};
  background: ${(props) =>
    props.$active
      ? "linear-gradient(135deg, rgba(0, 200, 255, 0.2) 0%, rgba(0, 128, 255, 0.1) 100%)"
      : "rgba(255, 255, 255, 0.05)"};
  color: ${(props) => (props.$active ? "#00c8ff" : "#ffffff")};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${(props) =>
    props.$active ? "0 0 20px rgba(0, 200, 255, 0.3)" : "none"};

  &:hover {
    background: ${(props) =>
      props.$active
        ? "linear-gradient(135deg, rgba(0, 200, 255, 0.3) 0%, rgba(0, 128, 255, 0.2) 100%)"
        : "rgba(255, 255, 255, 0.1)"};
    border-color: rgba(0, 200, 255, 0.8);
    box-shadow: 0 0 25px rgba(0, 200, 255, 0.4);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
