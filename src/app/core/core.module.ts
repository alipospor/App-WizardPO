import { NgModule } from '@angular/core';

/* imports */
import { FormularioBase } from './components/turma-form/formulario-base';
import { FormularioStepBase } from './components/turma-form/formulario-step-base';

@NgModule({
    declarations: [
        FormularioBase,
        FormularioStepBase
    ],
    imports: [],
    exports: []
})
export class CoreModule { }