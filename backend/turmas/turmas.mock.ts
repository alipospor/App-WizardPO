import { ITurma } from 'src/app/core/interfaces/backend/get-turma.interface';

export const collectionName = 'turmas';

export const turmas: ITurma[] = [
    {
        id: 1,
        descricao: "Turma Inauguração",
        anoLetivo: {
            start: "2021-01-01",
            end: "2021-12-12"
        },
        periodoLetivo: 2,
        numeroVagas: 2,
        disciplinas: [
            2,
            4
        ],
        alunos: [
            1,
            4
        ],
    }
];