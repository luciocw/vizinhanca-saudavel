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
]
const mmPx = 96 / 25.4

await mkdir(path.join(dir, 'previas'), { recursive: true })
const browser = await chromium.launch()
for (const p of pecas) {
  const page = await browser.newPage({
    viewport: { width: Math.round(p.w * mmPx), height: Math.round(p.h * mmPx) },
    deviceScaleFactor: 2,
  })
  await page.goto(pathToFileURL(path.join(dir, p.html)).href, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.pdf({ path: path.join(dir, p.pdf), printBackground: true, preferCSSPageSize: true })
  const secoes = await page.$$('.page')
  for (const [i, s] of secoes.entries()) {
    await s.screenshot({ path: path.join(dir, 'previas', `${p.previas[i]}.png`) })
  }
  await page.close()
}
await browser.close()
console.log('PDFs e prévias gerados em', dir)
