#!/bin/bash
# Artits Local Development Orchestrator
# Part of the Infortts Swarm Ecosystem.

# --- Configuration ---
GREEN='\x1b[32m'
BLUE='\x1b[34m'
RED='\x1b[31m'
CYAN='\x1b[36m'
YELLOW='\x1b[33m'
NC='\x1b[0m' # No Color

export PATH="$HOME/flutter/bin:$PATH"

PROJECT_NAME="Artits"
TAG_VITE="${BLUE}[FLUTTER]${NC} "
TAG_WORKER="${CYAN}[WORKER]${NC} "

# --- Command Parsing ---
if [ "$1" = "clean" ]; then
    echo -e "${YELLOW}🧹 Cleaning up Artits...${NC}"
    exit 0
fi

if [ "$1" = "install" ]; then
    echo -e "${YELLOW}📦 Installing Artits dependencies...${NC}"
    (cd dashboard && flutter pub get)
    exit 0
fi

if [ "$1" = "build" ]; then
    echo -e "${YELLOW}🏗️  Building Flutter dashboard...${NC}"
    (cd dashboard && flutter build web --release)
    rm -rf dist && mkdir -p dist
    cp -R dashboard/build/web/. dist/
    echo -e "${GREEN}✅ Staged Flutter build into dist/${NC}"
    exit 0
fi


# --- Functions ---
kill_port() {
    local port=$1
    local pids=$(lsof -ti :$port)
    if [ ! -z "$pids" ]; then
        echo -e " -> Clearing port $port (PIDs: $pids)"
        echo "$pids" | xargs kill -9 2>/dev/null
        sleep 1
    fi
}

cleanup() {
    echo -e "\n${RED}🛑 Shutting down Artits...${NC}"
    kill_port 5173
    kill_port 8787
    exit
}

trap cleanup SIGINT SIGTERM

# --- Initialization ---
echo -e "${CYAN}🚀 Manifesting ${PROJECT_NAME} Environment...${NC}"

# Free ports
kill_port 5173
kill_port 8787

# 1. Flutter dashboard (web dev server)
echo -e "${TAG_VITE}Launching Artits Flutter dashboard..."
(cd dashboard && flutter run -d web-server --web-port 5173 2>&1 | sed "s/^/$TAG_VITE/") &

# 2. Pages Functions + a built copy of the app, if one has been staged
if [ -f "wrangler.toml" ] && [ -f "dist/index.html" ]; then
    echo -e "${TAG_WORKER}Launching Cloudflare Pages Functions locally..."
    (npx wrangler pages dev dist --port 8787 2>&1 | sed "s/^/$TAG_WORKER/") &
elif [ -f "wrangler.toml" ]; then
    echo -e "${YELLOW}⚠️  Run './dev.sh build' first to serve Functions via wrangler.${NC}"
fi

echo -e "${BLUE}⌨️  Press Ctrl+C to stop all services.${NC}"

# Keep script running
while true; do
    sleep 1
done
