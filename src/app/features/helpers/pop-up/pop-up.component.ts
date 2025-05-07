import { Component, ElementRef, EventEmitter, input, Input, output, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  imports: [],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss',
})
export class PopUpComponent {
  @Input({ required: true }) qustionNumber!: number;
  @Input({ required: true }) qustionNumberSolved!: number;
  @ViewChild('progress') popUp!: ElementRef;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();
  ngAfterViewInit() {
    this.popUp.nativeElement.style.width = `${
      (this.qustionNumberSolved / this.qustionNumber) * 100
    }%`;
  }
}
