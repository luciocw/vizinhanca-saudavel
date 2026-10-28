// localStorage pode falhar (aba anônima, bloqueio). Tudo aqui é opcional.
export const loadJson = <T>(key: string, guard: (v: unknown) => v is T, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    const parsed: unknown = JSON.parse(raw)
    return guard(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

export const saveJson = (key: string, value: unknown): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // sem armazenamento: segue sem salvar
  }
}
