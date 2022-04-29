import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainBookComponent } from './features/main-book.component';
import { RouterModule, Routes } from '@angular/router';
import { LogoModule } from '../shared/logo/logo.module';
import { NetBudgetComponent } from './UI/net-budget.component';

import { TableModule } from '../shared/table/table.module';
import { BudgetFormComponent } from './UI/budget-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import materialImports from './material.imports';
import { BudgetCardComponent } from './UI/budget-card.component';
import { BudgetItemConfirmDeleteComponent } from './UI/budget-item-confirm-delete.component';

const routes: Routes = [
  { path: '', component: MainBookComponent }
]

@NgModule({
  declarations: [
    MainBookComponent,
    NetBudgetComponent,
    BudgetFormComponent,
    BudgetCardComponent,
    BudgetItemConfirmDeleteComponent
  ],
  imports: [
    CommonModule,
    LogoModule,
    TableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ...materialImports
  ]
})
export class BudgetBookModule { }
