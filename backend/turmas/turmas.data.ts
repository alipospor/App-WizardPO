import { Turma } from 'src/app/core/interfaces/turma.interface';
import { dataService, IBackendService, IInterceptorUtils, ResponseInterceptorFn } from 'web-backend-api';
import { collectionName, turmas } from './turmas.mock';

dataService(collectionName, (dbService: IBackendService) => {

    const responseIncluir: ResponseInterceptorFn = (requisicao: IInterceptorUtils): any => {
        const bodyAtual: Turma = requisicao.body as Turma;

        const novoBody: Turma = {
            descricao: bodyAtual.descricao,
            anoLetivo: {
                start: bodyAtual.anoLetivo.start,
                end: bodyAtual.anoLetivo.end
            },
            periodoLetivo: bodyAtual.periodoLetivo,
            numeroVagas: bodyAtual.numeroVagas,
            disciplinas: bodyAtual.disciplinas,
            alunos: bodyAtual.alunos,
        };

        /* let putAlunos: Aluno[];

        let putDisciplinas: Disciplina[]; */

        dbService.post$(collectionName, undefined, novoBody, requisicao.url)
    };

    dbService.addRequestInterceptor({
        method: 'POST',
        path: 'api/turmas/criar',
        collectionName: collectionName,
        applyToPath: 'complete',
        response: responseIncluir,
    });

    turmas.forEach((turma) => {
        dbService.storeData(collectionName, turma)
    });
});