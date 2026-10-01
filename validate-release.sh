#!/bin/bash

# Artits Release Validation & Versioning Gatekeeper
# Part of the Infortts Swarm OS

# Ensure we run from the project root
cd "$(dirname "$0")"

shopt -s extglob

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Refuse. Every failure path goes through one of these two so the exit status can
# never disagree with the banner printed above it.
fail() {
    echo -e "${RED}❌ $1${NC}"
    echo "validate-release.sh: FAILED"
    exit 1
}

# Refuse before anything has been written, and say so: the Jenkins Docker stage and
# `local .version` both rely on this distinction.
fail_untouched() {
    echo -e "${RED}❌ $1${NC}"
    echo "validate-release.sh: FAILED (.version and package.json left unchanged)"
    exit 1
}

usage() {
    cat <<'EOF'
Usage: ./validate-release.sh [--test-only]

  (no argument)   Validate, then bump the minor field of .version and sync
                  package.json to match. This is the RELEASE path: it writes.
  --test-only     Validate only. Never touches .version or package.json.
  -h, --help      Show this help.

Anything else is rejected. A mistyped flag used to fall through to the release
path, so a typo silently bumped the version and printed "READY FOR PRODUCTION".
EOF
}

# Run a command, keep its output, and only print it if the command fails.
run_step() {
    local label="$1"; shift
    local log
    log="$(mktemp)"
    if "$@" > "$log" 2>&1; then
        rm -f "$log"
        return 0
    fi
    echo "--- ${label} output ---"
    tail -40 "$log"
    rm -f "$log"
    return 1
}

echo -e "${CYAN}🧬 Artits Release Validation Igniting...${NC}"

# --- 0. Arguments: fail closed -------------------------------------------------
# Only --test-only is a known flag. An unknown argument must be an error, never a
# silent version bump — the Jenkins Docker stage calls this script with no flags
# and a typo there would rewrite the release version with nobody asking.
TEST_ONLY=0
case "${1:-}" in
    "") ;;
    --test-only)
        TEST_ONLY=1
        ;;
    -h|--help)
        usage
        exit 0
        ;;
    *)
        echo -e "${RED}❌ Unknown argument: '$1'${NC}"
        usage
        echo "validate-release.sh: FAILED (.version and package.json left unchanged)"
        exit 2
        ;;
esac
if [ "$#" -gt 1 ]; then
    echo -e "${RED}❌ Too many arguments: expected 0 or 1, got $#${NC}"
    usage
    echo "validate-release.sh: FAILED (.version and package.json left unchanged)"
    exit 2
fi

# --- 1. Versioning check ------------------------------------------------------
# .version is the release authority; package.json is kept in step with it.
# It is read and validated BEFORE any arithmetic: an unvalidated value used to
# abort inside $(( )) on a leading zero (1.0.08) or on a non-numeric field
# (abc.def.ghi), and the script carried on to print "READY FOR PRODUCTION" and
# exit 0 after writing a garbage version such as "..1".
VERSION_FILE=".version"
PKG_FILE="package.json"

[ -f "$VERSION_FILE" ] || fail_untouched "$VERSION_FILE is missing — refusing to invent a release version."
[ -f "$PKG_FILE" ]     || fail_untouched "$PKG_FILE is missing — the gate syncs it with $VERSION_FILE and cannot."

CURRENT_VERSION=$(tr -d '[:space:]' < "$VERSION_FILE")
if ! [[ "$CURRENT_VERSION" =~ ^([0-9]{1,4})\.([0-9]{1,4})\.([0-9]{1,4})$ ]]; then
    fail_untouched "$VERSION_FILE holds '$CURRENT_VERSION', which is not a MAJOR.MINOR.PATCH version of 1-4 digits per field."
fi
EPOCH="${BASH_REMATCH[1]}"
MAJOR="${BASH_REMATCH[2]}"
MINOR="${BASH_REMATCH[3]}"
for field in "$EPOCH" "$MAJOR" "$MINOR"; do
    if [ "${#field}" -gt 1 ] && [ "${field:0:1}" = "0" ]; then
        fail_untouched "$VERSION_FILE holds '$CURRENT_VERSION' — a version field may not have a leading zero ('$field')."
    fi
done
echo -e "${YELLOW}🔍 Current Version: v$CURRENT_VERSION${NC}"

# --- 2. Required files --------------------------------------------------------
echo -e "${YELLOW}📋 Verifying required release files...${NC}"
for required in \
    package.json \
    package-lock.json \
    vite.config.ts \
    tsconfig.json \
    tsconfig.functions.json \
    tsconfig.node.json \
    index.html \
    wrangler.toml \
    dev.sh \
    ci/jenkins-common.groovy \
    ci/upload_to_hf.py \
    ci/requirements.txt \
    .github/workflows/deploy.yml \
    .gitignore \
    .env.example \
    README.md
do
    [ -f "$required" ] || fail_untouched "Required release file '$required' is missing."
done
for required_dir in src src/components functions/api; do
    [ -d "$required_dir" ] || fail_untouched "Required directory '$required_dir' is missing."
done
echo -e "${GREEN}✅ All required release files present.${NC}"

# --- 3. Shell + Python syntax -------------------------------------------------
# ci/upload_to_hf.py is the CDN publisher and was previously compiled by nothing,
# so a syntax error in it only surfaced in the middle of a release.
echo -e "${YELLOW}🔬 Checking shell and Python syntax...${NC}"
run_step "bash -n dev.sh" bash -n dev.sh || fail_untouched "dev.sh has a bash syntax error."
if command -v python3 >/dev/null 2>&1; then
    for py in ci/upload_to_hf.py; do
        run_step "py_compile $py" python3 -m py_compile "$py" || fail_untouched "$py failed to byte-compile."
    done
    find . -maxdepth 2 -name __pycache__ -type d -not -path './node_modules/*' -exec rm -rf {} + 2>/dev/null || true
    echo -e "${GREEN}✅ Shell and Python syntax clean.${NC}"
else
    echo -e "${YELLOW}⚠️  python3 not found — ci/upload_to_hf.py was NOT byte-compiled.${NC}"
fi

# --- 4. Frontend production build --------------------------------------------
echo -e "${YELLOW}📦 Verifying Frontend & Pages Production compilation...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📥 Installing dependencies...${NC}"
    run_step "npm install" npm install || fail_untouched "npm install failed — cannot build."
fi
run_step "npm run build" npm run build || fail "Artits build failed! Release rejected."
echo -e "${GREEN}✅ Build compiled successfully.${NC}"

# --- 5. Type checking ---------------------------------------------------------
# Two separate programs: the Vite bundle (tsconfig.json) and the Cloudflare Pages
# Functions (tsconfig.functions.json). The Functions sat outside both tsconfigs and
# had no @cloudflare/workers-types, so KVNamespace / PagesFunction were unresolved
# names that no tooling had ever looked at.
echo -e "${YELLOW}🔎 Type-checking bundle and Pages Functions...${NC}"
[ -x node_modules/.bin/tsc ] || fail "node_modules/.bin/tsc is missing — run 'npm install' (or './dev.sh install') first."
run_step "tsc -p tsconfig.json" node_modules/.bin/tsc --noEmit -p tsconfig.json \
    || fail "tsc failed on tsconfig.json (the Vite bundle in src/)."
run_step "tsc -p tsconfig.functions.json" node_modules/.bin/tsc --noEmit -p tsconfig.functions.json \
    || fail "tsc failed on tsconfig.functions.json (the Pages Functions in functions/)."
echo -e "${GREEN}✅ Type check clean.${NC}"

# --- 6. Lint ------------------------------------------------------------------
# package.json declares --max-warnings 0 and nothing in CI ran it, so enforce it here.
echo -e "${YELLOW}🧹 Running ESLint...${NC}"
run_step "npm run lint" npm run lint \
    || fail "npm run lint reported errors or warnings (the declared policy is --max-warnings 0)."
echo -e "${GREEN}✅ Lint clean.${NC}"

# --- 7. CDN publisher must stay fail-closed ------------------------------------
# ci/upload_to_hf.py writes the manifest that every installed OTA client reads. The
# Jenkins scaffold bot has reverted the hardened publisher to a 140-line template in
# several repos; that template pins versionCode to 1, advertises an apk_url before
# the binary exists, and overwrites the live manifest with a version-only payload.
# Run it here against a STUBBED huggingface_hub — never the real API, never the live
# token cache — and require all three refusals.
echo -e "${YELLOW}🔒 Checking the CDN publisher fails closed...${NC}"
PUBLISHER_LINES=$(wc -l < ci/upload_to_hf.py)
[ "$PUBLISHER_LINES" -ge 200 ] \
    || fail "ci/upload_to_hf.py is only $PUBLISHER_LINES lines — that is the reverted scaffold template, not the hardened publisher."
grep -q "huggingface_hub" ci/requirements.txt \
    || fail "ci/requirements.txt does not declare huggingface_hub, an undeclared runtime dependency of ci/upload_to_hf.py."
if command -v python3 >/dev/null 2>&1; then
    if python3 - "$PWD" <<'PYEOF'
import os, subprocess, sys, tempfile

repo = sys.argv[1]
publisher = os.path.join(repo, "ci", "upload_to_hf.py")
work = tempfile.mkdtemp(prefix="artits-cdn-guard-")
apk = os.path.join(work, "app.apk")
with open(apk, "wb") as fh:
    fh.write(b"not-a-real-apk")

# Stub module: the import succeeds so the publisher reaches its own guards, and any
# network call RAISES, so a fail-open path is detected instead of mocked away.
stub = os.path.join(work, "huggingface_hub.py")
with open(stub, "w") as fh:
    fh.write(
        "class _Boom(Exception):\n    pass\n\n"
        "def HfApi(*a, **k):\n    raise _Boom('guard stub: CDN must not be reached')\n\n"
        "def create_repo(*a, **k):\n    raise _Boom('guard stub: CDN must not be reached')\n"
    )

env = dict(os.environ)
env["PYTHONPATH"] = work
# --token is passed explicitly so get_token() short-circuits before it can read the
# live ~/.cache/huggingface/token that exists on this node.
cases = [
    ("no artifact at all",
     ["--slug", "artits", "--version", "1.0.0+101", "--token", "guard-token"]),
    ("missing --apk file",
     ["--slug", "artits", "--version", "1.0.0+101", "--apk",
      os.path.join(work, "does-not-exist.apk"), "--token", "guard-token"]),
    ("version with no +build",
     ["--slug", "artits", "--version", "1.0.0", "--apk", apk, "--token", "guard-token"]),
]
failed = []
for label, extra in cases:
    proc = subprocess.run([sys.executable, publisher] + extra,
                          cwd=repo, env=env, capture_output=True, text=True)
    out = proc.stdout + proc.stderr
    if proc.returncode != 2:
        failed.append("%s: expected exit 2, got %d" % (label, proc.returncode))
    elif "guard stub" in out:
        failed.append("%s: publisher reached the CDN instead of refusing" % label)

if failed:
    print("ci/upload_to_hf.py no longer fails closed:", file=sys.stderr)
    for line in failed:
        print("  - " + line, file=sys.stderr)
    sys.exit(1)
PYEOF
    then
        echo -e "${GREEN}✅ CDN publisher refuses all three unsafe publishes.${NC}"
    else
        fail "ci/upload_to_hf.py does not fail closed — see the guard output above."
    fi
else
    echo -e "${YELLOW}⚠️  python3 not found — the CDN publisher behaviour was NOT verified.${NC}"
fi

# --- 8. README paths vs disk --------------------------------------------------
# Every backticked path-looking token in the README must exist in the working tree.
# A bare filename (`memories.ts`) is accepted when some tracked file has that
# basename, so the check does not force every mention to be a full path.
echo -e "${YELLOW}📖 Checking README paths against the working tree...${NC}"
REPO_FILES=$(git ls-files 2>/dev/null || find . -type f -not -path './node_modules/*' -not -path './.git/*')
readme_missing=""
while read -r doc_path; do
    [ -n "$doc_path" ] || continue
    if [ -e "$doc_path" ]; then
        continue
    fi
    if [ -n "$(printf '%s\n' "$REPO_FILES" | while read -r tracked; do
              [ "${tracked##*/}" = "${doc_path##*/}" ] && echo "$tracked" && break
          done)" ]; then
        continue
    fi
    readme_missing="$readme_missing $doc_path"
done < <(grep -oE '`[A-Za-z0-9_./-]+\.(ts|tsx|json|toml|sh|yml|py|cjs|css|html)`' README.md \
         | tr -d '`' | sort -u)
[ -z "$readme_missing" ] || fail "README.md documents paths that do not exist:$readme_missing"
echo -e "${GREEN}✅ README paths exist.${NC}"

# --- 9. Version sync drift ----------------------------------------------------
PKG_VERSION=$(sed -n 's/^[[:space:]]*"version":[[:space:]]*"\([^"]*\)".*/\1/p' "$PKG_FILE" | head -1)
[ -n "$PKG_VERSION" ] || fail "Could not read \"version\" out of $PKG_FILE."
if [ "$PKG_VERSION" != "$CURRENT_VERSION" ]; then
    echo -e "${YELLOW}⚠️  $PKG_FILE version ($PKG_VERSION) differs from .version ($CURRENT_VERSION) — config drift.${NC}"
else
    echo -e "${GREEN}✅ package.json version matches .version.${NC}"
fi

if [ "$TEST_ONLY" = "1" ]; then
    echo -e "${GREEN}✅ validate-release.sh: PASS (--test-only, no version bump)${NC}"
    exit 0
fi

# --- 10. Bump version on successful validation -------------------------------
# SemVer MAJOR.MINOR.PATCH: a release bumps MINOR. (The old banner called this an
# "Epoch.Major.Minor concept" while bumping the third field — the comment lied
# about what the script did.)
NEXT_MINOR=$((MINOR + 1))
[ "$NEXT_MINOR" -le 9999 ] \
    || fail "Minor field overflow (v$CURRENT_VERSION -> $NEXT_MINOR) — bump MAJOR by hand."
NEW_VERSION="$EPOCH.$MAJOR.$NEXT_MINOR"

# The write itself is checked. An unwritable .version used to be ignored while the
# run still announced the new version as validated.
printf '%s\n' "$NEW_VERSION" > "$VERSION_FILE" \
    || fail "Could not write $VERSION_FILE — refusing to claim a bump that did not happen."

# Keep package.json in step. It was left at 1.0.8 while .version reached 1.0.9,
# which is the drift reported in step 9.
if [ "$PKG_VERSION" != "$NEW_VERSION" ]; then
    if [ "$PKG_VERSION" = "$CURRENT_VERSION" ]; then
        sed -i.bak "s/^\([[:space:]]*\"version\":[[:space:]]*\)\"$PKG_VERSION\"/\1\"$NEW_VERSION\"/" "$PKG_FILE" \
            && rm -f "$PKG_FILE.bak" \
            && echo -e "${GREEN}✅ Synced $PKG_FILE to $NEW_VERSION.${NC}" \
            || fail "Could not sync $PKG_FILE to $NEW_VERSION (left at $PKG_VERSION)."
    else
        echo -e "${YELLOW}⚠️  $PKG_FILE version ($PKG_VERSION) is not the previous .version — NOT synced, reconcile by hand.${NC}"
    fi
fi

echo -e "\n===================================================="
echo -e "${GREEN}🎉 ARTITS RELEASE VALIDATED & READY FOR PRODUCTION${NC}"
echo -e "Version bumped: v$CURRENT_VERSION -> v$NEW_VERSION"
echo "===================================================="
exit 0
