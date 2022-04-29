import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { BookService } from '../data-access/book.service';
import { BudgetItem } from '../data-access/budget-item.model';
import { BudgetType } from '../data-access/budget-types.enum';

@Component({
  selector: 'app-budget-item-confirm-delete',
  template: `
    <p class="text-lg font-semibold my-5 text-center">
      Are you sure you want to delete the record {{budgetItem.name}} of type: {{budgetTypeText}}?
    </p>
    <div class="flex flex-row items-center justify-center">
      <button mat-stroked-button color="primary" type="button" class="!mx-1" (click)="confirmDelete()">Confirm</button>
      <button mat-stroked-button color="warn" type="button" class="!mx-1" (click)="dialog.closeDialog()">Cancel</button>
    </div>
  `,
  styles: [
  ]
})
export class BudgetItemConfirmDeleteComponent implements OnInit {
  @Input() budgetItem: BudgetItem;
  @Input() budgetType: BudgetType;
  budgetTypeText: string;

  constructor(private book: BookService, public dialog: DialogService) { }
  
  ngOnInit(): void {
    this.budgetTypeText = this.budgetType === BudgetType.EXPENSE ? 'Expense' : 'Income';
  }

  confirmDelete() {
    this.book.deleteItem(this.budgetItem, this.budgetType);
  }
}
