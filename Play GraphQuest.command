#!/bin/zsh
cd -- "${0:A:h}" || exit 1
if command -v node >/dev/null 2>&1; then
  exec node scripts/play-local.mjs --graphquest
elif [[ -x "$HOME/.local/node/bin/node" ]]; then
  exec "$HOME/.local/node/bin/node" scripts/play-local.mjs --graphquest
else
  print 'Node.js 20 or newer is needed. No game packages need to be installed.'
  read 'reply?Press Return to close.'
fi
