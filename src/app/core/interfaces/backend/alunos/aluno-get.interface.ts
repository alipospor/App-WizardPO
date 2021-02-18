import { ITurmaGet } from '../turmas/turma-get.interface';

export interface IAlunoGet {
    id?: number
    nome: string,
    email: string,
    cpf: string,
    matricula: number,
    formaIngresso: string,
    turma: ITurmaGet,
}