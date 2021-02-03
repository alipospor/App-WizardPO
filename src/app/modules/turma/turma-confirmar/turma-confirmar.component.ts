import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { pipe } from 'rxjs';

/* PO-UI */
import { PoDynamicViewField, PoTableColumn } from '@po-ui/ng-components';

/* INterfaces */
import { Aluno } from 'src/app/core/interfaces/aluno.interface';
import { Disciplina } from 'src/app/core/interfaces/disciplina.interface';
import { Turma } from 'src/app/core/interfaces/turma.interface';

/* Services */
import { TurmaFormService } from '../turma-form.service';

@Component({
  selector: 'app-confirmar-turma',
  templateUrl: './turma-confirmar.component.html',
  styleUrls: ['./turma-confirmar.component.css']
})
export class TurmaConfirmarComponent implements OnChanges {

  public confirmarTurmaCampo: any;
  public confirmarDisciplinasCampos: any[];
  public confirmarAlunosCampos: any[];

  public configuracaoTurmaCampos: Array<PoDynamicViewField> = [
    { property: 'descricao', label: 'Descrição', divider: 'Dados da Turma', gridColumns: 4, order: 1 },
    { property: 'anoLetivo', label: 'Ano Letivo', gridColumns: 3, type: 'string' },
    { property: 'periodoLetivo', label: 'Periodo Letivo', gridColumns: 2, type: 'number' },
    { property: 'numeroVagas', label: 'N° Vagas', gridColumns: 2 }
  ];

  readonly configuracaoDisciplinaColunas: PoTableColumn[] = [
    { property: 'descricao', label: 'Descrição', type: 'string' },
    { property: 'sigla', label: 'Sigla', type: 'string' },
    { property: 'cargaHoraria', label: 'Carga Horária', type: 'number' },
    { property: 'professor', label: 'Professor', type: 'string' }
  ];

  readonly configuracaoAlunoColunas: PoTableColumn[] = [
    { property: 'nome', label: 'Nome', type: 'string' },
    { property: 'email', label: 'E-mail', type: 'string' },
    { property: 'cpf', label: 'CPF', type: 'string' },
    { property: 'matricula', label: 'Matrícula', type: 'string' },
    { property: 'formaIngresso', label: 'Forma de Ingresso', type: 'string' },
  ];

  @Input() public stepper: etapasType = 'step1';
  @Input() public componentForm: FormGroup;

  constructor(
    private turmaFormService: TurmaFormService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.stepper)
      (this.stepper == 'step4') ? this.prencherCamposView() : null;
  }

  private prencherCamposView() {
    const novaTurma = this.componentForm.getRawValue() as Turma;

    this.confirmarTurmaCampo = {
      descricao: novaTurma.descricao,
      anoLetivo: this.ajustarDataView(novaTurma.anoLetivo),
      periodoLetivo: novaTurma.periodoLetivo,
      numeroVagas: novaTurma.numeroVagas
    };

    this.prencherDisciplinasTabela(novaTurma);
    this.prencherAlunosView(novaTurma);
  }

  private ajustarDataView(dataTurma: { start: Date, end: Date }): string {
    const inicio = new Date(dataTurma.start);
    const final = new Date(dataTurma.end);
    return `${inicio.toLocaleDateString()} até ${final.toLocaleDateString()}`;
  }

  private prencherDisciplinasTabela(novaTurma: Turma) {
    this.confirmarDisciplinasCampos = [];

    this.turmaFormService.obterDisciplina().subscribe(
      pipe((response: Disciplina[]) => {
        this.filtrarArray(response, novaTurma.disciplinas).map(disciplina => {
          this.confirmarDisciplinasCampos.push(
            {
              descricao: disciplina.descricao,
              sigla: disciplina.sigla,
              cargaHoraria: disciplina.cargaHoraria,
              professor: disciplina.professor,
            }
          );
        })
      })
    )
  }

  private prencherAlunosView(novaTurma: Turma) {
    this.confirmarAlunosCampos = [];

    this.turmaFormService.obterAluno().subscribe(
      pipe((response: Aluno[]) => {
        this.filtrarArray(response, novaTurma.alunos).map(aluno => {
          this.confirmarAlunosCampos.push(
            {
              nome: aluno.nome,
              email: aluno.email,
              cpf: aluno.cpf,
              matricula: aluno.matricula,
              formaIngresso: aluno.formaIngresso,
            }
          );
        })
      })
    );
  }

  private filtrarArray(arrayReturn: any[], arrayWithId: number[]): any[] {
    return arrayReturn.filter(element => {
      if ((arrayWithId.find(id => id == element.id))) {
        return element;
      }
    });
  }
}

type etapasType = 'step1' | 'step2' | 'step3' | 'step4';