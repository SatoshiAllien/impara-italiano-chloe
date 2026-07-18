import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Home, User, ShoppingBag, Shield } from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import { useT } from '../lib/i18n'
import { unlockAudio } from '../lib/audio'
import ThemeToggle from './ThemeToggle'
import { APP_ICON_MANFREDO } from '../lib/characterIcons'

const linkClass = ({ isActive }) =>
  `flex flex-col items-center justify-center gap-0.5 px-2 sm:px-3 py-2 rounded-2xl min-w-[56px] sm:min-w-[64px] font-bold text-[11px] sm:text-sm transition-all ${
    isActive
      ? 'bg-violet-100 text-chloe-purple scale-105'
      : 'text-chloe-ink/60 hover:bg-white/60'
  }`

const rainbowLinkClass = ({ isActive }) =>
  `flex flex-col items-center justify-center gap-0.5 px-2 sm:px-3 py-2 rounded-2xl min-w-[56px] sm:min-w-[64px] font-bold text-[11px] sm:text-sm transition-all ${
    isActive
      ? 'text-white shadow-md scale-105'
      : 'text-chloe-ink/60 hover:bg-white/60'
  }`

export default function Layout() {
  const uiLang = useGameStore((s) => s.uiLang)
  const xp = useGameStore((s) => s.xp)
  const gems = useGameStore((s) => s.gems)
  const streak = useGameStore((s) => s.streak)
  const theme = useGameStore((s) => s.theme)
  const t = useT(uiLang)
  const location = useLocation()
  const onManfredo =
    location.pathname.startsWith('/manfredo') ||
    location.pathname.includes('manfredo-alessandros')
  const brandManfredo = onManfredo || theme === 'rainbow'

  return (
    <div
      className="min-h-dvh flex flex-col"
      onPointerDown={unlockAudio}
    >
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b-2 border-violet-100 px-3 sm:px-4 py-2">
        <div className="mx-auto max-w-3xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {brandManfredo ? (
              <img
                src={APP_ICON_MANFREDO}
                alt="Manfredo"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-pink-300 shadow-md shrink-0 animate-bounce-soft"
                width={36}
                height={36}
              />
            ) : (
              <span className="text-2xl animate-bounce-soft" aria-hidden>
                🦉
              </span>
            )}
            <h1 className="truncate text-base sm:text-lg font-black text-chloe-purple">
              {brandManfredo ? 'Manfredo' : 'Chloe'}
            </h1>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 text-sm font-extrabold">
            <ThemeToggle compact />
            <span
              className="inline-flex items-center gap-1 rounded-full bg-amber-50 border-2 border-amber-200 px-2 sm:px-2.5 py-1 text-amber-700"
              title={t('xp')}
            >
              ⭐ {xp}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full bg-sky-50 border-2 border-sky-200 px-2 sm:px-2.5 py-1 text-sky-700"
              title={t('gems')}
            >
              💎 {gems}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full bg-orange-50 border-2 border-orange-200 px-2 sm:px-2.5 py-1 text-orange-700"
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
        <div className="mx-auto max-w-3xl flex items-stretch justify-around px-1 sm:px-2 py-2">
          <NavLink to="/" end className={linkClass}>
            <Home className="w-6 h-6" />
            {t('home')}
          </NavLink>
          <NavLink
            to="/manfredo"
            className={(props) => {
              const base = rainbowLinkClass(props)
              return props.isActive
                ? `${base} btn-rainbow`
                : base
            }}
          >
            <img
              src={APP_ICON_MANFREDO}
              alt=""
              className="w-6 h-6 rounded-full object-cover ring-1 ring-white shadow"
              width={24}
              height={24}
            />
            {t('manfredo')}
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
