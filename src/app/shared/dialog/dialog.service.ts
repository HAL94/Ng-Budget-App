import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// Components
import { DialogComponent } from './dialog.component';
import { DialogData, DialogOptions } from './dialog-data.interface';

type DialogRef = MatDialogRef<DialogComponent>;

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public dialogRef: DialogRef;

  constructor(private dialog: MatDialog) {}

  get context() {
    return this.dialogRef.componentInstance.data.context;
  }

  openDialog(dialogData: DialogData, dialogOptions?: DialogOptions) {    
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: dialogData,
      ...dialogOptions
    });
    this.clearComponentOnClose();
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  setDialogData(dialogData: DialogData) {
    console.log('setting', dialogData);
    if (this.dialogRef && this.dialogRef.componentInstance) {
      this.dialogRef.componentInstance.data = dialogData;
    }
  }

  private clearComponentOnClose() {    
    this.dialogRef.afterClosed().subscribe(() => {
      this.dialogRef.componentInstance.data = null;
      this.dialogRef.componentInstance = null;
      this.dialogRef = null;
      // console.log('destroyed dialog compo');
    })
  }

}
