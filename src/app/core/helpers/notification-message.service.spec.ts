import { TestBed } from '@angular/core/testing'
import { PoNotificationModule, PoNotificationService } from '@po-ui/ng-components';
import { NotificationMessageService } from './notification-message.service'

describe('notification-message.service.spec.ts | NotificationMessageService', () => {
    let service: NotificationMessageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                PoNotificationModule
            ],
            providers: [
                NotificationMessageService
            ]
        })
        service = TestBed.inject(NotificationMessageService);
    })

    it('chamar notificação de SUCESSO', () => {
        spyOn(service['poNotification'], 'success');

        service.mensagemSucesso('sucesso');
        expect(service['poNotification'].success).toHaveBeenCalled();
    });

    it('chamar notificação de ERRO', () => {
        spyOn(service['poNotification'], 'error');

        service.mensagemErro('erro');
        expect(service['poNotification'].error).toHaveBeenCalled();
    });

    it('chamar notificação de DANGER', () => {
        spyOn(service['poNotification'], 'warning');

        service.mensagemDanger('danger');
        expect(service['poNotification'].warning).toHaveBeenCalled();
    });

    it('chamar notificação de INFORMATION', () => {
        spyOn(service['poNotification'], 'information');

        service.mensagemInformation('informacao');
        expect(service['poNotification'].information).toHaveBeenCalled();
    });


})