import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule, routes } from './app.routing.module';
import { CoreModule } from './core/core.module';

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