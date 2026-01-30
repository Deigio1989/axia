import { Container } from "./styles";

export function NineSliceContainer({ children, className, ...props }) {
  return (
    <Container className={className} {...props}>
      {children}
    </Container>
  );
}
