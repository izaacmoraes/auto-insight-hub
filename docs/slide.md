---
marp: true
theme: gaia
paginate: true
backgroundColor: #ffffff
---

# AutoDiagnostic AI
## Assistente de Diagnóstico de Falhas Veiculares por Linguagem Natural

![bg right:50%](image.png)

---

# Resumo do projeto
- Aplicação web para diagnóstico veicular assistido por IA.
- Usuário descreve um sintoma em linguagem natural.
- Sistema retorna falha provável, urgência, zona afetada e ações recomendadas.
- Integração com Supabase Edge Function (`diagnose`) e fallback local.

---

# Funcionalidades (Resumo)
- Entrada de sintomas com validação e atalho `Ctrl+Enter`.
- Diagnóstico via IA + thread de conversa.
- Fallback local por palavras-chave.
- Visualização do veículo com zonas clicáveis.
- Pipeline de processamento com etapas visuais.
- Cartões de resultado com urgência, peça e ação recomendada.

---

# Tela do Projeto
![bg 75%](image.png)

---

# Ferramentas utilizadas
- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui (Radix)
- Supabase (Edge Function + client SDK)
- Lovable (protótipo inicial)
- Codex (ajustes e documentação)
- Vitest (estrutura de testes)

---

# Casos de teste

**Caminho feliz**
- Entrada: "barulho ao frear e chiado"
- Esperado:
  - Zona: freios
  - Resultado com urgência alta
  - Peça e passos recomendados exibidos

---

# Casos de teste

**Tentando quebrar**
- Entrada: string vazia / apenas espaços
- Esperado:
  - Validação bloqueia envio
  - Toast de erro: campo obrigatório

---

# Prompts (exemplos) e outputs

**Prompt 1**
```
Crie um sistema de diagnóstico veicular assistido por IA.
Requisitos: entrada em linguagem natural, resultado com urgência,
visualização de zona do veículo e fallback local.
```
**Output (resumo)**
- Escopo funcional definido com IA + fallback local.

---

# Prompts (exemplos) e outputs

**Prompt 2**
```
Prototipe uma tela em 3 colunas:
input + pipeline, visualização do veículo, resultado detalhado.
Estilo glassmorphism com destaque ciano.
```
**Output (resumo)**
- Layout em 3 colunas com componentes de diagnóstico e viewer. 

---

# Post-mortem

Lorem ipsum dolor sit

---

# OBRIGADO!!
