import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { syncStorage } from '../lib/storage'
import { SHOP_ITEMS } from '../data/shop'
import { getUnit } from '../data/units'

const MAX_HEARTS = 5
const XP_PER_CORRECT = 10
const XP_PERFECT_BONUS = 5
const GEMS_PER_LESSON = 3
const GEMS_PERFECT = 2

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function yesterdayKey() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

function levelFromXp(xp) {
  // Soft curve for kids
  return Math.floor(Math.sqrt(xp / 50)) + 1
}

const defaultOwned = SHOP_ITEMS.filter((i) => i.ownedByDefault).map((i) => i.id)

/**
 * Game state: XP, hearts, streak, progress, shop, parent settings.
 * Persisted to localStorage via abstraction-ready syncStorage.
 */
export const useGameStore = create(
  persist(
    (set, get) => ({
      // Onboarding
      onboarded: false,
      childName: '',
      /** 'it-for-en' = learn Italian | 'en-for-it' = learn English */
      direction: 'it-for-en',
      uiLang: 'it', // interface language

      // Gamification
      xp: 0,
      gems: 0,
      hearts: MAX_HEARTS,
      streak: 0,
      lastPracticeDate: null,
      completedLessons: [], // lesson ids
      unlockedUnits: ['saluti'],
      badges: [],
      stats: {
        totalCorrect: 0,
        totalWrong: 0,
        lessonsCompleted: 0,
        timeSpentSec: 0,
        difficultyByUnit: {}, // unitId -> wrong count
      },

      // Shop / cosmetics
      ownedItems: defaultOwned,
      equippedSkin: 'skin-classic',
      equippedHat: null,
      equippedBg: null,

      // Parent area
      parentPin: '1234', // default demo PIN — changeable in parent area
      parentSettings: {
        timerEnabled: false,
        timerSeconds: 20,
        soundEnabled: true,
        gentleReminders: true,
      },

      // Session (not critical to persist deeply)
      sessionStartedAt: null,

      // ─── Actions ───────────────────────────────────────────

      completeOnboarding({ childName, direction, uiLang }) {
        set({
          onboarded: true,
          childName: childName || 'Amico',
          direction: direction || 'it-for-en',
          uiLang: uiLang || 'it',
        })
        get().touchStreak()
      },

      setUiLang(uiLang) {
        set({ uiLang })
      },

      setDirection(direction) {
        set({ direction })
      },

      setChildName(childName) {
        set({ childName })
      },

      setParentPin(pin) {
        set({ parentPin: String(pin) })
      },

      updateParentSettings(partial) {
        set((s) => ({
          parentSettings: { ...s.parentSettings, ...partial },
        }))
      },

      /** Call when child opens app / starts practice */
      touchStreak() {
        const today = todayKey()
        const { lastPracticeDate, streak, badges } = get()
        if (lastPracticeDate === today) return

        let next = 1
        if (lastPracticeDate === yesterdayKey()) {
          next = streak + 1
        }
        const newBadges = [...badges]
        if (next >= 3 && !newBadges.includes('streak-3')) newBadges.push('streak-3')
        if (next >= 7 && !newBadges.includes('streak-7')) newBadges.push('streak-7')

        set({
          streak: next,
          lastPracticeDate: today,
          badges: newBadges,
        })
      },

      resetHearts() {
        set({ hearts: MAX_HEARTS })
      },

      loseHeart() {
        const hearts = Math.max(0, get().hearts - 1)
        set({ hearts })
        return hearts
      },

      addXp(amount) {
        const xp = get().xp + amount
        const badges = [...get().badges]
        if (xp >= 100 && !badges.includes('xp-100')) badges.push('xp-100')
        if (xp >= 500 && !badges.includes('xp-500')) badges.push('xp-500')
        set({ xp, badges })
        return amount
      },

      addGems(amount) {
        set({ gems: get().gems + amount })
      },

      /**
       * Track a single answer (stats + hearts). XP is awarded on lesson complete
       * so we don't double-count.
       */
      recordAnswer({ correct, unitId }) {
        const stats = { ...get().stats }
        if (correct) {
          stats.totalCorrect += 1
        } else {
          stats.totalWrong += 1
          if (unitId) {
            stats.difficultyByUnit = {
              ...stats.difficultyByUnit,
              [unitId]: (stats.difficultyByUnit[unitId] || 0) + 1,
            }
          }
          get().loseHeart()
        }
        set({ stats })
      },

      addTimeSpent(sec) {
        set((s) => ({
          stats: { ...s.stats, timeSpentSec: s.stats.timeSpentSec + sec },
        }))
      },

      /**
       * Complete a lesson or unit test.
       * @returns {{ xpEarned, gemsEarned, newBadges, perfect, unlockedUnit }}
       */
      completeLesson({ lessonId, unitId, correctCount, totalCount, isUnitTest }) {
        get().touchStreak()
        const completed = new Set(get().completedLessons)
        const already = completed.has(lessonId)
        completed.add(lessonId)

        const perfect = correctCount === totalCount && totalCount > 0
        let xpEarned = correctCount * XP_PER_CORRECT
        if (perfect) xpEarned += XP_PERFECT_BONUS
        // Don't double-count if replaying: still award reduced XP for practice
        if (already) xpEarned = Math.max(5, Math.floor(xpEarned * 0.3))

        let gemsEarned = already ? 1 : GEMS_PER_LESSON
        if (perfect && !already) gemsEarned += GEMS_PERFECT

        get().addXp(xpEarned)
        get().addGems(gemsEarned)

        const badges = [...get().badges]
        const newBadges = []
        const pushBadge = (id) => {
          if (!badges.includes(id)) {
            badges.push(id)
            newBadges.push(id)
          }
        }
        pushBadge('first-lesson')
        if (perfect) pushBadge('perfect-lesson')

        const stats = {
          ...get().stats,
          lessonsCompleted: already
            ? get().stats.lessonsCompleted
            : get().stats.lessonsCompleted + 1,
        }

        let unlockedUnit = null
        let unlockedUnits = [...get().unlockedUnits]

        if (isUnitTest && !already) {
          pushBadge('first-unit')
          // Unlock next unit
          const unitsOrder = ['saluti', 'famiglia', 'animali']
          const idx = unitsOrder.indexOf(unitId)
          if (idx >= 0 && idx < unitsOrder.length - 1) {
            const nextId = unitsOrder[idx + 1]
            if (!unlockedUnits.includes(nextId)) {
              unlockedUnits.push(nextId)
              unlockedUnit = nextId
            }
          }
        }

        // Auto-unlock unit test when all lessons done
        // (UI handles visibility)

        set({
          completedLessons: [...completed],
          badges,
          stats,
          unlockedUnits,
          hearts: MAX_HEARTS,
        })

        return { xpEarned, gemsEarned, newBadges, perfect, unlockedUnit, already }
      },

      isLessonCompleted(lessonId) {
        return get().completedLessons.includes(lessonId)
      },

      isUnitUnlocked(unitId) {
        return get().unlockedUnits.includes(unitId)
      },

      isUnitTestUnlocked(unitId) {
        const unit = getUnit(unitId)
        if (!unit) return false
        return unit.lessons.every((l) => get().completedLessons.includes(l.id))
      },

      buyItem(itemId) {
        const item = SHOP_ITEMS.find((i) => i.id === itemId)
        if (!item) return { ok: false, reason: 'not-found' }
        const { gems, ownedItems, badges } = get()
        if (ownedItems.includes(itemId)) return { ok: false, reason: 'owned' }
        if (gems < item.price) return { ok: false, reason: 'no-gems' }

        const nextBadges = badges.includes('shopper')
          ? badges
          : [...badges, 'shopper']

        set({
          gems: gems - item.price,
          ownedItems: [...ownedItems, itemId],
          badges: nextBadges,
        })
        return { ok: true }
      },

      equipItem(itemId) {
        const item = SHOP_ITEMS.find((i) => i.id === itemId)
        if (!item) return
        if (!get().ownedItems.includes(itemId)) return
        if (item.type === 'skin') set({ equippedSkin: itemId })
        if (item.type === 'hat') set({ equippedHat: itemId })
        if (item.type === 'background') set({ equippedBg: itemId })
      },

      verifyParentPin(pin) {
        return String(pin) === String(get().parentPin)
      },

      resetProgress() {
        set({
          xp: 0,
          gems: 0,
          hearts: MAX_HEARTS,
          streak: 0,
          lastPracticeDate: null,
          completedLessons: [],
          unlockedUnits: ['saluti'],
          badges: [],
          stats: {
            totalCorrect: 0,
            totalWrong: 0,
            lessonsCompleted: 0,
            timeSpentSec: 0,
            difficultyByUnit: {},
          },
          ownedItems: defaultOwned,
          equippedSkin: 'skin-classic',
          equippedHat: null,
          equippedBg: null,
        })
      },

      // Constants exposed
      MAX_HEARTS,
      XP_PER_CORRECT,
      XP_PERFECT_BONUS,
    }),
    {
      name: 'chloe_it_game_v1',
      storage: createJSONStorage(() => syncStorage),
      partialize: (s) => ({
        onboarded: s.onboarded,
        childName: s.childName,
        direction: s.direction,
        uiLang: s.uiLang,
        xp: s.xp,
        gems: s.gems,
        hearts: s.hearts,
        streak: s.streak,
        lastPracticeDate: s.lastPracticeDate,
        completedLessons: s.completedLessons,
        unlockedUnits: s.unlockedUnits,
        badges: s.badges,
        stats: s.stats,
        ownedItems: s.ownedItems,
        equippedSkin: s.equippedSkin,
        equippedHat: s.equippedHat,
        equippedBg: s.equippedBg,
        parentPin: s.parentPin,
        parentSettings: s.parentSettings,
      }),
    }
  )
)

export function getLevel(xp) {
  return levelFromXp(xp)
}

export function xpToNextLevel(xp) {
  const level = levelFromXp(xp)
  const nextThreshold = 50 * level * level
  const prevThreshold = 50 * (level - 1) * (level - 1)
  return {
    level,
    current: xp - prevThreshold,
    needed: nextThreshold - prevThreshold,
    pct: Math.min(
      100,
      Math.round(((xp - prevThreshold) / (nextThreshold - prevThreshold)) * 100)
    ),
  }
}
