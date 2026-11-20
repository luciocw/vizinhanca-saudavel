# Impressos

Peças para divulgar o app no bairro, com a mesma paleta, fontes e ícones do app.

| Arquivo | Uso |
|---|---|
| `cartaz-a4.pdf` | Cartaz A4 para murais (condomínios, farmácias, igrejas, comércio) |
| `flyer-a5-frente-e-verso.pdf` | Flyer A5: página 1 = frente, página 2 = verso (mini-guia com 4 passos) |
| `previas/` | PNGs das peças, para conferir ou mandar no WhatsApp |

**Imprimir:** tamanho real (100%), sem "ajustar à página". As margens internas têm 9 a 12 mm, então funciona em impressora comum, sem sangria. No flyer, frente e verso virando pela borda longa.

**Editar:** os textos ficam em `cartaz-a4.html` e `flyer-a5.html`; o visual em `impressos.css`. Para gerar de novo os PDFs (precisa de `npm install` e Playwright):

```bash
node marca/impressos/gerar.mjs
```
