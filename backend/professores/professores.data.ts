import { collectionName, professores } from 'backend/professores/professores.mock';
import { dataService, IBackendService } from 'web-backend-api';

dataService(collectionName, (dbService: IBackendService) => {

    professores.forEach((professor) => {
        dbService.storeData(collectionName, professor)
    })
});