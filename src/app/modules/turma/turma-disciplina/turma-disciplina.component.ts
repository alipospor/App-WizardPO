import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

/* PO UI */
import { PoPopupAction, PoSelectOption } from '@po-ui/ng-components';

/* Imports */
import { FormularioStepBase } from 'src/app/core/components/turma-form/formulario-step-base';
import { NotificationMessageService } from 'src/app/core/helpers/notification-message.service';

/* Interface */
import { Disciplina } from 'src/app/core/interfaces/disciplina.interface';
import { Professor } from 'src/app/core/interfaces/professor.interface';

/* Modal */
import { ProfessorModalComponent } from '../../modals/professor-modal/professor-modal.component';
import { ProfessorService } from 'src/app/core/services/http/professor/professor.service';
import { DisciplinaService } from 'src/app/core/services/http/disciplina/disciplina.service';

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
    private disciplinaService: DisciplinaService,
    private professorService: ProfessorService,
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

  private geraFormDisciplina(): void {
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

  private limpaFormDisciplina(): void {
    this.disciplinaForm.patchValue({
      descricao: '',
      sigla: '',
      cargaHoraria: '',
      professor: undefined,
      turma: []
    });
    this.disciplinaForm.reset();
  }

  public prencherOptionsDisciplina(): void {
    forkJoin({
      dadosDisciplina: this.disciplinaService.obterDisciplinas(),
      dadosProfessor: this.professorService.obterProfessores()
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

  public prencherOptionsProfessor(): void {
    this.professorService.obterProfessores()
      .subscribe(professor => {
        this.optionsProfessor = professor.map(professor => (
          { label: professor.nome, value: professor.id }
        ))
      })
  }

  private gerarSiglaDisciplina(precisaRetorno: boolean = false): string {
    const novaSigla = this.disciplinaForm.controls['descricao']
      .value.substring(0, 3).toUpperCase();

    if (precisaRetorno == true) {
      return novaSigla;
    }
    this.disciplinaForm.controls['sigla'].patchValue(novaSigla);
  }

  public cadastraDisciplina(): void {
    let novaDisciplina = this.disciplinaForm.getRawValue() as Disciplina;

    if (!novaDisciplina.sigla.length) {
      novaDisciplina.sigla = this.gerarSiglaDisciplina(true);
    }
    this.disciplinaService.cadastraDisciplina(novaDisciplina)
      .subscribe(
        () => {
          this.notificationHelper.mensagemSucesso('Cadastro de disciplina realizado com sucesso')
          this.prencherOptionsDisciplina();
          this.limpaFormDisciplina();
        },
        err => { console.log(err) }
      )
  }

  public abrirModal(): void {
    this.professorModal.openModal();
  }

}
