import styled from "styled-components";

export const Container = styled.div`
  background-image: url(${(props) =>
    props.$backgroundImage || "/images/avatar-selection-bg.png"});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  position: relative;

  .top-bar-container {
    width: 100%;
    position: relative;
  }

  .top-bar {
    width: 100%;
    display: block;
    position: relative;
    z-index: 10;
    filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.7))
      drop-shadow(0 15px 25px rgba(221, 230, 255, 0.5));
  }

  .logo {
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    left: 0;
    opacity: 0.75;
    width: 15%;
    z-index: 20;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 2rem;
  }

  .bottom-bar {
    width: 100%;
    display: block;
    position: relative;
    filter: drop-shadow(0 -4px 8px rgba(230, 234, 242, 0.7))
      drop-shadow(0 -15px 25px rgba(118, 154, 255, 0.5));
  }
`;
