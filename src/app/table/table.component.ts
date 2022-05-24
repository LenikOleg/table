import { AddElementFormComponent } from './../add-element-form/add-element-form.component';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../models/periodic-element';
import { ExtendedColumn } from '../models/extended-column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  @Output() columnsChanged = new EventEmitter<any>();
  @Output() rowClick = new EventEmitter();
  @Input() columns: Array<ExtendedColumn> = []!;
  @Input() set data(d: Array<PeriodicElement>) {
    this.dataSource.data = d;
  }

  get displayedColumns() {
    const cells = [
      ...this.columns.filter((c) => c.isShow !== false).map((c) => c.columnDef),
    ];
    return cells;
  }

  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;

  selectedRowIndex!: number;

  constructor() {
    this.dataSource = new MatTableDataSource(this.data);
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectRow(i: any, index: number): void {
    this.selectedRowIndex = index;
    this.rowClick.emit(i);
    console.log('click');
  }

  getColumn() {
    return this.columns
      .filter(function (values) {
        return values.isShow === true;
      })
      .map(function (item) {
        return item.columnDef;
      });
  }



}
