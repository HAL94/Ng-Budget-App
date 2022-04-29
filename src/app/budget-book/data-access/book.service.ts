import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BudgetItem } from './budget-item.model';
import { BudgetType } from './budget-types.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  expenses$ = new BehaviorSubject<BudgetItem[]>([]);
  income$ = new BehaviorSubject<BudgetItem[]>([]);
  netBudget$ = new BehaviorSubject<number>(0);

  constructor(private snackbar: MatSnackBar, private dialog: DialogService) { }

  get expenses() {
    return this.expenses$.asObservable();
  }

  get income() {
    return this.income$.asObservable();
  }

  addItem(item: BudgetItem, itemType: BudgetType) {
    item.id = new Date().getTime().toString();

    let currentBudget = this.netBudget$.getValue();
    let budgetList = null;

    if (itemType === BudgetType.EXPENSE) {
      currentBudget -= item.amount;
      budgetList = this.expenses$.getValue();
    } else {
      currentBudget += item.amount;
      budgetList = this.income$.getValue();
    }

    budgetList.push(item);

    this.broadcastList(budgetList, itemType);
    this.netBudget$.next(currentBudget);
    const snackbarMessage = `Added Item: ${item.name}`;
    this.dialog.closeDialog();
    this.snackbar.open(snackbarMessage, null, { duration: 2000, verticalPosition: 'top' });
  }

  editItem(item: BudgetItem, itemType: BudgetType) {
    let budgetList = null;
    if (itemType === BudgetType.EXPENSE) {
      budgetList = this.expenses$.getValue();
    } else {
      budgetList = this.income$.getValue();
    }
    const itemIndex = budgetList.findIndex((currentItem: BudgetItem) => currentItem.id === item.id);
    if (itemIndex >= 0) {
      budgetList[itemIndex] = { ...item };
      this.broadcastList(budgetList, itemType);
      this.updateBudget();
      const snackbarMessage = `Saved: ${item.name}`;
      this.dialog.closeDialog();
      this.snackbar.open(snackbarMessage, null, { duration: 2000, verticalPosition: 'top' });
    }
  }

  deleteItem(item: BudgetItem, itemType: BudgetType) {
    let budgetList = null;
    if (itemType === BudgetType.EXPENSE) {
      budgetList = this.expenses$.getValue();
    } else {
      budgetList = this.income$.getValue();
    }
    const itemIndex = budgetList.findIndex((currentItem: BudgetItem) => currentItem.id === item.id);

    if (itemIndex >= 0) {
      budgetList.splice(itemIndex, 1);
      this.broadcastList(budgetList, itemType);
      this.updateBudget();
    }
  }

  private broadcastList(budgetList: BudgetItem[], itemType: BudgetType) {
    if (itemType === BudgetType.EXPENSE) {
      this.expenses$.next([...budgetList]);
    } else {
      this.income$.next([...budgetList]);
    }
  }


  private updateBudget() {
    let currentBudget = this.netBudget$.getValue();

    const expenses = this.expenses$.getValue().reduce((accu, current) => accu + current.amount, 0);
    const income = this.income$.getValue().reduce((accu, current) => accu + current.amount, 0);

    currentBudget = income - expenses;

    this.netBudget$.next(currentBudget);

  }
}
