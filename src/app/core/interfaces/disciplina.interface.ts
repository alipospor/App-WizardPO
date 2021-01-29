export interface Disciplina {
    descricao: string,
    sigla: string,
    cargaHoraria: number,
    professor: number,
    turma: number[],
    id?: number
}

/* Uma disciplina é ministrada por um professor em uma turma e possui uma carga horária.  */