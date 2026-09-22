#!/bin/bash

# Artits Release Validation & Versioning Gatekeeper
# Part of the Infortts Swarm OS

# Ensure we run from the project root
cd "$(dirname "$0")"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}🧬 Artits Release Validation Igniting...${NC}"

# 1. Versioning Check & Bootstrap
VERSION_FILE=".version"
if [ ! -f "$VERSION_FILE" ]; then
    echo "1.0.0" > "$VERSION_FILE"
fi
CURRENT_VERSION=$(cat "$VERSION_FILE" | tr -d '[:space:]')
echo -e "${YELLOW}🔍 Current Version: v$CURRENT_VERSION${NC}"

# 2. Frontend Production Build Verification
echo -e "${YELLOW}📦 Verifying Frontend & Pages Production compilation...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📥 Installing dependencies...${NC}"
    npm install > /dev/null 2>&1
fi

if ! npm run build > /dev/null 2>&1; then
    echo -e "${RED}❌ Artits build failed! Release rejected.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build compiled successfully.${NC}"

# 3. Bump version on successful validation (Epoch.Major.Minor concept)
IFS='.' read -r epoch major minor <<< "$CURRENT_VERSION"
NEW_MINOR=$((minor + 1))
NEW_VERSION="$epoch.$major.$NEW_MINOR"
echo "$NEW_VERSION" > "$VERSION_FILE"

echo -e "\n===================================================="
echo -e "${GREEN}🎉 ARTITS RELEASE VALIDATED & READY FOR PRODUCTION${NC}"
echo -e "Version bumped: v$CURRENT_VERSION -> v$NEW_VERSION"
echo "===================================================="
exit 0
