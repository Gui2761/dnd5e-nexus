import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # 1. Screenshot do Hub com os novos botões de Excluir nos cards
        page = await browser.new_page(viewport={"width": 1400, "height": 900})
        print("Acessando Salão dos Heróis em https://dnd5e-nexus.vercel.app ...")
        await page.goto("https://dnd5e-nexus.vercel.app", wait_until="networkidle")
        await page.wait_for_timeout(3000)
        
        hub_path = r"C:\Users\Guilh\.gemini\antigravity\brain\6cb087e7-a1d8-453b-98bf-31a187bdf552\hub_com_excluir.png"
        await page.screenshot(path=hub_path, full_page=False)
        print(f"Screenshot do Hub salvo em {hub_path}")

        # 2. Abrir ficha do primeiro personagem para conferir os ataques e iniciativa 100% editáveis
        play_btn = page.locator("text=Jogar com esta Ficha").first
        if await play_btn.is_visible():
            await play_btn.click()
            await page.wait_for_timeout(2000)
            
            sheet_path = r"C:\Users\Guilh\.gemini\antigravity\brain\6cb087e7-a1d8-453b-98bf-31a187bdf552\ficha_editavel_ataques_iniciativa.png"
            await page.screenshot(path=sheet_path, full_page=False)
            print(f"Screenshot da Ficha Editável salvo em {sheet_path}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
