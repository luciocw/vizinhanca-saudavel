import type { Place, PlaceCategory, Tip, WalkRoute } from '../types'

export const categoryMeta: Record<PlaceCategory, { readonly label: string; readonly color: string }> = {
  verde: { label: 'Área verde', color: '#2f7d4f' },
  pracinha: { label: 'Pracinha', color: '#d08a12' },
  academia: { label: 'Academia ao ar livre', color: '#2f6584' },
  saude: { label: 'Saúde', color: '#c0452b' },
  feira: { label: 'Feira', color: '#7a4a78' },
}

export const mapCenter = { lat: -30.0185, lng: -51.1915 }

export const places: readonly Place[] = []
export const walkRoutes: readonly WalkRoute[] = []
export const feiraTips: readonly Tip[] = []
