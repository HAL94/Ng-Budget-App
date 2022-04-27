import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'budget-book', loadChildren: () => import('./budget-book/budget-book.module').then(m => m.BudgetBookModule) },
  { path: '', redirectTo: 'budget-book', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
