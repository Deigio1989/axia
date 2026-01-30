# 🎨 Sistema de Design - Axia Energia

Documentação do sistema de design componentizado e organizado do projeto SCORM Axia Energia.

## 📦 Estrutura de Componentes

### Componentes Reutilizáveis

#### `<GlassCard>`

Card com efeito glassmorphism e forma octogonal.

**Props:**

- `$padding` - Padding interno (default: "3rem 4rem")
- `$width` - Largura (default: "fit-content")
- `$direction` - Direção do flex (default: "column")
- `$align` - Alinhamento (default: "center")
- `$gap` - Espaçamento entre filhos (default: "2rem")
- `$cornerSize` - Tamanho das diagonais do octógono (default: "1.5rem")
- `$size` - Variação de tamanho: "small" | "medium" | "large"

**Uso:**

```jsx
import { GlassCard } from "@/components";

<GlassCard $size="large" $gap="3rem">
  <p>Conteúdo aqui</p>
</GlassCard>;
```

---

#### `<ActionButton>`

Botão de ação com estados disabled e pressed.

**Props:**

- `disabled` - Desabilita o botão
- `$size` - Tamanho: "small" (60px) | "medium" (75px) | "large" (100px)
- `$textSize` - Tamanho do texto (default: "1.2rem")
- `$marginTop` - Margem superior (default: "1rem")
- `onClick` - Função de callback

**Uso:**

```jsx
import { ActionButton } from "@/components";

<ActionButton onClick={handleClick} disabled={!canProceed} $size="medium">
  <img src="/images/button.png" alt="" />
  <span>AVANÇAR</span>
</ActionButton>;
```

---

#### `<TitleBanner>`

Banner de título com imagem de fundo e texto centralizado.

**Props:**

- `$width` - Largura da imagem (default: "350px")
- `$height` - Altura da imagem (default: "auto")
- `$textSize` - Tamanho do texto (default: "1.2rem")

**Uso:**

```jsx
import { TitleBanner } from "@/components";

<TitleBanner $width="400px">
  <img src="/images/banner.png" alt="" />
  <p>DIGITE SEU NOME</p>
</TitleBanner>;
```

---

#### `<GlassInput>`

Input com efeito glassmorphism.

**Props:**

- `$padding` - Padding interno (default: "1rem 1.5rem")
- `$fontSize` - Tamanho da fonte (default: "1.2rem")
- `$textAlign` - Alinhamento do texto (default: "center")
- `$width` - Largura (default: "auto")
- Todas as props padrão de `<input>`

**Uso:**

```jsx
import { GlassInput } from "@/components";

<GlassInput
  type="text"
  placeholder="Digite seu nome..."
  value={name}
  onChange={(e) => setName(e.target.value)}
  maxLength={20}
/>;
```

---

#### `<Avatar>`

Componente de avatar com círculo de fundo e rosto.

**Props:**

- `type` - "M" ou "H" (Masculino ou Feminino)
- `size` - "small" (60%) | "medium" (100%) | "large" (140%)
- `selected` - Boolean para animação de seleção
- `selectionScreen` - Boolean para ativar hover e animações (apenas na tela de seleção)
- `onClick` - Função de callback

**Uso:**

```jsx
import { Avatar } from "@/components";

<Avatar
  type="M"
  size="medium"
  selected={selectedAvatar === "M"}
  selectionScreen={true}
  onClick={() => setSelectedAvatar("M")}
/>;
```

---

## 🎨 Sistema de Cores

### Azuis Primários (Arroxeados - Tema Sci-Fi)

```css
--color-primary-deep: #0015ff --color-primary-dark: #0036cc
  --color-primary-medium: #1d33d8 --color-primary-light: #0099ff
  --color-primary-cyan: #00c8ff;
```

### Roxos/Violetas

```css
--color-purple-deep: rgba(43, 0, 255, 0.8)
  --color-purple-medium: rgba(0, 34, 255, 0.8)
  --color-purple-light: rgba(0, 55, 255, 0.4)
  --color-purple-glow: rgba(0, 115, 255, 0.6);
```

### Ciano/Azuis Claros

```css
--color-cyan-bright: rgba(152, 182, 255, 0.4)
  --color-cyan-medium: rgba(99, 133, 255, 0.8)
  --color-cyan-glow: rgba(0, 200, 255, 0.6)
  --color-cyan-soft: rgba(0, 200, 255, 0.3);
```

---

## 📝 Tipografia

### Fontes

```css
--font-family-regular: "DM Sans Regular" --font-family-bold: "DM Sans Bold"
  --font-family-extrabold: "DM Sans ExtraBold";
```

### Tamanhos

```css
--font-size-xs: 0.75rem (12px) --font-size-sm: 0.875rem (14px)
  --font-size-md: 1rem (16px) --font-size-lg: 1.125rem (18px)
  --font-size-xl: 1.25rem (20px) --font-size-2xl: 1.5rem (24px)
  --font-size-3xl: 1.875rem (30px) --font-size-4xl: 2.25rem (36px);
```

---

## 🎭 Animações

### Importação

```jsx
import { Lightpulse, Globepulse, slideInFromTop, fadeIn } from "@/styles";
```

### Disponíveis

- `Lightpulse` - Pulso de luz (box-shadow)
- `Globepulse` - Pulso de escala
- `Buttonpulse` - Pulso de botão
- `GlowPulse(scale)` - Pulso de glow customizável
- `glowPulseAvatar` - Pulso específico para avatares
- `slideInFromTop` - Slide fade de cima
- `slideOutToLeft` - Slide fade para esquerda
- `slideInFromRight` - Slide fade da direita
- `fadeIn/fadeOut` - Fade simples
- `expandContainer` - Expansão horizontal
- `bounce/shake/rotate/pulse` - Micro-animações

---

## 📐 Espaçamentos

```css
--spacing-xs: 0.25rem (4px) --spacing-sm: 0.5rem (8px) --spacing-md: 1rem (16px)
  --spacing-lg: 1.5rem (24px) --spacing-xl: 2rem (32px) --spacing-2xl: 3rem
  (48px) --spacing-3xl: 4rem (64px);
```

---

## 🔄 Transições

```css
--transition-fast: 0.2s ease --transition-normal: 0.3s ease
  --transition-slow: 0.5s ease --transition-very-slow: 0.8s ease;
```

---

## 🌟 Efeitos

### Backdrop Blur

```css
--backdrop-blur-light: blur(2px) --backdrop-blur-medium: blur(5px)
  --backdrop-blur-strong: blur(10px);
```

### Glow Scale

```css
--glow-scale: 1.5;
```

---

## 📦 Importações Centralizadas

### Componentes

```jsx
// Importação individual
import { GlassCard, ActionButton, Avatar } from "@/components";

// Ou tudo de uma vez
import * as Components from "@/components";
```

### Estilos

```jsx
// Importação individual
import { colors, fonts, animations } from "@/styles";

// Ou tema completo
import theme from "@/styles/theme";
```

---

## 🎯 Padrões de Uso

### Glass Effect Pattern

```jsx
<GlassCard $size="medium" $gap="2rem">
  <TitleBanner>
    <img src="/images/title.png" alt="" />
    <p>TÍTULO</p>
  </TitleBanner>

  <GlassInput
    placeholder="Digite aqui..."
    value={value}
    onChange={handleChange}
  />

  <ActionButton onClick={handleSubmit}>
    <img src="/images/button.png" alt="" />
    <span>AVANÇAR</span>
  </ActionButton>
</GlassCard>
```

### Avatar Selection Pattern

```jsx
<div className="avatars">
  <Avatar
    type="M"
    size="medium"
    selected={selected === "M"}
    selectionScreen={true}
    onClick={() => setSelected("M")}
  />
  <Avatar
    type="H"
    size="medium"
    selected={selected === "H"}
    selectionScreen={true}
    onClick={() => setSelected("H")}
  />
</div>
```

---

## 🔧 Utilitários

### Shapes (clip-path)

```jsx
import { shapes } from '@/styles/theme';

// Octógono customizável
clip-path: ${shapes.octagon("2rem")}; // cantos de 2rem
```

---

## 📝 Notas Importantes

1. **Props Transientes**: Use prefixo `$` em props do styled-components que não devem ir para o DOM
2. **Fontes**: As 3 fontes DM Sans estão em `/public/fonts`
3. **Cores**: Mantido o esquema azul arroxeado sci-fi do projeto original
4. **Isolamento**: Componentes usam `isolation: isolate` para evitar vazamento de filtros
5. **Animações**: Todas centralizadas em `/src/styles/animations.js`

---

Desenvolvido com ⚡ para Axia Energia
