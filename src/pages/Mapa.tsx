import { useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Icon } from '../components/Icon'
import { PageHead } from '../components/PageHead'
import { categoryMeta, mapCenter, mapInsight, places } from '../content/lugares'
import { cssVars } from '../lib/css'
import { haversine, placeUrl, type LatLng } from '../lib/geo'
import type { Place, PlaceCategory } from '../types'

const categories: readonly PlaceCategory[] = ['verde', 'pracinha', 'saude', 'feira', 'comunidade']

const pinCache = new Map<string, L.DivIcon>()

const pinFor = (cat: PlaceCategory, active: boolean): L.DivIcon => {
  const key = `${cat}-${String(active)}`
  const cached = pinCache.get(key)
  if (cached !== undefined) return cached
  const size = active ? 38 : 30
  const icon = L.divIcon({
    className: '',
    html: `<div class="pin${active ? ' active' : ''}" style="--c:${categoryMeta[cat].color}"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  })
  pinCache.set(key, icon)
  return icon
}

/** uma praça com brinquedos também aparece no filtro de pracinhas */
const matches = (p: Place, filter: PlaceCategory | 'todos'): boolean =>
  filter === 'todos' ||
  p.category === filter ||
  (filter === 'pracinha' && p.features.some((f) => f.toLowerCase().includes('brinquedo')))

const FlyTo = ({ target }: { readonly target: LatLng | null }) => {
  const map = useMap()
  useEffect(() => {
    if (target !== null) map.flyTo([target.lat, target.lng], Math.max(map.getZoom(), 16), { duration: 0.6 })
  }, [target, map])
  return null
}

const formatDistance = (m: number): string => {
  const minutes = Math.max(1, Math.round((m * 1.2) / 80))
  return m < 1000 ? `${Math.round(m)} m · ${minutes} min a pé` : `${(m / 1000).toFixed(1).replace('.', ',')} km · ${minutes} min a pé`
}

export const Mapa = () => {
  const [filter, setFilter] = useState<PlaceCategory | 'todos'>('todos')
  const [selected, setSelected] = useState<string | null>(null)
  const [me, setMe] = useState<LatLng | null>(null)
  const [geoMsg, setGeoMsg] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const visible = useMemo(() => {
    const list = places.filter((p) => matches(p, filter))
    if (me === null) return list
    return [...list].sort((a, b) => haversine(me, a) - haversine(me, b))
  }, [filter, me])

  const selectedPlace = places.find((p) => p.id === selected) ?? null

  const locate = (): void => {
    if (!('geolocation' in navigator)) {
      setGeoMsg('Teu navegador não informa a localização.')
      return
    }
    setGeoMsg('Procurando tua localização…')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMe({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setGeoMsg('Lista ordenada do mais perto para o mais longe.')
      },
      () => setGeoMsg('Não deu para pegar a localização. Confere se o celular permitiu.'),
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  const select = (id: string): void => {
    setSelected(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="page">
      <PageHead kicker="Mapa do bairro" title="Tem praça mais perto do que tu imaginas" accent="var(--green)">
        Áreas verdes, pracinhas para as crianças, a feira, serviços de saúde e pontos de encontro do bairro.
      </PageHead>

      <div className="chips" role="group" aria-label="Filtrar lugares">
        <button type="button" className="chip" aria-pressed={filter === 'todos'} onClick={() => setFilter('todos')}>
          Todos
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className="chip"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
          >
            <span className="dot" style={cssVars({ '--c': categoryMeta[c].color })} />
            {categoryMeta[c].label}
          </button>
        ))}
      </div>

      <div className="map-wrap">
        <MapContainer center={[mapCenter.lat, mapCenter.lng]} zoom={15} scrollWheelZoom={false} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          {visible.map((p) => (
            <Marker
              key={p.id}
              position={[p.lat, p.lng]}
              icon={pinFor(p.category, p.id === selected)}
              eventHandlers={{
                click: () => {
                  setSelected(p.id)
                  listRef.current?.querySelector(`[data-id="${p.id}"]`)?.scrollIntoView({ block: 'nearest' })
                },
              }}
            >
              <Popup>
                <b>{p.name}</b>
                <br />
                {p.address}
              </Popup>
            </Marker>
          ))}
          {me !== null && (
            <CircleMarker center={[me.lat, me.lng]} radius={8} pathOptions={{ color: '#fff', weight: 3, fillColor: '#2f6584', fillOpacity: 1 }} />
          )}
          <FlyTo target={selectedPlace ?? me} />
        </MapContainer>
      </div>

      <div className="btn-row">
        <button type="button" className="btn soft" onClick={locate}>
          <Icon name="locate" /> Mais perto de mim
        </button>
      </div>
      {geoMsg !== null && <p className="muted small" style={{ marginTop: -12 }}>{geoMsg}</p>}

      <section>
        <div className="section-title">
          <h2>Lugares</h2>
          <span className="muted small">{visible.length}</span>
        </div>
        <div className="stack" ref={listRef}>
          {visible.map((p) => (
            <article
              key={p.id}
              data-id={p.id}
              className="card place-card"
              aria-current={p.id === selected}
              onClick={() => select(p.id)}
            >
              <div className="row">
                <span className="dot" style={cssVars({ '--c': categoryMeta[p.category].color })} />
                <h3>{p.name}</h3>
              </div>
              <p className="small">
                {p.address} · {p.bairro}
              </p>
              {me !== null && <span className="small" style={{ color: 'var(--green)', fontWeight: 700 }}>{formatDistance(haversine(me, p))}</span>}
              {p.features.length > 0 && (
                <div className="tags">
                  {p.features.map((f) => (
                    <span key={f} className="tag">
                      {f}
                    </span>
                  ))}
                </div>
              )}
              {p.note !== undefined && <p className="small">{p.note}</p>}
              <div className="btn-row">
                <a
                  className="btn ghost"
                  href={placeUrl(p)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon name="external" /> Como chegar
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="card tinted" style={cssVars({ '--tint': 'var(--copa-soft, var(--green-soft))' })}>
        <p>{mapInsight}</p>
      </div>

      <p className="footer-note">
        Viu algo desatualizado, como um brinquedo quebrado ou uma praça nova? Avisa a prefeitura pelo 156.
      </p>
    </div>
  )
}
