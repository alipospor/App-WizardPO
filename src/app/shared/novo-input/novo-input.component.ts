import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-novo-input',
  templateUrl: './novo-input.component.html',
  styleUrls: ['./novo-input.component.css']
})
export class NovoInputComponent {

  @Input()
  public label: string;
  @Input() 
  public padding = false;
  @Output() openEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(
  ) { }

  emitOpenModal() {
    this.openEvent.emit(true);
  }
}
