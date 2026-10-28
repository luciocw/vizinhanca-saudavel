export type PlaceCategory = 'verde' | 'pracinha' | 'saude' | 'feira' | 'comunidade'

export interface Place {
  readonly id: string
  readonly name: string
  readonly category: PlaceCategory
  readonly lat: number
  readonly lng: number
  readonly bairro: string
  readonly address: string
  readonly features: readonly string[]
  readonly note?: string
}

export interface WalkRoute {
  readonly id: string
  readonly name: string
  readonly minutes: number
  readonly level: 'leve' | 'moderada'
  readonly description: string
  /** pontos em ordem; o primeiro é a saída e o último a chegada */
  readonly stops: readonly { readonly label: string; readonly lat: number; readonly lng: number }[]
  readonly tip: string
}

export interface Stretch {
  readonly id: string
  readonly name: string
  readonly seconds: number
  readonly when: 'antes' | 'depois' | 'ambos'
  readonly steps: readonly string[]
  readonly careful?: string
}

export type FoodGroup = 'in-natura' | 'processado' | 'ultraprocessado'

export interface FoodItem {
  readonly name: string
  readonly group: FoodGroup
  readonly why: string
}

export interface Tip {
  readonly title: string
  readonly body: string
}

export interface BreathPattern {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly phases: readonly { readonly label: string; readonly seconds: number; readonly scale: number }[]
  readonly rounds: number
}

export interface Contact {
  readonly name: string
  readonly phone?: string
  readonly description: string
  readonly link?: string
}

export interface Source {
  readonly title: string
  readonly url: string
}
