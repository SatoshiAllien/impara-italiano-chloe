#!/usr/bin/env bash
# Avvia "Impara l'italiano con Chloe" in modalità sviluppo
set -e
cd "$(dirname "$0")"

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

if [ ! -d node_modules ]; then
  echo "📦 Installo le dipendenze..."
  npm install --no-audit --no-fund
  # Binding nativi Linux (evita bug npm optional deps)
  npm install @rollup/rollup-linux-x64-gnu --no-audit --no-fund 2>/dev/null || true
fi

echo "🦉 Avvio Chloe su http://localhost:5173"
npm run dev -- --host
