/**
 * Storage abstraction layer.
 * Today: localStorage. Tomorrow: Firebase / Supabase / backend API.
 * All game state persistence goes through this interface.
 */

const PREFIX = 'chloe_it_'

/**
 * @typedef {Object} StorageAdapter
 * @property {(key: string) => Promise<any|null>} get
 * @property {(key: string, value: any) => Promise<void>} set
 * @property {(key: string) => Promise<void>} remove
 * @property {() => Promise<void>} clear
 */

/** @type {StorageAdapter} */
const localStorageAdapter = {
  async get(key) {
    try {
      const raw = localStorage.getItem(PREFIX + key)
      if (raw == null) return null
      return JSON.parse(raw)
    } catch {
      return null
    }
  },
  async set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch (e) {
      console.warn('Storage set failed', e)
    }
  },
  async remove(key) {
    try {
      localStorage.removeItem(PREFIX + key)
    } catch {
      /* ignore */
    }
  },
  async clear() {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(PREFIX))
        .forEach((k) => localStorage.removeItem(k))
    } catch {
      /* ignore */
    }
  },
}

// Swap this for a remote adapter when backend is ready
let adapter = localStorageAdapter

/** @param {StorageAdapter} next */
export function setStorageAdapter(next) {
  adapter = next
}

export const storage = {
  get: (key) => adapter.get(key),
  set: (key, value) => adapter.set(key, value),
  remove: (key) => adapter.remove(key),
  clear: () => adapter.clear(),
}

/** Sync helpers used by Zustand persist */
export const syncStorage = {
  getItem(name) {
    try {
      return localStorage.getItem(name)
    } catch {
      return null
    }
  },
  setItem(name, value) {
    try {
      localStorage.setItem(name, value)
    } catch {
      /* ignore */
    }
  },
  removeItem(name) {
    try {
      localStorage.removeItem(name)
    } catch {
      /* ignore */
    }
  },
}
