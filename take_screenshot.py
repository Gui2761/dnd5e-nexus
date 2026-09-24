import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # 1. Screenshot do Hub Inicial (Salão dos Heróis) - Desktop
        page = await browser.new_page(viewport={"width": 1400, "height": 900})
        print("Acessando Salão dos Heróis em https://dnd5e-nexus.vercel.app ...")
        await page.goto("https://dnd5e-nexus.vercel.app", wait_until="networkidle")
        await page.wait_for_timeout(3000)
        
        hub_path = r"C:\Users\Guilh\.gemini\antigravity\brain\6cb087e7-a1d8-453b-98bf-31a187bdf552\salao_herois_hub.png"
        await page.screenshot(path=hub_path, full_page=False)
        print(f"Screenshot do Hub salvo em {hub_path}")

        # 2. Entrar na Ficha clicando no card do herói
        print("Clicando no botão 'Abrir e Jogar com esta Ficha'...")
        play_btn = page.locator("text=Abrir e Jogar com esta Ficha").first
        if await play_btn.is_visible():
            await play_btn.click()
            await page.wait_for_timeout(2000)
            
            # Ajustar zoom para capturar os banners de Ataque e Equipamento
            sheet_path = r"C:\Users\Guilh\.gemini\antigravity\brain\6cb087e7-a1d8-453b-98bf-31a187bdf552\ficha_banners_ataques_equip.png"
            await page.screenshot(path=sheet_path, full_page=False)
            print(f"Screenshot da Ficha com Banners salvo em {sheet_path}")

        # 3. Mobile View do Hub
        page_mobile = await browser.new_page(viewport={"width": 412, "height": 915})
        await page_mobile.goto("https://dnd5e-nexus.vercel.app", wait_until="networkidle")
        await page_mobile.wait_for_timeout(2000)
        mobile_path = r"C:\Users\Guilh\.gemini\antigravity\brain\6cb087e7-a1d8-453b-98bf-31a187bdf552\hub_mobile.png"
        await page_mobile.screenshot(path=mobile_path, full_page=False)
        print(f"Screenshot Mobile do Hub salvo em {mobile_path}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
