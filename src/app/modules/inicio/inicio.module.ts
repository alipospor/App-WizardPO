import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Po-Ui */
import { PoPageModule, PoTableModule } from '@po-ui/ng-components';

/* Components */
import { InicioComponent } from './inicio.component';
import { InicioRoutingModule } from './inicio.routing.module';

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
  ]
})
export class InicioModule { }
