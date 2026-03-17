# AXIA Energia - SCORM Training

Projeto de treinamento interativo compatível com SCORM 1.2, desenvolvido com Vite, React 19, Styled Components e Zustand.

## 🚀 Tecnologias

- **Vite** (rolldown-vite) - Build tool
- **React 19** - Framework
- **React Router DOM** - Navegação (HashRouter para compatibilidade SCORM)
- **Styled Components** - Estilização
- **Zustand** - Gerenciamento de estado
- **SCORM 1.2** - Padrão de e-learning

## 📦 Instalação

```bash
npm install
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento local
npm run dev

# Build de produção
npm run build

# Build + Gerar pacote SCORM (.zip)
npm run build:scorm

# Preview do build
npm run preview

# Lint
npm run lint
```

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ScormProgressTracker.jsx
│   └── StyledComponents.js
├── hooks/               # Custom hooks
│   ├── useScorm.js
│   ├── useSessionTimer.js
│   └── useQuizTracking.js
├── pages/               # Páginas do curso
│   ├── HomePage.jsx
│   └── NotFoundPage.jsx
├── services/            # Serviços
│   └── scormService.js
├── store/               # Zustand stores
│   └── progressionStore.js
├── styles/              # Estilos globais
│   └── GlobalStyles.js
├── App.jsx              # Componente principal
└── main.jsx             # Entry point
```

## 🎯 Funcionalidades SCORM

### Tracking Automático

- ✅ Inicialização e finalização automática
- ✅ Salvamento periódico de progresso (a cada 30s)
- ✅ Salvamento ao navegar entre páginas
- ✅ Salvamento ao sair (beforeunload)
- ✅ Restauração de progresso ao retornar
- ✅ Timer de sessão
- ✅ Score tracking
- ✅ Status da lição (incomplete/passed/failed)

### Dados Salvos

O sistema salva automaticamente:

- Nome e ID do estudante (read-only do LMS)
- Score (0-100)
- Status da lição
- Tempo de sessão
- Página máxima alcançada
- Módulos completados
- Scores de quizzes individuais
- Timestamp da última atualização

### Hooks Disponíveis

#### `useScorm()`

```javascript
const {
  isInitialized,
  isLoading,
  studentName,
  studentId,
  reportProgress,
  completeLesson,
  saveLocation,
  getLocation,
  saveSuspendData,
  loadSuspendData,
} = useScorm();
```

#### `useSessionTimer(intervalMs)`

```javascript
const { getElapsedTime, getFormattedTime, resetTimer } = useSessionTimer(5000); // Atualiza a cada 5s
```

#### `useQuizTracking(quizId, totalQuestions, passingScore)`

```javascript
const { submitQuiz, validateAnswer, calculatePartialScore, isSubmitting } =
  useQuizTracking("quiz1", 10, 80);
```

### Store de Progressão

```javascript
import { useProgressionStore } from "./store/progressionStore";

const {
  // Estado
  maxReached,
  currentPage,
  score,
  completedModules,

  // Ações
  visitPage,
  updateScore,
  completeModule,
  saveProgress,
  loadProgress,
} = useProgressionStore();
```

## 🧪 Como Testar

### 1. Desenvolvimento Local

```bash
npm run dev
```

O app roda em modo fallback (localStorage) quando não detecta API SCORM.

### 2. Build e Pacote SCORM

```bash
npm run build:scorm
```

Gera `axia-energia-scorm.zip` pronto para upload em LMS.

### 3. Testar no LMS

#### SCORM Cloud (Recomendado)

1. Acesse https://cloud.scorm.com/
2. Crie conta gratuita
3. Faça upload do ZIP
4. Teste o curso
5. Verifique relatórios de progresso

#### Moodle

1. Crie curso
2. Adicione atividade SCORM
3. Upload do ZIP
4. Configure e teste

## 📋 Checklist de Deploy

Antes de fazer upload no LMS:

- [ ] `base: "./"` configurado no vite.config.js
- [ ] Nomes de arquivo sem hash
- [ ] imsmanifest.xml válido e correto
- [ ] SCORM service testado
- [ ] HashRouter configurado
- [ ] Progresso salva e restaura corretamente
- [ ] Timer de sessão funciona
- [ ] Score é registrado
- [ ] Build gera ZIP corretamente

## 🐛 Debug

Para ver logs SCORM no console:

```javascript
// O scormService já tem logs automáticos em modo dev
// Verifique o console do navegador para:
// - Inicialização SCORM
// - GetValue/SetValue
// - Commits
// - Erros da API
```

## 📚 Recursos

- [SCORM 1.2 Specification](https://scorm.com/scorm-explained/technical-scorm/scorm-12-overview-for-developers/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/)
- [Styled Components](https://styled-components.com/)

## 📝 Próximos Passos

1. Adicionar mais páginas de conteúdo em `src/pages/`
2. Criar componentes de quiz
3. Adicionar animações e transições
4. Implementar navegação com progresso visual
5. Adicionar mais módulos de conteúdo
6. Customizar temas e cores

## 🤝 Contribuindo

Este é um projeto base. Personalize conforme necessário para seu curso específico.

## 📄 Licença

MIT
