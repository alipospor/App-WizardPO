import { IAluno } from 'src/app/core/interfaces/backend/get-aluno.interface';
import { dataService, IBackendService, IInterceptorUtils, ResponseInterceptorFn } from 'web-backend-api';
import { alunos, collectionName } from './alunos.mock';

dataService(collectionName, (dbService: IBackendService) => {

    const responseCriar: ResponseInterceptorFn = (requisicao: IInterceptorUtils): any => {
        const bodyAtual: IAluno = requisicao.body;

        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA')
        console.log(bodyAtual)

        const novoBody: IAluno = {
            nome: bodyAtual.nome,
            email: bodyAtual.email,
            cpf: bodyAtual.cpf,
            matricula: bodyAtual.matricula,
            formaIngresso: bodyAtual.formaIngresso,
            turma: bodyAtual.turma,
        };

        return dbService.post$(collectionName, undefined, novoBody, requisicao.url);
    };

    dbService.addRequestInterceptor({
        method: 'POST',
        path: 'api/alunos',
        collectionName: collectionName,
        applyToPath: 'complete',
        response: responseCriar,
    });

    alunos.forEach((aluno) => {
        dbService.storeData(collectionName, aluno)
    });
});