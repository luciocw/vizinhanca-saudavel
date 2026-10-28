import { useEffect, useReducer, useState } from 'react'
import { Icon } from '../components/Icon'
import { PageHead } from '../components/PageHead'
import { activityFacts, stretches, stretchNote } from '../content/movimento'
import { walkRoutes } from '../content/lugares'
import { directionsUrl, haversine } from '../lib/geo'
import type { Stretch, WalkRoute } from '../types'

type Tab = 'caminhadas' | 'alongar' | 'porque'

const tabs: readonly { readonly id: Tab; readonly label: string }[] = [
  { id: 'caminhadas', label: 'Caminhadas' },
  { id: 'alongar', label: 'Alongar' },
  { id: 'porque', label: 'Por que mexer' },
]

/** distância percorrida pelas ruas: linha reta × 1,3 (fator de quadra) */
const routeKm = (r: WalkRoute): number => {
  let total = 0
  for (let i = 1; i < r.stops.length; i++) {
    const a = r.stops[i - 1]
    const b = r.stops[i]
    if (a !== undefined && b !== undefined) total += haversine(a, b)
  }
  return (total * 1.3) / 1000
}

const RouteCard = ({ route }: { readonly route: WalkRoute }) => {
  const km = routeKm(route)
  return (
    <article className="card">
      <div className="route-head">
        <div className="route-time">
          <span>
            <b>{route.minutes}</b>
            <small>min</small>
          </span>
        </div>
        <div>
          <h3>{route.name}</h3>
          <span className="muted small">
            ≈ {km.toFixed(1).replace('.', ',')} km · caminhada {route.level}
          </span>
        </div>
      </div>
      <p>{route.description}</p>
      <ol className="stops">
        {route.stops.map((s, i) => (
          <li key={`${s.label}-${i}`}>{s.label}</li>
        ))}
      </ol>
      <p className="small">
        <b style={{ color: 'var(--ink)' }}>Dica: </b>
        {route.tip}
      </p>
      <div className="btn-row">
        <a className="btn" href={directionsUrl(route.stops)} target="_blank" rel="noreferrer">
          <Icon name="route" /> Abrir rota no mapa
        </a>
      </div>
    </article>
  )
}

type Moment = 'antes' | 'depois'

const sequenceFor = (moment: Moment): readonly Stretch[] =>
  stretches.filter((s) => s.when === moment || s.when === 'ambos')

interface PlayerState {
  readonly moment: Moment
  readonly index: number
  readonly left: number
  readonly status: 'parado' | 'rodando' | 'fim'
}

type PlayerAction =
  | { readonly type: 'tick' }
  | { readonly type: 'toggle' }
  | { readonly type: 'skip' }
  | { readonly type: 'reset'; readonly moment: Moment }

const secondsAt = (moment: Moment, index: number): number => sequenceFor(moment)[index]?.seconds ?? 0

const initial = (moment: Moment): PlayerState => ({ moment, index: 0, left: secondsAt(moment, 0), status: 'parado' })

const reducer = (state: PlayerState, action: PlayerAction): PlayerState => {
  const total = sequenceFor(state.moment).length
  switch (action.type) {
    case 'reset':
      return initial(action.moment)
    case 'toggle':
      if (state.status === 'fim') return { ...initial(state.moment), status: 'rodando' }
      return { ...state, status: state.status === 'rodando' ? 'parado' : 'rodando' }
    case 'skip': {
      if (state.index + 1 >= total) return { ...state, status: 'fim', left: 0 }
      return { ...state, index: state.index + 1, left: secondsAt(state.moment, state.index + 1) }
    }
    case 'tick': {
      if (state.status !== 'rodando') return state
      if (state.left > 1) return { ...state, left: state.left - 1 }
      if (state.index + 1 >= total) return { ...state, left: 0, status: 'fim' }
      return { ...state, index: state.index + 1, left: secondsAt(state.moment, state.index + 1) }
    }
  }
}

const StretchPlayer = () => {
  const [state, dispatch] = useReducer(reducer, 'antes', initial)
  const seq = sequenceFor(state.moment)
  const current = seq[state.index]

  useEffect(() => {
    if (state.status !== 'rodando') return
    const id = window.setInterval(() => dispatch({ type: 'tick' }), 1000)
    return () => window.clearInterval(id)
  }, [state.status])

  if (current === undefined) return null

  return (
    <div className="stretch-player">
      <div className="segmented" role="tablist" aria-label="Momento">
        <button
          type="button"
          role="tab"
          aria-selected={state.moment === 'antes'}
          onClick={() => dispatch({ type: 'reset', moment: 'antes' })}
        >
          Antes de caminhar
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={state.moment === 'depois'}
          onClick={() => dispatch({ type: 'reset', moment: 'depois' })}
        >
          Depois
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
        <div>
          <span className="small muted">
            {state.index + 1} de {seq.length}
          </span>
          <h2>{state.status === 'fim' ? 'Pronto!' : current.name}</h2>
        </div>
        <span className="count" aria-live="polite">
          {state.left}s
        </span>
      </div>
      {state.status === 'fim' ? (
        <p>
          {state.moment === 'antes'
            ? 'Corpo aquecido. Agora é só sair caminhar.'
            : 'Boa! Bebe uma água e aproveita o resto do dia.'}
        </p>
      ) : (
        <ol>
          {current.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      )}
      {current.careful !== undefined && state.status !== 'fim' && <p className="small muted">{current.careful}</p>}
      <div className="btn-row">
        <button type="button" className="btn" onClick={() => dispatch({ type: 'toggle' })}>
          <Icon name={state.status === 'rodando' ? 'pause' : 'play'} />
          {state.status === 'rodando' ? 'Pausar' : state.status === 'fim' ? 'De novo' : 'Começar'}
        </button>
        <button
          type="button"
          className="btn soft"
          disabled={state.status === 'fim'}
          onClick={() => dispatch({ type: 'skip' })}
        >
          Pular
        </button>
        <button
          type="button"
          className="btn soft"
          onClick={() => dispatch({ type: 'reset', moment: state.moment })}
          aria-label="Recomeçar"
        >
          <Icon name="reset" />
        </button>
      </div>
    </div>
  )
}

export const Movimento = () => {
  const [tab, setTab] = useState<Tab>('caminhadas')

  return (
    <div className="page">
      <PageHead kicker="Saúde em movimento" title="Bora caminhar pelo bairro" accent="var(--sky)">
        A Auxiliadora é plana em boa parte, arborizada e cheia de praças por perto. Dá para fazer muita coisa a pé.
      </PageHead>

      <div className="segmented" role="tablist" aria-label="Conteúdo">
        {tabs.map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'caminhadas' && (
        <section>
          <p className="muted small">
            Tempos aproximados num passo confortável. O botão abre a rota no mapa do teu celular, com as ruas certinhas.
          </p>
          <div className="stack">
            {walkRoutes.map((r) => (
              <RouteCard key={r.id} route={r} />
            ))}
          </div>
        </section>
      )}

      {tab === 'alongar' && (
        <section>
          <StretchPlayer />
          <p className="muted small">{stretchNote}</p>
          <h2>Todos os exercícios</h2>
          <div className="stack">
            {stretches.map((s) => (
              <details key={s.id} className="item">
                <summary>
                  {s.name}
                  <span className="tag" style={{ marginLeft: 'auto' }}>
                    {s.when === 'ambos' ? 'antes e depois' : s.when}
                  </span>
                </summary>
                <div className="body">
                  <ol>
                    {s.steps.map((st) => (
                      <li key={st}>{st}</li>
                    ))}
                  </ol>
                  {s.careful !== undefined && <p className="small">{s.careful}</p>}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {tab === 'porque' && (
        <section>
          <div className="stack">
            {activityFacts.map((f) => (
              <div key={f.title} className="card">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
          <p className="muted small">
            Se tu tens alguma condição de saúde ou estás parado há muito tempo, conversa com a equipe do teu posto antes
            de aumentar o ritmo.
          </p>
        </section>
      )}
    </div>
  )
}
