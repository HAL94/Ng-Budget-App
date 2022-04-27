import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button mat-raised-button [color]="color" [disabled]="disabled">
      <ng-content></ng-content>
    </button>
  `,
  styles: [
  ]
})
export class ButtonComponent  {
  @Input() color = 'default';
  @Input() disabled = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
