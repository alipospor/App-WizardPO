import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turma } from 'src/app/core/interfaces/turma.interface';
import { BaseHttpService } from '../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class TurmaService extends BaseHttpService {

  protected URL_API = 'http://localhost:8080/api/turmas';

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

  obterTurmas(params?: HttpParams | { [param: string]: string | string[]; }): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.URL_API, { params });
  }

  deletaTurma(turmaId: number) {
    return this.http.delete<Turma>(`${this.URL_API}/${turmaId}`);
  }

  cadastroTurma(cadastroTurma: Turma) {
    return this.http.post(this.URL_API, cadastroTurma);
  }
}
