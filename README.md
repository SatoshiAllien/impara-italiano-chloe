# Impara l'italiano con Chloe 🦉🌈

Web app educativa per bambini (6–12 anni) che insegna **italiano per anglofoni** e **inglese per italofoni**, con gamification ispirata a Duolingo e tono sempre incoraggiante.

**Novità:** modulo **“Impara con Manfredo e i suoi Alessandri”** — percorso A1 colorato, inclusivo e LGBTQ+ friendly, con icone personaggio sostituibili.

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
| **Percorso Chloe** | Skill tree con 3 unità: Saluti, Famiglia, Animali |
| **Modulo Manfredo** | Intro, personaggi, dialoghi, vocabolario A1, 4 lezioni + test |
| **Lezioni** | Esercizi multipli (scelta, audio-match, fill-blank, …) |
| **XP / Cuori / Streak** | +10 XP a risposta, bonus lezione perfetta, 5 cuori, serie giornaliera |
| **Tema arcobaleno** | Toggle LGBTQ+ friendly (header) |
| **Icone custom** | Sostituisci PNG/SVG senza toccare il codice |
| **Shop / Badge / Genitori** | Gemme, skin Chloe, PIN area genitori |

## Modulo: Manfredo & Alessandri

Percorso parallelo al curriculum classico:

1. **Intro sceneggiata** con Manfredo e gli Alessandri  
2. **Profili personaggio** (Manfredo, Alessandro Blu / Verde / Rosa)  
3. **Dialoghi A1** amichevoli  
4. **Liste vocabolario** (saluti, cortesia, emozioni, famiglia arcobaleno)  
5. **Lezioni interattive** compatibili con il motore esercizi esistente  
6. **Placeholder audio** (`audioUrl: null` → speech synthesis)

### Navigazione

- Bottom nav: **Manfredo** (icona arcobaleno)
- Home: card colorata “Nuovo modulo”
- Route: `/manfredo`
- Lezioni: `/lesson/manfredo-alessandros/<lessonId>`

### Uso rapido

1. Completa l’onboarding  
2. Dalla Home apri la card **Manfredo & Alessandri**, oppure tocca **Manfredo** nella nav  
3. Scorri l’intro, esplora Personaggi / Dialoghi / Vocabolario  
4. Avvia le lezioni in ordine  
5. (Opzionale) attiva il **tema arcobaleno** dal toggle in alto  

## Icone personalizzate (Manfredo + Alessandri)

Sostituisci i file placeholder — **nessuna modifica al codice**:

| Personaggio | Cartella | Nomi file accettati |
|-------------|----------|---------------------|
| Manfredo (**main app face**) | `public/assets/manfredo/` | `manfredo.png` (primary), also `manfredo.svg` / `.webp` / `.jpg` |
| Alessandro Blu | `public/assets/alessandros/` | `alessandro-1.svg` / `.png` … |
| Alessandro Verde | `public/assets/alessandros/` | `alessandro-2.svg` / `.png` … |
| Alessandro Rosa | `public/assets/alessandros/` | `alessandro-3.svg` / `.png` … |

Suggerimenti:

- Preferisci **quadrate** (es. 256×256 o 512×512), volto centrato  
- SVG o PNG con trasparenza  
- Dopo la sostituzione, ricarica l’app (hard refresh se serve)

Loader: `src/lib/characterIcons.js` (`getCharacterIconUrl`, fallback emoji).

## Tema Duolingo + arcobaleno

- Bottoni arrotondati “kid” con ombra 3D (stile Duolingo)  
- Gradienti vivaci e animazioni soft (`pop-in`, `float`, `bounce-soft`)  
- Toggle **Arcobaleno 🏳️‍🌈** nell’header → `data-theme="rainbow"` su `<html>`  
- Preferenza salvata in `localStorage` (`theme` nello store Zustand)

Config colori: `src/index.css` (`@theme`, `.btn-rainbow`, `.module-card-rainbow`, `html[data-theme="rainbow"]`).

## Espandere lezioni e moduli

Struttura modulare:

```
src/modules/
  registry.js                 # registra nuovi moduli
  common-lessons/
    lesson-template.js        # copia-incolla per nuove lezioni
    metadata.json             # schema campi lesson/module
  manfredo-alessandros/
    index.js                  # export del modulo
    intro.js
    characters.js
    dialogues.js
    vocabulary.js
    lessons.js                # unità + esercizi
    metadata.json
```

### Aggiungere un modulo

1. Crea `src/modules/mio-modulo/` (usa `common-lessons/lesson-template.js`)  
2. Esporta un oggetto modulo (vedi `manfredo-alessandros/index.js`)  
3. Registralo in `src/modules/registry.js` → array `MODULES`  
4. Se l’unità deve essere giocabile da `/lesson/...`, importala anche in `src/data/units.js` → `getAllCurriculumUnits()`  
5. (Opzionale) aggiungi route/card dedicata  

Campi chiave modulo: `id`, `title`, `description`, `emoji`, `color`, `gradient`, `rainbowFriendly`, `unlockedByDefault`, `units`.

## Struttura cartelle

```
public/assets/
  manfredo/            # icone custom Manfredo
  alessandros/         # icone custom Alessandri
src/
  components/          # Chloe, Layout, CharacterAvatar, ThemeToggle, esercizi
  data/                # units.js (classico + merge moduli), badges, shop
  lib/                 # storage, audio, i18n, characterIcons
  modules/             # moduli espandibili
  pages/               # Home, Manfredo, Lesson, Profile, Shop, Parents…
  store/gameStore.js   # Zustand + tema + progressi
```

## Screenshot (placeholder)

> Aggiungi qui le tue screenshot dopo il primo run:

- `docs/screenshots/home.png` — Home con card Manfredo  
- `docs/screenshots/manfredo.png` — Hub modulo arcobaleno  
- `docs/screenshots/lesson.png` — Esercizio in corso  
- `docs/screenshots/rainbow-theme.png` — Tema LGBTQ+ attivo  

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
