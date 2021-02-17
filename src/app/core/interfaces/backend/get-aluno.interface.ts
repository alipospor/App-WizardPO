export interface IAluno {
    id?: number
    nome: string,
    email: string,
    cpf: string,
    matricula: number,
    formaIngresso: string,
    turma?: number,
}