import { useEffect, useRef, useState } from 'react'
import {
  APP_ICON_MANFREDO,
  APP_ICON_ALESSANDRO,
  MANFREDO_BRAND_VIDEO,
} from '../lib/characterIcons'

/**
 * Funny main brand: looping Manfredo video + Alessandro buddy.
 * Autoplay muted (mobile-safe); tap to unmute for silliness.
 */
export default function ManfredoBrand({
  size = 'md',
  showBuddy = true,
  showCaption = false,
  caption,
  className = '',
  fun = true,
}) {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const [failed, setFailed] = useState(false)
  const [wiggle, setWiggle] = useState(false)

  const dim =
    size === 'xl'
      ? 'w-40 h-40 sm:w-48 sm:h-48'
      : size === 'lg'
        ? 'w-28 h-28'
        : size === 'sm'
          ? 'w-12 h-12'
          : size === 'xs'
            ? 'w-9 h-9'
            : 'w-16 h-16'

  const buddyDim =
    size === 'xl'
      ? 'w-16 h-16 sm:w-20 sm:h-20'
      : size === 'lg'
        ? 'w-12 h-12'
        : size === 'sm'
          ? 'w-7 h-7'
          : size === 'xs'
            ? 'w-6 h-6'
            : 'w-9 h-9'

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.playsInline = true
    const p = v.play()
    if (p?.catch) p.catch(() => {})
  }, [failed])

  function toggleMute(e) {
    e?.preventDefault?.()
    e?.stopPropagation?.()
    const v = videoRef.current
    if (!v) return
    const next = !muted
    setMuted(next)
    v.muted = next
    if (!next) {
      setWiggle(true)
      setTimeout(() => setWiggle(false), 700)
      v.play().catch(() => {})
    }
  }

  const ring =
    'ring-4 ring-pink-300 shadow-lg shadow-pink-300/40'

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      <div className="relative flex items-end">
        {/* Funny sparkle decorations */}
        {fun && size !== 'xs' && size !== 'sm' && (
          <>
            <span
              className="absolute -top-2 -left-2 text-lg animate-bounce-soft z-20"
              aria-hidden
            >
              😂
            </span>
            <span
              className="absolute -top-1 -right-1 text-base animate-wiggle z-20"
              aria-hidden
            >
              🌈
            </span>
            <span
              className="absolute -bottom-1 left-0 text-sm animate-float z-20"
              aria-hidden
            >
              ✨
            </span>
          </>
        )}

        <button
          type="button"
          onClick={toggleMute}
          className={`relative rounded-full overflow-hidden ${dim} ${ring} ${
            fun ? 'animate-bounce-soft' : ''
          } ${wiggle ? 'animate-wiggle' : ''} z-10 border-0 p-0 cursor-pointer bg-pink-100`}
          aria-label={muted ? 'Manfredo video (tap for sound)' : 'Mute Manfredo'}
          title={muted ? 'Tap for silly sound 🔊' : 'Mute 🔇'}
        >
          {/* Rainbow rotating ring */}
          {fun && (
            <span
              className="absolute -inset-1 rounded-full btn-rainbow opacity-70 -z-10 animate-spin-slow"
              style={{ animationDuration: '6s' }}
              aria-hidden
            />
          )}

          {!failed ? (
            <video
              ref={videoRef}
              src={MANFREDO_BRAND_VIDEO}
              className="w-full h-full object-cover"
              autoPlay
              muted={muted}
              loop
              playsInline
              preload="metadata"
              poster={APP_ICON_MANFREDO}
              onError={() => setFailed(true)}
            />
          ) : (
            <img
              src={APP_ICON_MANFREDO}
              alt="Manfredo"
              className="w-full h-full object-cover"
            />
          )}

          {/* Mute badge */}
          {(size === 'lg' || size === 'xl' || size === 'md') && (
            <span className="absolute bottom-0.5 right-0.5 text-[10px] sm:text-xs bg-black/50 text-white rounded-full px-1 leading-tight">
              {muted ? '🔇' : '🔊'}
            </span>
          )}
        </button>

        {showBuddy && (
          <img
            src={APP_ICON_ALESSANDRO}
            alt="Alessandro"
            className={`${buddyDim} rounded-full object-cover ring-2 ring-sky-300 shadow-md -ml-3 mb-0 z-[5] ${
              fun ? 'animate-float' : ''
            }`}
            style={{ animationDelay: '0.4s' }}
          />
        )}
      </div>

      {(showCaption || caption) && (
        <div
          className={`mt-2 max-w-[14rem] text-center font-black text-sm sm:text-base px-3 py-1.5 rounded-2xl bg-white/95 text-chloe-purple border-2 border-pink-200 shadow animate-pop-in ${
            fun ? 'rotate-[-2deg]' : ''
          }`}
        >
          {caption || 'Manfredo says: Impariamo ridendo! 🤣'}
        </div>
      )}
    </div>
  )
}

/** Compact circular video for nav / tiny slots */
export function ManfredoVideoAvatar({ size = 'sm', className = '' }) {
  const ref = useRef(null)
  const [failed, setFailed] = useState(false)

  const dim =
    size === 'lg'
      ? 'w-10 h-10'
      : size === 'md'
        ? 'w-9 h-9'
        : size === 'xs'
          ? 'w-6 h-6'
          : 'w-7 h-7'

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    v.play()?.catch?.(() => {})
  }, [failed])

  if (failed) {
    return (
      <img
        src={APP_ICON_MANFREDO}
        alt=""
        className={`${dim} rounded-full object-cover ring-2 ring-pink-300 shadow ${className}`}
      />
    )
  }

  return (
    <video
      ref={ref}
      src={MANFREDO_BRAND_VIDEO}
      className={`${dim} rounded-full object-cover ring-2 ring-pink-300 shadow ${className}`}
      autoPlay
      muted
      loop
      playsInline
      poster={APP_ICON_MANFREDO}
      onError={() => setFailed(true)}
      aria-hidden
    />
  )
}
