import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disciplina } from 'src/app/core/interfaces/disciplina.interface';
import { BaseHttpService } from '../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService extends BaseHttpService {

  protected URL_API = "http://localhost:8080/api/disciplinas";

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

  obterDisciplinas(params?: HttpParams | { [param: string]: string | string[]; }): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.URL_API, { params });
  }

  cadastraDisciplina(novaDisciplina: Disciplina) {
    return this.http.post<Disciplina>(this.URL_API, novaDisciplina);
  }

  deletaDisciplina(disciplinaId: number) {
    return this.http.delete<Disciplina>(`${this.URL_API}/${disciplinaId}`);
  }
}
