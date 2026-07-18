import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import ManfredoVideoBackground from './components/ManfredoVideoBackground'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Lesson from './pages/Lesson'
import LessonComplete from './pages/LessonComplete'
import Profile from './pages/Profile'
import Shop from './pages/Shop'
import Parents from './pages/Parents'
import Manfredo from './pages/Manfredo'
import { useGameStore } from './store/gameStore'
import { getDefaultUnlockedUnits } from './modules/registry'

function RequireOnboarded({ children }) {
  const onboarded = useGameStore((s) => s.onboarded)
  if (!onboarded) return <Navigate to="/onboarding" replace />
  return children
}

/** Apply theme + ensure modular units are unlocked for existing saves */
function Bootstrap() {
  const theme = useGameStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      theme === 'rainbow' ? 'rainbow' : 'classic'
    )
  }, [theme])

  useEffect(() => {
    const defaults = getDefaultUnlockedUnits()
    const current = useGameStore.getState().unlockedUnits
    const missing = defaults.filter((id) => !current.includes(id))
    if (missing.length === 0) return
    useGameStore.setState({
      unlockedUnits: [...current, ...missing],
    })
  }, [])

  return null
}

export default function App() {
  // Works on GitHub Pages (/impara-italiano-chloe/) and local dev (/)
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

  return (
    <BrowserRouter basename={basename}>
      {/* Funny Manfredo video behind the entire app */}
      <ManfredoVideoBackground />
      <Bootstrap />
      <div className="relative z-[1] min-h-dvh">
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route
            element={
              <RequireOnboarded>
                <Layout />
              </RequireOnboarded>
            }
          >
            <Route index element={<Home />} />
            <Route path="manfredo" element={<Manfredo />} />
            <Route path="profile" element={<Profile />} />
            <Route path="shop" element={<Shop />} />
            <Route path="parents" element={<Parents />} />
            <Route path="lesson/:unitId/:lessonId" element={<Lesson />} />
            <Route path="lesson-complete" element={<LessonComplete />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
