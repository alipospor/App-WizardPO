import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Po-Ui */
import { PoAccordionModule, PoButtonGroupModule, PoButtonModule, PoDividerModule, PoDynamicModule, PoFieldModule, PoPageModule, PoPopupModule, PoStepperModule, PoTableModule } from '@po-ui/ng-components';

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
import { TurmaFormService } from 'src/app/core/services/http/turma-form.service';
import { DetectorTelaModule } from 'src/app/core/components/detector-tela/detector-tela.module';

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
        PoPopupModule,

        TurmaRoutingModule,
        SharedModule,
        ModalsModule,
        DetectorTelaModule
    ],
    providers: [
        TurmaFormService
    ]
})
export class TurmaModule { }