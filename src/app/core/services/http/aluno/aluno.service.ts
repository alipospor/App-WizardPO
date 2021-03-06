import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from 'src/app/core/interfaces/aluno.interface';
import { BaseHttpService } from '../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class AlunoService extends BaseHttpService {

  protected URL_API = 'http://localhost:8080/api/alunos';

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

  obterAlunos(params?: HttpParams | { [param: string]: string | string[]; }): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.URL_API, { params });
  }

  atualizaAluno(alunoId: number, aluno: Aluno) {
    return this.http.put<Aluno>(`${this.URL_API}/${alunoId}`, aluno);
  }

  cadastroAluno(novoAluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.URL_API, novoAluno);
  }

  deletaAluno(alunoId: number) {
    return this.http.delete<Aluno>(`${this.URL_API}/${alunoId}`);
  }
}
