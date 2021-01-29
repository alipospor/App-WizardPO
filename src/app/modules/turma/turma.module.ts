import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Po-Ui */
import { PoButtonGroupModule, PoButtonModule, PoDividerModule, PoDynamicModule, PoFieldModule, PoPageModule, PoStepperModule, PoWidgetModule } from '@po-ui/ng-components';

/* Components */
import { AberturaTurmaComponent } from './abertura-turma/abertura-turma.component';
import { DisciplinaTurmaComponent } from './disciplina-turma/disciplina-turma.component';
import { AlunoTurmaComponent } from './aluno-turma/aluno-turma.component';

/* Modulos */
import { TurmaRoutingModule } from './turma.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalsModule } from '../modals/modals.module';

/* Services */
import { FormTurmaComponent } from './form-turma.component';
import { FormTurmaService } from './form-turma.service';

@NgModule({
    declarations: [
        FormTurmaComponent,
        AberturaTurmaComponent,
        DisciplinaTurmaComponent,
        AlunoTurmaComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,

        PoPageModule,
        PoStepperModule,
        PoFieldModule,
        PoDynamicModule,
        PoButtonModule,
        PoButtonGroupModule,
        PoDividerModule,

        TurmaRoutingModule,
        SharedModule,
        ModalsModule
    ],
    providers: [
        FormTurmaService
    ]
})
export class TurmaModule { }