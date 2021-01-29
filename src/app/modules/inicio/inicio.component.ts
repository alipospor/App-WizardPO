import { Component, Input, OnInit } from '@angular/core';

/* PO UI */
import { PoTableColumn } from '@po-ui/ng-components';
import { TurmaTabela } from 'src/app/core/interfaces/tabela/turma-tabela.interface';

/* Interface */
import { Turma } from 'src/app/core/interfaces/turma.interface';
import { TitleService } from 'src/app/core/services/title.service';

/* Service */
import { FormTurmaService } from '../turma/form-turma.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public itensListaTurma: TurmaTabela[] = [];

  public readonly colunasTurma: PoTableColumn[] = [
    { property: 'id', label: 'Id', type: 'number' },
    { property: 'descricao', label: 'Descricao', type: 'string' },
    { property: 'anoLetivo', label: 'Ano Letivo', type: 'string' },
    { property: 'periodoLetivo', label: 'Periodo Letivo', type: 'number' },
    { property: 'numeroVagas', label: 'Vagas', type: 'number' },
    { property: 'disciplinas', label: 'Disciplinas', type: 'number' },
    { property: 'alunos', label: 'Alunos', type: 'number' },
  ];

  /* PO page default title */
  public get titulo(): string {
    return this.titleService.title;
  }

  constructor(
    private formTurmaService: FormTurmaService,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.prencherListaTurma();
  }

  public prencherListaTurma() {
    this.formTurmaService.obterTurma()
      .subscribe(turmas => {
        /* Manipulando a turma que voltou */
        turmas.map(turma => {
          this.itensListaTurma.push({
            descricao: turma.descricao,
            anoLetivo: `${turma.anoLetivo.start} até ${turma.anoLetivo.end}`,
            periodoLetivo: turma.periodoLetivo,
            numeroVagas: turma.numeroVagas,
            disciplinas: turma.disciplinas.concat(),
            alunos: turma.alunos.length,
            id: turma.id
          });
        })
      });
  }
}
