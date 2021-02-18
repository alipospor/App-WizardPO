import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing'
import { Professor } from 'src/app/core/interfaces/professor.interface';
import { ProfessorService } from 'src/app/core/services/http/professor/professor.service';

describe('modals.service.ts | ModalsService', () => {
    let service: ProfessorService;
    let httpMock: HttpTestingController;

    const professorTeste = {
        nome: "Professor Teste",
        email: "professor@teste.com.br",
        cpf: "000.000.000-01",
        titulacao: "GRADUAÇÃO",
    } as Professor;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ProfessorService
            ]
        });
        service = TestBed.inject(ProfessorService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('deve cadastar um novo PROFESSOR', fakeAsync(() => {
        service.cadastraProfessor(professorTeste).subscribe(professor => {
            expect(professor).toEqual(professorTeste);
        })

        const req = httpMock.expectOne(request => {
            return request.method === 'POST';
        })

        req.flush(professorTeste);
        tick();
    }));

    it('deve retornar dados de PROFESSOR', fakeAsync(() => {
        const professorEsperado = [
            professorTeste
        ] as Professor[];

        service.obterProfessores().subscribe(professores => {
            expect(professores).toEqual(professorEsperado);
        });

        const req = httpMock.expectOne(request => {
            return request.method === 'GET';
        });

        req.flush(professorEsperado);
        tick();
    }));

});