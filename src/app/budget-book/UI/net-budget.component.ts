import { Component } from '@angular/core';
import { BookService } from '../data-access/book.service';

@Component({
  selector: 'app-net-budget',
  template: `
    <div class="flex flex-col items-center justify-center">
      <span class="text-3xl font-thin">Net Budget</span>
      <span class=" tracking-wide text-4xl my-5">{{ book.netBudget$ | async }}</span>
    </div>
    
  `,
  styles: [
  ]
})
export class NetBudgetComponent {
  constructor(public book: BookService) { }
}
