import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, interval, of, pipe } from 'rxjs';

/* Po-Ui */
import { PoPageAction, PoStepperComponent } from '@po-ui/ng-components';

/* Components */
import { Turma } from 'src/app/core/interfaces/turma.interface';

/* Services */
import { TurmaFormService } from './turma-form.service';
import { TitleService } from 'src/app/core/services/title.service';
import { NotificationMessageService } from 'src/app/core/helpers/notification-message.service';
import { concatMap, delay, map, mergeAll, mergeMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-turma',
  templateUrl: './turma-form.component.html'
})
export class TurmaFormComponent implements OnInit {

  @Output() public form: FormGroup;

  @Output() public stepAtual: etapasType = 'step1';

  readonly visibilidadeButtonsStepper = {
    step1: { Cancelar: true, Anterior: false, Proximo: true, Salvar: false },
    step2: { Cancelar: true, Anterior: true, Proximo: true, Salvar: false },
    step3: { Cancelar: true, Anterior: true, Proximo: true, Salvar: false },
    step4: { Cancelar: true, Anterior: true, Proximo: false, Salvar: true },
  };

  @ViewChild('poStepper') private _poStepperComponent: PoStepperComponent;

  /* PO page default title */
  public get titulo(): string {
    return this.titleService.title;
  }

  constructor(
    private formBuilder: FormBuilder,
    private turmaFormService: TurmaFormService,
    private notificationHelper: NotificationMessageService,
    private titleService: TitleService
  ) {
  }

  ngOnInit(): void {
    this.geraFormTurma();
  }

  private geraFormTurma(): void {
    this.form = this.formBuilder.group({
      descricao: ['',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.minLength(1)
        ]
      ],
      anoLetivo: ['', Validators.required],
      periodoLetivo: ['', Validators.required],
      numeroVagas: ['', Validators.required],
      disciplinas: [[], Validators.required],
      alunos: [[], Validators.required]
    });
  }

  private limpaCadastro(): void {
    this.form.patchValue({
      descricao: '',
      anoLetivo: '',
      periodoLetivo: '',
      numeroVagas: '',
      disciplinas: undefined,
      alunos: undefined
    });
  }

  private cadastra(): void {
    !this.form.valid ? this.notificationHelper.mensagemDanger('Certifique-se que todos os campos foram preenchidos')
      : this.efetuaCadastro();
  }

  private efetuaCadastro(): void {
    const novaTurma = this.form.getRawValue() as Turma;

    this.turmaFormService.cadastroTurma(novaTurma)
      .subscribe(
        (response: Turma) => {
          this.atualizaCadastro(response);
          this.notificationHelper.mensagemSucesso('Cadastro realizado com sucesso');
          this.cacelaCadastro();
        },
        err => {
          this.notificationHelper.mensagemErro('Ops! algo errado aconteceu com seu cadastro');
          console.log(err);
        }
      );
  }

  private atualizaCadastro(dadosTurma: Turma): void {
    forkJoin({
      dadosAlunos: this.turmaFormService.obterAluno(),
      dadosDisciplina: this.turmaFormService.obterDisciplina()
    }).subscribe(({ dadosAlunos, dadosDisciplina }) => {

      this.filtrarArrayDeIds(dadosAlunos, dadosTurma.alunos).map(aluno => {
        aluno.turma = dadosTurma.id;
        this.turmaFormService.atualizaAluno(aluno.id, aluno).pipe(
          delay(350)
        ).subscribe(
          () => { },
          err => { this.notificationHelper.mensagemErro('Ops! algo errado aconteceu com seu cadastro') }
        )
      })

      this.filtrarArrayDeIds(dadosDisciplina, dadosTurma.disciplinas).map(disciplina => {
        disciplina.turma.push(dadosTurma.id);
        this.turmaFormService.atualizaDisciplina(disciplina.id, disciplina).pipe(
          delay(350)
        ).subscribe(
          () => { },
          err => { this.notificationHelper.mensagemErro('Ops! algo errado aconteceu com seu cadastro') }
        );
      });

    });
  }

  private filtrarArrayDeIds(arrayReturn: any[], arrayWithId: number[]): any[] {
    return arrayReturn.filter(element => {
      if ((arrayWithId.find(id => id == element.id))) {
        return element;
      }
    });
  }

  private cacelaCadastro(): void {
    this.stepAtual = 'step1';
    this.limpaCadastro();
    this._poStepperComponent.first();
  }

  public ativaPasso(form: any): boolean {
    return form.camposValidos() ? form.camposValidos()
      : this.notificationHelper.mensagemDanger('Para avançar, tem de preencher os dados');
  }

  public controlarPasso(etapaEvent: any): void {
    const nomeDoStep: etapasType = etapaEvent
      .elementRef.nativeElement.id;
    this.stepAtual = nomeDoStep;
  }

  public etapaAnterior(): void {
    if (this.stepAtual !== 'step1') {
      this._poStepperComponent.previous();
    }
  }

  public proximaEtapa(): void {
    if (this.stepAtual !== 'step4') {
      this._poStepperComponent.next();
    }
  }

  public configuracaoMenuAcoes(): Array<PoPageAction> {
    return [
      { label: 'Salvar', action: () => this.cadastra(), icon: 'po-icon po-icon-ok' },
      { label: 'Proximo', action: () => this.proximaEtapa() },
      { label: 'Anterior', action: () => this.etapaAnterior() },
      { label: 'Cancelar', action: () => this.cacelaCadastro() },
    ].filter((action) => this.visibilidadeButtonsStepper[this.stepAtual][action.label]);

  }
}

type etapasType = 'step1' | 'step2' | 'step3' | 'step4';