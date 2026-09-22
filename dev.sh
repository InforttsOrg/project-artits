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

PROJECT_NAME="Artits"
TAG_VITE="${BLUE}[VITE]${NC} "
TAG_WORKER="${CYAN}[WORKER]${NC} "

# --- Command Parsing ---
if [ "$1" = "clean" ]; then
    echo -e "${YELLOW}🧹 Cleaning up Artits...${NC}"
    rm -rf node_modules dist .wrangler
    find . -name __pycache__ -type d -prune -exec rm -rf {} + 2>/dev/null || true
    echo -e "${GREEN}✓ Cleaned node_modules, dist, .wrangler, and __pycache__.${NC}"
    exit 0
fi

if [ "$1" = "install" ]; then
    echo -e "${YELLOW}📦 Installing Artits dependencies...${NC}"
    npm install
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

# 1. Start Vite
echo -e "${TAG_VITE}Launching Artits Frontend..."
(npm run dev 2>&1 | sed "s/^/$TAG_VITE/") &

# 2. Start Wrangler (if applicable)
if [ -f "wrangler.toml" ]; then
    echo -e "${TAG_WORKER}Launching Cloudflare Worker locally..."
    (npx wrangler dev 2>&1 | sed "s/^/$TAG_WORKER/") &
fi

echo -e "${BLUE}⌨️  Press Ctrl+C to stop all services.${NC}"

# Keep script running
while true; do
    sleep 1
done
