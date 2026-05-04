import asyncio
from playwright.async_api import async_playwright
import os

async def generate_pdf():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        # Navigate to the live site or local dev server
        url = "https://artits.infortts.com/"
        print(f"Navigating to {url}...")
        await page.goto(url, wait_until="networkidle")
        
        # Add a small delay for any animations to settle
        await asyncio.sleep(2)
        
        output_path = "Sahil_Rathee_Resume.pdf"
        print(f"Generating PDF at {output_path}...")
        
        await page.pdf(
            path=output_path,
            format="A4",
            print_background=True,
            margin={"top": "0px", "right": "0px", "bottom": "0px", "left": "0px"}
        )
        
        await browser.close()
        print("Done!")

if __name__ == "__main__":
    asyncio.run(generate_pdf())
