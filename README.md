# Impara l'italiano con Chloe 🦉

Web app educativa per bambini (6–12 anni) che insegna **italiano per anglofoni** e **inglese per italofoni**, con gamification ispirata a Duolingo e tono sempre incoraggiante.

## Stack

- **React 19** + **Vite 6**
- **Tailwind CSS 4**
- **Zustand** (state + persistenza `localStorage`)
- **React Router 7**
- **Web Speech API** per pronuncia (fallback se `audioUrl` assente)

## Avvio

```bash
cd impara-italiano-chloe
npm install
npm run dev
```

Apri l’URL mostrato da Vite (di solito `http://localhost:5173`).

Build di produzione:

```bash
npm run build
npm run preview
```

## Funzionalità

| Area | Dettaglio |
|------|-----------|
| **Percorso** | Skill tree con 3 unità: Saluti, Famiglia, Animali |
| **Lezioni** | 4 lezioni × unità + test finale (8 esercizi circa) |
| **Esercizi** | Scelta multipla, audio-match, vero/falso, traduzione, fill-blank, ordina parole, abbinamento |
| **XP / Cuori / Streak** | +10 XP a risposta, bonus lezione perfetta, 5 cuori, serie giornaliera |
| **Shop** | Gemme per skin/cappelli di Chloe |
| **Badge** | Prima lezione, streak, XP, unità, shopper… |
| **Genitori** | PIN (default `1234`), stats, timer opzionale, suoni, reset |

## Struttura cartelle

```
src/
  components/          # Chloe, layout, progress, confetti, esercizi
  data/                # units.js, badges.js, shop.js
  lib/                 # storage, audio, i18n
  pages/               # Onboarding, Home, Lesson, Profile, Shop, Parents
  store/gameStore.js   # Zustand + persist
```

## Estendere i contenuti

Aggiungi unità in `src/data/units.js` seguendo lo schema esistente. Ogni esercizio ha un `type` supportato da `ExerciseRenderer`. Campo opzionale `audioUrl` per file audio reali.

## Persistenza e backend futuro

Lo state è salvato in `localStorage` (`chloe_it_game_v1`).  
Il layer `src/lib/storage.js` espone `setStorageAdapter()` per collegare Firebase/Supabase senza riscrivere i componenti.

## Sicurezza bambini

- Nessuna pubblicità o tracker
- Nessun link esterno nell’area bambino
- Area genitori protetta da PIN
- Dati solo locali (demo COPPA/GDPR-kids friendly by design)

## Licenza

Progetto demo educativo — uso libero per apprendimento e personalizzazione.
