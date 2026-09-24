import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1400, "height": 900})
        await page.goto("https://dnd5e-nexus.vercel.app", wait_until="networkidle")
        await page.wait_for_timeout(2000)

        print("Clicando em 'Criar Nova Ficha'...")
        await page.click("button:has-text('Criar Nova Ficha')")
        await page.wait_for_timeout(1000)

        # Preencher formulário
        await page.fill("input[placeholder='Ex: Thokk, Elora, Valerius...']", "Lyra Estrela-da-Noite")
        await page.fill("input[placeholder='Ex: Guilherme, Lucas, Sarah...']", "Marina")
        
        # Selecionar Elfo e Mago
        selects = page.locator("select")
        await selects.nth(0).select_option(label="Mago")
        await selects.nth(1).select_option(label="Elfo")

        # Submeter
        print("Submetendo nova ficha limpa...")
        await page.click("button:has-text('Criar e Entrar na Ficha')")
        await page.wait_for_timeout(4000)

        test_path = r"C:\Users\Guilh\.gemini\antigravity\brain\6cb087e7-a1d8-453b-98bf-31a187bdf552\ficha_nova_limpa_elfo_mago.png"
        await page.screenshot(path=test_path, full_page=False)
        print(f"Screenshot da Nova Ficha Limpa salvo em {test_path}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
