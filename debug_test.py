import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1400, "height": 900})
        
        page.on("console", lambda msg: print(f"[CONSOLE {msg.type}] {msg.text}"))
        page.on("pageerror", lambda exc: print(f"[PAGE ERROR] {exc}"))

        await page.goto("https://dnd5e-nexus.vercel.app", wait_until="networkidle")
        await page.wait_for_timeout(2000)

        # Check what characters are in party
        cards = await page.locator("h3").all_inner_texts()
        print("Characters found on Hub:", cards)

        # Let's click on one of the characters
        first_char = page.locator("text=Jogar com esta Ficha").first
        await first_char.click()
        await page.wait_for_timeout(3000)

        test_path = r"C:\Users\Guilh\.gemini\antigravity\brain\6cb087e7-a1d8-453b-98bf-31a187bdf552\debug_sheet.png"
        await page.screenshot(path=test_path, full_page=False)
        print("Debug screenshot saved.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
