import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { TurmaFormComponent } from './turma-form.component';

export const routes: Routes = [
    {
        path: '',
        component: TurmaFormComponent,
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