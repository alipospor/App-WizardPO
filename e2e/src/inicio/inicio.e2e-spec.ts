import { browser, logging } from 'protractor';
import { InicioPage } from './inicio.app';

describe('inicio.e2e.spec.ts | InicioPage', () => {
    let page: InicioPage;

    beforeEach(async () => {
        page = new InicioPage();
        await page.navigateTo();
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));

        await page.restart();
    });

    it('deve conter titulo correto da pagina', async () => {
        expect(await page.titulo.getText()).toBe('Início');
    });

    it('deve conter os itens do menu de navegação', async () => {
        expect(await page.menuItens.isPresent()).toBeTruthy();
    });

    it('deve conter tabela de visualização de turmas', async () => {
        expect(await page.tabela.isPresent()).toBeTruthy;
    });

});