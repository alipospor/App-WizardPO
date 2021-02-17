import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms';
import { PoFieldModule, PoModalModule } from '@po-ui/ng-components';
import { of, throwError } from 'rxjs';
import { NotificationMessageService } from 'src/app/core/helpers/notification-message.service';
import { ProfessorModalComponent } from './professor-modal.component'

describe('professor-modal.component.ts | ProfessorModalComponent', () => {
    let component: ProfessorModalComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                PoModalModule,
                PoFieldModule,
                HttpClientTestingModule,
                PoModalModule
            ],
            declarations: [
                ProfessorModalComponent
            ],
            providers: [
                NotificationMessageService,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        const fixture = TestBed.createComponent(ProfessorModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('deve retornar sucesso no cadastro de PROFESSOR', () => {
        spyOn(component['modalService'], 'cadastraProfessor').and.returnValue(of(null));

        component.professorForm.get("nome").setValue('Professor Teste');
        component.professorForm.get("email").setValue('professro@p.com');
        component.professorForm.get("cpf").setValue("000.000.000-00");
        component.professorForm.get("titulacao").setValue("ESPECIALIZAÇÃO");

        spyOn(component['notificationHelper'], 'mensagemSucesso');
        component.cadastraNovoProfessor();
        expect(component['notificationHelper'].mensagemSucesso).toHaveBeenCalled();
    });

    it('deve retornar erro no cadastro do PROFESSOR', () => {
        spyOn(component['modalService'], 'cadastraProfessor').and.returnValue(
            throwError("")
        );
        component.professorForm.get("nome").setValue('Professor Teste');
        component.professorForm.get("email").setValue('professro@p.com');
        component.professorForm.get("cpf").setValue("000.000.000-00");
        component.professorForm.get("titulacao").setValue("ESPECIALIZAÇÃO");

        spyOn(component['notificationHelper'], 'mensagemErro');
        component.cadastraNovoProfessor();
        expect(component['notificationHelper'].mensagemErro).toHaveBeenCalled();
    });

})