import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Desktop view (1600px width to capture lateral flanks)
        page = await browser.new_page(viewport={"width": 1600, "height": 1300})
        print("Navigating to https://dnd5e-nexus.vercel.app ...")
        await page.goto("https://dnd5e-nexus.vercel.app", wait_until="networkidle")
        await page.wait_for_timeout(2000)
        
        target_path = r"C:\Users\Guilh\.gemini\antigravity\brain\6cb087e7-a1d8-453b-98bf-31a187bdf552\ficha_oficial_vercel.png"
        await page.screenshot(path=target_path, full_page=False)
        print(f"Desktop screenshot saved to {target_path}")

        # Mobile view
        page_mobile = await browser.new_page(viewport={"width": 412, "height": 915})
        await page_mobile.goto("https://dnd5e-nexus.vercel.app", wait_until="networkidle")
        await page_mobile.wait_for_timeout(2000)
        mobile_path = r"C:\Users\Guilh\.gemini\antigravity\brain\6cb087e7-a1d8-453b-98bf-31a187bdf552\ficha_mobile_vercel.png"
        await page_mobile.screenshot(path=mobile_path, full_page=False)
        print(f"Mobile screenshot saved to {mobile_path}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
