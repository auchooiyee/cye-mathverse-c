#!/bin/zsh
cd -- "${0:A:h}" || exit 1
if command -v node >/dev/null 2>&1; then
  node scripts/play-lobby.mjs
elif [[ -x "$HOME/.local/node/bin/node" ]]; then
  "$HOME/.local/node/bin/node" scripts/play-lobby.mjs
else
  print 'Node.js 20 or newer is needed. No game packages need to be installed.'
  read 'reply?Press Return to close / 按 Return 关闭。'
  exit 1
fi
if [[ $? -ne 0 ]]; then
  read 'reply?Press Return to close / 按 Return 关闭。'
fi
