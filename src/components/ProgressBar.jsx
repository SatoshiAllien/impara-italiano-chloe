export default function ProgressBar({
  value = 0,
  max = 100,
  label,
  color = 'bg-chloe-purple',
  className = '',
  showPct = false,
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0

  return (
    <div className={`w-full ${className}`}>
      {(label || showPct) && (
        <div className="mb-1 flex justify-between text-sm font-bold text-chloe-ink/70">
          {label && <span>{label}</span>}
          {showPct && <span>{pct}%</span>}
        </div>
      )}
      <div
        className="h-4 w-full rounded-full bg-violet-100 border-2 border-violet-200 overflow-hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progresso'}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
