export interface TurmaTabela {
    descricao: string,
    anoLetivo: string,
    periodoLetivo: number,
    numeroVagas: number,
    disciplinas: number[],
    alunos: number,
    id?: number
}