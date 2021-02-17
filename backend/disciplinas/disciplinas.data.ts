import { dataService, IBackendService } from 'web-backend-api';
import { collectionName, disciplinas } from './disciplinas.mock';

dataService(collectionName, (dbService: IBackendService) => {

    disciplinas.forEach((disciplina) => {
        dbService.storeData(collectionName, disciplina)
    })
});