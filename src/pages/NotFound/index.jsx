import { NotFoundContainer, ErrorCode, ErrorMessage } from "./styles";

export function NotFoundPage() {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>Página não encontrada</ErrorMessage>
      <p>A página que você procura não existe.</p>
    </NotFoundContainer>
  );
}

export default NotFoundPage;
