import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogData } from 'src/app/shared/dialog/dialog-data.interface';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { TableAction } from 'src/app/shared/table/table-action.interface';
import { BookService } from '../data-access/book.service';
import { BudgetItem } from '../data-access/budget-item.model';
import { BudgetType } from '../data-access/budget-types.enum';

@Component({
  selector: 'app-main-book',
  template: `
    <main>
      <div class="container mx-auto">
        <app-logo class="p-5"></app-logo>
        <app-net-budget></app-net-budget>
        <div class="lg:columns-2 columns-1">
          <app-budget-card
            [budgetCardType]="EXPENSE"
            [icon]="'attach_money'"
          ></app-budget-card>
          <app-budget-card
            [budgetCardType]="INCOME"
            [icon]="'trending_up'"
          ></app-budget-card>
        </div>
        <div class="w-full border-t my-5"></div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-6">
          <ng-container *ngIf="book.expenses | async as expenses">
            <app-table
              class="col-span-1"
              [dataProperties]="budgetItemProperties"
              [data]="expenses"
              [pageSizeOptions]="pageSizeOptions"
              [tableActions]="expenseTableActions"
              [execludedColumns]="excludes">
              <div
                class="expense-bg border rounded my-0 mx-4 p-4 shadow border-b-0 absolute -top-6 left-0 right-0 text-white">
                <div class="flex flex-row items-center justify-between">
                  <div class="flex flex-col items-center justify-center">
                    <h3 class="text-2xl mb-3">Expenses Table</h3>
                    <p class="text-sm">Add your list of expenses</p>
                  </div>
                  <button
                    mat-icon-button
                    type="button"
                    (click)="addItem(EXPENSE)">
                    <mat-icon>add</mat-icon>
                  </button>
                </div>
              </div>
            </app-table>
          </ng-container>

          <ng-container *ngIf="book.income | async as income">
            <app-table
              [dataProperties]="budgetItemProperties"
              class="col-span-1"
              [data]="income"
              [pageSizeOptions]="pageSizeOptions"
              [tableActions]="incomeTableActions"
              [execludedColumns]="excludes">
              <div
                class="income-bg border rounded my-0 mx-4 p-4 shadow border-b-0 absolute -top-6 left-0 right-0 text-white">
                <div class="flex flex-row items-center justify-between">
                  <div class="flex flex-col items-center justify-center">
                    <h3 class="text-2xl mb-3">Income Table</h3>
                    <p class="text-sm">Add your list of income</p>
                  </div>
                  <button
                    mat-icon-button
                    type="button"
                    (click)="addItem(INCOME)">
                    <mat-icon>add</mat-icon>
                  </button>
                </div>
              </div>
            </app-table>
          </ng-container>
        </div>

        <ng-template let-formSubmitCb="formCb" #addItemTemplate>
          <app-budget-form [formSubmitCb]="formSubmitCb"></app-budget-form>
        </ng-template>

        <ng-template let-formSubmitCb="formCb" let-budgetData="budgetData" #editItemTemplate>
          <app-budget-form
            [formSubmitCb]="formSubmitCb"
            [budgetData]="budgetData"
          ></app-budget-form>
        </ng-template>
      </div>
    </main>
  `
})
export class MainBookComponent implements OnInit {
  budgetItemProperties = Object.keys(new BudgetItem());
  EXPENSE = BudgetType.EXPENSE;
  INCOME = BudgetType.INCOME;
  excludes = ['id'];
  pageSizeOptions = [2, 5, 10];

  expenseTableActions: TableAction[] = [
    {
      actionIcon: 'edit',
      class: '!text-[#5bd75b]',
      actionCb: (budgetItem: BudgetItem) =>
        this.editItem(budgetItem, this.EXPENSE),
    },
    {
      actionIcon: 'delete',
      class: '!text-[#d52c2c]',
      actionCb: (budgetItem: BudgetItem) => {
        this.book.deleteItem(budgetItem, this.EXPENSE);
      },
    },
  ];

  incomeTableActions: TableAction[] = [
    {
      actionIcon: 'edit',
      actionCb: (budgetItem: BudgetItem) =>
        this.editItem(budgetItem, this.INCOME),
    },
    {
      actionIcon: 'delete',
      actionCb: (budgetItem: BudgetItem) => {
        this.book.deleteItem(budgetItem, this.INCOME);
      },
    },
  ];

  @ViewChild('addItemTemplate') addItemTemplate: TemplateRef<any>;
  @ViewChild('editItemTemplate') editItemTemplate: TemplateRef<any>;

  private DIALGUE_OPTIONS = { width: '50vw', disableClose: false };

  constructor(public book: BookService, private dialog: DialogService) { }

  ngOnInit(): void { }

  addItem(itemType: BudgetType) {
    const headerText =
      itemType === BudgetType.EXPENSE ? 'Add Expense Info' : 'Add Income Info';
    const dialogData: DialogData = {
      headerText: headerText,
      template: this.addItemTemplate,
      context: {
        formCb: (budgetItem: BudgetItem) => this.book.addItem(budgetItem, itemType),
      },
    };

    this.dialog.openDialog(dialogData, this.DIALGUE_OPTIONS);
  }

  private editItem(budgetItem: BudgetItem, itemType: BudgetType) {
    const headerText =
      itemType === BudgetType.EXPENSE ? 'Edit Expense Info' : 'Edit Income Info';

    const dialogData: DialogData = {
      headerText: headerText,
      template: this.editItemTemplate,
      context: {
        formCb: (budgetItem: BudgetItem) => this.book.editItem(budgetItem, itemType),
        budgetData: budgetItem,
      },
    };

    this.dialog.openDialog(dialogData, this.DIALGUE_OPTIONS);
  }
}
