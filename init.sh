#!/bin/bash
export PATH="/opt/homebrew/bin:$PATH"
echo "[+] Initializing Portfolio with Vite..."
/opt/homebrew/bin/npx -y create-vite@latest . --template react-ts
echo "[+] Installing Premium UI stack..."
/opt/homebrew/bin/npm install gsap framer-motion lucide-react clsx tailwind-merge
echo "[+] Setup complete."
