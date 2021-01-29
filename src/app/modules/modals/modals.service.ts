import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/* Interfaces */
import { Professor } from 'src/app/core/interfaces/professor.interface';

/* Imports */
import { BaseHttpService } from 'src/app/core/services/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ModalsService extends BaseHttpService {

  protected URL_API = 'http://localhost:3000';

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  public obterProfessor(): Observable<Professor[]> {

    return this.http.get<Professor[]>(`${this.URL_API}/professores`);
  }

  public cadastraProfessor(novoProfessor: Professor) {

    return this.http.post(`${this.URL_API}/professores`, novoProfessor);
  }
}
