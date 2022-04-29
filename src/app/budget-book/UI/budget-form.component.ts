import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetItem } from '../data-access/budget-item.model';

@Component({
  selector: 'app-budget-form',
  template: `    
    <form [formGroup]="budgetForm" class="flex flex-col justify-center items-center" (ngSubmit)="onSubmitBudgetForm()">
      <mat-form-field appearance="fill" class="w-full">
        <mat-label>Name</mat-label>
        <input type="text" matInput formControlName="name" placeholder="Name">
      </mat-form-field>
      <mat-form-field appearance="fill" class="w-full">
        <mat-label>Description</mat-label>
        <textarea type="text" matInput formControlName="description" placeholder="Description"></textarea>
      </mat-form-field>
      <div *ngIf="amount.invalid && (amount.touched || amount.dirty)" class="bg-green-100 py-5 px-6 mb-4 text-base text-green-700" role="alert">
        <span *ngIf="amount.getError('min')">
          That amount does not look right...
        </span>
      </div>
      <mat-form-field appearance="fill" class="w-full">
        <mat-label>Amount</mat-label>
        <input type="number" matInput formControlName="amount" placeholder="Amount" min="0">
      </mat-form-field>
      <button mat-stroked-button color="primary" type="submit" [disabled]="budgetForm.invalid">{{submitText}}</button>
    </form>
  `,
  styles: [
  ]
})
export class BudgetFormComponent implements OnInit {
  @Input() formSubmitCb: Function;
  @Input() budgetData: BudgetItem;

  budgetForm: FormGroup;
  submitText: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.submitText = this.budgetData ? 'Edit Item' : 'Add Item';
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
      amount: [notPopulated ? '' : this.budgetData.amount, [Validators.required, Validators.min(1)]]
    });

  }

  onSubmitBudgetForm() {
    if (this.budgetForm.valid) {
      if (this.budgetData) {
        this.formSubmitCb({ id: this.budgetData.id, ...this.budgetForm.value });
      } else {
        this.formSubmitCb(this.budgetForm.value);
      }

      this.budgetForm.reset();
      this.budgetForm.updateValueAndValidity();
    }

  }

}
