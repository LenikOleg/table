import { SortDirection } from '@angular/material/sort';

export class ExtendedColumn {
  base?: boolean;

  columnDef?: string;

  header?: string;

  isDisabled?: boolean;

  isShow?: boolean;

  href?: string;

  sortByDefault?: boolean;

  sortDirection?: SortDirection;

  blank?: boolean;

  cell?: any;
}
