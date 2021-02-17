import { Disciplina } from 'src/app/core/interfaces/disciplina.interface';

export const collectionName = 'disciplinas';

export const disciplinas: Disciplina[] = [
    {
        id: 1,
        descricao: "Biologia",
        sigla: "BIO",
        cargaHoraria: 2,
        professor: 2,
        turma: [
            1
        ],
    },
    {
        id: 2,
        descricao: "Geografia",
        sigla: "GEO",
        cargaHoraria: 4,
        professor: 4,
        turma: [
            1
        ],
    },
    {
        id: 3,
        descricao: "Português",
        sigla: "POR",
        cargaHoraria: 6,
        professor: 3,
        turma: [
            1
        ],
    },
    {
        id: 4,
        descricao: "Música",
        sigla: "MUS",
        cargaHoraria: 3,
        professor: 1,
        turma: [
            1
        ],
    }
];