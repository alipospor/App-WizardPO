import { IProfessor } from '../professor/professor-get.interface';
import { ITurmaGet } from '../turmas/turma-get.interface';

export interface IDisciplinaGet {
    id?: number
    descricao: string,
    sigla: string,
    cargaHoraria: number,
    professor: IProfessor,
    turma: ITurmaGet[],
} 