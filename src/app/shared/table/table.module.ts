import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import materialImports from './material.imports';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    ...materialImports
  ],
  exports: [TableComponent]
})
export class TableModule { }
