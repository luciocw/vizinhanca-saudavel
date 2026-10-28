export type IconName =
  | 'map'
  | 'walk'
  | 'leaf'
  | 'mind'
  | 'heart'
  | 'phone'
  | 'route'
  | 'check'
  | 'play'
  | 'pause'
  | 'reset'
  | 'external'
  | 'pin'
  | 'locate'

const paths: Record<IconName, string> = {
  map: 'M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zm0 0v14m6-12v14',
  walk: 'M13 4.5a1.5 1.5 0 1 0 0-.01M10 21l2-6 2.5 2.5V21M8.5 11 11 8l3 1.5 2 3.5M11 8l-1 6',
  leaf: 'M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19c3-4 6-6 10-8',
  mind: 'M12 21v-4M8 17h8M7 13a5 5 0 1 1 10 0c0 2-1 3-2 4H9c-1-1-2-2-2-4zM12 3v2M4.5 6l1.4 1.4M19.5 6l-1.4 1.4',
  heart: 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z',
  route: 'M6 19a2 2 0 1 0 0-.01M18 5a2 2 0 1 0 0-.01M6 17V9a3 3 0 0 1 6 0v6a3 3 0 0 0 6 0V7',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  play: 'M8 5v14l11-7z',
  pause: 'M8 5h3v14H8zM13 5h3v14h-3z',
  reset: 'M4 12a8 8 0 1 0 2.5-5.8M4 4v4h4',
  external: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  pin: 'M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11zm0-9a2 2 0 1 0 0-.01',
  locate: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3m0 14v3M2 12h3m14 0h3',
}

const filled: ReadonlySet<IconName> = new Set<IconName>(['play', 'pause'])

export const Icon = ({ name, size }: { readonly name: IconName; readonly size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    aria-hidden="true"
    fill={filled.has(name) ? 'currentColor' : 'none'}
    stroke={filled.has(name) ? 'none' : 'currentColor'}
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={paths[name]} />
  </svg>
)
