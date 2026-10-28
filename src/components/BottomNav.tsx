import { go, type Route } from '../lib/router'
import { Icon, type IconName } from './Icon'

const items: readonly { readonly route: Route; readonly label: string; readonly icon: IconName }[] = [
  { route: 'mapa', label: 'Mapa', icon: 'map' },
  { route: 'movimento', label: 'Movimento', icon: 'walk' },
  { route: 'comida', label: 'Comida', icon: 'leaf' },
  { route: 'mente', label: 'Mente', icon: 'mind' },
  { route: 'apoio', label: 'Apoio', icon: 'heart' },
]

export const BottomNav = ({ current }: { readonly current: Route }) => (
  <nav className="bottomnav" aria-label="Seções">
    <ul>
      {items.map((item) => (
        <li key={item.route}>
          <button
            type="button"
            onClick={() => go(item.route)}
            aria-current={current === item.route ? 'page' : undefined}
          >
            <Icon name={item.icon} />
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  </nav>
)
