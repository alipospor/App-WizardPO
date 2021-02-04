import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from "rxjs/operators";

/* PO UI */
import { PoMenuItem } from '@po-ui/ng-components';
import { TitleService } from './core/services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Início', action: this.onClick.bind(this, "inicio") },
    { label: 'Abertura de Turma', action: this.onClick.bind(this, "abertura") },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: TitleService
  ) {

  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }))
      .pipe(switchMap(route => route.data))
      .subscribe(event => this.titleService.title = event.title);
  }

  private onClick(rota: string): void {
    this.router.navigate([rota]);
  }

}
