import { useEffect, useState } from 'react'

export type RemoteData<T> = {
  data: T
  loading: boolean
  // true when showing the fallback (not configured, failed, or empty)
  isFallback: boolean
}

const isEmptyArray = (d: unknown) => Array.isArray(d) && d.length === 0

// Runs `load` on mount. Shows `fallback` while loading, when `load` is null
// (source not configured), on error, or when it returns nothing.
// Pass module-level functions for `load`/`isEmpty` so the effect runs once.
export function useRemoteData<T>(
  load: (() => Promise<T>) | null,
  fallback: T,
  isEmpty: (data: T) => boolean = isEmptyArray,
): RemoteData<T> {
  const [state, setState] = useState<RemoteData<T>>({
    data: fallback,
    loading: load !== null,
    isFallback: true,
  })

  useEffect(() => {
    if (!load) return
    let cancelled = false
    load()
      .then((data) => {
        if (cancelled) return
        if (isEmpty(data)) setState((s) => ({ ...s, loading: false }))
        else setState({ data, loading: false, isFallback: false })
      })
      .catch((err) => {
        console.warn(err)
        if (!cancelled) setState((s) => ({ ...s, loading: false }))
      })
    return () => {
      cancelled = true
    }
  }, [load, isEmpty])

  return state
}
