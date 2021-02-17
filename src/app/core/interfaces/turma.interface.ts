export interface Turma {
    id?: number
    descricao: string,
    anoLetivo: {
        start: any,
        end: any
    },
    periodoLetivo: number,
    numeroVagas: number,
    disciplinas: number[],
    alunos: number[],
}