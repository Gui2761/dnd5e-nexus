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

        print("Clicando no botão Criar Nova Ficha...")
        create_btn = page.locator("button:has-text('Criar Nova Ficha')")
        await create_btn.click()
        await page.wait_for_timeout(1000)

        # Preenche os campos
        print("Preenchendo nome e jogador...")
        await page.locator("input[placeholder*='Thokk, Elora']").fill("Elora Danan")
        await page.locator("input[placeholder*='Guilherme, Lucas']").fill("Beatriz")

        # Seleciona Mago e Elfo
        print("Selecionando classe e raça...")
        modal = page.locator("div.fixed.inset-0")
        await modal.locator("select").nth(0).select_option("Mago")
        await modal.locator("select").nth(1).select_option("Elfo")

        # Clica em submeter
        print("Submetendo...")
        submit_btn = modal.locator("button[type='submit']")
        await submit_btn.click()

        print("Aguardando carregamento da nova ficha...")
        await page.wait_for_timeout(4000)

        path = r"C:\Users\Guilh\.gemini\antigravity\brain\6cb087e7-a1d8-453b-98bf-31a187bdf552\nova_ficha_criada_elora.png"
        await page.screenshot(path=path, full_page=False)
        print(f"Screenshot salvo em {path}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
