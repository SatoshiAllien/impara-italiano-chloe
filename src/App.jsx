import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Lesson from './pages/Lesson'
import LessonComplete from './pages/LessonComplete'
import Profile from './pages/Profile'
import Shop from './pages/Shop'
import Parents from './pages/Parents'
import { useGameStore } from './store/gameStore'

function RequireOnboarded({ children }) {
  const onboarded = useGameStore((s) => s.onboarded)
  if (!onboarded) return <Navigate to="/onboarding" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
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
          <Route path="profile" element={<Profile />} />
          <Route path="shop" element={<Shop />} />
          <Route path="parents" element={<Parents />} />
          <Route path="lesson/:unitId/:lessonId" element={<Lesson />} />
          <Route path="lesson-complete" element={<LessonComplete />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
