import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PoDatepickerRangeLiterals } from '@po-ui/ng-components';

/* imports */
import { FormularioStepBase } from 'src/app/core/components/turma-form/formulario-step-base';

@Component({
  selector: 'app-abertura-turma',
  templateUrl: './abertura-turma.component.html',
  styleUrls: ['./abertura-turma.component.css']
})
export class AberturaTurmaComponent extends FormularioStepBase implements OnInit {

  @Input()
  public componentForm: FormGroup;

  readonly customLiterals: PoDatepickerRangeLiterals = {
    invalidFormat: 'Formato inválido',
    startDateGreaterThanEndDate: 'Data final deve ser maior que à de início'
  };

  constructor(
  ) {
    super(
      [
        'anoLetivo', 'periodoLetivo', 'numeroVagas', 'descricao'
      ]
    );
  }

  ngOnInit(): void {
    this.formGroup = this.componentForm;
  }

}
