#!/usr/bin/env bash
# Сборка «Подбора вузов» в ../vuzy (GitHub Pages: /Ventorme/vuzy/).
# Обычный путь: npm install && npm run build (Vite).
# Запасной путь без npm: bun ./build.sh — нужны bun и react/react-dom в node_modules.
set -euo pipefail
cd "$(dirname "$0")"
rm -rf ../vuzy
bun build src/main.tsx --production --outdir ../vuzy/assets --target browser \
  --entry-naming 'app-[hash].[ext]' --asset-naming '[name]-[hash].[ext]' \
  --define 'process.env.NODE_ENV="production"'
JS=$(cd ../vuzy/assets && ls app-*.js)
CSS=$(cd ../vuzy/assets && ls app-*.css)
sed -e "s#<script type=\"module\" src=\"/src/main.tsx\"></script>#<script type=\"module\" src=\"./assets/$JS\"></script>#" \
    -e "s#</head>#  <link rel=\"stylesheet\" href=\"./assets/$CSS\" />\n  </head>#" index.html > ../vuzy/index.html
echo "built vuzy/ ($JS, $CSS)"
