import { Container } from "./styles";

export function PageLayout({
  children,
  backgroundImage = "/images/avatar-selection-bg.png",
  showLogo = true,
  logoSrc = "/images/avatar-selection-logo.png",
  className,
  ...props
}) {
  return (
    <Container
      $backgroundImage={backgroundImage}
      className={className}
      {...props}
    >
      <div className="top-bar-container">
        <img className="top-bar" src="/images/barra-sup.png" alt="" />
        {showLogo && <img className="logo" src={logoSrc} alt="" />}
      </div>

      <div className="content">{children}</div>

      <img className="bottom-bar" src="/images/barra-inf.png" alt="" />
    </Container>
  );
}
