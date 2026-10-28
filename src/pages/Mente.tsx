import { useEffect, useReducer, useState } from 'react'
import { Icon } from '../components/Icon'
import { PageHead } from '../components/PageHead'
import { breathPatterns, mindfulPractices, sleepTips, whenToSeekHelp } from '../content/mente'
import { go } from '../lib/router'
import { cssVars } from '../lib/css'
import type { BreathPattern } from '../types'

interface BreathState {
  readonly running: boolean
  readonly phase: number
  readonly round: number
  readonly left: number
  readonly done: boolean
}

type BreathAction = { readonly type: 'tick'; readonly pattern: BreathPattern } | { readonly type: 'start' | 'stop' | 'reset'; readonly pattern: BreathPattern }

const firstSeconds = (p: BreathPattern): number => p.phases[0]?.seconds ?? 4

const fresh = (p: BreathPattern): BreathState => ({ running: false, phase: 0, round: 1, left: firstSeconds(p), done: false })

const breathReducer = (s: BreathState, a: BreathAction): BreathState => {
  switch (a.type) {
    case 'reset':
      return fresh(a.pattern)
    case 'start':
      return s.done ? { ...fresh(a.pattern), running: true } : { ...s, running: true }
    case 'stop':
      return { ...s, running: false }
    case 'tick': {
      if (!s.running) return s
      if (s.left > 1) return { ...s, left: s.left - 1 }
      const nextPhase = s.phase + 1
      if (nextPhase < a.pattern.phases.length) {
        return { ...s, phase: nextPhase, left: a.pattern.phases[nextPhase]?.seconds ?? 4 }
      }
      if (s.round >= a.pattern.rounds) return { ...s, running: false, done: true, left: 0 }
      return { ...s, phase: 0, round: s.round + 1, left: firstSeconds(a.pattern) }
    }
  }
}

const BreathTool = () => {
  const [patternId, setPatternId] = useState(breathPatterns[0]?.id ?? '')
  const pattern = breathPatterns.find((p) => p.id === patternId) ?? breathPatterns[0]
  const [state, dispatch] = useReducer(breathReducer, pattern, (p) => (p === undefined ? { running: false, phase: 0, round: 1, left: 4, done: false } : fresh(p)))

  useEffect(() => {
    if (!state.running || pattern === undefined) return
    const id = window.setInterval(() => dispatch({ type: 'tick', pattern }), 1000)
    return () => window.clearInterval(id)
  }, [state.running, pattern])

  if (pattern === undefined) return null
  const phase = pattern.phases[state.phase]
  const scale = !state.running && !state.done && state.phase === 0 && state.round === 1 ? 0.45 : phase?.scale === 1 ? 1 : 0.45
  const duration = state.running ? (phase?.seconds ?? 4) : 0.6

  const choose = (id: string): void => {
    setPatternId(id)
    const p = breathPatterns.find((b) => b.id === id)
    if (p !== undefined) dispatch({ type: 'reset', pattern: p })
  }

  return (
    <div className="breath">
      <div className="segmented" role="tablist" aria-label="Tipo de respiração" style={{ width: '100%' }}>
        {breathPatterns.map((p) => (
          <button key={p.id} type="button" role="tab" aria-selected={p.id === pattern.id} onClick={() => choose(p.id)}>
            {p.name.replace('Respiração ', '')}
          </button>
        ))}
      </div>
      <p className="small">{pattern.description}</p>
      <p className="breath-phase" aria-live="polite">
        {state.done
          ? 'Pronto. Como tu estás agora?'
          : state.running && phase !== undefined
            ? phase.label
            : 'Senta confortável e aperta começar'}
      </p>
      <div className="breath-stage">
        <div className="breath-ring" />
        <div
          className="breath-ball"
          style={{ ...cssVars({ '--s': String(scale) }), transitionDuration: `${duration}s` }}
        />
        {state.running && <span className="breath-count">{state.left}</span>}
      </div>
      <span className="small muted">
        Ciclo {state.round} de {pattern.rounds}
      </span>
      <div className="btn-row" style={{ justifyContent: 'center' }}>
        <button
          type="button"
          className="btn"
          style={{ background: 'var(--plum)', color: 'var(--surface)' }}
          onClick={() => dispatch({ type: state.running ? 'stop' : 'start', pattern })}
        >
          <Icon name={state.running ? 'pause' : 'play'} />
          {state.running ? 'Pausar' : state.done ? 'De novo' : 'Começar'}
        </button>
        <button type="button" className="btn soft" onClick={() => dispatch({ type: 'reset', pattern })} aria-label="Recomeçar">
          <Icon name="reset" />
        </button>
      </div>
    </div>
  )
}

export const Mente = () => (
  <div className="page">
    <PageHead kicker="Mente sã" title="Um respiro no meio do dia" accent="var(--plum)">
      Práticas curtas para baixar a ansiedade, dormir melhor e saber a hora de pedir ajuda.
    </PageHead>

    <BreathTool />

    <section>
      <h2>Atenção plena no dia a dia</h2>
      <div className="stack">
        {mindfulPractices.map((m) => (
          <div key={m.title} className="card">
            <h3>{m.title}</h3>
            <p>{m.body}</p>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2>Para dormir melhor</h2>
      <div className="grid-2">
        {sleepTips.map((t) => (
          <div key={t.title} className="card" style={{ padding: 14 }}>
            <h3 style={{ fontSize: '0.98rem' }}>{t.title}</h3>
            <p className="small">{t.body}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="alert">
      <h2>Quando procurar ajuda</h2>
      <p>Ninguém precisa dar conta de tudo sozinho. Vale conversar com um profissional se:</p>
      <ul>
        {whenToSeekHelp.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
      <p>
        O <b>CVV atende pelo 188</b>, de graça e a qualquer hora. Para acompanhamento, o caminho é o posto de saúde.
      </p>
      <div className="btn-row">
        <a className="btn" href="tel:188" style={{ background: 'var(--terra)', color: 'var(--surface)' }}>
          <Icon name="phone" /> Ligar 188
        </a>
        <button type="button" className="btn ghost" onClick={() => go('apoio')}>
          Ver onde buscar atendimento
        </button>
      </div>
    </section>
  </div>
)
