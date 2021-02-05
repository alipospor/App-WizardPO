import { NgModule } from '@angular/core';
import { DetectorTelaModule } from './components/detector-tela/detector-tela.module';

/* imports */
import { FormularioStepBase } from './components/turma-form/formulario-step-base';

@NgModule({
    declarations: [
        FormularioStepBase,
        DetectorTelaModule
    ],
    imports: [],
    exports: []
})
export class CoreModule { }