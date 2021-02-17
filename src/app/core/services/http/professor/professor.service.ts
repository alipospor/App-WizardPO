import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from 'src/app/core/interfaces/professor.interface';
import { BaseHttpService } from '../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService extends BaseHttpService {

  protected URL_API = "http://localhost:8080/api/professores";

  constructor(
    http: HttpClient
  ) {
    super(http);
  }


  obterProfessores(params?: HttpParams | { [param: string]: string | string[]; }): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.URL_API, { params });
  }

  cadastraProfessor(novoProfessor: Professor) {
    return this.http.post<Professor>(this.URL_API, novoProfessor);
  }

  deletaProfessor(professorId: number) {
    return this.http.delete<Professor>(`${this.URL_API}/${professorId}`);
  }
}
