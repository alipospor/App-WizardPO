import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-detector-tela',
  templateUrl: './detector-tela.component.html',
  styleUrls: ['./detector-tela.component.css']
})
export class DetectorTelaComponent implements AfterViewInit {
  tamanhos = {
    0: 'sm',
    1: 'md',
    2: 'lg',
    3: 'xl'
  };

  @ViewChild('divTamanho') protected divTamanho: ElementRef;
  @Output() tamanho: EventEmitter<string> = new EventEmitter();

  @HostListener('window:resize', [])
  public redimensionar(): void {
    this.detectarTamanhoTela();
  }

  ngAfterViewInit(): void {
    this.detectarTamanhoTela();
  }

  private detectarTamanhoTela(): void {
    const elemento = this.divTamanho.nativeElement;

    let tamanhoAtual = 'sm';

    for (let indexElementoFilho = 0; indexElementoFilho < 4; indexElementoFilho++) {
      const elementoFilho = elemento.children[indexElementoFilho];

      if (window.getComputedStyle(elementoFilho).display === 'none') {
        tamanhoAtual = this.tamanhos[indexElementoFilho];
        break;
      }
    }
    this.tamanho.emit(tamanhoAtual);
  }
}
