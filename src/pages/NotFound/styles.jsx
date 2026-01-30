import styled from "styled-components";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: var(--spacing-2xl);
`;

export const ErrorCode = styled.h1`
  font-size: 6rem;
  color: var(--color-primary);
  margin: 0;
`;

export const ErrorMessage = styled.h2`
  color: var(--color-text-secondary);
  margin-top: var(--spacing-md);
`;
