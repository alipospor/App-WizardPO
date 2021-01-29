export interface Aluno {
    nome: string,
    email: string,
    cpf: string,
    matricula: number,
    formaIngresso: string,
    turma: number,
    id?: number
}
/* Um aluno, faz a matrícula em uma turma e possui uma forma de ingresso (ENADE, vestibular). */