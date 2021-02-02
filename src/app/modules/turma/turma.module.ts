import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Po-Ui */
import { PoAccordionModule, PoButtonGroupModule, PoButtonModule, PoDividerModule, PoDynamicModule, PoFieldModule, PoPageModule, PoStepperModule, PoTableModule } from '@po-ui/ng-components';

/* Components */
import { TurmaAberturaComponent } from './turma-abertura/turma-abertura.component';
import { TurmaAlunoComponent } from './turma-aluno/turma-aluno.component';
import { TurmaConfirmarComponent } from './turma-confirmar/turma-confirmar.component';
import { TurmaDisciplinaComponent } from './turma-disciplina/turma-disciplina.component';
import { TurmaFormComponent } from './turma-form.component';

/* Modulos */
import { TurmaRoutingModule } from './turma.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalsModule } from '../modals/modals.module';

/* Services */
import { TurmaFormService } from './turma-form.service';

@NgModule({
    declarations: [
        TurmaAberturaComponent,
        TurmaAlunoComponent,
        TurmaConfirmarComponent,
        TurmaDisciplinaComponent,
        TurmaFormComponent
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
        PoAccordionModule,
        PoTableModule,

        TurmaRoutingModule,
        SharedModule,
        ModalsModule
    ],
    providers: [
        TurmaFormService
    ]
})
export class TurmaModule { }