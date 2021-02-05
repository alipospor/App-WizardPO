export interface Disciplina {
    descricao: string,
    sigla: string,
    cargaHoraria: number,
    professor: number,
    turma: number[],
    id?: number
}