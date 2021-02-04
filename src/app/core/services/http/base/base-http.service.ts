import { HttpClient } from '@angular/common/http';

export abstract class BaseHttpService {

  protected abstract readonly URL_API: string;

  constructor(
    protected http: HttpClient
  ) { }

}
