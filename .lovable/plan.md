

# Diagnóstico Automotivo Inteligente

Uma aplicação web moderna e imersiva para diagnóstico automotivo usando IA simulada, com visualização interativa de veículos e interface profissional dark mode.

## 🎨 Design & Tema

**Paleta de Cores:**
- Background principal: Slate 950 (#020617)
- Cards e painéis: Slate 900/800 com bordas sutis
- Destaque primário: Cyan neon (#06B6D4 / #22D3EE)
- Alertas: Vermelho/Laranja para zonas de problema
- Texto: Slate 100/200 para legibilidade

**Estilo Visual:**
- Gradientes sutis com efeito glassmorphism
- Animações fluidas e transições suaves
- Ícones Lucide para consistência
- Tipografia moderna e técnica

---

## 📐 Layout do Dashboard

### Seção 1: Painel de Entrada (Esquerda - ~25% largura)

- **Campo de Sintoma**: Textarea grande com placeholder descritivo
- **Botão "Analisar Sintoma"**: Estilo neon com efeito glow ao hover
- **Caixa de Processamento IA**:
  - Estado inicial: Mensagem "Aguardando entrada..."
  - Estado processando: Animação de loading com pulso
  - Estado completo: JSON formatado mostrando o prompt estruturado

### Seção 2: Visualizador de Veículo (Centro - ~45% largura)

- **Modelo SVG Interativo**: Vista lateral do carro estilo "raio-X"
- **Zonas Clicáveis**:
  - Motor/Capô
  - Suspensão Dianteira
  - Sistema de Freios
  - Escapamento
  - Suspensão Traseira
- **Efeitos de Destaque**: Animação de pulso/brilho nas áreas problemáticas
- **Indicadores visuais**: Linhas conectando zonas ao diagnóstico

### Seção 3: Resultado do Diagnóstico (Direita - ~30% largura)

- **Card de Diagnóstico Principal**:
  - Ícone de alerta
  - Nome da falha provável
  - Nível de urgência (badge colorido)
  - Descrição técnica
  
- **Card de Peça em Detalhe**:
  - Imagem placeholder da peça
  - Nome técnico
  - Função no veículo
  - Sintomas associados

- **Ação Recomendada**:
  - Passos numerados para reparo
  - Estimativa de complexidade
  - Ferramentas necessárias

---

## ⚙️ Lógica de Mock Data

**Mapeamento de Palavras-chave:**

| Palavras-chave | Zona Destacada | Peça | Diagnóstico |
|----------------|----------------|------|-------------|
| "freio", "frear", "pedal" | Rodas/Freios | Pastilha de Freio | Desgaste das pastilhas |
| "motor", "aquecendo", "temperatura" | Capô/Motor | Radiador/Bomba d'água | Superaquecimento |
| "barulho", "suspensão", "buraco", "batida" | Suspensão Dianteira | Amortecedor/Bieleta | Desgaste da suspensão |
| "escapamento", "fumaça", "ronco" | Traseira | Catalisador | Problema no escapamento |

---

## 🧩 Componentes a Criar

1. **DiagnosticDashboard** - Container principal do layout
2. **SymptomInput** - Painel de entrada com processamento IA
3. **VehicleViewer** - SVG interativo do veículo
4. **DiagnosisResult** - Cards de resultado e detalhes
5. **LoadingAnimation** - Componente de loading estilizado
6. **PartDetailCard** - Card com zoom da peça

---

## ✨ Animações & Interações

- Transição suave ao processar diagnóstico
- Pulso de neon nas zonas problemáticas
- Fade-in dos resultados
- Hover effects em todas as áreas clicáveis
- Loading com efeito "scan" tecnológico

---

## 📱 Responsividade

- **Desktop**: Layout 3 colunas lado a lado
- **Tablet**: Visualizador em cima, painéis embaixo
- **Mobile**: Stack vertical com scroll suave

