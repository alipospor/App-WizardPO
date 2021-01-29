import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { InicioComponent } from './inicio.component';

export const routes: Routes = [
    {
        path: '',
        component: InicioComponent,
        data: {
            title: 'Início'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InicioRoutingModule { }