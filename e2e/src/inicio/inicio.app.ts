import { $, $$, browser, ElementArrayFinder, ElementFinder } from 'protractor'
import { PageObjects } from '../shared/page.objects';

export class InicioPage {

    get titulo(): ElementFinder {
        return $('.po-page-header-title');
    }

    get menuItens(): ElementArrayFinder {
        return this.pageObjects.menuItens;
    }

    get tabela(): ElementArrayFinder {
        return $$('po-table');
    }

    private pageObjects: PageObjects;
    constructor() {
        this.pageObjects = new PageObjects(this);
    }

    async navigateTo() {
        await this.pageObjects.navigateTo(
            `${browser.baseUrl}inicio`
        );
    }

    async esperarLoading() {
        await this.pageObjects.esperarLoading();
    }

    async restart() {
        await this.pageObjects.restart();
    }
}  