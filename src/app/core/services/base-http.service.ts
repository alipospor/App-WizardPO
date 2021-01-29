import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseHttpService {

  protected abstract readonly URL_API: string;

  constructor(
    protected http: HttpClient
  ) { }

}
