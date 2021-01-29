import { $, $$, browser, ElementArrayFinder, ElementFinder } from 'protractor';
import { TermosDeBusca } from '../shared/interfaces';
import { PageObjects } from '../shared/page.objects';

export class TurmaPage {

    get titulo(): ElementFinder {
        return this.pageObjects.titulo;
    }

    get menuItens(): ElementArrayFinder {
        return this.pageObjects.menuItens;
    }

    get botoesAcao(): ElementArrayFinder {
        return $$('.po-page-header-actions po-button');
    }

    get etapaTurma(): ElementFinder {
        return $('app-abertura-turma');
    }

    get etapaDisciplina(): ElementFinder {
        return $('app-disciplina-turma');
    }

    get etapaAluno(): ElementFinder {
        return $('app-aluno-turma');
    }

    get etapas(): ElementArrayFinder {
        return this.pageObjects.etapas;
    }

    get novoInput(): ElementFinder {
        return $('app-novo-input');
    }

    get botaoInserirDisciplina(): ElementFinder {
        return $('#inserirDisciplina');
    }

    get modal(): ElementFinder {
        return this.pageObjects.modal;
    }

    private pageObjects: PageObjects;
    constructor() {
        this.pageObjects = new PageObjects(this);
    }

    async navigateTo() {
        await this.pageObjects.navigateTo(
            `${browser.baseUrl}abertura`
        )
    }

    async prencherSelect(termosDeBusca: TermosDeBusca) {
        await this.pageObjects.prencherSelect(termosDeBusca);
    }

    async preencherMultiSelect(termosDeBusca: TermosDeBusca) {
        await this.pageObjects.preencherMultiSelect(termosDeBusca);
    }

    async restart() {
        await this.pageObjects.restart();
    }
}