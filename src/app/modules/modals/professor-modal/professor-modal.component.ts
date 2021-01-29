import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* PO UI */
import { PoModalAction, PoModalComponent, PoSelectOption } from '@po-ui/ng-components';

/* Services */
import { ModalsService } from '../modals.service';
import { NotificationMessageService } from 'src/app/core/helpers/notification-message.service';

/* Interface */
import { Professor } from 'src/app/core/interfaces/professor.interface';
import { TitulacaoEnum } from 'src/app/core/commons/titulacao.enum';

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
    private modalService: ModalsService,
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
      titulacao: ['',
        [
          Validators.required,
        ]
      ]
    });
  }

  public validaForm(): void {
    if (this.professorForm.invalid) {
      this.notificationHelper.mensagemDanger('Formulário inválido');
    } else {
      this.cadastraNovoProfessor();
    }
  }

  public cadastraNovoProfessor(): void {
    const novoProfessor = this.professorForm.getRawValue() as Professor;

    this.modalService.cadastraProfessor(novoProfessor)
      .subscribe(
        () => {
          this.notificationHelper.mensagemSucesso('Cadastro realizado com sucesso');
          this.professorForm.reset();
          this.callFunction.emit();
        },
        err => {
          this.notificationHelper.mensagemErro('Ops! algo errado aconteceu com seu cadastro');
          console.log(err);
        }
      )
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
