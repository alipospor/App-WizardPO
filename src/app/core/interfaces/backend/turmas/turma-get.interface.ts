import { IAlunoGet } from '../alunos/aluno-get.interface';
import { IDisciplinaGet } from '../disciplinas/disciplina-get.interface';

export interface ITurmaGet {
    id?: number
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