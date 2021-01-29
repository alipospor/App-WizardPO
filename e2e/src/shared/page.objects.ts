import { $, $$, browser, ElementArrayFinder, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { TermosDeBusca } from './interfaces';

export class PageObjects {

    get loading(): ElementFinder {
        return $$('.po-overlay-absolute').get(0);
    }

    get titulo(): ElementFinder {
        return $('.po-page-header-title');
    }

    get menuItens(): ElementArrayFinder {
        return $$('nav .po-menu-inner div.po-menu-item-wrapper');
    }

    get tabela(): ElementArrayFinder {
        return $$('po-table');
    }

    get botoesAcao(): ElementArrayFinder {
        return $$('.po-page-header-actions po-button');
    }

    get etapas(): ElementArrayFinder {
        return $$('#po-stepper .po-stepper-container .po-stepper-step-position .po-stepper-step-label-position .po-stepper-label');
    }

    get modal(): ElementFinder {
        return $('po-modal');
    }

    constructor(private readonly paginaTeste: any) {
        this.paginaTeste = paginaTeste;
    }

    async navigateTo(url: string): Promise<any> {
        await browser.get(url);
    }

    async esperarLoading() {
        await browser.wait(protractor.ExpectedConditions.visibilityOf(this.loading));
    }

    async prencherSelect(termosDeBusca: TermosDeBusca) {
        const input = termosDeBusca.elementoPai.$(`po-select[formControlName="${termosDeBusca.termo}"]`);
        const botaoAbrirDropdown = input.$('.po-select-container .po-select-button');
        await botaoAbrirDropdown.click();
        const opcao = input.$$('.po-select-content .po-select-item');
        await opcao.get(0).click();
    }

    async preencherMultiSelect(termosDeBusca: TermosDeBusca) {
        const input = termosDeBusca.elementoPai.$$(`po-multiselect[formControlName="${termosDeBusca.termo}"] input`).get(0);
        await input.click();

        const searchInput = termosDeBusca.elementoPai.$(`po-multiselect[formControlName="${termosDeBusca.termo}"] po-multiselect-dropdown po-multiselect-search input`);
        await searchInput.clear();
        await searchInput.sendKeys(termosDeBusca.teclas[0]);

        let opcao = termosDeBusca.elementoPai
            .$(`po-multiselect[formControlName="${termosDeBusca.termo}"] po-multiselect-dropdown .po-multiselect-items-container .po-multiselect-item`);
        await opcao.click();

        await searchInput.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'));
        await searchInput.sendKeys(protractor.Key.BACK_SPACE);
        await searchInput.sendKeys(termosDeBusca.teclas[1]);

        opcao = termosDeBusca.elementoPai.$(`po-multiselect[formControlName="${termosDeBusca.termo}"] po-multiselect-dropdown .po-multiselect-items-container .po-multiselect-item`);
        await opcao.click();
    }

    async restart(): Promise<void> {
        await browser.restart();
    }
}