import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* PO UI */
import { PoButtonModule } from '@po-ui/ng-components';

/* Components */
import { NovoInputComponent } from './novo-input/novo-input.component';


@NgModule({
  declarations: [
    NovoInputComponent,
  ],
  imports: [
    CommonModule,
    PoButtonModule,
  ],
  exports: [
    NovoInputComponent
  ]
})
export class SharedModule { }
