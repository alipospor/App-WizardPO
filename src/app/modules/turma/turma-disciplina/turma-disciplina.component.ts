import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

/* PO UI */
import { PoPopupAction, PoSelectOption } from '@po-ui/ng-components';

/* Imports */
import { FormularioStepBase } from 'src/app/core/components/turma-form/formulario-step-base';
import { TurmaFormService } from '../turma-form.service';
import { NotificationMessageService } from 'src/app/core/helpers/notification-message.service';

/* Interface */
import { Disciplina } from 'src/app/core/interfaces/disciplina.interface';
import { Professor } from 'src/app/core/interfaces/professor.interface';

/* Modal */
import { ProfessorModalComponent } from '../../modals/professor-modal/professor-modal.component';

@Component({
  selector: 'app-disciplina-turma',
  templateUrl: './turma-disciplina.component.html',
  styleUrls: ['./turma-disciplina.component.css']
})
export class TurmaDisciplinaComponent extends FormularioStepBase implements OnInit {

  @Input()
  public componentForm: FormGroup;
  public optionsDisciplina: PoSelectOption[] = [];
  public disciplinaForm: FormGroup;
  public optionsProfessor: PoSelectOption[] = [];

  @ViewChild('professorModal') public professorModal: ProfessorModalComponent;

  @ViewChild('target', { read: ElementRef, static: true }) targetInputRef: ElementRef;

  public acoesPopup: PoPopupAction[] = [{
    label: 'Gerar Sigla', action: this.gerarSiglaDisciplina.bind(this)
  }];

  constructor(
    private turmaFormService: TurmaFormService,
    private formBuilder: FormBuilder,
    private notificationHelper: NotificationMessageService
  ) {
    super(
      ['disciplinas']
    );
  }

  ngOnInit(): void {
    this.formGroup = this.componentForm;
    this.prencherOptionsDisciplina();
    this.prencherOptionsProfessor();
    this.geraFormDisciplina();
  }

  private geraFormDisciplina() {
    this.disciplinaForm = this.formBuilder.group({
      descricao: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30)
        ]
      ],
      sigla: ['', []],
      cargaHoraria: ['', Validators.required],
      professor: [undefined, Validators.required],
      turma: [[]]
    });
  }

  private limpaFormDisciplina() {
    this.disciplinaForm.patchValue({
      descricao: '',
      sigla: '',
      cargaHoraria: '',
      professor: undefined,
      turma: []
    })
  }

  public prencherOptionsDisciplina() {
    forkJoin({
      dadosDisciplina: this.turmaFormService.obterDisciplina(),
      dadosProfessor: this.turmaFormService.obterProfessor()
    }).subscribe(({ dadosDisciplina, dadosProfessor }) => {

      this.optionsDisciplina = dadosDisciplina.map(disciplina => {
        let professor: Professor;

        professor = dadosProfessor.find(professor => {
          if (disciplina.professor == professor.id) {
            return professor
          }
        })

        return { label: `${disciplina.descricao} - Prof. ${professor.nome}`, value: disciplina.id };
      });
    })
  }

  public prencherOptionsProfessor() {
    this.turmaFormService.obterProfessor()
      .subscribe(professor => {
        this.optionsProfessor = professor.map(professor => (
          { label: professor.nome, value: professor.id }
        ))
      })
  }

  private gerarSiglaDisciplina(precisaRetorno?: boolean): string {
    const novaSigla = this.disciplinaForm.controls['descricao']
      .value.substring(0, 3).toUpperCase();

    if (precisaRetorno) {
      return novaSigla;
    } else {
      this.disciplinaForm.controls['sigla'].patchValue(novaSigla);
    }
  }

  public cadastraDisciplina() {
    let novaDisciplina = this.disciplinaForm.getRawValue() as Disciplina;

    if (!novaDisciplina.sigla.length) {
      novaDisciplina.sigla = this.gerarSiglaDisciplina(true);
    }
    this.turmaFormService.cadastraDisciplina(novaDisciplina)
      .subscribe(
        () => {
          this.notificationHelper.mensagemSucesso('Cadastro de disciplina realizado com sucesso')
          this.prencherOptionsDisciplina();
          this.limpaFormDisciplina();
        },
        err => { console.log(err) }
      )
  }

  /* Function abrir modal */
  public abrirModal() {
    this.professorModal.openModal();
  }

}
