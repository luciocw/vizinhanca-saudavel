import { Icon } from '../components/Icon'
import { PageHead } from '../components/PageHead'
import { communityIdeas, healthServices, phones, sources } from '../content/apoio'
import { placeUrl } from '../lib/geo'
import { go } from '../lib/router'

export const Apoio = () => (
  <div className="page">
    <PageHead kicker="Conecta-te ao bairro" title="Ninguém se cuida sozinho" accent="var(--sun)">
      Onde buscar atendimento, telefones que vale ter salvos e ideias para aproximar os vizinhos.
    </PageHead>

    <section>
      <h2>Telefones úteis</h2>
      <div className="stack">
        {phones.map((c) => (
          <div key={c.name} className="card contact">
            {c.phone !== undefined && (
              <a className={`num${c.phone === '192' ? ' red' : ''}`} href={`tel:${c.phone}`} aria-label={`Ligar para ${c.name}, ${c.phone}`}>
                {c.phone}
              </a>
            )}
            <div>
              <h3>{c.name}</h3>
              <p className="small">{c.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2>Atendimento pelo SUS</h2>
      <div className="stack">
        {healthServices.map((s) => (
          <div key={s.id} className="card">
            <h3>{s.name}</h3>
            <p className="small">{s.address}</p>
            {s.note !== undefined && <p className="small">{s.note}</p>}
            <div className="btn-row">
              <a className="btn ghost" href={placeUrl(s)} target="_blank" rel="noreferrer">
                <Icon name="pin" /> Ver no mapa
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2>Bora juntar a vizinhança</h2>
      <p className="muted">
        Muita gente no bairro mora em prédio e mal conhece quem vive no andar de baixo. Algumas ideias simples para mudar
        isso:
      </p>
      <div className="stack">
        {communityIdeas.map((t) => (
          <div key={t.title} className="card tinted" style={{ background: 'var(--sun-soft)' }}>
            <h3>{t.title}</h3>
            <p>{t.body}</p>
          </div>
        ))}
      </div>
      <div className="btn-row">
        <button type="button" className="btn" onClick={() => go('movimento')}>
          <Icon name="walk" /> Escolher uma rota de caminhada
        </button>
      </div>
    </section>

    <section>
      <h2>Sobre este guia</h2>
      <p className="muted">
        O Auxiliadora Saudável nasceu de um trabalho acadêmico de saúde coletiva. Ele partiu de conversas com moradores
        do bairro, que falaram da falta de pracinhas perto de casa, de obesidade, de saúde mental e da pouca convivência
        entre vizinhos. O conteúdo é educativo e não substitui o atendimento de um profissional de saúde.
      </p>
      <h3>Fontes</h3>
      <ol className="sources">
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noreferrer">
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </section>
  </div>
)
