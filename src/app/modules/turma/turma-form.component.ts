import { ChangeDetectorRef, Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

/* Po-Ui */
import { PoPageAction, PoStepperComponent } from '@po-ui/ng-components';

/* Interface */
import { Turma } from 'src/app/core/interfaces/turma.interface';

/* Services */
import { TitleService } from 'src/app/core/services/title.service';
import { NotificationMessageService } from 'src/app/core/helpers/notification-message.service';
import { TurmaService } from 'src/app/core/services/http/turma/turma.service';
import { AlunoService } from '../../core/services/http/aluno/aluno.service';
import { DisciplinaService } from '../../core/services/http/disciplina/disciplina.service';
import { ListService } from '../../core/services/list.service';
import { etapasType } from 'src/app/core/commons/types/etapas.type';
import { orientacaoStepper } from 'src/app/core/commons/types/orientacaoStepper.type';

@Component({
  selector: 'app-turma',
  templateUrl: './turma-form.component.html'
})
export class TurmaFormComponent implements OnInit {

  @Output() public form: FormGroup;
  @Output() public stepAtual: etapasType = 'step1';
  public orientacaoStepper: orientacaoStepper = 'horizontal';

  readonly visibilidadeButtonsStepper = {
    step1: { Cancelar: true, Anterior: false, Proximo: true, Salvar: false },
    step2: { Cancelar: true, Anterior: true, Proximo: true, Salvar: false },
    step3: { Cancelar: true, Anterior: true, Proximo: true, Salvar: false },
    step4: { Cancelar: true, Anterior: true, Proximo: false, Salvar: true },
  };

  @ViewChild('poStepper') private _poStepperComponent: PoStepperComponent;

  public get titulo(): string {
    return this.titleService.title;
  }

  constructor(
    private formBuilder: FormBuilder,
    private turmaService: TurmaService,
    private alunoService: AlunoService,
    private disciplinaService: DisciplinaService,
    private notificationHelper: NotificationMessageService,
    private titleService: TitleService,
    private listService: ListService
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

  private limpaFormCadastro(): void {
    this.form.patchValue({
      descricao: '',
      anoLetivo: '',
      periodoLetivo: '',
      numeroVagas: '',
      disciplinas: undefined,
      alunos: undefined
    });
    this.form.reset();
  }

  private cadastra(): void {
    (!this.form.valid) ? this.notificationHelper.mensagemDanger('Certifique-se que todos os campos foram preenchidos')
      : this.efetuaCadastro();
  }

  private efetuaCadastro(): void {
    const novaTurma = this.form.getRawValue() as Turma;

    this.turmaService.cadastroTurma(novaTurma)
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
      dadosAlunos: this.alunoService.obterAlunos(),
      dadosDisciplina: this.disciplinaService.obterDisciplinas()
    }).subscribe(({ dadosAlunos, dadosDisciplina }) => {

      this.listService.filtrarAlunos(dadosAlunos, dadosTurma.alunos).map(aluno => {
        aluno.turma = dadosTurma.id;
        this.alunoService.atualizaAluno(aluno.id, aluno).pipe(
          delay(100)
        ).subscribe(
          () => { },
          err => { this.notificationHelper.mensagemErro('Ops! algo errado aconteceu com seu cadastro') }
        )
      })

      this.listService.filtrarDisciplinas(dadosDisciplina, dadosTurma.disciplinas).map(disciplina => {
        disciplina.turma.push(dadosTurma.id);
        this.disciplinaService.atualizaDisciplina(disciplina.id, disciplina).pipe(
          delay(100)
        ).subscribe(
          () => { },
          err => { this.notificationHelper.mensagemErro('Ops! algo errado aconteceu com seu cadastro') }
        );
      });

    });
  }

  private cacelaCadastro(): void {
    this.stepAtual = 'step1';
    this.limpaFormCadastro();
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
      { label: 'Salvar', action: () => this.cadastra(), icon: 'po-icon po-icon-ok', disabled: this.disableBotaoSalvar.bind(this) },
      { label: 'Proximo', action: () => this.proximaEtapa(), disabled: this.disableBotaoProximo.bind(this) },
      { label: 'Anterior', action: () => this.etapaAnterior() },
      { label: 'Cancelar', action: () => this.cacelaCadastro() },
    ].filter((action) => this.visibilidadeButtonsStepper[this.stepAtual][action.label]);

  }

  private disableBotaoProximo(): boolean {
    switch (this.stepAtual) {
      case 'step1':
        const camposEtapa = ['descricao', 'anoLetivo', 'periodoLetivo', 'numeroVagas'];
        return !camposEtapa.map(campo => {
          return this.form.controls[campo].valid
        }).every(valido => valido);
      case 'step2':
        return !this.form.controls['disciplinas'].valid;
      case 'step3':
        return !this.form.controls['alunos'].valid;
      default:
        return false;
    }
  }

  private disableBotaoSalvar(): boolean {
    return this.form.invalid;
  }
}