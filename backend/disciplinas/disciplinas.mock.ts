import { IDisciplina } from 'src/app/core/interfaces/backend/get-disciplina.interface';

export const collectionName = 'disciplinas';

export const disciplinas: IDisciplina[] = [
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