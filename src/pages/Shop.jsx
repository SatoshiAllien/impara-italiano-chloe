import { useState } from 'react'
import Chloe from '../components/Chloe'
import { SHOP_ITEMS } from '../data/shop'
import { useGameStore } from '../store/gameStore'
import { pick, useT } from '../lib/i18n'

export default function Shop() {
  const uiLang = useGameStore((s) => s.uiLang)
  const gems = useGameStore((s) => s.gems)
  const ownedItems = useGameStore((s) => s.ownedItems)
  const equippedSkin = useGameStore((s) => s.equippedSkin)
  const equippedHat = useGameStore((s) => s.equippedHat)
  const equippedBg = useGameStore((s) => s.equippedBg)
  const buyItem = useGameStore((s) => s.buyItem)
  const equipItem = useGameStore((s) => s.equipItem)
  const t = useT(uiLang)
  const [toast, setToast] = useState(null)

  const equipped = { skin: equippedSkin, hat: equippedHat, background: equippedBg }

  const handleBuy = (id) => {
    const res = buyItem(id)
    if (!res.ok) {
      setToast(
        res.reason === 'no-gems'
          ? t('notEnoughGems')
          : uiLang === 'en'
            ? 'Already owned'
            : 'Già posseduto'
      )
      setTimeout(() => setToast(null), 2000)
      return
    }
    equipItem(id)
    setToast(uiLang === 'en' ? 'Yay! New look!' : 'Yay! Nuovo look!')
    setTimeout(() => setToast(null), 2000)
  }

  return (
    <div className="space-y-5">
      <section className="card-kid p-5 flex flex-col items-center gap-3">
        <Chloe
          mood="happy"
          size="lg"
          message={
            uiLang === 'en'
              ? 'Dress me up with gems! 💎'
              : 'Vestimi con le gemme! 💎'
          }
        />
        <p className="font-black text-xl text-sky-600">💎 {gems}</p>
      </section>

      {toast && (
        <div
          className="rounded-2xl bg-violet-100 border-2 border-violet-200 px-4 py-3 text-center font-extrabold text-chloe-purple animate-pop-in"
          role="status"
        >
          {toast}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        {SHOP_ITEMS.map((item) => {
          const owned = ownedItems.includes(item.id)
          const isEquipped =
            equipped[item.type] === item.id ||
            (item.type === 'skin' && equippedSkin === item.id)

          return (
            <div key={item.id} className="card-kid p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                  style={{ background: item.color || '#f3f0ff' }}
                >
                  {item.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold truncate">
                    {pick(item.name, uiLang)}
                  </p>
                  <p className="text-sm font-bold text-chloe-ink/50 capitalize">
                    {item.type}
                    {item.price > 0 ? ` · 💎 ${item.price}` : ` · ${uiLang === 'en' ? 'Free' : 'Gratis'}`}
                  </p>
                </div>
              </div>
              {owned ? (
                <button
                  type="button"
                  className={`btn-kid w-full ${isEquipped ? 'btn-success' : 'btn-secondary'}`}
                  onClick={() => equipItem(item.id)}
                  disabled={isEquipped}
                >
                  {isEquipped ? t('equipped') : t('equip')}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-kid btn-primary w-full"
                  onClick={() => handleBuy(item.id)}
                >
                  {t('buy')} · 💎 {item.price}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
