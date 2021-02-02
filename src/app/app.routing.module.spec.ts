import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app.routing.module';

describe('app.routing.module.ts | AppRoutingModule', () => {
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes(routes)
            ]
        })
        router = TestBed.inject(Router);
    });


    it('deve direcionar para inicio', () => {
        router.navigate(['']).then(() => {
            expect(router.url).toEqual('/inicio');
        });
    });

});