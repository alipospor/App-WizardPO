import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/* Po-Ui */
import { PoPageAction, PoStepperComponent } from '@po-ui/ng-components';
import { concat, forkJoin, of, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';

/* Components */
import { FormularioBase } from 'src/app/core/components/turma-form/formulario-base';
import { NotificationMessageService } from 'src/app/core/helpers/notification-message.service';
import { Turma } from 'src/app/core/interfaces/turma.interface';
import { TitleService } from 'src/app/core/services/title.service';
import { FormTurmaService } from './form-turma.service';

@Component({
  selector: 'app-turma',
  templateUrl: './form-turma.component.html',
  styleUrls: ['./form-turma.component.css']
})
export class FormTurmaComponent extends FormularioBase implements OnInit {

  public stepAtual: etapasType = 'step1';

  readonly visibilidadeButtonsStepper = {
    step1: { Cancelar: true, Anterior: false, Proximo: true, Salvar: false },
    step2: { Cancelar: true, Anterior: true, Proximo: true, Salvar: false },
    step3: { Cancelar: true, Anterior: true, Proximo: false, Salvar: true },
  };

  @ViewChild('poStepper') private _poStepperComponent: PoStepperComponent;

  /* PO page default title */
  public get titulo(): string {
    return this.titleService.title;
  }

  constructor(
    formBuilder: FormBuilder,
    private formTurmaService: FormTurmaService,
    private notificationHelper: NotificationMessageService,
    private titleService: TitleService
  ) {
    super(formBuilder);
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
    !this.formValido() ? this.notificationHelper.mensagemDanger('Certifique-se que todos os campos foram preenchidos')
      : this.efetuaCadastro();
  }

  private efetuaCadastro(): void {
    const novaTurma = this.form.getRawValue() as Turma;

    this.formTurmaService.cadastroTurma(novaTurma)
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

  private atualizaCadastro(dadosTurma: Turma) {

    forkJoin({
      dadosAlunos: this.formTurmaService.obterAluno(),
      dadosDisciplina: this.formTurmaService.obterDisciplina()
    }).subscribe(({ dadosAlunos, dadosDisciplina }) => {

      this.filtrarArrayDeIds(dadosAlunos, dadosTurma.alunos).map(aluno => {
        aluno.turma = dadosTurma.id;
        this.formTurmaService.atualizaAluno(aluno.id, aluno)
          .subscribe(
            pipe(
              delay(200)
            )
          );
      });

      this.filtrarArrayDeIds(dadosDisciplina, dadosTurma.disciplinas).map(disciplina => {
        disciplina.turma.push(dadosTurma.id);
        this.formTurmaService.atualizaDisciplina(disciplina.id, disciplina)
          .subscribe(
            pipe(
              delay(200)
            )
          );
      });
    })
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
    if (this.stepAtual !== 'step3') {
      this._poStepperComponent.next();
    }
  }

  public configuracaoMenuAcoes(): Array<PoPageAction> {
    return [
      { label: 'Salvar', action: () => this.cadastra() },
      { label: 'Proximo', action: () => this.proximaEtapa() },
      { label: 'Anterior', action: () => this.etapaAnterior() },
      { label: 'Cancelar', action: () => this.cacelaCadastro() },
    ].filter((action) => this.visibilidadeButtonsStepper[this.stepAtual][action.label]);

  }
}

type etapasType = 'step1' | 'step2' | 'step3' | 'step4';