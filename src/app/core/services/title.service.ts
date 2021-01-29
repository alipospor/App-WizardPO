import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private titulo: string;

  constructor() { }

  public get title() {
    return this.titulo;
  }

  public set title(titulo: string) {
    this.titulo = titulo;
  }
}
