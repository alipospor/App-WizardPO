import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment.back';

@NgModule({
  declarations: [],
  imports: [
    environment.webBackendApi.modulo.forFeature()
  ]
})
export class CoreModule { }