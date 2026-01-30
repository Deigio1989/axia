# 🌌 Guia de Transições de Página - AXIA Energia

## 📖 Visão Geral

Sistema de transições de página sci-fi para navegação SPA com **6 tipos diferentes** de animações, totalmente customizáveis via props.

## 🎨 Tipos de Transição Disponíveis

### 1. **fadeGlow** (Padrão Recomendado) ⭐

Efeito holográfico sci-fi com brilho e sombra azul.

```jsx
<PageTransition type="fadeGlow" duration={700}>
  <Routes>...</Routes>
</PageTransition>
```

**Características:**

- Brightness variation (0.8 → 1.2)
- Blue drop-shadow (0px 0px 20px #00c8ff)
- Opacidade suave
- **Ideal para**: Navegação principal, efeito futurístico

---

### 2. **fade** (Simples)

Fade in/out clássico, sem efeitos adicionais.

```jsx
<PageTransition type="fade" duration={500}>
  <Routes>...</Routes>
</PageTransition>
```

**Características:**

- Apenas opacidade (0 → 1)
- Mais rápido e discreto
- **Ideal para**: Transições sutis, conteúdo informativo

---

### 3. **fadeScale** (Efeito Portal)

Combina fade com zoom, como se a página surgisse de um portal.

```jsx
<PageTransition type="fadeScale" duration={800}>
  <Routes>...</Routes>
</PageTransition>
```

**Características:**

- Opacidade + scale (0.95 → 1)
- Efeito de profundidade
- **Ideal para**: Mudanças contextuais importantes, telas de resultados

---

### 4. **slideLeft** (Painel Deslizante)

Slide da direita para esquerda, como painéis sci-fi.

```jsx
<PageTransition type="slideLeft" duration={600}>
  <Routes>...</Routes>
</PageTransition>
```

**Características:**

- translateX (100px → 0)
- Opacidade simultânea
- **Ideal para**: Navegação sequencial (próximo passo), avanço linear

---

### 5. **slideRight** (Painel Reverso)

Slide da esquerda para direita, retorno.

```jsx
<PageTransition type="slideRight" duration={600}>
  <Routes>...</Routes>
</PageTransition>
```

**Características:**

- translateX (-100px → 0)
- Opacidade simultânea
- **Ideal para**: Voltar, navegação reversa

---

### 6. **wipeHorizontal** (Scanner Sci-Fi)

Efeito de scanner com clip-path e gradiente overlay.

```jsx
<PageTransition type="wipeHorizontal" duration={900}>
  <Routes>...</Routes>
</PageTransition>
```

**Características:**

- Clip-path animado (0% → 100%)
- Gradiente azul overlay (rgba(0, 200, 255, 0.3))
- Efeito de revelação
- **Ideal para**: Momentos dramáticos, telas de loading/reveal

---

## 🛠 Como Usar

### Uso Básico (App.jsx)

```jsx
import PageTransition from "./components/PageTransition";

function App() {
  return (
    <PageTransition type="fadeGlow" duration={700}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/avatar" element={<AvatarSelection />} />
      </Routes>
    </PageTransition>
  );
}
```

### Props Disponíveis

| Prop       | Tipo         | Padrão       | Descrição                    |
| ---------- | ------------ | ------------ | ---------------------------- |
| `type`     | `string`     | `"fadeGlow"` | Tipo de transição (6 opções) |
| `duration` | `number`     | `700`        | Duração em milissegundos     |
| `children` | `React.Node` | -            | Conteúdo a ser animado       |

---

## 🎯 Recomendações de Uso por Contexto

| Contexto                    | Transição Recomendada | Duração | Motivo                         |
| --------------------------- | --------------------- | ------- | ------------------------------ |
| **Navegação Principal**     | `fadeGlow`            | 700ms   | Mantém tema sci-fi holográfico |
| **Avanço Linear (Próximo)** | `slideLeft`           | 600ms   | Indica progressão              |
| **Voltar (Retroceder)**     | `slideRight`          | 600ms   | Indica retorno                 |
| **Modal/Overlay**           | `fadeScale`           | 500ms   | Cria profundidade              |
| **Telas de Resultado**      | `wipeHorizontal`      | 900ms   | Momento dramático              |
| **Conteúdo Informativo**    | `fade`                | 400ms   | Discreta, não distrai          |

---

## 🔧 Personalização Avançada

### Mudar Transição Dinamicamente

Se precisar mudar o tipo de transição baseado em alguma lógica:

```jsx
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  // Exemplo: slideLeft para frente, slideRight para trás
  const getTransitionType = () => {
    // Lógica customizada aqui
    return location.state?.direction === "back" ? "slideRight" : "slideLeft";
  };

  return (
    <PageTransition type={getTransitionType()} duration={600}>
      <Routes>...</Routes>
    </PageTransition>
  );
}
```

### Ajustar Timing para Mobile

```jsx
// Detectar mobile e reduzir duração
const isMobile = window.innerWidth < 768;
const duration = isMobile ? 400 : 700;

<PageTransition type="fadeGlow" duration={duration}>
  <Routes>...</Routes>
</PageTransition>;
```

---

## 🎬 Detalhes Técnicos

### Como Funciona

1. **useLocation** detecta mudanças de rota
2. **useEffect** dispara transição de saída (fadeOut)
3. Após `duration/2`, muda para fadeIn
4. **TransitionWrapper** aplica animações CSS via styled-components

### Performance

- **0 dependências externas** (Framer Motion seria +60KB)
- **GPU-accelerated** (transform, opacity)
- **Will-change** aplicado automaticamente
- **Não bloqueia** interação do usuário

### Compatibilidade SCORM

- ✅ Funciona com HashRouter
- ✅ Não interfere com SCORM API
- ✅ Bundle size mínimo

---

## 📦 Estrutura de Arquivos

```
src/components/PageTransition/
├── index.jsx          # Lógica do componente
├── styles.jsx         # Todas as animações
```

---

## 🐛 Troubleshooting

### Transição não acontece

- Verifique se `<PageTransition>` está **fora** do `<Routes>`, não dentro
- Confirme que está usando `react-router-dom` v6+

### Transição muito lenta/rápida

- Ajuste a prop `duration` (valores típicos: 400-900ms)

### Efeito "piscando"

- Aumente o `duration` (mínimo 400ms recomendado)
- Verifique se não há conflito com outras animações CSS

---

## 🚀 Exemplos Práticos

### Exemplo 1: Navegação Linear (Quiz)

```jsx
<PageTransition type="slideLeft" duration={500}>
  <Routes>
    <Route path="/question-1" element={<Question1 />} />
    <Route path="/question-2" element={<Question2 />} />
  </Routes>
</PageTransition>
```

### Exemplo 2: Tela de Resultados Dramática

```jsx
<PageTransition type="wipeHorizontal" duration={1000}>
  <Routes>
    <Route path="/results" element={<ResultsPage />} />
  </Routes>
</PageTransition>
```

### Exemplo 3: Modal Overlay

```jsx
<PageTransition type="fadeScale" duration={400}>
  <Routes>
    <Route path="/profile" element={<ProfileModal />} />
  </Routes>
</PageTransition>
```

---

## 🎨 Preview Visual

```
fadeGlow:     ✨ [brilho azul] → conteúdo → [brilho azul] ✨
fade:         ⚪ → conteúdo → ⚪
fadeScale:    🔵 (pequeno) → conteúdo → 🔵 (pequeno)
slideLeft:    ➡️ [desliza] conteúdo [desliza] ⬅️
slideRight:   ⬅️ [desliza] conteúdo [desliza] ➡️
wipeHorizontal: 🔦 [scanner azul revela] conteúdo
```

---

## 📝 Notas

- **fadeGlow** é o padrão e mais alinhado ao tema sci-fi
- Todas as transições usam `easing: ease-in-out`
- Timing é split 50/50 (fadeOut → fadeIn)
- Keyframes definidos em `styles.jsx`

---

**Criado para**: AXIA Energia - SCORM 1.2 Training  
**Design System**: DM Sans + Glassmorphism + Sci-Fi Blue  
**Última atualização**: 2024
