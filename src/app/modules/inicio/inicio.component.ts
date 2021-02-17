import { Component, Input, OnInit } from '@angular/core';

/* PO UI */
import { PoTableColumn } from '@po-ui/ng-components';
import { TurmaTabela } from 'src/app/core/interfaces/tabela/turma-tabela.interface';

/* Interface */
import { TitleService } from 'src/app/core/services/title.service';

/* Service */
import { TurmaService } from 'src/app/core/services/http/turma/turma.service';
import { AlunoService } from 'src/app/core/services/http/aluno/aluno.service';
import { alunos } from 'backend/alunos/alunos.mock';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public id: number;
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
    private titleService: TitleService,
    private turmaService: TurmaService,
    private alunoService: AlunoService
  ) { }

  ngOnInit(): void {
    this.prencherListaTurma();
    this.alunoService.obterAlunos().subscribe(alunos => { console.log(alunos) })
  }

  public prencherListaTurma() {
    this.turmaService.obterTurmas()
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
