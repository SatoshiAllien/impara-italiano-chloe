import { useEffect, useRef, useState } from 'react'
import {
  MANFREDO_BRAND_VIDEO,
  APP_ICON_MANFREDO,
} from '../lib/characterIcons'

/**
 * Full-app funny Manfredo video background.
 * Fixed, muted, looped — content stays readable via frosted overlay.
 */
export default function ManfredoVideoBackground() {
  const ref = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v || failed) return
    v.muted = true
    v.defaultMuted = true
    v.playsInline = true
    const tryPlay = () => v.play()?.catch?.(() => {})
    tryPlay()
    // Retry after first user gesture / visibility
    const onVis = () => {
      if (document.visibilityState === 'visible') tryPlay()
    }
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('pointerdown', tryPlay, { once: true })
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointerdown', tryPlay)
    }
  }, [failed])

  return (
    <div className="manfredo-bg" aria-hidden>
      {!failed ? (
        <video
          ref={ref}
          className="manfredo-bg__video"
          src={MANFREDO_BRAND_VIDEO}
          poster={APP_ICON_MANFREDO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="manfredo-bg__video manfredo-bg__fallback"
          style={{ backgroundImage: `url(${APP_ICON_MANFREDO})` }}
        />
      )}
      {/* Soft wash so text/cards stay kid-readable */}
      <div className="manfredo-bg__overlay" />
      {/* Fun floating bits */}
      <span className="manfredo-bg__emoji manfredo-bg__emoji--1">😂</span>
      <span className="manfredo-bg__emoji manfredo-bg__emoji--2">🌈</span>
      <span className="manfredo-bg__emoji manfredo-bg__emoji--3">✨</span>
      <span className="manfredo-bg__emoji manfredo-bg__emoji--4">🎬</span>
    </div>
  )
}
