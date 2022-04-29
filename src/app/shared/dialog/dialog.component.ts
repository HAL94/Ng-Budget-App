import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialog-data.interface';


@Component({
  selector: 'app-dialog',
  template: `
     <div mat-dialog-content class="position-relative">
      <p class="text-center text-2xl font-thin mb-5">{{ data.headerText }}</p>
      <ng-container
        [ngTemplateOutlet]="data.template"
        [ngTemplateOutletContext]="data.context"        
      ></ng-container>
    </div>
  `,
  styles: [
  ]
})
export class DialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
