# 🎯 Prompt para Criar Projeto SCORM com Vite + React + Styled Components

## � Índice de Conteúdo

1. **Descrição do Projeto** - Stack e tecnologias
2. **Estrutura Base** - Setup inicial e dependências
3. **Configurações Críticas** - vite.config.js e imsmanifest.xml
4. **SCORM Service** - Implementação base da API
5. **React Hooks SCORM** - useScorm, useSessionTimer, useQuizTracking
6. **Arquitetura de Tracking** - Estrutura completa e Zustand store
7. **Dados de Tracking** - O que salvar e quando
8. **Problemas Comuns (14)** - Com soluções detalhadas
9. **Troubleshooting de Tracking** - Debug e validação
10. **Checklist de Build** - Tudo que verificar
11. **Como Testar** - Dev, staging e produção
12. **Dicas Finais** - 20 boas práticas
13. **Diagrama de Fluxo** - Visualização do tracking
14. **Recursos Úteis** - Links e referências

---

## �📋 Descrição do Projeto

Criar o setup inicial de projeto de curso/treinamento interativo compatível com **SCORM 1.2**, utilizando as seguintes tecnologias modernas:

### Stack Tecnológico

- **Vite** (com rolldown-vite para melhor compatibilidade)
- **React 19** com React Router DOM
- **Styled Components** para estilização
- **Zustand** para gerenciamento de estado global
- **TypeScript** (opcional, mas recomendado para types)
- **ESLint** com flat config

---

## 🏗️ Estrutura Base do Projeto

### 1. Inicialização

```bash
npm create vite@latest nome-projeto -- --template react
cd nome-projeto
```

### 2. Dependências Essenciais

```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.9.5",
    "styled-components": "^6.1.19",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2",
    "@types/styled-components": "^5.1.35",
    "@vitejs/plugin-react": "^5.1.0",
    "archiver": "^7.0.1",
    "fs-extra": "^11.3.2",
    "vite": "npm:rolldown-vite@7.2.2"
  },
  "overrides": {
    "vite": "npm:rolldown-vite@7.2.2"
  }
}
```

### 3. Scripts NPM

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:scorm": "vite build && node scripts/create-scorm-package.cjs",
    "preview": "vite preview"
  }
}
```

---

## 🎯 Dados Essenciais para Tracking

### Dados Obrigatórios no SCORM

```javascript
// Sempre salve esses dados
{
  "cmi.core.student_name": "João Silva",          // Nome (read-only, lido do LMS)
  "cmi.core.score.raw": 85,                        // Score 0-100
  "cmi.core.lesson_status": "passed",              // passed/failed/incomplete
  "cmi.core.session_time": "00:45:30",             // HH:MM:SS
  "cmi.suspend_data": "{...}"                      // JSON com estado customizado
}
```

### Dados Customizados no suspend_data

```javascript
{
  "maxReached": 5,                    // Última página visitada
  "currentPage": 3,                   // Página atual
  "score": 85,                        // Score final
  "completedModules": [1, 2, 3],      // Módulos completados
  "quizScores": {                     // Scores de cada quiz
    "quiz1": 90,
    "quiz2": 80,
    "quiz3": 75
  },
  "timestamp": "2026-01-26T10:30:00Z", // Quando salvou
  "sessionTime": 2700000               // Tempo em ms
}
```

### Mapeamento de Dados no ScormService

```javascript
const dataMapping = {
  // Dados do SCORM
  "cmi.core.student_name": "readonly",
  "cmi.core.student_id": "readonly",
  "cmi.core.score.raw": "read-write",
  "cmi.core.lesson_status": "read-write",
  "cmi.core.lesson_location": "read-write",
  "cmi.core.session_time": "read-write",
  "cmi.suspend_data": "read-write",
  "cmi.core.exit": "write-only",
};
```

---

## ⚙️ Configurações Críticas

### 1. vite.config.js (SCORM-Ready)

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
      },
      output: {
        // Nomes consistentes para SCORM (sem hash)
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
  // CRÍTICO: Base path relativo para SCORM
  base: "./",
});
```

### 2. public/imsmanifest.xml (SCORM 1.2)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="MANIFEST-01" version="1.0"
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>

  <organizations default="ORG-01">
    <organization identifier="ORG-01">
      <title>Nome do Curso</title>
      <item identifier="ITEM-01" identifierref="RES-01">
        <title>Módulo Principal</title>
        <adlcp:masteryscore>80</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>

  <resources>
    <resource identifier="RES-01" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
      <file href="assets/main.js"/>
      <file href="assets/main.css"/>
    </resource>
  </resources>
</manifest>
```

### 3. scripts/create-scorm-package.cjs

```javascript
const fs = require("fs-extra");
const path = require("path");
const archiver = require("archiver");

async function createScormPackage() {
  const buildDir = path.join(__dirname, "../dist");
  const scormDir = path.join(__dirname, "../scorm-package");
  const zipPath = path.join(__dirname, "../nome-projeto-scorm.zip");

  try {
    await fs.remove(scormDir);
    await fs.remove(zipPath);
    await fs.ensureDir(scormDir);

    // Copia build
    await fs.copy(buildDir, scormDir);

    // Copia manifest
    const manifestSrc = path.join(__dirname, "../public/imsmanifest.xml");
    await fs.copy(manifestSrc, path.join(scormDir, "imsmanifest.xml"));

    // Cria ZIP
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      console.log(`✅ Pacote SCORM criado: ${zipPath}`);
    });

    archive.pipe(output);
    archive.directory(scormDir, false);
    archive.finalize();
  } catch (error) {
    console.error("❌ Erro:", error);
    process.exit(1);
  }
}

createScormPackage();
```

---

## 🔧 Implementação do SCORM Service

### src/services/scormService.js

**Pontos críticos que você precisa implementar:**

1. **Busca da API SCORM** (navegando pelos parent windows)
2. **Inicialização** com `LMSInitialize("")`
3. **GetValue/SetValue** para ler/escrever dados
4. **Commit** para salvar dados
5. **Finish** ao sair do curso

```javascript
// Exemplo simplificado
function findScormAPI() {
  let api = null;
  let win = window;
  let attempts = 0;

  while (!api && win.parent && win.parent !== win && attempts < 500) {
    attempts++;
    if (win.API) {
      api = win.API;
      break;
    }
    win = win.parent;
  }

  return api;
}

const scormService = {
  async initialize() {
    const api = findScormAPI();
    if (api) {
      const result = api.LMSInitialize("");
      return result === "true";
    }
    return false;
  },

  getValue(key) {
    const api = findScormAPI();
    return api ? api.LMSGetValue(key) : "";
  },

  setValue(key, value) {
    const api = findScormAPI();
    if (api) {
      api.LMSSetValue(key, value);
      api.LMSCommit("");
    }
  },

  finish() {
    const api = findScormAPI();
    if (api) {
      api.LMSFinish("");
    }
  },
};
```

### src/hooks/useScorm.js

```javascript
import { useEffect, useState } from "react";
import scormService from "../services/scormService";

export default function useScorm() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    scormService.initialize().then((success) => {
      setIsInitialized(success);
      if (success) {
        const name = scormService.getValue("cmi.core.student_name");
        setStudentName(name);
      }
    });

    return () => scormService.finish();
  }, []);

  const reportProgress = (score, status) => {
    scormService.setScore(score);
    scormService.setLessonStatus(status);
    scormService.commit();
  };

  const completeLesson = (score, passed) => {
    scormService.setScore(score);
    scormService.setLessonStatus(passed ? "passed" : "failed");
    scormService.commit();
  };

  return {
    isInitialized,
    studentName,
    reportProgress,
    completeLesson,
  };
}
```

---

## 📊 Implementação Completa de Tracking SCORM

### O Que Rastrear?

SCORM permite rastrear vários dados do aluno:

```
cmi.core.student_name       → Nome do aluno
cmi.core.score.raw          → Pontuação (0-100)
cmi.core.lesson_status      → Status (passed/failed/incomplete)
cmi.core.lesson_location    → Última localização visitada
cmi.core.session_time       → Tempo total de sessão
cmi.suspend_data            → Dados customizados (JSON)
```

### Arquitetura Recomendada de Tracking

```
ScormService (serviço base)
    ↓
useScorm Hook (inicializa + helpers)
    ↓
ProgressionStore (Zustand - gerencia estado)
    ↓
ScormProgressTracker (componente wrapper)
    ↓
useQuizTracking (hook especializado para quizzes)
    ↓
useSessionTimer (rastreia tempo de sessão)
```

### 1. Store de Progressão (Zustand)

```javascript
// src/store/progressionStore.jsx
import { create } from "zustand";
import scormService from "../services/scormService";

export const useProgressionStore = create((set, get) => ({
  // Estado
  maxReached: 1,
  currentPage: 1,
  visitedPages: new Set([1]),
  score: 0,
  completedModules: [],

  // Ações
  updateMaxReached: (pageId) =>
    set((state) => {
      if (pageId > state.maxReached) {
        // Salva no SCORM também
        scormService.setLessonStatus("incomplete");
        scormService.commit();
        return { maxReached: pageId };
      }
    }),

  visitPage: (pageId) =>
    set((state) => {
      const visited = new Set(state.visitedPages);
      visited.add(pageId);
      return {
        currentPage: pageId,
        visitedPages: visited,
      };
    }),

  updateScore: (newScore) =>
    set((state) => {
      // Salva score no SCORM
      scormService.setScore(newScore);
      scormService.commit();
      return { score: newScore };
    }),

  completeModule: (moduleId) =>
    set((state) => {
      const completed = [...state.completedModules, moduleId];
      return { completedModules: completed };
    }),

  saveProgress: () => {
    const state = get();
    const progressData = {
      maxReached: state.maxReached,
      currentPage: state.currentPage,
      score: state.score,
      completedModules: state.completedModules,
      timestamp: new Date().toISOString(),
    };

    // Salva como suspend_data (para retomar depois)
    scormService.setSuspendData(JSON.stringify(progressData));
    scormService.commit();
  },

  loadProgress: () => {
    const data = scormService.getSuspendData();
    if (data) {
      try {
        const parsed = JSON.parse(data);
        set(parsed);
        return true;
      } catch (e) {
        console.error("Erro ao carregar progresso:", e);
        return false;
      }
    }
    return false;
  },
}));
```

### 2. Tracking Automático de Tempo

```javascript
// src/hooks/useSessionTimer.js
import { useEffect, useRef } from "react";
import scormService from "../services/scormService";

export function useSessionTimer() {
  const sessionStartRef = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - sessionStartRef.current;
      const scormTime = msToScormTime(elapsed);

      // Salva tempo na sessão
      scormService.setValue("cmi.core.session_time", scormTime);
      scormService.commit();
    }, 5000); // Salva a cada 5 segundos

    return () => clearInterval(interval);
  }, []);
}

function msToScormTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
```

### 3. Componente de Rastreamento

```javascript
// src/components/ScormProgressTracker.jsx
import { useEffect } from "react";
import { useProgressionStore } from "../store/progressionStore";
import { useScorm } from "../hooks/useScorm";
import scormService from "../services/scormService";

export function ScormProgressTracker({ children }) {
  const { reportProgress, completeLesson } = useScorm();
  const { currentPage, score, completedModules, saveProgress } =
    useProgressionStore();

  // Salva progresso a cada mudança
  useEffect(() => {
    saveProgress();
  }, [currentPage, score, completedModules]);

  // Salva ao sair da página
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveProgress();

      // Determina status final
      const allModulesCompleted = completedModules.length >= TOTAL_MODULES;
      if (allModulesCompleted && score >= 80) {
        completeLesson(score, true); // Passou
      } else if (allModulesCompleted) {
        completeLesson(score, false); // Não passou
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [score, completedModules]);

  return children;
}
```

### 4. Hook para Rastreamento de Quiz

```javascript
// src/hooks/useQuizTracking.js
import { useEffect } from "react";
import { useProgressionStore } from "../store/progressionStore";
import scormService from "../services/scormService";

export function useQuizTracking(quizId, totalQuestions) {
  const { updateScore } = useProgressionStore();

  const submitQuiz = (answers) => {
    let correctAnswers = 0;

    answers.forEach((answer, index) => {
      if (answer.isCorrect) {
        correctAnswers++;
      }
    });

    const percentage = (correctAnswers / totalQuestions) * 100;
    const score = Math.round(percentage);

    // Atualiza score
    updateScore(score);

    // Registra no SCORM
    scormService.setScore(score);
    scormService.setLessonStatus(score >= 80 ? "passed" : "failed");
    scormService.commit();

    return {
      score,
      correct: correctAnswers,
      passed: score >= 80,
    };
  };

  return { submitQuiz };
}
```

### 5. Restaurar Progresso ao Voltar

```javascript
// Em seu App.jsx ou Root Component
useEffect(() => {
  const scorm = useScorm();
  const { loadProgress } = useProgressionStore();

  if (scorm.isInitialized) {
    // Tenta restaurar progresso anterior
    const loaded = loadProgress();
    if (loaded) {
      console.log("✅ Progresso restaurado");
    }
  }
}, []);
```

### Fluxo Completo de Tracking

```
1. Inicialização
   ↓
   useScorm Hook → LMSInitialize → define isInitialized

2. Carregamento de Progresso
   ↓
   progressionStore.loadProgress() → lê suspend_data

3. Durante Aula
   ↓
   Usuário navega → updateMaxReached() → salva no SCORM

4. Quiz
   ↓
   submitQuiz() → calcula score → updateScore() → setScore no SCORM

5. Timing
   ↓
   useSessionTimer() → conta tempo → session_time no SCORM

6. Salvamento Periódico (a cada 30s)
   ↓
   saveProgress() → suspend_data + commit()

7. Ao Sair
   ↓
   window.beforeunload → completeLesson() → status final

8. Próxima Vez
   ↓
   loadProgress() → restaura tudo do suspend_data
```

---

## 🎨 Arquitetura Recomendada

### Estrutura de Pastas

```
src/
├── components/         # Componentes reutilizáveis
├── pages/             # Páginas/telas do curso
├── contexts/          # React Contexts
├── hooks/             # Custom hooks
├── services/          # SCORM service, APIs
├── store/             # Zustand stores
├── styles/            # Styled components globais
├── types/             # TypeScript types
├── utils/             # Funções auxiliares
└── data/              # Dados estáticos do curso
```

### Stores Zustand Essenciais

1. **navigationStore** - Controle de navegação/rotas
2. **progressionStore** - Progresso do aluno
3. **quizScoresStore** - Pontuações de quizzes
4. **timerStore** - Tempo de sessão

---

## 🚨 Problemas Comuns e Soluções

### 1. **API SCORM não encontrada**

**Problema:** `window.API` não existe  
**Solução:** Buscar recursivamente em `window.parent` até 500 níveis

```javascript
while (!api && win.parent && win.parent !== win && attempts < 500) {
  if (win.API) api = win.API;
  win = win.parent;
  attempts++;
}
```

### 2. **Paths absolutos quebram no LMS**

**Problema:** Assets não carregam (caminhos começam com `/`)  
**Solução:** Sempre usar `base: "./"` no Vite config

### 3. **Nomes de arquivo com hash**

**Problema:** Manifest aponta para `main.js` mas build gera `main.a1b2c3.js`  
**Solução:** Desabilitar hash nos outputs do Vite

```javascript
output: {
  entryFileNames: "assets/[name].js",  // Sem [hash]
  chunkFileNames: "assets/[name].js",
  assetFileNames: "assets/[name].[ext]"
}
```

### 4. **Progresso não salva entre sessões**

**Problema:** Dados se perdem ao fechar o curso  
**Solução:** Sempre fazer `LMSCommit("")` após cada `LMSSetValue()`

```javascript
setValue(key, value) {
  api.LMSSetValue(key, value);
  api.LMSCommit("");  // ← CRÍTICO
}
```

### 5. **Tempo de sessão incorreto**

**Problema:** SCORM exige formato específico (`HH:MM:SS`)  
**Solução:** Converter milissegundos

```javascript
function msToScormTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
```

### 6. **React Router não funciona no LMS**

**Problema:** Navegação quebra em ambiente SCORM  
**Solução:** Usar `HashRouter` ao invés de `BrowserRouter`

```javascript
import { HashRouter } from "react-router-dom";

// No main.jsx
<HashRouter>
  <App />
</HashRouter>;
```

### 7. **Fontes customizadas não carregam**

**Problema:** `@font-face` com paths absolutos  
**Solução:** Usar paths relativos ou copiar fontes para `public/fonts`

```css
@font-face {
  font-family: "MinhaFonte";
  src: url("./fonts/fonte.woff2") format("woff2"); /* Path relativo */
}
```

### 8. **Imagens grandes travam o load**

**Problema:** Muitas imagens pesadas  
**Solução:** Lazy loading + componente de loading

```javascript
// hooks/useImageLoader.ts
export function useImageLoader(imageSrc) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => setLoaded(true);
  }, [imageSrc]);

  return loaded;
}
```

### 9. **ESLint flat config**

**Problema:** Nova sintaxe do ESLint 9+  
**Solução:** Usar `defineConfig` com globalIgnores

```javascript
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  // ... resto da config
]);
```

### 10. **TypeScript + JavaScript misturados**

**Problema:** Conflitos de tipos  
**Solução:** Criar `vite-env.d.ts` e usar JSDoc quando necessário

```typescript
// vite-env.d.ts
/// <reference types="vite/client" />
```

### 11. **Tracking de Progresso Incompleto**

**Problema:** Dados de progresso se perdem ou não sincronizam com LMS  
**Solução:** Implementar sistema robusto com Zustand + SCORM Service

```javascript
// Salvar periodicamente
useEffect(() => {
  const interval = setInterval(() => {
    progressionStore.saveProgress();
    scormService.commit(); // Confirma a cada salvamento
  }, 30000); // A cada 30 segundos

  return () => clearInterval(interval);
}, []);

// Salvar antes de sair
window.addEventListener("beforeunload", () => {
  progressionStore.saveProgress();
  scormService.commit(); // CRÍTICO
});
```

### 12. **Progresso não Restaura ao Voltar**

**Problema:** Aluno sai do curso e volta, mas estado foi perdido  
**Solução:** Usar `suspend_data` para guardar estado completo

```javascript
// Ao inicializar
const suspendData = scormService.getSuspendData();
if (suspendData) {
  const state = JSON.parse(suspendData);
  progressionStore.setState(state); // Restaura tudo
}

// Ao sair
const fullState = {
  maxReached: store.maxReached,
  currentPage: store.currentPage,
  score: store.score,
  completedModules: store.completedModules,
  timestamp: new Date().toISOString(),
};
scormService.setSuspendData(JSON.stringify(fullState));
scormService.commit();
```

### 13. **Múltiplas Tentativas de Quiz**

**Problema:** Aluno pode fazer quiz várias vezes, qual score registra?  
**Solução:** Registrar sempre o maior score

```javascript
const submitQuiz = (answers) => {
  const newScore = calculateScore(answers);
  const previousScore = scormService.getScore();
  const finalScore = Math.max(newScore, previousScore);

  scormService.setScore(finalScore);
  scormService.commit();

  return finalScore;
};
```

### 14. **Tracking Sem LMS (Desenvolvimento)**

**Problema:** Em dev local, não há API SCORM  
**Solução:** Implementar fallback com localStorage

```javascript
const scormService = {
  setScore: (score) => {
    if (window.API) {
      window.API.LMSSetValue("cmi.core.score.raw", score);
    } else {
      // Fallback para desenvolvimento
      localStorage.setItem("scorm_score", score);
    }
  },

  getScore: () => {
    if (window.API) {
      return parseInt(window.API.LMSGetValue("cmi.core.score.raw"));
    } else {
      return parseInt(localStorage.getItem("scorm_score") || 0);
    }
  },
};
```

---

## 🔍 Troubleshooting de Tracking

### Debug: Ver o que está sendo salvo

```javascript
// Adicione isso no scormService para debugging
const originalSetValue = window.API?.LMSSetValue;
if (window.API) {
  window.API.LMSSetValue = function (key, value) {
    console.log(`📤 SCORM SetValue: ${key} = ${value}`);
    return originalSetValue.call(this, key, value);
  };
}

const originalGetValue = window.API?.LMSGetValue;
if (window.API) {
  window.API.LMSGetValue = function (key) {
    const value = originalGetValue.call(this, key);
    console.log(`📥 SCORM GetValue: ${key} = ${value}`);
    return value;
  };
}
```

### Verificar suspend_data no LMS

```javascript
// Em App.jsx ou componente raiz
useEffect(() => {
  const suspendData = scormService.getSuspendData();
  console.table(JSON.parse(suspendData || "{}"));
}, []);
```

### Validar Score

```javascript
// Score deve estar sempre entre 0-100
const validateScore = (score) => {
  if (score < 0) return 0;
  if (score > 100) return 100;
  return Math.round(score);
};

// Use sempre
scormService.setScore(validateScore(newScore));
```

### Validar Status

```javascript
// Status deve ser um desses
const validStatus = ["passed", "failed", "incomplete", "browsed"];
const setStatus = (status) => {
  if (!validStatus.includes(status)) {
    console.warn(`Status inválido: ${status}. Usando 'incomplete'`);
    scormService.setLessonStatus("incomplete");
  } else {
    scormService.setLessonStatus(status);
  }
};
```

### Verificar Commit

```javascript
// Se commit falhar, check o error
const commit = () => {
  const result = window.API.LMSCommit("");
  if (result !== "true") {
    const error = window.API.LMSGetLastError();
    console.error(`Erro no commit: ${error}`);
    return false;
  }
  return true;
};
```

### Logs para Production

```javascript
// Crie um hook para logging
export function useScormLogging() {
  useEffect(() => {
    const logs = [];

    const logEvent = (event, data) => {
      const logEntry = {
        timestamp: new Date().toISOString(),
        event,
        data,
        url: window.location.href,
      };
      logs.push(logEntry);

      // Salva no suspend_data para análise posterior
      const suspendData = JSON.parse(scormService.getSuspendData() || "{}");
      suspendData.logs = logs.slice(-50); // Últimos 50 logs
      scormService.setSuspendData(JSON.stringify(suspendData));
      scormService.commit();
    };

    window.logScormEvent = logEvent;
  }, []);
}

// Use assim
logScormEvent("quiz_submitted", { score: 85, module: "quiz1" });
```

---

## 📦 Checklist de Build SCORM

Antes de fazer upload no LMS:

### Configuração Técnica

- [ ] `base: "./"` no vite.config.js
- [ ] Nomes de arquivo sem hash
- [ ] imsmanifest.xml válido
- [ ] Todas as referências de arquivo no manifest corretas
- [ ] SCORM service implementado e testado
- [ ] HashRouter configurado (não BrowserRouter)
- [ ] Paths relativos em todos os assets
- [ ] Testado localmente com `npm run preview`
- [ ] ZIP gerado com estrutura correta (index.html na raiz)

### Tracking de Progresso

- [ ] useScorm hook implementado
- [ ] progressionStore (Zustand) criado
- [ ] ScormProgressTracker componente envolvendo app
- [ ] useSessionTimer rastreando tempo
- [ ] useQuizTracking para quizzes
- [ ] LMSCommit após cada SetValue
- [ ] Salvamento periódico (a cada 30s)
- [ ] Restauração de suspend_data ao voltar
- [ ] Fallback para localStorage em dev

### Dados Sendo Salvos

- [ ] Score registrado (0-100)
- [ ] Lesson status (passed/failed/incomplete)
- [ ] Session time (HH:MM:SS)
- [ ] Progresso (maxReached, currentPage)
- [ ] Módulos completados
- [ ] Dados de quizzes salvos
- [ ] Timestamp de última atualização
- [ ] LMSFinish ao sair do curso

### Testes

- [ ] Testado em Moodle local ou SCORM Cloud
- [ ] Progresso salvou corretamente
- [ ] Pode retomar sem perder dados
- [ ] Score aparece no relatório LMS
- [ ] Múltiplas tentativas de quiz
- [ ] Tempo de sessão está correto
- [ ] Offline fallback funciona
- [ ] Navegador compatível (Chrome, Firefox, Safari)

---

## 🧪 Como Testar

### 1. **Desenvolvimento Local**

```bash
npm run dev
```

O SCORM service deve funcionar em modo "simulação" (sem LMS).

```javascript
// Em dev, checke o localStorage
window.localStorage.getItem("scorm_score");
window.localStorage.getItem("scorm_status");
window.localStorage.getItem("scorm_suspend_data");
```

### 2. **Build de Produção**

```bash
npm run build:scorm
```

Gera o arquivo `.zip` pronto para upload.

### 3. **Teste Local com Servidor**

```bash
npm run preview
```

Simula ambiente de produção. Ainda usa localStorage (sem LMS).

```javascript
// Abra console e monitore
window.setInterval(() => {
  console.log("Score:", localStorage.getItem("scorm_score"));
  console.log("Status:", localStorage.getItem("scorm_status"));
  console.log("Time:", localStorage.getItem("scorm_session_time"));
}, 5000);
```

### 4. **Teste em LMS Real**

#### SCORM Cloud (Recomendado para teste rápido)

1. Vá em https://cloud.scorm.com/
2. Crie conta (free trial)
3. Upload do ZIP
4. Inicie o curso
5. Abra Developer Tools → Console
6. Veja os logs de SCORM
7. Complete o curso
8. Volte ao dashboard e veja o progresso registrado

**O que verificar:**

- ✅ Score aparece no relatório
- ✅ Status mostra "Completed" ou "Passed"
- ✅ Tempo de sessão registrado
- ✅ Pode voltar e retomar

#### Moodle Local

```bash
# Instale Moodle (opcionalmente com Docker)
docker run -it -p 80:80 moodlerooms/moodle:latest
```

1. Crie um curso
2. Adicione atividade SCORM
3. Upload do ZIP
4. Adicione estudante
5. Acesse como estudante
6. Complete e volte
7. Veja em Relatórios → Progresso SCORM

### 5. **Teste de Progresso (Passo a Passo)**

```javascript
// Script para testar tracking
const testTracking = async () => {
  const scorm = useScorm();
  const { updateScore, saveProgress } = useProgressionStore();

  // 1. Inicia
  console.log("✓ Inicializado");

  // 2. Simula página 1
  await new Promise((r) => setTimeout(r, 1000));
  scorm.reportProgress(0, "incomplete");
  console.log("✓ Página 1 visitada");

  // 3. Simula página 2
  await new Promise((r) => setTimeout(r, 1000));
  scorm.reportProgress(25, "incomplete");
  console.log("✓ Página 2 visitada");

  // 4. Simula quiz
  await new Promise((r) => setTimeout(r, 1000));
  updateScore(85);
  saveProgress();
  console.log("✓ Quiz completo (85%)");

  // 5. Finaliza
  scorm.completeLesson(85, true);
  console.log("✓ Lição finalizada");
};

// Chame em console
testTracking();
```

### 6. **Teste de Restauração**

```javascript
// Teste ao voltar
const testRestore = async () => {
  // 1. Salve estado
  const { saveProgress } = useProgressionStore();
  saveProgress();
  console.log("✓ Estado salvo");

  // 2. Recarregue página
  window.location.reload();

  // 3. Verificar se restaurou (em outro useEffect)
  useEffect(() => {
    const { loadProgress, maxReached, score } = useProgressionStore();
    const loaded = loadProgress();
    if (loaded) {
      console.log(`✓ Restaurado: Página ${maxReached}, Score ${score}`);
    }
  }, []);
};
```

### 7. **Teste de Falha (Desconexão)**

```javascript
// Simule perda de conexão
const testFailure = () => {
  // Quebre API SCORM temporariamente
  window.API = null;

  // Tente salvar (deve usar fallback)
  scormService.setScore(75);

  // Verifique localStorage
  console.log("Fallback ativo:", localStorage.getItem("scorm_score"));

  // Restaure API
  window.API = originalAPI;

  // Sincronize quando voltar
  const score = localStorage.getItem("scorm_score");
  scormService.setScore(parseInt(score));
  scormService.commit();
};
```

---

## 💡 Dicas Finais

### Gerais

1. **Sempre salve o progresso** - Não confie apenas no `LMSFinish`, salve periodicamente
2. **Use Zustand para estados globais** - Muito mais simples que Context API
3. **Modularize componentes** - Cada "tela" deve ser um componente separado
4. **Styled Components** - Use para estilos específicos de componentes
5. **Global CSS** - Use para resets, variáveis CSS e estilos base
6. **Feedback visual** - Loading screens, transições suaves
7. **Responsive** - Teste em mobile também (muitos LMS mobile)
8. **Fallbacks** - Se SCORM falhar, app deve funcionar offline
9. **Console logs** - Em dev, mostre todos os LMSGetValue/SetValue

### Tracking Específico

10. **Timer de sessão** - Implemente e salve no SCORM a cada 5-30 segundos
11. **Suspend Data** - Use JSON para guardar estado completo, não apenas score
12. **Salvamento Automático** - Configure interval para salvar a cada 30 segundos
13. **Restauração ao Voltar** - Sempre carregue suspend_data na inicialização
14. **Múltiplas Tentativas** - Registre o MAIOR score, não o último
15. **Validação de Dados** - Score sempre 0-100, status sempre válido
16. **Logging para Debug** - Guarde logs no suspend_data para troubleshooting
17. **Fallback localStorage** - Sempre tenha fallback para quando SCORM não existir
18. **Sincronização** - Quando conexão voltar, sincronize dados locais com SCORM
19. **Finish Event** - Sempre chame LMSFinish ao sair, mesmo se falhar
20. **Testes Automatizados** - Teste restauração, múltiplas tentativas, offline

---

## 🔗 Recursos Úteis

- SCORM 1.2 Spec: https://scorm.com/scorm-explained/technical-scorm/scorm-12-overview-for-developers/
- SCORM Cloud (teste): https://cloud.scorm.com/
- Vite Docs: https://vite.dev/
- React Router: https://reactrouter.com/
- Styled Components: https://styled-components.com/
- Zustand: https://zustand-demo.pmnd.rs/

---

## ✅ Exemplo de Comando Completo para IA

```
Crie um projeto SCORM 1.2 com Vite + React 19 + Styled Components + Zustand.

Estrutura:
- src/services/scormService.js (com findScormAPI, initialize, getValue, setValue, commit, finish)
- src/hooks/useScorm.js (React hook para SCORM)
- src/hooks/useSessionTimer.js (tracking automático de tempo)
- src/hooks/useQuizTracking.js (tracking de quizzes)
- src/store/progressionStore.jsx (Zustand para progresso completo)
- src/components/ScormProgressTracker.jsx (wrapper para rastreamento)
- src/pages/ (páginas do curso)
- public/imsmanifest.xml (SCORM 1.2 manifest)
- scripts/create-scorm-package.cjs (gera ZIP)

Configurações:
- vite.config.js com base: "./" e nomes de arquivo sem hash
- React Router com HashRouter
- ESLint flat config
- Scripts: dev, build, build:scorm

Funcionalidades:
- Tracking robusto com Zustand
- Salvamento automático a cada 30s
- Restauração de suspend_data ao voltar
- Sistema de quiz com pontuação
- Timer de sessão (HH:MM:SS)
- Loading screens
- Navegação com roadmap visual
- Fallback para localStorage
- Logging para debug
- Sincronização automática

Estrutura de Tracking:
- scormService: API base com fallback
- useScorm: Hook inicialização + helpers
- progressionStore: Estado global com save/load
- useSessionTimer: Rastreamento de tempo
- useQuizTracking: Scoring de quizzes
- ScormProgressTracker: Componente wrapper

Todos os paths devem ser relativos, commits automáticos no SCORM, e HashRouter para navegação.
```

---

## 📊 Diagrama de Fluxo de Tracking

```
┌─────────────────────────────────────────────────────────────┐
│                  SCORM Service Layer                        │
│  (API SCORM ou localStorage em fallback)                   │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────▼─────┐   ┌────▼─────┐   ┌────▼──────┐
    │ useScorm │   │useSession │   │useQuiz    │
    │          │   │ Timer     │   │ Tracking  │
    └────┬─────┘   └────┬──────┘   └────┬──────┘
         │              │               │
         └──────────────┼───────────────┘
                        │
         ┌──────────────▼──────────────┐
         │ progressionStore (Zustand)  │
         │ - maxReached                │
         │ - currentPage               │
         │ - score                     │
         │ - completedModules          │
         │ - sessionTime               │
         └──────────────┬──────────────┘
                        │
         ┌──────────────▼──────────────┐
         │ ScormProgressTracker        │
         │ - Salva a cada 30s          │
         │ - Monitora mudanças         │
         │ - Finaliza ao sair          │
         └──────────────┬──────────────┘
                        │
    ┌───────────────────┼───────────────────┐
    │                   │                   │
┌───▼──────┐   ┌──────▼─────┐   ┌─────▼──────┐
│ LMS Cloud│   │ Moodle     │   │ localStorage│
│ (SCORM)  │   │ (SCORM)    │   │ (Fallback)  │
└──────────┘   └────────────┘   └─────────────┘

Fluxo de Dados:
1. Usuário navega → updateMaxReached() → progressionStore
2. progressionStore → Zustand dispara updates
3. ScormProgressTracker monitora e salva periodicamente
4. saveProgress() → suspend_data + score + status
5. SCORM Service → LMSSetValue + LMSCommit
6. Ao voltar → loadProgress() → restaura tudo

Fallback:
- Se SCORM não existir → localStorage
- Se localStorage falhar → memory only
- Sincroniza automaticamente quando SCORM volta
```

---

**🎓 Boa sorte com seu projeto SCORM!**

Documentação criada com base em experiências reais com o projeto Vibra Motos, incluindo todos os desafios e soluções implementadas.
