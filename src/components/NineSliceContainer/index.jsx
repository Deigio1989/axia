import { Container } from "./styles";
import { ContentWrapper } from "./ContentWrapper";

export function NineSliceContainer({
  children,
  className,
  $noWrapper,
  ...props
}) {
  return (
    <Container className={className} {...props}>
      {$noWrapper ? children : <ContentWrapper>{children}</ContentWrapper>}
    </Container>
  );
}
