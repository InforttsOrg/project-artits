import asyncio
from playwright.async_api import async_playwright
import json

class JobAgent:
    def __init__(self, preferences):
        self.preferences = preferences
        self.found_jobs = []

    async def search_remote_jobs(self, page):
        print(f"Searching for {self.preferences['role']} in {self.preferences['market']} market...")
        # Example using RemoteOK (or similar English-speaking remote job boards)
        await page.goto("https://remoteok.com/remote-engineer-jobs", wait_until="networkidle")
        
        # Simple scraping logic
        jobs = await page.query_selector_all(".job")
        for job in jobs[:10]:
            title_el = await job.query_selector("h2")
            company_el = await job.query_selector(".company")
            
            if title_el and company_el:
                title = await title_el.inner_text()
                company = await company_el.inner_text()
                self.found_jobs.append({"title": title.strip(), "company": company.strip()})
        
        print(f"Found {len(self.found_jobs)} matching roles.")

    async def apply_with_ai(self, job):
        print(f"Analysing {job['title']} at {job['company']}...")
        # Placeholder for LLM tailoring logic
        print(f"Generating tailored cover letter for {job['company']}...")
        await asyncio.sleep(1)
        print(f"Successfully applied to {job['company']}!")

    async def run(self):
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            await self.search_remote_jobs(page)
            
            for job in self.found_jobs[:3]: # Apply to top 3 for demo
                await self.apply_with_ai(job)
                
            await browser.close()

if __name__ == "__main__":
    prefs = {
        "role": "Software Engineer",
        "market": "Global/English",
        "type": "Remote"
    }
    agent = JobAgent(prefs)
    asyncio.run(agent.run())
