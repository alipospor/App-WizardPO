import { map } from 'rxjs/operators';
import { dataService, IBackendService, IInterceptorUtils } from 'web-backend-api';
import { collectionName, disciplinas } from './disciplinas.mock';

dataService(collectionName, (dbService: IBackendService) => {

    const responseComProfessor = (utils: IInterceptorUtils): any => {

        return dbService.get$(collectionName, undefined, utils.query, utils.url).pipe(
            map((response) => {
                response.body.forEach(professorId => {

                });
            })
        )
    };

    dbService.addRequestInterceptor({
        method: 'GET',
        path: 'api/disciplinas/professor',
        collectionName: collectionName,
        applyToPath: 'complete',
        response: responseComProfessor,
    });

    disciplinas.forEach((disciplina) => {
        dbService.storeData(collectionName, disciplina)
    })
});