export interface Disciplina {
    id?: number
    descricao: string,
    sigla: string,
    cargaHoraria: number,
    professor: number,
    turma: number[],
}