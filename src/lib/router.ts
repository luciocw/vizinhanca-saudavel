import { useSyncExternalStore } from 'react'

export type Route = 'inicio' | 'mapa' | 'movimento' | 'comida' | 'mente' | 'apoio'

const routes: readonly Route[] = ['inicio', 'mapa', 'movimento', 'comida', 'mente', 'apoio']

const isRoute = (value: string): value is Route => routes.some((r) => r === value)

const read = (): Route => {
  const hash = window.location.hash.replace(/^#\/?/, '')
  return isRoute(hash) ? hash : 'inicio'
}

const subscribe = (cb: () => void): (() => void) => {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}

export const useRoute = (): Route => useSyncExternalStore(subscribe, read, () => 'inicio')

export const go = (route: Route): void => {
  window.location.hash = `/${route}`
  window.scrollTo({ top: 0 })
}
