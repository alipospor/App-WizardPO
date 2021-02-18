import { Aluno } from 'src/app/core/interfaces/aluno.interface';

export const collectionName = 'alunos';

export const alunos: Aluno[] = [
    {
        id: 1,
        nome: "João Frango",
        email: "j_frango@aluno.com",
        cpf: "000.000.000-10",
        matricula: 1001,
        formaIngresso: "ENADE",
        turma: 1,
    },
    {
        id: 2,
        nome: "Alisson Cleverson",
        email: "ali_cleverson@hotmailcom",
        cpf: "077.603.609-05",
        matricula: 1003,
        formaIngresso: "VESTIBULAR",
        turma: null,
    },
    {
        id: 3,
        nome: "Alisson Pospor",
        email: "ali_pospor@hotmail.com",
        cpf: "077.630.609-05",
        matricula: 2477,
        formaIngresso: "ENEM",
        turma: 1,
    },
    {
        id: 4,
        nome: "Garrafinha",
        email: "garrafinha@aluno.com.br",
        cpf: "000.000.000-00",
        matricula: 9177,
        formaIngresso: "VESTIBULAR",
        turma: null,
    },
    {
        id: 5,
        nome: "Chaveirinho",
        email: "chaveirinho@aluno.com.br",
        cpf: "000.000.000-00",
        matricula: 9036,
        formaIngresso: "ENEM",
        turma: null,
    }
];