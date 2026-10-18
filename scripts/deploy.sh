#!/usr/bin/env bash
# Trigger a Cloudflare Pages deployment for ratekit and verify it went live.
# Requires: CLOUDFLARE_API_TOKEN (Pages:Edit) in the environment. Never hardcode it here.
set -euo pipefail

ACCOUNT_ID="23a4323a108085687a2445b02cbc5f0c"
PROJECT="ratekit"
API="https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}"

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "ERROR: CLOUDFLARE_API_TOKEN is not set in this shell." >&2
  echo "  export CLOUDFLARE_API_TOKEN=\"...\"   (get/rotate at https://dash.cloudflare.com/profile/api-tokens)" >&2
  exit 1
fi

auth() { curl -s -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" "$@"; }

echo "==> Checking for uncommitted changes"
cd "$(dirname "$0")/.."
if [ -n "$(git status --porcelain)" ]; then
  echo "ERROR: working tree is dirty. Commit or stash before deploying." >&2
  git status --short >&2
  exit 1
fi

LOCAL_SHA="$(git rev-parse HEAD)"
LOCAL_SHA_SHORT="${LOCAL_SHA:0:7}"
echo "==> Deploying commit ${LOCAL_SHA_SHORT} ($(git log -1 --format=%s))"

RESP="$(auth -X POST "${API}/deployments")"
SUCCESS="$(echo "$RESP" | python -c "import sys,json; print(json.load(sys.stdin).get('success'))")"
if [ "$SUCCESS" != "True" ]; then
  echo "ERROR: deployment trigger failed:" >&2
  echo "$RESP" >&2
  exit 1
fi

DEPLOY_ID="$(echo "$RESP" | python -c "import sys,json; print(json.load(sys.stdin)['result']['id'])")"
echo "==> Deployment queued: ${DEPLOY_ID}"

echo "==> Waiting for deploy stage to finish (max 3 min)"
for i in $(seq 1 36); do
  sleep 5
  D="$(auth "${API}/deployments/${DEPLOY_ID}")"
  STAGE="$(echo "$D" | python -c "import sys,json; print(json.load(sys.stdin)['result']['latest_stage']['name'])")"
  STATUS="$(echo "$D" | python -c "import sys,json; print(json.load(sys.stdin)['result']['latest_stage']['status'])")"
  echo "    [$i/36] stage=${STAGE} status=${STATUS}"
  if [ "$STAGE" = "deploy" ] && [ "$STATUS" = "success" ]; then
    echo "==> Deploy stage succeeded"
    break
  fi
  if [ "$STATUS" = "failure" ]; then
    echo "ERROR: deployment failed at stage ${STAGE}" >&2
    exit 1
  fi
done

echo "==> Smoke-testing production"
FAIL=0

check_title() {
  local path="$1" expect="$2"
  local got
  got="$(curl -s "https://ratekit.org${path}" | grep -o '<title>[^<]*' | head -1)"
  if echo "$got" | grep -qF "$expect"; then
    echo "  OK   ${path} -> ${got#<title>}"
  else
    echo "  FAIL ${path} -> expected '${expect}', got '${got#<title>}'"
    FAIL=1
  fi
}

check_json() {
  local path="$1"
  local got
  got="$(curl -s "https://ratekit.org${path}" | head -c 1)"
  if [ "$got" = "{" ]; then
    echo "  OK   ${path} -> JSON"
  else
    echo "  FAIL ${path} -> not JSON (got: ${got})"
    FAIL=1
  fi
}

check_title "/" "RateKit"
check_title "/budget-calculator" "Cash Flow Calculator"
check_title "/ru/budget-calculator" "Калькулятор бюджета"
check_title "/roi-calculator" "ROI Calculator"
check_json "/api/roi?investment=1000&returns=1500&months=12"
check_json "/api/budget?revenue=100000&costs=50000&startingCash=500000"

if [ "$FAIL" -ne 0 ]; then
  echo "==> SMOKE TEST FAILED — check output above" >&2
  exit 1
fi

echo "==> All checks passed. Live at https://ratekit.org (deploy ${DEPLOY_ID:0:8})"

echo "==> Pinging IndexNow (Bing/Yandex re-crawl)"
INDEXNOW_KEY="c3c61715fcbab3ef21315f7fb39f0f6c"
URLS_JSON="$(grep -oE '<loc>[^<]+</loc>' public/sitemap.xml | sed -E 's#</?loc>##g' | python -c "
import sys, json
print(json.dumps([l.strip() for l in sys.stdin if l.strip()]))
")"
INDEXNOW_RESP="$(curl -s -o /dev/null -w "%{http_code}" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "{\"host\":\"ratekit.org\",\"key\":\"${INDEXNOW_KEY}\",\"keyLocation\":\"https://ratekit.org/${INDEXNOW_KEY}.txt\",\"urlList\":${URLS_JSON}}")"
if [ "$INDEXNOW_RESP" = "200" ] || [ "$INDEXNOW_RESP" = "202" ]; then
  echo "    IndexNow accepted (HTTP ${INDEXNOW_RESP})"
else
  echo "    IndexNow returned HTTP ${INDEXNOW_RESP} (non-fatal, deploy already succeeded)"
fi
