import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetectorTelaComponent } from './detector-tela/detector-tela.component';

@NgModule({
  declarations: [DetectorTelaComponent],
  imports: [
    CommonModule
  ],
  exports: [DetectorTelaComponent]
})
export class DetectorTelaModule { }
