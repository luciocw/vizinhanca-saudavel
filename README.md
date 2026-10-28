# Vizinhança Saudável

Guia digital de saúde comunitária para o bairro Auxiliadora, em Porto Alegre.

Logo, ícones e QR Code ficam em `marca/`. Webapp pensado para celular, acessado por QR Code.

**No ar:** https://luciocw.github.io/auxiliadora-saudavel/

## Seções

- **Mapa do bairro:** praças, pracinhas, academias ao ar livre, feiras e posto de saúde, com filtro e "mais perto de mim".
- **Saúde em movimento:** rotas de caminhada de 15, 30 e 45 minutos e alongamentos com cronômetro.
- **Comida de verdade:** os 10 passos do Guia Alimentar, prato saudável, leitura de rótulo e um joguinho de classificação.
- **Mente sã:** respiração guiada (lenta, quadrada, 4-7-8), atenção plena, higiene do sono e quando buscar ajuda.
- **Conecta-te ao bairro:** telefones úteis, atendimento no SUS e ideias para aproximar vizinhos.

## Rodar localmente

```bash
npm install
npm run dev
```

## Editar o conteúdo

Todo o texto fica em `src/content/`, em arquivos TypeScript tipados:

| Arquivo | O que tem |
|---|---|
| `lugares.ts` | Praças, serviços, feiras e rotas de caminhada (com coordenadas) |
| `movimento.ts` | Recomendações de atividade física e alongamentos |
| `nutricao.ts` | Guia Alimentar, joguinho e dicas de rótulo |
| `mente.ts` | Respirações, práticas e sono |
| `apoio.ts` | Telefones, ideias de convivência e fontes |
| `inicio.ts` | Desafio da semana e dica do dia |

Cada push na `main` publica sozinho no GitHub Pages (`.github/workflows/deploy.yml`).

## Stack

Vite, React 19, TypeScript, Leaflet (mapa com OpenStreetMap/CARTO). PWA com service worker, instalável na tela inicial.
