import { dataService, IBackendService, IInterceptorUtils, ResponseInterceptorFn } from 'web-backend-api';
import { collectionName, turmas } from './turmas.mock';

dataService(collectionName, (dbService: IBackendService) => {

    const responseCriar: ResponseInterceptorFn = (requisicao: IInterceptorUtils): any => {
        console.log(requisicao.body);
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