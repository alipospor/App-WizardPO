import { Injectable } from '@angular/core';
import { Aluno } from 'src/app/core/interfaces/aluno.interface';
import { Disciplina } from 'src/app/core/interfaces/disciplina.interface';
import { Professor } from 'src/app/core/interfaces/professor.interface';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
  ) { }

  public filtrarAlunos(dadosAlunos: Aluno[], arrayId: number[]): Aluno[] {
    return this.filtroArray(dadosAlunos, arrayId);
  }

  public filtrarDisciplinas(dadosDisciplinas: Disciplina[], arrayId: number[], professor: boolean = false): Disciplina[] {
    return this.filtroArray(dadosDisciplinas, arrayId);
  }

  public filtrarProfessores(dadosProfessores: Professor[], arrayId: number[]): Professor[] {
    return this.filtroArray(dadosProfessores, arrayId);
  }

  private filtroArray(arrayObjeto: any[], arrayComId: number[]): any[] {
    return arrayObjeto.filter(objeto => {
      if ((arrayComId.find(id => id == objeto.id))) {
        return objeto;
      }
    });
  }
}
