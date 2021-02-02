import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Po-Ui */
import { PoPageModule, PoTableModule } from '@po-ui/ng-components';

/* Components */
import { InicioComponent } from './inicio.component';
import { InicioRoutingModule } from './inicio.routing.module';

/* Services */
import { TurmaFormService } from '../turma/turma-form.service';


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
