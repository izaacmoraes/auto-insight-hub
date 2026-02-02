# AutoDiagnostic AI

## Resumo (o que é o projeto?)
Aplicação web para diagnóstico veicular assistido por IA. O usuário descreve um sintoma em linguagem natural e o sistema apresenta uma análise com provável falha, zona do veículo afetada e passos recomendados. Há integração com Supabase (Edge Function `diagnose`) e fallback local baseado em uma base de conhecimento embutida.

## Funcionalidades
- Entrada de sintomas em linguagem natural com validação e atalhos de envio.
- Diagnóstico via IA (Supabase Edge Function) com histórico de thread.
- Fallback local por palavras-chave quando a IA não responde.
- Visualizador do veículo com zonas clicáveis e destaque visual do problema.
- Pipeline visual de processamento com etapas simuladas.
- Cartões com urgência, peça em detalhe e ação recomendada.
- Modo de depuração com testes rápidos.

## Organização das pastas
- `src/pages/`: rotas da aplicação (entrada principal em `Index.tsx`).
- `src/components/diagnostic/`: componentes do fluxo de diagnóstico (input, pipeline, resultado, viewer).
- `src/components/ui/`: biblioteca de UI (shadcn/radix) reutilizável.
- `src/data/`: base de conhecimento local (`diagnosticData.ts`) e PDFs de referência.
- `src/integrations/supabase/`: cliente e tipos do Supabase.
- `src/hooks/`: hooks utilitários (toast, responsividade).
- `public/`: assets públicos (ícones e imagens).
- `src/test/`: testes com Vitest.

## Como um usuário consegue utilizar?
1. Acesse a aplicação no navegador (deploy ou ambiente local).
2. Descreva o sintoma do veículo no painel à esquerda.
3. Clique em “Diagnosticar” (ou pressione `Ctrl+Enter`).
4. Analise o resultado, a zona destacada no veículo e os passos sugeridos.

## Como replicar o projeto?
1. Clone o repositório e instale as dependências.
2. Configure o Supabase (URL e chave publishable) e a Edge Function `diagnose`.
3. Rode o servidor de desenvolvimento.

```sh
git clone <SUA_URL_GIT>
cd <NOME_DO_PROJETO>
npm install

# Defina as variáveis de ambiente:
# VITE_SUPABASE_URL=...
# VITE_SUPABASE_PUBLISHABLE_KEY=...

npm run dev
```
