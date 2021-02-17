import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* PO UI */
import { PoMultiselectOption, PoPopupAction, PoSelectOption } from '@po-ui/ng-components';

/* imports */
import { FormularioStepBase } from 'src/app/core/components/turma-form/formulario-step-base';
import { FormaIngressoEnum } from 'src/app/core/commons/enums/formaIngresso.enum';
import { Aluno } from 'src/app/core/interfaces/aluno.interface';
import { NotificationMessageService } from 'src/app/core/helpers/notification-message.service';
import { AlunoService } from 'src/app/core/services/http/aluno/aluno.service';

@Component({
  selector: 'app-aluno-turma',
  templateUrl: './turma-aluno.component.html',
  styleUrls: ['./turma-aluno.component.css']
})
export class TurmaAlunoComponent extends FormularioStepBase implements OnInit {

  @Input() public componentForm: FormGroup;

  public alunoForm: FormGroup;
  public optionsAlunos: PoMultiselectOption[] = [];
  public optionsFormaIngresso: PoSelectOption[] = [];

  public numeroSelect: number;

  @ViewChild('target', { read: ElementRef, static: true }) targetInputRef: ElementRef;

  public acoesPopup: PoPopupAction[] = [{
    label: 'Gerar Matricula', action: this.gerarMatricula.bind(this)
  }];

  constructor(
    private alunoService: AlunoService,
    private FormBuilder: FormBuilder,
    private notificationHelper: NotificationMessageService
  ) {
    super(['alunos']);
  }

  ngOnInit(): void {
    this.formGroup = this.componentForm;
    this.prencherOptionsAluno();
    this.preencheroptionsFormaIngresso();
    this.gerarFormAluno();
  }

  private gerarFormAluno(): void {
    this.alunoForm = this.FormBuilder.group({
      nome: ['asddasdasdas', Validators.required],
      email: ['ali@gmail.com', Validators.required],
      cpf: ['111.111.111-11',
        [
          Validators.required,
          Validators.minLength(14)
        ]
      ],
      matricula: ['200'],
      formaIngresso: ['', Validators.required],
      turma: ["null"]
    })
  }

  private limparFormAluno(): void {
    this.alunoForm.patchValue({
      nome: '',
      email: '',
      cpf: '',
      matricula: '',
      formaIngresso: undefined,
      turma: ["null"]
    });
    this.alunoForm.reset();
  }

  public prencherOptionsAluno(): void {
    this.alunoService.obterAlunos().subscribe(alunos =>
      alunos.map(aluno => (
        this.optionsAlunos.push({ value: aluno.id, label: `${aluno.nome} (${aluno.formaIngresso})` })
      ))
    )
  }

  public preencheroptionsFormaIngresso(): void {
    this.optionsFormaIngresso = FormaIngressoEnum.values
      .map(formaIngresso => {
        return formaIngresso
      });
    this.numeroSelect = this.optionsFormaIngresso[0].value as number;
  }

  private gerarMatricula(precisaRetorno: boolean = false): number {
    const matricula = Math.floor(Math.random() * (Math.ceil(1), Math.ceil(10000)));

    if (precisaRetorno == true) {
      return matricula;
    }
    this.alunoForm.controls['matricula'].patchValue(matricula);
  }

  public cadastraAluno(): void {
    let novoAluno = this.alunoForm.getRawValue() as Aluno;

    if (!novoAluno.matricula) {
      novoAluno.matricula = this.gerarMatricula(true);
    }

    this.alunoService.cadastroAluno(novoAluno)
      .subscribe(
        () => {
          this.notificationHelper.mensagemSucesso('Cadastro realizado com sucesso');
          /* this.prencherOptionsAluno(); */
          /* this.limparFormAluno(); */
        },
        err => {
          console.log(err);
          this.notificationHelper.mensagemErro('Ops! algo errado aconteceu com seu cadastro');
        }
      )
  }
}
