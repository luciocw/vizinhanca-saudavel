import type { CSSProperties } from 'react'

type CssVar = `--${string}`

/** monta variáveis CSS para o atributo style sem perder a tipagem */
export const cssVars = (vars: Partial<Record<CssVar, string>>): CSSProperties => {
  const style: CSSProperties & Partial<Record<CssVar, string>> = {}
  for (const [key, value] of Object.entries(vars)) {
    if (key.startsWith('--') && value !== undefined) Object.assign(style, { [key]: value })
  }
  return style
}
