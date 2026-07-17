import { NavLink, Outlet } from 'react-router-dom'
import { Home, User, ShoppingBag, Shield } from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import { useT } from '../lib/i18n'
import { unlockAudio } from '../lib/audio'

const linkClass = ({ isActive }) =>
  `flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-2xl min-w-[64px] font-bold text-xs sm:text-sm transition-colors ${
    isActive
      ? 'bg-violet-100 text-chloe-purple'
      : 'text-chloe-ink/60 hover:bg-white/60'
  }`

export default function Layout() {
  const uiLang = useGameStore((s) => s.uiLang)
  const xp = useGameStore((s) => s.xp)
  const gems = useGameStore((s) => s.gems)
  const streak = useGameStore((s) => s.streak)
  const t = useT(uiLang)

  return (
    <div
      className="min-h-dvh flex flex-col"
      onPointerDown={unlockAudio}
    >
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b-2 border-violet-100 px-3 sm:px-4 py-2">
        <div className="mx-auto max-w-3xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-2xl" aria-hidden>
              🦉
            </span>
            <h1 className="truncate text-base sm:text-lg font-black text-chloe-purple">
              Chloe
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-sm font-extrabold">
            <span
              className="inline-flex items-center gap-1 rounded-full bg-amber-50 border-2 border-amber-200 px-2.5 py-1 text-amber-700"
              title={t('xp')}
            >
              ⭐ {xp}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full bg-sky-50 border-2 border-sky-200 px-2.5 py-1 text-sky-700"
              title={t('gems')}
            >
              💎 {gems}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full bg-orange-50 border-2 border-orange-200 px-2.5 py-1 text-orange-700"
              title={t('streak')}
            >
              🔥 {streak}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-3xl px-3 sm:px-4 py-4 pb-28">
        <Outlet />
      </main>

      {/* Bottom nav — large touch targets */}
      <nav
        className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t-2 border-violet-100 pb-[env(safe-area-inset-bottom)]"
        aria-label="Navigazione principale"
      >
        <div className="mx-auto max-w-3xl flex items-stretch justify-around px-2 py-2">
          <NavLink to="/" end className={linkClass}>
            <Home className="w-6 h-6" />
            {t('home')}
          </NavLink>
          <NavLink to="/profile" className={linkClass}>
            <User className="w-6 h-6" />
            {t('profile')}
          </NavLink>
          <NavLink to="/shop" className={linkClass}>
            <ShoppingBag className="w-6 h-6" />
            {t('shop')}
          </NavLink>
          <NavLink to="/parents" className={linkClass}>
            <Shield className="w-6 h-6" />
            {t('parents')}
          </NavLink>
        </div>
      </nav>
    </div>
  )
}
