export type AlunoCriarCollection = Array<AlunoCriar>;
export type AlunoCriar = {
  nome: string,
  email: string,
  cpf: string,
  matricula: number,
  formaIngresso: string,
  turma: { id: string | null },
};