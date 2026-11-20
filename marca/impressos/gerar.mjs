// Gera os PDFs de impressão e as prévias PNG a partir dos HTML desta pasta.
// Uso (na raiz do projeto, depois de `npm install`): node marca/impressos/gerar.mjs
// Precisa do Playwright com Chromium (npx playwright install chromium).
import { chromium } from 'playwright'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const dir = path.dirname(fileURLToPath(import.meta.url))
const pecas = [
  { html: 'cartaz-a4.html', pdf: 'cartaz-a4.pdf', previas: ['cartaz-a4'], w: 210, h: 297 },
  { html: 'flyer-a5.html', pdf: 'flyer-a5-frente-e-verso.pdf', previas: ['flyer-a5-frente', 'flyer-a5-verso'], w: 148, h: 210 },
  // Mesmo flyer, 2 por folha A4 deitada (folha 1 = duas frentes, folha 2 = dois versos), com linha de corte no meio.
  { html: 'flyer-a5.html', pdf: 'flyer-a5-2-por-folha-a4.pdf', previas: ['flyer-a5-2-por-folha-frente', 'flyer-a5-2-por-folha-verso'], w: 297, h: 210, doisPorFolha: true },
]

// Junta cada página A5 com uma cópia dela numa folha A4 deitada.
const montarDoisPorFolha = () => {
  const estilo = document.createElement('style')
  estilo.textContent = `
    @page { size: 297mm 210mm; margin: 0; }
    .folha { position: relative; width: 297mm; height: 210mm; display: flex; justify-content: space-between;
             background: var(--bg); break-after: page; page-break-after: always; }
    .folha:last-child { break-after: auto; page-break-after: auto; }
    .folha > .page { break-after: auto; page-break-after: auto; }
    .folha::after { content: ''; position: absolute; left: 50%; top: 0; bottom: 0;
                    border-left: 0.3mm dashed #b9b6a8; }`
  document.head.append(estilo)
  for (const pagina of [...document.querySelectorAll('body > .page')]) {
    const folha = document.createElement('div')
    folha.className = 'folha'
    pagina.replaceWith(folha)
    folha.append(pagina, pagina.cloneNode(true))
  }
}
const mmPx = 96 / 25.4

await mkdir(path.join(dir, 'previas'), { recursive: true })
const browser = await chromium.launch()
for (const p of pecas) {
  const page = await browser.newPage({
    viewport: { width: Math.round(p.w * mmPx), height: Math.round(p.h * mmPx) },
    deviceScaleFactor: 2,
  })
  await page.goto(pathToFileURL(path.join(dir, p.html)).href, { waitUntil: 'networkidle' })
  if (p.doisPorFolha) await page.evaluate(montarDoisPorFolha)
  await page.evaluate(() => document.fonts.ready)
  await page.pdf({ path: path.join(dir, p.pdf), printBackground: true, preferCSSPageSize: true })
  const secoes = await page.$$(p.doisPorFolha ? '.folha' : '.page')
  for (const [i, s] of secoes.entries()) {
    await s.screenshot({ path: path.join(dir, 'previas', `${p.previas[i]}.png`) })
  }
  await page.close()
}
await browser.close()
console.log('PDFs e prévias gerados em', dir)
