export interface ITurma {
    id?: number
    descricao: string,
    anoLetivo: {
        start: string,
        end: string
    },
    periodoLetivo: number,
    numeroVagas: number,
    disciplinas: number[],
    alunos: number[],
}