import { Turma } from 'src/app/core/interfaces/turma.interface';

export const collectionName = 'turmas';

export const turmas: Turma[] = [
    {
        id: 1,
        descricao: "Turma Inauguração",
        anoLetivo: {
            start: "2020-12-01",
            end: "2021-03-12"
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