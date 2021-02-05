import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* PO UI */
import { PoModalAction, PoModalComponent, PoSelectOption } from '@po-ui/ng-components';

/* Services */
import { TurmaFormService } from 'src/app/core/services/http/turma-form.service';
import { NotificationMessageService } from 'src/app/core/helpers/notification-message.service';

/* Interface */
import { Professor } from 'src/app/core/interfaces/professor.interface';
import { TitulacaoEnum } from 'src/app/core/commons/enums/titulacao.enum';

@Component({
  selector: 'app-professor-modal',
  templateUrl: './professor-modal.component.html',
  styleUrls: ['./professor-modal.component.css']
})
export class ProfessorModalComponent implements OnInit {

  public optionsTitulacao: PoSelectOption[] = [];
  public professorForm: FormGroup;

  @Output() callFunction = new EventEmitter();
  @ViewChild('professorModal') private _poModal: PoModalComponent;

  constructor(
    private turmaFormService: TurmaFormService,
    private formBuilder: FormBuilder,
    public notificationHelper: NotificationMessageService
  ) { }

  ngOnInit(): void {
    this.professorForm = this.formBuilder.group({
      nome: ['',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.minLength(10)
        ]
      ],
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      cpf: ['',
        [
          Validators.required,
          Validators.minLength(14)
        ]
      ],
      titulacao: [undefined, [Validators.required]]
    });
  }

  public validaForm(): void {
    this.professorForm.invalid ? this.notificationHelper.mensagemDanger('Formulário inválido')
      : this.cadastraNovoProfessor();
  }

  public cadastraNovoProfessor(): void {
    const novoProfessor = this.professorForm.getRawValue() as Professor;

    this.turmaFormService.cadastraProfessor(novoProfessor)
      .subscribe(
        () => {
          this.notificationHelper.mensagemSucesso('Cadastro realizado com sucesso');
          this.limpaFormProfessor();
          this.callFunction.emit();
        },
        err => {
          this.notificationHelper.mensagemErro('Ops! algo errado aconteceu com seu cadastro');
          console.log(err);
        }
      )
  }

  private limpaFormProfessor() {
    this.professorForm.patchValue({
      nome: '',
      email: '',
      cpf: '',
      titulacao: undefined,
    });
    this.professorForm.reset();
  }

  public prencherOptionsTitulacao(): void {
    this.optionsTitulacao = TitulacaoEnum.values.map(titulo => { return titulo });
  }

  /* Config botoes modal */
  public enviarForm: PoModalAction = {
    action: () => {
      this.validaForm();
    },
    label: 'Enviar'
  };

  public fecharModal: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Cancelar'
  };

  public openModal(): void {
    this._poModal.open();
    this.prencherOptionsTitulacao();
  }

  public closeModal(): void {
    this._poModal.close();
  }

}
