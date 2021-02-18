import { ITurmaCriar } from 'src/app/core/interfaces/backend/turmas/turma-criar.interface';
import { dataService, IBackendService, IInterceptorUtils, ResponseInterceptorFn } from 'web-backend-api';
import { IAlunoGet } from '../../src/app/core/interfaces/backend/alunos/aluno-get.interface';
import { IDisciplinaGet } from '../../src/app/core/interfaces/backend/disciplina/disciplina-get.interface';
import { ITurmaGet } from '../../src/app/core/interfaces/backend/turmas/turma-get.interface';
import { collectionName, turmas } from './turmas.mock';

dataService(collectionName, (dbService: IBackendService) => {

    const responseCriar: ResponseInterceptorFn = (requisicao: IInterceptorUtils): any => {
        const bodyAtual: ITurmaCriar = requisicao.body;
        const alunos = bodyAtual.alunos as IAlunoGet[];
        const disciplinas = bodyAtual.disciplinas as IDisciplinaGet[];

        const listaDisciplina: IDisciplinaGet[] = [];
        const listaAlunos: IAlunoGet[] = [];

        alunos.forEach((aluno) => {
            const registro: IAlunoGet = {
                nome: aluno.nome,
                email: aluno.email,
                cpf: aluno.cpf,
                matricula: aluno.matricula,
                formaIngresso: aluno.formaIngresso,
                turma: aluno.turma,
            }

            listaAlunos.push(registro)
        });


        const novoBody: ITurmaGet = {
            descricao: bodyAtual.descricao,
            anoLetivo: {
                start: bodyAtual.anoLetivo.start,
                end: bodyAtual.anoLetivo.end
            },
            periodoLetivo: bodyAtual.periodoLetivo,
            numeroVagas: bodyAtual.numeroVagas,
            disciplinas: '',
            alunos: listaAlunos,
        };

        return dbService.post$(collectionName, undefined, novoBody, requisicao.url);
    };

    dbService.addRequestInterceptor({
        method: 'POST',
        path: 'api/turmas',
        collectionName: collectionName,
        applyToPath: 'complete',
        response: responseCriar,
    });

    turmas.forEach((turma) => {
        dbService.storeData(collectionName, turma)
    });
});