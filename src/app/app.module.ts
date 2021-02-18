import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Po Ui */
import { PoModule } from '@po-ui/ng-components';

/* Modulos */
import { TurmaModule } from './modules/turma/turma.module';
import { AppRoutingModule } from './app.routing.module';
import { AppWebBackendApiModule } from './backend/app-web-backend-api.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    PoModule,
    TurmaModule,
    RouterModule.forRoot([]),
    AppWebBackendApiModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
