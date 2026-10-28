import { useState } from 'react'
import { Icon, type IconName } from '../components/Icon'
import { cssVars } from '../lib/css'
import { go, type Route } from '../lib/router'
import { loadJson, saveJson } from '../lib/storage'
import { dailyTips, weeklyChallenge } from '../content/inicio'

const tiles: readonly {
  readonly route: Route
  readonly title: string
  readonly text: string
  readonly icon: IconName
  readonly tint: string
  readonly accent: string
}[] = [
  { route: 'mapa', title: 'Mapa do bairro', text: 'Praças, pracinhas e onde se exercitar', icon: 'map', tint: 'var(--green-soft)', accent: 'var(--green)' },
  { route: 'movimento', title: 'Saúde em movimento', text: 'Caminhadas de 15 a 45 min e alongamentos', icon: 'walk', tint: 'var(--sky-soft)', accent: 'var(--sky)' },
  { route: 'comida', title: 'Comida de verdade', text: 'O que pôr no prato, sem neura', icon: 'leaf', tint: 'var(--terra-soft)', accent: 'var(--terra)' },
  { route: 'mente', title: 'Mente sã', text: 'Respiração guiada, sono e ansiedade', icon: 'mind', tint: 'var(--plum-soft)', accent: 'var(--plum)' },
]

/** semana do ano, para o desafio recomeçar toda segunda */
const weekKey = (d: Date): string => {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const day = t.getUTCDay() || 7
  t.setUTCDate(t.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1))
  const week = Math.ceil(((t.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  return `${t.getUTCFullYear()}-S${week}`
}

const isNumberArray = (v: unknown): v is number[] => Array.isArray(v) && v.every((n) => typeof n === 'number')

const Challenge = () => {
  const key = `desafio-${weekKey(new Date())}`
  const [done, setDone] = useState<readonly number[]>(() => loadJson(key, isNumberArray, []))

  const toggle = (i: number): void => {
    const next = done.includes(i) ? done.filter((n) => n !== i) : [...done, i]
    setDone(next)
    saveJson(key, next)
  }

  const pct = Math.round((done.length / weeklyChallenge.length) * 100)

  return (
    <section className="challenge">
      <div className="section-title">
        <h2>Desafio da semana</h2>
        <span className="muted small">
          {done.length} de {weeklyChallenge.length}
        </span>
      </div>
      <div className="progress" aria-hidden="true">
        <span style={{ width: `${pct}%` }} />
      </div>
      <ul>
        {weeklyChallenge.map((item, i) => (
          <li key={item}>
            <button type="button" className="check" aria-pressed={done.includes(i)} onClick={() => toggle(i)}>
              <span className="box">{done.includes(i) && <Icon name="check" size={18} />}</span>
              <span className="label">{item}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="muted small">
        {pct === 100
          ? 'Fechou a semana. Bah, parabéns! Na segunda tem desafio novo.'
          : 'Fica salvo só neste celular e recomeça toda segunda.'}
      </p>
    </section>
  )
}

export const Home = () => {
  const today = new Date()
  const tip = dailyTips[(today.getDate() + today.getMonth() * 31) % dailyTips.length]

  return (
    <div className="page">
      <div className="hero">
        <span className="small" style={{ opacity: 0.85, fontWeight: 700 }}>
          Guia de saúde do bairro
        </span>
        <h1>Cuidar da saúde começa na tua rua</h1>
        <p>Praças perto de casa, caminhadas pelo bairro, comida de verdade e um tempo para respirar.</p>
        <svg className="deco" viewBox="0 0 64 64" aria-hidden="true">
          {[0, 72, 144, 216, 288].map((a) => (
            <path key={a} transform={`translate(32 32) rotate(${a})`} d="M0 -7.5C8.5-11 13.2-19.5 8.2-26.6C5.4-30.6-5.4-30.6-8.2-26.6C-13.2-19.5-8.5-11 0-7.5z" fill="currentColor" />
          ))}
        </svg>
      </div>

      <div className="tiles">
        {tiles.map((t) => (
          <button
            key={t.route}
            type="button"
            className="tile"
            style={cssVars({ '--tint': t.tint, '--accent': t.accent })}
            onClick={() => go(t.route)}
          >
            <span className="ico">
              <Icon name={t.icon} />
            </span>
            <strong>{t.title}</strong>
            <span>{t.text}</span>
          </button>
        ))}
        <button
          type="button"
          className="tile wide"
          style={cssVars({ '--tint': 'var(--sun-soft)', '--accent': 'var(--sun)' })}
          onClick={() => go('apoio')}
        >
          <span className="ico">
            <Icon name="heart" />
          </span>
          <span>
            <strong style={{ display: 'block', color: 'var(--ink)' }}>Te conecta com o bairro</strong>
            Posto de saúde, telefones úteis e como juntar os vizinhos
          </span>
        </button>
      </div>

      {tip !== undefined && (
        <div className="card tinted" style={cssVars({ '--tint': 'var(--sun-soft)' })}>
          <span className="small" style={{ fontWeight: 700, color: 'var(--sun)' }}>
            DICA DO DIA
          </span>
          <h3>{tip.title}</h3>
          <p>{tip.body}</p>
        </div>
      )}

      <Challenge />

      <p className="footer-note">
        Conteúdo educativo, feito a partir de materiais do Ministério da Saúde. Não substitui consulta com profissional
        de saúde.
      </p>
    </div>
  )
}
