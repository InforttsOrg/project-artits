#!/usr/bin/env python3
"""Generates the Open Graph / Twitter card image for the Artits portfolio.

Design language: Rocky Vision / Acoustic Refraction.
Obsidian base, titanium type, sonar-cyan emissive accents on a blueprint grid.

Run:  python3 dashboard/tool/generate_og_image.py
Out:  dist/assets/og-image.png  (and dashboard/web/assets/og-image.png)
"""

from __future__ import annotations

import pathlib

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (2, 6, 23)  # #020617
PANEL = (12, 20, 38)  # #0c1426
CYAN = (14, 165, 233)  # #0ea5e9
BLUE = (37, 99, 235)  # sonar-blue
TITANIUM = (226, 232, 240)  # #e2e8f0
STEEL = (148, 163, 184)  # #94a3b8

GRID_STEP = 40
OUT_DIRS = [
    pathlib.Path(__file__).resolve().parents[2] / "dist" / "assets",
    pathlib.Path(__file__).resolve().parents[1] / "web" / "assets",
]

FONT_CANDIDATES = {
    "display": [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ],
    "mono": [
        "/System/Library/Fonts/Supplemental/Courier New Bold.ttf",
        "/System/Library/Fonts/Menlo.ttc",
    ],
}


def load_font(kind: str, size: int) -> ImageFont.FreeTypeFont:
    for path in FONT_CANDIDATES[kind]:
        if pathlib.Path(path).exists():
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default()


def blend(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))  # type: ignore[return-value]


def build() -> Image.Image:
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # Blueprint grid, fading toward the bottom-right.
    for x in range(0, W + 1, GRID_STEP):
        t = x / W
        d.line([(x, 0), (x, H)], fill=blend(PANEL, BG, 1 - t * 0.7), width=1)
    for y in range(0, H + 1, GRID_STEP):
        t = y / H
        d.line([(0, y), (W, y)], fill=blend(PANEL, BG, 1 - t * 0.7), width=1)

    # Panel plate behind the wordmark.
    d.rectangle([80, 150, 1120, 480], fill=PANEL, outline=blend(PANEL, CYAN, 0.35), width=2)

    # Emissive channel along the top edge of the plate.
    for i in range(1040):
        t = i / 1040
        d.point((80 + i, 150), fill=blend(CYAN, BLUE, t))

    # Corner brackets, "structural blueprint" motif.
    for cx, cy, dx, dy in ((80, 150, 1, 1), (1120, 150, -1, 1), (80, 480, 1, -1), (1120, 480, -1, -1)):
        d.line([(cx, cy), (cx + dx * 60, cy)], fill=CYAN, width=4)
        d.line([(cx, cy), (cx, cy + dy * 40)], fill=CYAN, width=4)

    # System status line.
    d.ellipse([80, 80, 92, 92], fill=CYAN)
    d.text((104, 78), "SYSTEM_OPERATIONAL // @rttss-sahil",
           font=load_font("mono", 20), fill=STEEL)

    # Wordmark.
    d.text((112, 210), "SAHIL", font=load_font("display", 104), fill=TITANIUM)
    d.text((112, 320), "RATHEE", font=load_font("display", 104), fill=TITANIUM)

    # Role line.
    d.text((116, 444), "ARCHITECT OF INFORTS", font=load_font("mono", 26), fill=CYAN)

    # Divider.
    d.line([(560, 232), (560, 400)], fill=blend(PANEL, CYAN, 0.3), width=2)

    # Skill ticker on the right half of the plate.
    ticker = ["GO", "PYTHON", "KUBERNETES", "TERRAFORM", "NATS", "CLOUDFLARE WORKERS"]
    f = load_font("mono", 22)
    y = 250
    for item in ticker:
        d.text((600, y), item, font=f, fill=blend(STEEL, TITANIUM, 0.35))
        y += 30

    # Footer.
    d.text((80, 540), "Shaping the future of AI-powered SaaS and autonomous trading systems.",
           font=load_font("mono", 22), fill=STEEL)
    d.text((80, 574), "artits.infortts.site", font=load_font("mono", 22), fill=BLUE)

    return img


def main() -> None:
    img = build()
    for out in OUT_DIRS:
        out.mkdir(parents=True, exist_ok=True)
        target = out / "og-image.png"
        img.save(target, "PNG", optimize=True)
        print(f"wrote {target} ({target.stat().st_size // 1024} KiB)")


if __name__ == "__main__":
    main()
