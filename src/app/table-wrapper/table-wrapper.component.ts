import {
  EventEmitter,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { ExtendedColumn } from '../models/extended-column';
import { InputComponent } from '../models/input-component';
import { PeriodicElement } from '../models/periodic-element';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableWrapperComponent implements OnInit {
  @Output() rowClick = new EventEmitter();

  @Output() tbBtnClick = new EventEmitter<string>();

  @Input()
  data: Array<PeriodicElement> = [];

  @Input()
  components!: Array<InputComponent>;

  columns: Array<ExtendedColumn> = [
    {
      isDisabled: true,
      isShow: true,
      columnDef: 'position',
      header: '№ п/п',
      cell: (element: PeriodicElement) => `${element.position}`,
    },
    {
      isDisabled: true,
      isShow: true,
      columnDef: 'name',
      header: 'Название элемента',
      cell: (element: PeriodicElement) => `${element.name}`,
    },
    {
      isDisabled: false,
      isShow: true,
      columnDef: 'symbol',
      header: 'Обозначение',
      cell: (element: PeriodicElement) => `${element.symbol}`,
    },
    {
      isDisabled: false,
      isShow: true,
      columnDef: 'weight',
      header: 'Масса',
      cell: (element: PeriodicElement) => `${element.weight}`,
    },
    {
      isDisabled: false,
      isShow: false,
      columnDef: 'id',
      header: 'Id',
      cell: (element: PeriodicElement) => `${element.id}`,
    },
    {
      isDisabled: false,
      isShow: true,
      columnDef: 'openingYear',
      header: 'Год открытия',
      cell: (element: PeriodicElement) => `${element.openingYear}`,
    },
  ];

  columns$ = of(this.columns);

  onRowClick(row: any) {
    this.rowClick.emit(row);

  }

  onToolbarBtnClick(name: string) {
    this.tbBtnClick.emit(name);
  }

  constructor() {}

  ngOnInit(): void {

  }


}
