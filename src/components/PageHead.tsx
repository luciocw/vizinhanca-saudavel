import type { ReactNode } from 'react'
import { cssVars } from '../lib/css'

export const PageHead = ({
  kicker,
  title,
  accent,
  children,
}: {
  readonly kicker: string
  readonly title: string
  readonly accent: string
  readonly children?: ReactNode
}) => (
  <div className="page-head" style={cssVars({ '--accent': accent })}>
    <span className="kicker">{kicker}</span>
    <h1>{title}</h1>
    {children !== undefined && <p>{children}</p>}
  </div>
)
