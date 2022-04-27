import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BookService } from '../data-access/book.service';
import { BudgetType } from '../data-access/budget-types.enum';

@Component({
  selector: 'app-budget-card',
  template: `
    <div class="p-5 bg-gray-100 shadow-md rounded lg:max-w-xs m-auto my-3">
      <div class="flex flex-row items-center justify-between">
        <div class="rounded p-3 text-white" [ngClass]="budgetCardType === BUDGET_TYPES.INCOME ? 'income-bg': 'expense-bg'">
          <mat-icon>{{icon}}</mat-icon>
        </div>
        <span class="text-sm text-[#999] font-medium">{{BUDGET_TYPES[budgetCardType] | uppercase }}</span>
      </div>
      <p class="text-right font-semibold">{{ budget$ | async }}</p>
    </div>
  `,
  styles: [
  ]
})
export class BudgetCardComponent implements OnInit {
  BUDGET_TYPES = BudgetType;
  @Input() budgetCardType: BudgetType;
  @Input() icon: string;

  budget$: Observable<number>;

  constructor(private book: BookService) { }

  ngOnInit(): void {
    const budgetObs = this.budgetCardType === BudgetType.INCOME ? 
    this.book.income : this.book.expenses;

    this.budget$ = budgetObs.pipe(
      map((values) =>
        values.reduce(
          (accumlator, currentItem) => accumlator + currentItem.amount,
          0
        )
      )
    );
  }

}
