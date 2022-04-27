import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetItem } from '../data-access/budget-item.model';

@Component({
  selector: 'app-budget-form',
  template: `    
    <form [formGroup]="budgetForm" class="flex flex-col justify-center items-center" (ngSubmit)="onSubmitBudgetForm()">
      <mat-form-field appearance="fill">
        <mat-label>Name</mat-label>
        <input type="text" matInput formControlName="name" placeholder="Name">
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Description</mat-label>
        <input type="text" matInput formControlName="description" placeholder="Description">
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Amount</mat-label>
        <input type="number" matInput formControlName="amount" placeholder="Amount">
      </mat-form-field>
      <button mat-stroked-button color="primary" type="submit" [disabled]="budgetForm.invalid">Add Item</button>
    </form>
  `,
  styles: [
  ]
})
export class BudgetFormComponent implements OnInit {
  @Input() formSubmitCb: Function;
  @Input() budgetData: BudgetItem;

  budgetForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm()
  }

  get name() {
    return this.budgetForm.get('name');
  }

  get description() {
    return this.budgetForm.get('description');
  }

  get amount() {
    return this.budgetForm.get('amount');
  }

  private initForm() {
    const notPopulated = this.budgetData === undefined || this.budgetData === null;

    this.budgetForm = this.fb.group({
      name: [notPopulated ? '' : this.budgetData.name, Validators.required],
      description: [notPopulated ? '' : this.budgetData.description, Validators.required],
      amount: [notPopulated ? '' : this.budgetData.amount, Validators.required]
    });
    
  }

  onSubmitBudgetForm() {
    if (this.budgetForm.valid) {
      if (this.budgetData) {
        this.formSubmitCb({id: this.budgetData.id, ...this.budgetForm.value});
      } else {
        this.formSubmitCb(this.budgetForm.value);
      }
    }
    
  }

}
