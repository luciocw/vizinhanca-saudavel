import { lazy, Suspense } from 'react'
import { BottomNav } from './components/BottomNav'
import { go, useRoute, type Route } from './lib/router'
import { Home } from './pages/Home'
import { Movimento } from './pages/Movimento'
import { Comida } from './pages/Comida'
import { Mente } from './pages/Mente'
import { Apoio } from './pages/Apoio'

const Mapa = lazy(async () => {
  const m = await import('./pages/Mapa')
  return { default: m.Mapa }
})

const Page = ({ route }: { readonly route: Route }) => {
  switch (route) {
    case 'inicio':
      return <Home />
    case 'mapa':
      return (
        <Suspense fallback={<div className="page muted">Carregando o mapa…</div>}>
          <Mapa />
        </Suspense>
      )
    case 'movimento':
      return <Movimento />
    case 'comida':
      return <Comida />
    case 'mente':
      return <Mente />
    case 'apoio':
      return <Apoio />
  }
}

export const App = () => {
  const route = useRoute()
  return (
    <div className="app">
      <header className="topbar">
        <button type="button" className="brand" onClick={() => go('inicio')} aria-label="Ir para o início">
          <img src="./favicon.svg" alt="" />
          <span>
            <strong>Vizinhança Saudável</strong>
            <small>Bairro Auxiliadora · Porto Alegre</small>
          </span>
        </button>
      </header>
      <main>
        <Page route={route} />
      </main>
      <BottomNav current={route} />
    </div>
  )
}
