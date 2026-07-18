/**
 * Module registry — add new learning modules here without touching core UI.
 * Each module exports: id, title, description, emoji, colors, units, extras.
 */

import manfredoModule from './manfredo-alessandros/index.js'
import { UNITS as classicUnits } from '../data/units'

/** @typedef {{ it: string, en: string }} Bi */

/**
 * @typedef {object} ModuleDef
 * @property {string} id
 * @property {Bi} title
 * @property {Bi} description
 * @property {string} emoji
 * @property {string} color
 * @property {string} [gradient]
 * @property {boolean} [rainbowFriendly]
 * @property {boolean} [unlockedByDefault]
 * @property {string} [navLabel]
 * @property {string} [route]
 * @property {import('../data/units').Unit[]} units
 * @property {object} [characters]
 * @property {object} [intro]
 * @property {object} [vocabulary]
 * @property {object} [dialogues]
 */

/** @type {ModuleDef[]} */
export const MODULES = [manfredoModule]

/** Classic Chloe curriculum as a virtual module for unified listing */
export const CLASSIC_MODULE = {
  id: 'chloe-classic',
  title: { it: 'Percorso con Chloe', en: 'Path with Chloe' },
  description: {
    it: 'Saluti, Famiglia, Animali — il percorso classico',
    en: 'Greetings, Family, Animals — the classic path',
  },
  emoji: '🦉',
  color: '#7C5CFC',
  gradient: 'linear-gradient(135deg, #7c5cfc 0%, #a78bfa 50%, #f472b6 100%)',
  rainbowFriendly: false,
  unlockedByDefault: true,
  route: '/',
  units: classicUnits,
}

export function getModule(moduleId) {
  if (moduleId === CLASSIC_MODULE.id) return CLASSIC_MODULE
  return MODULES.find((m) => m.id === moduleId) || null
}

export function getAllModules() {
  return [CLASSIC_MODULE, ...MODULES]
}

/** Flatten all units from classic + modular curricula */
export function getAllUnits() {
  const moduleUnits = MODULES.flatMap((m) =>
    (m.units || []).map((u) => ({ ...u, moduleId: m.id }))
  )
  return [...classicUnits, ...moduleUnits]
}

export function getUnitFromRegistry(unitId) {
  return getAllUnits().find((u) => u.id === unitId) || null
}

export function getLessonFromRegistry(unitId, lessonId) {
  const unit = getUnitFromRegistry(unitId)
  if (!unit) return null
  if (lessonId === unit.unitTest?.id) return unit.unitTest
  return unit.lessons?.find((l) => l.id === lessonId) || null
}

/** Ordered unit ids for sequential unlock across all curricula */
export function getUnitUnlockOrder() {
  return getAllUnits()
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((u) => u.id)
}

export function getDefaultUnlockedUnits() {
  const defaults = new Set(['saluti'])
  for (const m of MODULES) {
    if (m.unlockedByDefault) {
      for (const u of m.units || []) {
        if (u.unlockedByDefault !== false) defaults.add(u.id)
      }
    }
  }
  return [...defaults]
}
