import { useState } from 'react'
import { PageHead } from '../components/PageHead'
import { foodQuiz, groupInfo, guideSteps, labelTips, plateTips } from '../content/nutricao'
import { feiraTips } from '../content/lugares'
import { cssVars } from '../lib/css'
import type { FoodGroup } from '../types'

const groups: readonly FoodGroup[] = ['in-natura', 'processado', 'ultraprocessado']

const groupColor: Record<FoodGroup, string> = {
  'in-natura': 'var(--green)',
  processado: 'var(--sun)',
  ultraprocessado: 'var(--terra)',
}

const Quiz = () => {
  const [i, setI] = useState(0)
  const [answer, setAnswer] = useState<FoodGroup | null>(null)
  const [score, setScore] = useState(0)
  const item = foodQuiz[i % foodQuiz.length]
  if (item === undefined) return null

  const pick = (g: FoodGroup): void => {
    if (answer !== null) return
    setAnswer(g)
    if (g === item.group) setScore((s) => s + 1)
  }

  const next = (): void => {
    setAnswer(null)
    setI((n) => n + 1)
  }

  const round = (i % foodQuiz.length) + 1

  return (
    <div className="quiz">
      <div className="section-title">
        <h2>Joguinho: onde fica?</h2>
        <span className="small muted">
          {round}/{foodQuiz.length} · {score} acertos
        </span>
      </div>
      <div className="food">{item.name}</div>
      <div className="options">
        {groups.map((g) => {
          const cls = answer === null ? '' : g === item.group ? 'right' : g === answer ? 'wrong' : ''
          return (
            <button key={g} type="button" className={cls} onClick={() => pick(g)} disabled={answer !== null && cls === ''}>
              {groupInfo[g].label}
            </button>
          )
        })}
      </div>
      {answer !== null && (
        <div className="feedback" aria-live="polite">
          <b>{answer === item.group ? 'Isso aí!' : 'Quase.'}</b> {item.why}
          <div className="btn-row" style={{ marginTop: 10 }}>
            <button type="button" className="btn" onClick={next}>
              {round === foodQuiz.length ? 'Jogar de novo' : 'Próximo'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const Plate = () => (
  <div className="card">
    <h2>Como montar o prato</h2>
    <div className="plate">
      <svg viewBox="0 0 100 100" role="img" aria-label="Prato dividido: metade verduras, um quarto arroz, um quarto feijão e proteína">
        <circle cx="50" cy="50" r="48" fill="var(--surface-2)" />
        <path d="M50 50 L50 6 A44 44 0 0 0 50 94 Z" fill="var(--green)" />
        <path d="M50 50 L50 6 A44 44 0 0 1 94 50 Z" fill="var(--sun)" />
        <path d="M50 50 L94 50 A44 44 0 0 1 50 94 Z" fill="var(--terra)" />
        <circle cx="50" cy="50" r="48" fill="none" stroke="var(--line)" strokeWidth="2" />
      </svg>
      <div className="legend">
        {plateTips.slice(0, 3).map((t, idx) => (
          <div key={`${t.title}-${idx}`}>
            <span className="dot" style={cssVars({ '--c': ['var(--green)', 'var(--sun)', 'var(--terra)'][idx] ?? 'var(--muted)' })} />
            <span>
              <b>{t.title}:</b> {t.body}
            </span>
          </div>
        ))}
      </div>
    </div>
    {plateTips[3] !== undefined && (
      <p className="small">
        <b style={{ color: 'var(--ink)' }}>{plateTips[3].title}:</b> {plateTips[3].body}
      </p>
    )}
  </div>
)

export const Comida = () => (
  <div className="page">
    <PageHead kicker="Comida de verdade" title="Menos pacote, mais panela" accent="var(--terra)">
      Tudo aqui vem do Guia Alimentar para a População Brasileira, do Ministério da Saúde. Nada de dieta da moda.
    </PageHead>

    <section>
      <h2>Três tipos de alimento</h2>
      <div className="stack">
        {groups.map((g) => (
          <div key={g} className="card" style={{ borderLeft: `5px solid ${groupColor[g]}` }}>
            <span className="small" style={{ fontWeight: 700, color: groupColor[g] }}>
              {groupInfo[g].short.toUpperCase()}
            </span>
            <h3>{groupInfo[g].label}</h3>
            <p>{groupInfo[g].body}</p>
          </div>
        ))}
      </div>
    </section>

    <Quiz />

    <Plate />

    <section>
      <h2>Os 10 passos do Guia</h2>
      <ol className="numbered">
        {guideSteps.map((s) => (
          <li key={s.title}>
            <div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>

    <section>
      <h2>Lendo o rótulo no mercado</h2>
      <div className="stack">
        {labelTips.map((t) => (
          <details key={t.title} className="item">
            <summary>{t.title}</summary>
            <div className="body">
              <p>{t.body}</p>
            </div>
          </details>
        ))}
      </div>
    </section>

    <section>
      <h2>Onde comprar comida fresca</h2>
      <div className="stack">
        {feiraTips.map((t) => (
          <div key={t.title} className="card">
            <h3>{t.title}</h3>
            <p>{t.body}</p>
          </div>
        ))}
      </div>
    </section>

    <p className="footer-note">
      Para orientação individual, como diabetes, pressão alta ou perda de peso, procura a equipe do teu posto de saúde.
    </p>
  </div>
)
