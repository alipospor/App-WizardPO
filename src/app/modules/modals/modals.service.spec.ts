import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing'
import { Professor } from 'src/app/core/interfaces/professor.interface';
import { ModalsService } from './modals.service'

describe('modals.service.ts | ModalsService', () => {
    let service: ModalsService;
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
                ModalsService
            ]
        });
        service = TestBed.inject(ModalsService);
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

        service.obterProfessor().subscribe(professores => {
            expect(professores).toEqual(professorEsperado);
        });

        const req = httpMock.expectOne(request => {
            return request.method === 'GET';
        });

        req.flush(professorEsperado);
        tick();
    }));

});