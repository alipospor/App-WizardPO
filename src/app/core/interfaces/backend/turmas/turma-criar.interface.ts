import { IAlunoGet } from '../alunos/aluno-get.interface';
import { IDisciplinaGet } from '../disciplina/disciplina-get.interface';

export interface ITurmaCriar {
  descricao: string,
  anoLetivo: {
    start: any,
    end: any
  },
  periodoLetivo: number,
  numeroVagas: number,
  disciplinas: IDisciplinaGet[],
  alunos: IAlunoGet[],
}
