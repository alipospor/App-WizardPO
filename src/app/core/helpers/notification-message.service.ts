import { Injectable } from '@angular/core';
import { PoNotification, PoNotificationService, PoToasterOrientation } from '@po-ui/ng-components';

@Injectable()
export class NotificationMessageService {

  constructor(
    private poNotification: PoNotificationService
  ) { }


  public mensagemSucesso(mensagem: string) {
    const configuracao = this.configuracaoNotificacao(mensagem);

    this.poNotification.success(configuracao);
  }

  public mensagemErro(mensagem: string) {
    const configuracao = this.configuracaoNotificacao(mensagem);

    this.poNotification.error(configuracao);
  }

  public mensagemDanger(mensagem: string) {
    const configuracao = this.configuracaoNotificacao(mensagem);

    this.poNotification.warning(configuracao);
  }

  public mensagemInformation(mensagem: string) {
    const configuracao = this.configuracaoNotificacao(mensagem);

    this.poNotification.information(configuracao);
  }

  //Retorna as configurações da minha notificação \o/
  private configuracaoNotificacao(mensagem: string) {
    const config: PoNotification = {
      message: mensagem,
      orientation: PoToasterOrientation.Bottom,
      duration: 2400
    };

    return config;
  }
}
