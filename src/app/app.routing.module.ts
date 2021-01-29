import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Modules */

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./modules/inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: 'abertura',
    loadChildren: () => import('./modules/turma/turma.module').then(m => m.TurmaModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
