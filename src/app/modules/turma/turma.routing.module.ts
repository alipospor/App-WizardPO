import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { FormTurmaComponent } from './form-turma.component';

export const routes: Routes = [
    {
        path: '',
        component: FormTurmaComponent,
        data: {
            title: 'Abertura Turma'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TurmaRoutingModule { }