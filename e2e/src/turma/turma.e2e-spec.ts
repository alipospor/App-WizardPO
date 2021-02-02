import { $, browser, logging } from 'protractor';
import { TurmaPage } from './turma.app';

describe('turma.e2e-spec.ts | TurmaPage', () => {
    let page: TurmaPage;

    beforeEach(async () => {
        page = new TurmaPage();
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

    it('deve conter o titulo da pagina', async () => {
        expect(await page.titulo.getText()).toBe('Abertura Turma');
    });

    it('deve conter os itens do menu de navegação', async () => {
        expect(expect(await page.menuItens.count()).toEqual(2));
    });

    it('deve conter os botoes de ações', async () => {
        page.botoesAcao.each(element => {
            expect(element.isPresent()).toBeTruthy();
        })
        expect(await page.botoesAcao.count()).toEqual(2);
    });

    it('deve permitir cadastrar turma', async () => {
        /* valida a quantidade de etapas */
        expect(await page.etapas.count()).toEqual(4);

        //Etapa 1
        expect(await page.etapaTurma.isPresent()).toBeTruthy();

        const anoLetivo = page.etapaTurma.$('po-datepicker-range[formControlName="anoLetivo"] input');
        expect(await anoLetivo.isPresent()).toBeTruthy();
        await anoLetivo.sendKeys('10/11/2020', '01/01/2023');

        const periodoLetivo = page.etapaTurma.$('po-number[formControlName="periodoLetivo"] input');
        expect(await periodoLetivo.isPresent()).toBeTruthy();
        await periodoLetivo.sendKeys(3);

        const numeroVagas = page.etapaTurma.$('po-number[formControlName="numeroVagas"] input');
        expect(await numeroVagas.isPresent()).toBeTruthy();
        await numeroVagas.sendKeys(1);

        const descricao = page.etapaTurma.$('po-input[formControlName="descricao"] input');
        expect(await descricao.isPresent()).toBeTruthy();
        await descricao.sendKeys('Turma dos Testes');
        /* Fim etapa (1) */
        expect(await page.botoesAcao.get(1).click());

        //Etapa 2
        expect(await page.etapaDisciplina.isPresent()).toBeTruthy();
        await page.preencherMultiSelect({
            elementoPai: page.etapaDisciplina,
            termo: 'disciplinas',
            teclas: ['Bio', 'Por']
        });
        /* Fim etapa (2) */
        expect(await page.botoesAcao.get(2).click());

        //Etapa 3
        expect(await page.etapaAluno.isPresent()).toBeTruthy();

        await page.preencherMultiSelect({
            elementoPai: page.etapaAluno,
            termo: 'alunos',
            teclas: ['Cha', 'Gar']
        });

        expect(await page.botoesAcao.last().click());
        expect(await page.botoesAcao.last().click());
    });

    it('deve permitir cadastrar disciplina', async () => {
        /* valida a quantidade de etapas */
        expect(await page.etapas.count()).toEqual(4);

        //Etapa 1
        expect(await page.etapaTurma.isPresent()).toBeTruthy();
        const anoLetivo = page.etapaTurma.$('po-datepicker-range[formControlName="anoLetivo"] input');
        expect(await anoLetivo.isPresent()).toBeTruthy();
        await anoLetivo.sendKeys('10/11/2020', '01/01/2023');

        const periodoLetivo = page.etapaTurma.$('po-number[formControlName="periodoLetivo"] input');
        expect(await periodoLetivo.isPresent()).toBeTruthy();
        await periodoLetivo.sendKeys(3);

        const numeroVagas = page.etapaTurma.$('po-number[formControlName="numeroVagas"] input');
        expect(await numeroVagas.isPresent()).toBeTruthy();
        await numeroVagas.sendKeys(1);

        const descricao = page.etapaTurma.$('po-input[formControlName="descricao"] input');
        expect(await descricao.isPresent()).toBeTruthy();
        await descricao.sendKeys('Turma dos Testes');
        /* Fim etapa (1) */
        expect(await page.botoesAcao.get(1).click());

        //Etapa 2
        expect(await page.etapaDisciplina.isPresent()).toBeTruthy();
        /* Formulário disciplina */
        const descricaoDisciplina = page.etapaDisciplina.$('po-input[formControlName="descricao"] input');
        expect(await descricaoDisciplina.isPresent()).toBeTruthy();
        await descricaoDisciplina.sendKeys('Nova Disciplina');

        const sigla = page.etapaDisciplina.$('po-input[formControlName="sigla"] input');
        expect(await sigla.isPresent()).toBeTruthy();
        await sigla.sendKeys('NEW')

        const cargaHoraria = page.etapaDisciplina.$('po-number[formControlName="cargaHoraria"] input');
        expect(await cargaHoraria.isPresent()).toBeTruthy();
        await cargaHoraria.sendKeys(3);

        await page.prencherSelect({
            elementoPai: page.etapaDisciplina,
            termo: 'professor',
            teclas: []
        });

        expect(await page.botaoInserirDisciplina.isPresent()).toBeTruthy();
        expect(await page.botaoInserirDisciplina.getText()).toEqual('Cadastrar');
        expect(await page.botaoInserirDisciplina.click());
    });

    it('deve permitir cadastrar professor', async () => {
        /* valida a quantidade de etapas */
        expect(await page.etapas.count()).toEqual(4);

        //Etapa 1
        expect(await page.etapaTurma.isPresent()).toBeTruthy();
        const anoLetivo = page.etapaTurma.$('po-datepicker-range[formControlName="anoLetivo"] input');
        expect(await anoLetivo.isPresent()).toBeTruthy();
        await anoLetivo.sendKeys('10/11/2020', '01/01/2023');

        const periodoLetivo = page.etapaTurma.$('po-number[formControlName="periodoLetivo"] input');
        expect(await periodoLetivo.isPresent()).toBeTruthy();
        await periodoLetivo.sendKeys(3);

        const numeroVagas = page.etapaTurma.$('po-number[formControlName="numeroVagas"] input');
        expect(await numeroVagas.isPresent()).toBeTruthy();
        await numeroVagas.sendKeys(1);

        const descricao = page.etapaTurma.$('po-input[formControlName="descricao"] input');
        expect(await descricao.isPresent()).toBeTruthy();
        await descricao.sendKeys('Turma dos Testes');
        /* Fim etapa (1) */
        expect(await page.botoesAcao.get(1).click());

        //Etapa 2
        expect(await page.etapaDisciplina.isPresent()).toBeTruthy();

        /* Achar botão para abrir o modal */
        const botaoNovo = page.novoInput.$('#novo');
        expect(await botaoNovo.isPresent()).toBeTruthy();
        expect(await botaoNovo.getText()).toEqual('Novo');
        expect(await botaoNovo.click());

        //- Modal
        expect(await page.modal.isPresent()).toBeTruthy();
        const professorModal = page.modal.$('.po-modal .po-modal-content');
        expect(await professorModal.isPresent());

        const professorModalTitle = professorModal.$('.po-modal-header .po-modal-title');
        expect(await professorModalTitle.getText()).toEqual('Cadastro Professor');

        /* Inserção de dados professor */
        const nome = professorModal.$('po-input[formControlName="nome"] input');
        expect(await nome.isPresent()).toBeTruthy();
        await nome.sendKeys('Professor Teste');

        const email = professorModal.$('po-input[formControlName="email"] input');
        expect(await email.isPresent()).toBeTruthy();
        await email.sendKeys('professor@teste.com.br');

        const cpf = professorModal.$('po-input[formControlName="cpf"] input');
        expect(await cpf.isPresent()).toBeTruthy();
        await cpf.sendKeys('000.000.000-00');

        await page.prencherSelect({
            elementoPai: professorModal,
            termo: 'titulacao',
            teclas: []
        });

        const professorAcoesModal = professorModal.$('.po-modal-footer po-button');
        expect(await professorAcoesModal.count()).toEqual(2);

        expect(await professorAcoesModal.get(1).getText()).toEqual('Enviar');
        const botaoEnviar = professorAcoesModal.get(1);
        expect(await botaoEnviar.click());
    });
})