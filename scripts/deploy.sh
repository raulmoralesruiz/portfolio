#!/usr/bin/env bash
# Deploy del portfolio → TrueNAS (red local)
#
# Uso:
#   npm run deploy          # build + sync a TrueNAS
#   npm run deploy:dry      # dry-run: muestra lo que se transferiría, sin tocar nada
#   NO_BUILD=1 npm run deploy   # sync sin reconstruir (dist/ ya existe)
#   NO_DELETE=1 npm run deploy  # no borrar archivos obsoletos del destino
#
# Config (una sola vez): copia .deployrc.example a .deployrc y rellena:
#   DEPLOY_HOST  IP u hostname de TrueNAS en la LAN (ej. 192.168.1.10)
#   DEPLOY_USER  usuario SSH con escritura en la ruta destino
#   DEPLOY_PATH  (opcional, por defecto /mnt/data-nas/www/portfolio)

set -euo pipefail
cd "$(dirname "$0")/.."

# --- config ----------------------------------------------------------------
if [[ -f .deployrc ]]; then
  # shellcheck disable=SC1091
  source .deployrc
fi

DEPLOY_HOST="${DEPLOY_HOST:-}"
DEPLOY_USER="${DEPLOY_USER:-$USER}"
DEPLOY_PATH="${DEPLOY_PATH:-/mnt/data-nas/www/portfolio}"

if [[ -z "$DEPLOY_HOST" ]]; then
  echo "error: DEPLOY_HOST no definido." >&2
  echo "  cp .deployrc.example .deployrc  # y rellena host/usuario" >&2
  exit 1
fi

DRY_RUN="${DRY_RUN:-0}"
NO_DELETE="${NO_DELETE:-0}"
NO_BUILD="${NO_BUILD:-0}"

# --- build -----------------------------------------------------------------
if [[ "$NO_BUILD" == "1" ]]; then
  echo "→ omitiendo build (NO_BUILD=1)"
else
  echo "→ npm run build"
  npm run build
fi

if [[ ! -d dist ]]; then
  echo "error: dist/ no existe. Ejecuta npm run build primero." >&2
  exit 1
fi

# --- conectividad SSH (fail fast con mensaje útil) --------------------------
if ! ssh -o BatchMode=yes -o ConnectTimeout=5 -o StrictHostKeyChecking=accept-new \
     "${DEPLOY_USER}@${DEPLOY_HOST}" true 2>/dev/null; then
  echo "error: no hay acceso SSH sin contraseña a ${DEPLOY_USER}@${DEPLOY_HOST}." >&2
  echo "  Una sola vez:  ssh-copy-id ${DEPLOY_USER}@${DEPLOY_HOST}" >&2
  exit 1
fi

# --- rsync -----------------------------------------------------------------
RSYNC=(rsync -az --stats --mkpath)
[[ "$DRY_RUN" == "1" ]] && RSYNC+=(--dry-run)
[[ "$NO_DELETE" != "1" ]] && RSYNC+=(--delete)

DEST="${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"
echo "→ rsync dist/ → ${DEST}"
"${RSYNC[@]}" dist/ "$DEST"

if [[ "$DRY_RUN" == "1" ]]; then
  echo "✓ dry-run completo (no se transfirió nada)"
else
  echo "✓ deploy completado"
fi
