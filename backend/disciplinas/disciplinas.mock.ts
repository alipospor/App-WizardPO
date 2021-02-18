import { IDisciplinaGet } from 'src/app/core/interfaces/backend/disciplina/disciplina-get.interface';
import { turmas } from '../turmas/turmas.mock';
import { professores } from '../professores/professores.mock';

export const collectionName = 'disciplinas';

export const disciplinas: IDisciplinaGet[] = [
    {
        id: 1,
        descricao: "Biologia",
        sigla: "BIO",
        cargaHoraria: 2,
        professor: professores[1],
        turma: [
            turmas[0]
        ],
    },
    {
        id: 2,
        descricao: "Geografia",
        sigla: "GEO",
        cargaHoraria: 4,
        professor: professores[3],
        turma: [
            turmas[0]
        ],
    },
    {
        id: 3,
        descricao: "Português",
        sigla: "POR",
        cargaHoraria: 6,
        professor: professores[2],
        turma: [
            turmas[0]
        ],
    },
    {
        id: 4,
        descricao: "Música",
        sigla: "MUS",
        cargaHoraria: 3,
        professor: professores[0],
        turma: [
            turmas[0]
        ],
    }
];