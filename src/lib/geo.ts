export interface LatLng {
  readonly lat: number
  readonly lng: number
}

const R = 6371000

/** distância em linha reta, em metros */
export const haversine = (a: LatLng, b: LatLng): number => {
  const toRad = (d: number): number => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

const coord = (p: LatLng): string => `${p.lat},${p.lng}`

export const directionsUrl = (stops: readonly LatLng[]): string => {
  const first = stops[0]
  const last = stops[stops.length - 1]
  if (first === undefined || last === undefined) return 'https://www.google.com/maps'
  const params = new URLSearchParams({
    api: '1',
    origin: coord(first),
    destination: coord(last),
    travelmode: 'walking',
  })
  const middle = stops.slice(1, -1)
  if (middle.length > 0) params.set('waypoints', middle.map(coord).join('|'))
  return `https://www.google.com/maps/dir/?${params.toString()}`
}

export const placeUrl = (p: LatLng & { readonly name: string }): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.lat},${p.lng}`)}`
