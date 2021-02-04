export interface Turma {
    descricao: string,
    anoLetivo: {
        start: Date,
        end: Date
    },
    periodoLetivo: number,
    numeroVagas: number,
    disciplinas: number[],
    alunos: number[],
    id?: number
}