import { Professor } from 'src/app/core/interfaces/professor.interface';

export const collectionName = 'professores';

export const professores: Professor[] = [
    {
        id: 1,
        nome: "Chimbinha Rose",
        email: "chimbinha@professor.com.br",
        cpf: "000.000.000-01",
        titulacao: "GRADUAÇÃO",
    },
    {
        id: 2,
        nome: "Albert Einstein",
        email: "albert@professor.com.br",
        cpf: "000.000.000-02",
        titulacao: "ESPECIALIZAÇÃO",
    },
    {
        id: 3,
        nome: "Professor Pasquale",
        email: "pasquale@professor.com.br",
        cpf: "000.000.000-03",
        titulacao: "DOUTOR",
    },
    {
        id: 4,
        nome: "Marli dos Santos",
        email: "marli_s@professor.com",
        cpf: "989.898.989-89",
        titulacao: "MESTRE",
    }
];