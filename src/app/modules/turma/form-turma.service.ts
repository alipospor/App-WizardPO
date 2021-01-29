import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/* Import */
import { BaseHttpService } from 'src/app/core/services/base-http.service';

/* Interfaces */
import { Professor } from 'src/app/core/interfaces/professor.interface';
import { Turma } from 'src/app/core/interfaces/turma.interface';
import { Aluno } from 'src/app/core/interfaces/aluno.interface';
import { Disciplina } from 'src/app/core/interfaces/disciplina.interface';

@Injectable()
export class FormTurmaService extends BaseHttpService {

  protected URL_API = 'http://localhost:3000';

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  obterProfessor(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.URL_API}/professores`);
  }

  cadastraProfessor(novoProfessor: Professor) {
    return this.http.post(`${this.URL_API}/professores`, novoProfessor);
  }

  obterDisciplinaId(disciplinaId: number): Observable<Disciplina> {
    return this.http.get<Disciplina>(`${this.URL_API}/disciplinas/${disciplinaId}`)
  }

  obterDisciplina(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.URL_API}/disciplinas`);
  }

  cadastraDisciplina(novaDisciplina: Disciplina) {
    return this.http.post(`${this.URL_API}/disciplinas`, novaDisciplina);
  }

  atualizaDisciplina(disciplinaId: number, disciplina: Disciplina) {
    return this.http.put(`${this.URL_API}/disciplinas/${disciplinaId}`, disciplina);
  }

  obterAluno(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.URL_API}/alunos`);
  }

  obterAlunoId(alunoId: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.URL_API}/alunos?id=${alunoId}`);
  }

  obterAlunoSemTurma(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.URL_API}/alunos?turma=null`);
  }

  atualizaAluno(alunoId: number, aluno: Aluno) {
    return this.http.put(`${this.URL_API}/alunos/${alunoId}`, aluno);
  }

  cadastraAluno(novoAluno: Aluno) {
    return this.http.post(`${this.URL_API}/alunos`, novoAluno);
  }

  obterTurma(): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.URL_API}/turmas`);
  }

  cadastroTurma(cadastroTurma: Turma) {
    return this.http.post(`${this.URL_API}/turmas`, cadastroTurma);
  }

}
