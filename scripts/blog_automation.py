import json
import asyncio
import requests
from playwright.async_api import async_playwright
import os

# --- CONFIGURATION ---
MEDIUM_TOKEN = "YOUR_MEDIUM_INTEGRATION_TOKEN"
MEDIUM_USER_ID = "YOUR_MEDIUM_USER_ID"
MEMORIES_FILE = "memories.json"

async def get_claude_blog(memory_content):
    print("🤖 Prompting Claude Free via Browser...")
    async with async_playwright() as p:
        # Use a persistent context to stay logged in
        # Change the path to your actual browser profile path
        user_data_dir = os.path.expanduser("~/Library/Application Support/Google/Chrome/Default")
        browser = await p.chromium.launch_persistent_context(user_data_dir, headless=False)
        page = await browser.new_page()
        
        await page.goto("https://claude.ai/new")
        
        prompt = f"""
        Act as a professional tech blogger. I will provide a development memory. 
        Write a 500-word insightful blog post for Medium based on it.
        
        IMPORTANT: 
        1. Remove all specific brand names (e.g., company names). Generalize them (e.g., 'a fitness startup').
        2. Make it helpful for other developers.
        3. Title it with a catchy tech headline.
        
        Memory: {memory_content}
        """
        
        # Find the input and send prompt
        await page.wait_for_selector("div[contenteditable='true']")
        await page.fill("div[contenteditable='true']", prompt)
        await page.keyboard.press("Enter")
        
        # Wait for Claude to finish (heuristic: wait for the stop button to disappear or text to stabilize)
        print("Waiting for Claude to finish writing...")
        await asyncio.sleep(30) 
        
        # Scrape the last message
        messages = await page.query_selector_all(".font-claude-message")
        last_message = await messages[-1].inner_text()
        
        await browser.close()
        return last_message

def post_to_medium(title, content):
    print(f"📤 Posting to Medium: {title}")
    url = f"https://api.medium.com/v1/users/{MEDIUM_USER_ID}/posts"
    headers = {
        "Authorization": f"Bearer {MEDIUM_TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    data = {
        "title": title,
        "contentFormat": "markdown",
        "content": content,
        "publishStatus": "draft" # Start as draft for safety
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 201:
        print("✅ Success! Blog posted as draft.")
    else:
        print(f"❌ Failed: {response.text}")

async def main():
    with open(MEMORIES_FILE, 'r') as f:
        memories = json.load(f)
    
    for memory in memories:
        if memory['status'] == 'pending':
            blog_content = await get_claude_blog(memory['content'])
            title = blog_content.split('\n')[0] # Assume first line is title
            post_to_medium(title, blog_content)
            
            # Update status
            memory['status'] = 'posted'
            break # Do one at a time

    with open(MEMORIES_FILE, 'w') as f:
        json.dump(memories, f, indent=4)

if __name__ == "__main__":
    asyncio.run(main())
