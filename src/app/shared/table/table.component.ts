import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableAction } from './table-action.interface';

@Component({
  selector: 'app-table',
  template: `
    <mat-card class="p-5 mb-10 shadow-lg bg-gray-100">
      <ng-content></ng-content>            
      <div class="my-4 pb-10"></div>
      <input (keyup)="applyFilter($event)"  class="form-control bg-inherit w-4/5 mx-auto  block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="ploFilterCtrl" placeholder="Find your item..." #input>
      <table [dataSource]="dataSource" mat-table class="mt-5 w-full bg-inherit" matSort matSortDisableClear matSortDirection="desc">
        <ng-container *ngFor="let propName of displayedColumns" matColumnDef="{{propName}}">
          <ng-container *ngIf="propName !== 'action'; else actionBlock" >
            <th mat-sort-header mat-header-cell *matHeaderCellDef> {{propName | uppercase}} </th>
            <td mat-cell *matCellDef="let element" class="p-2"> {{element[propName]}} </td>
          </ng-container>          
          <ng-template #actionBlock>
            <ng-container matColumnDef="propName">
                <th mat-header-cell *matHeaderCellDef>{{propName | uppercase}}</th>
                <td mat-cell *matCellDef="let element" class="text-left cursor-pointer">
                    <ng-container *ngFor="let action of tableActions">
                      <mat-icon (click)="action.actionCb(element)" [ngClass]="{'!text-[#5bd75b]' : action.actionIcon === 'edit', '!text-[#d52c2c]': action.actionIcon === 'delete'}">{{action.actionIcon}}</mat-icon>
                    </ng-container>
                </td>                
            </ng-container>
          </ng-template>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

        <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell" colspan="4">No Elements available</td>
        </tr>
      </table>
      <mat-paginator class="bg-inherit" [pageSizeOptions]="pageSizeOptions" [length]="dataSize" [pageSize]="displaySize" aria-label="Select page of Food Table" showFirstLastButtons></mat-paginator>
    </mat-card>
  `,
  styles: [
  ]
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() dataProperties: any;
  @Input() data: any[];
  @Input() pageSizeOptions: number[];
  @Input() tableActions: TableAction[];
  @Input() execludedColumns: string[];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[];
  dataSize: number;
  displaySize: number;

  constructor() { }

  ngOnInit(): void {
    this.initTable();
  }

  ngOnChanges(): void {
    this.initTable();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private initTable(): void {
    this.displayedColumns = [...this.dataProperties.filter((col: string) => !this.execludedColumns.includes(col)), 'action'];
    this.dataSource.data = this.data;
    this.dataSize = this.data.length;
    this.displaySize = this.pageSizeOptions[0];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
