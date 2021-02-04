import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Po-Ui */
import { PoPageModule, PoTableModule } from '@po-ui/ng-components';

/* Components */
import { InicioComponent } from './inicio.component';
import { InicioRoutingModule } from './inicio.routing.module';
import { TurmaFormService } from 'src/app/core/services/http/turma-form.service';

/* Services */


@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,

    PoPageModule,
    PoTableModule,

    InicioRoutingModule
  ],
  providers: [
    TurmaFormService
  ]
})
export class InicioModule { }
