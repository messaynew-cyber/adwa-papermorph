#!/usr/bin/env bash
# Dispatch the papermorph workflow. Reads GITHUB_TOKEN from the environment or
# from ~/.openclaw/.env. Prints the run number — never polls it.
#
#   ./run.sh <task> <book> [chapter] [lang] [height] [probe_path]
#   ./run.sh check smoke ch01 en
set -euo pipefail

REPO="messaynew-cyber/adwa-papermorph"
WF="papermorph.yml"

TASK="${1:?task: smoke|lint|check|shot|export}"
BOOK="${2:?book slug}"
CH="${3:-ch01}"
LANG_C="${4:-en}"
HEIGHT="${5:-1080}"
PROBE="${6:-lions-whisker/lion-test.html}"

if [ -z "${GITHUB_TOKEN:-}" ]; then
  GITHUB_TOKEN=$(grep -oE 'ghp_[A-Za-z0-9]{20,}' "$HOME/.openclaw/.env" | head -1)
fi
[ -n "${GITHUB_TOKEN:-}" ] || { echo "no GITHUB_TOKEN"; exit 1; }

curl -s -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/$REPO/actions/workflows/$WF/dispatches" \
  -d "{\"ref\":\"main\",\"inputs\":{\"task\":\"$TASK\",\"book\":\"$BOOK\",\"chapter\":\"$CH\",\"lang\":\"$LANG_C\",\"height\":\"$HEIGHT\",\"probe_path\":\"$PROBE\"}}" \
  -w 'http=%{http_code}\n'

sleep 6
curl -s -H "Authorization: Bearer $GITHUB_TOKEN" \
  "https://api.github.com/repos/$REPO/actions/runs?per_page=3" \
  | python3 -c "
import json,sys
d=json.load(sys.stdin)
for r in d.get('workflow_runs',[])[:3]:
    print(f\"run #{r['run_number']}  {r['status']}/{r['conclusion'] or '-'}  {r['html_url']}\")
"
