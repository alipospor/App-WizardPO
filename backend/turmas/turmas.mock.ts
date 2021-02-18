import { ITurmaGet } from 'src/app/core/interfaces/backend/turmas/turma-get.interface';
import { alunos } from '../alunos/alunos.mock';
import { disciplinas } from '../disciplinas/disciplinas.mock';

export const collectionName = 'turmas';

export const turmas: ITurmaGet[] = [
    {
        id: 1,
        descricao: "Turma Inauguração",
        anoLetivo: {
            start: "2020-12-01",
            end: "2021-03-12"
        },
        periodoLetivo: 2,
        numeroVagas: 2,
        disciplinas: [disciplinas[1], disciplinas[3]],
        alunos: [alunos[0], alunos[3]],
    }
];