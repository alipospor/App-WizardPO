import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* PO UI */
import { PoMultiselectOption, PoSelectOption } from '@po-ui/ng-components';

/* imports */
import { FormularioStepBase } from 'src/app/core/components/turma-form/formulario-step-base';
import { FormTurmaService } from '../form-turma.service';
import { FormaIngressoEnum } from 'src/app/core/commons/formaIngresso.enum';
import { Aluno } from 'src/app/core/interfaces/aluno.interface';
import { NotificationMessageService } from 'src/app/core/helpers/notification-message.service';

@Component({
  selector: 'app-aluno-turma',
  templateUrl: './aluno-turma.component.html',
  styleUrls: ['./aluno-turma.component.css']
})
export class AlunoTurmaComponent extends FormularioStepBase implements OnInit {

  @Input()
  public componentForm: FormGroup;
  public alunoForm: FormGroup;
  public optionsAlunos: PoMultiselectOption[] = [];

  constructor(
    private formTurmaService: FormTurmaService,
    private FormBuilder: FormBuilder,
    private notificationHelper: NotificationMessageService
  ) {
    super(['alunos']);
  }

  ngOnInit(): void {
    this.formGroup = this.componentForm;
    this.prencherOptionsAluno();
    this.gerarFormAluno();
  }

  private gerarFormAluno(): void {
    this.alunoForm = this.FormBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      cpf: ['',
        [
          Validators.required,
          Validators.minLength(14)
        ]
      ],
      matricula: [''],
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
    })
  }

  public prencherOptionsAluno(): void {
    this.formTurmaService.obterAlunoSemTurma().subscribe(alunos =>
      this.optionsAlunos = alunos.map(aluno => (
        { value: aluno.id, label: `${aluno.nome} (${aluno.formaIngresso})` }
      ))
    )
  }

  public optionsFormaIngresso(): PoSelectOption[] {
    return FormaIngressoEnum.values
      .map(formaIngresso => { return formaIngresso })
  }

  public cadastraAluno(): void {
    let novoAluno = this.alunoForm.getRawValue() as Aluno;
    let matricula = novoAluno.matricula;

    if (!matricula) {
      novoAluno.matricula = Math.floor(Math.random() * (Math.ceil(1), Math.ceil(10000)));
    }
    this.formTurmaService.cadastraAluno(novoAluno)
      .subscribe(
        () => {
          this.notificationHelper.mensagemSucesso('Cadastro realizado com sucesso');
          this.prencherOptionsAluno();
          this.limparFormAluno();
        },
        err => {
          console.log(err);
          this.notificationHelper.mensagemErro('Ops! algo errado aconteceu com seu cadastro');
        }
      )
  }
}
