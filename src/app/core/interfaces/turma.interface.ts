export interface Turma {
    id?: number
    descricao: string,
    anoLetivo: {
        start: Date,
        end: Date
    },
    periodoLetivo: number,
    numeroVagas: number,
    disciplinas: number[],
    alunos: number[],
}