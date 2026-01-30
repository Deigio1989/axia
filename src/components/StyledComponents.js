import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-background);
`;

export const Header = styled.header`
  background-color: var(--color-surface);
  padding: var(--spacing-lg) var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.h1`
  font-size: var(--font-size-2xl);
  color: var(--color-primary);
  margin: 0;
`;

export const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--spacing-xs);
`;

export const StudentName = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
`;

export const ProgressBadge = styled.span`
  background-color: ${(props) =>
    props.$score >= 80
      ? "var(--color-success)"
      : props.$score >= 60
        ? "var(--color-warning)"
        : "var(--color-text-secondary)"};
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-xs);
  font-weight: 600;
`;

export const Main = styled.main`
  flex: 1;

  width: 100%;
  margin: 0 auto;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: var(--spacing-lg);
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingText = styled.p`
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
`;

export const PageContainer = styled.div`
  background-color: var(--color-surface);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-xl);
`;

export const PageTitle = styled.h2`
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--color-border);
`;

export const Button = styled.button`
  background-color: ${(props) =>
    props.$variant === "secondary"
      ? "var(--color-secondary)"
      : "var(--color-primary)"};
  color: white;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  font-weight: 600;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.$variant === "secondary"
        ? "var(--color-secondary-dark)"
        : "var(--color-primary-dark)"};
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background-color: var(--color-text-secondary);
  }
`;

export const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
`;
