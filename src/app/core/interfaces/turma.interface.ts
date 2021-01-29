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
/* Uma turma é formada por vários alunos e várias disciplinas,
possui um ano e período letivo e um número limitado de vagas.  */