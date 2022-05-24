import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { BadgeTypeEnum, ButtonComponent } from '../button/button.component';
import { InputComponent } from '../models/input-component';
import { PeriodicElement } from '../models/periodic-element';
import { AddElementFormComponent } from '../add-element-form/add-element-form.component';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsTableComponent {
  isTreeView = false;
  private selectedRow$ = new BehaviorSubject<PeriodicElement | null>(null);
  get readonly$() {
    return this.selectedRow$.asObservable();
  }

  readonlyToolbarButtons: Array<InputComponent> = [
    {
      component: ButtonComponent,
      props: {
        name: 'add',
        text: 'Добавить проект',
        icon: 'add',
        color: '#F37A1F',
        badge: BadgeTypeEnum.icon,
        tooltip:'Добавить проект',
      },
    },
  ];

  editToolbarButtons: Array<InputComponent> = [
    {
      component: ButtonComponent,
      props: {
        name: 'delete',
        text: '',
        icon: 'delete',
        badge: BadgeTypeEnum.icon,
        paletteColor: 'grey',
      },
    },
    {
      component: ButtonComponent,
      props: {
        name: 'edit',
        text: 'Редактировать',
        icon: 'edit',
        badge: 'icon',
        tooltip: 'Редактировать',
      },
    },
  ];

  data: PeriodicElement[] = [
    {
      position: 1,
      name: 'Hydrogen',
      weight: 1.0079,
      symbol: 'H',
      id: 1,
      openingYear: 1766,
    },
    {
      position: 2,
      name: 'Helium',
      weight: 4.0026,
      symbol: 'He',
      id: 2,
      openingYear: 1895,
    },
    {
      position: 3,
      name: 'Lithium',
      weight: 6.941,
      symbol: 'Li',
      id: 3,
      openingYear: 1817,
    },
    {
      position: 4,
      name: 'Beryllium',
      weight: 9.0122,
      symbol: 'Be',
      id: 4,
      openingYear: 1797,
    },
    {
      position: 5,
      name: 'Boron',
      weight: 10.811,
      symbol: 'B',
      id: 5,
      openingYear: 1808,
    },
    {
      position: 6,
      name: 'Carbon',
      weight: 12.0107,
      symbol: 'C',
      id: 6,
      openingYear: -3750,
    },
    {
      position: 7,
      name: 'Nitrogen',
      weight: 14.0067,
      symbol: 'N',
      id: 7,
      openingYear: 1772,
    },
    {
      position: 8,
      name: 'Oxygen',
      weight: 15.9994,
      symbol: 'O',
      id: 8,
      openingYear: 1774,
    },
    {
      position: 9,
      name: 'Fluorine',
      weight: 18.9984,
      symbol: 'F',
      id: 9,
      openingYear: 1886,
    },
    {
      position: 10,
      name: 'Neon',
      weight: 20.1797,
      symbol: 'Ne',
      id: 10,
      openingYear: 1898,
    },
  ];

  constructor(public dialog: MatDialog) {

  }
  data$ = of(this.data);

  toolbarBtnClick(name: any) {
    switch (name) {
      case 'add': {
        this.addNewElement(name, {});
        break;
      }
      case 'delete': {
        this.deleteElement(name, {});
        break;
      }
      case 'edit': {
        this.editElement(name, {});
        break;
      }
    }
  }

  toggleTreeView(): void {
    this.isTreeView = !this.isTreeView;
  }

  selectRow(row: PeriodicElement) {
    this.selectedRow$.next(row);

  }

  /* openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(AddElementFormComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res.event == 'Добавить элемент') {
        this.addNewElement();
      } else if (res.event == 'Изменить') {
        this.editElement(res.data);
      } else if (res.event == 'Удалить элемент') {
        this.deleteElement(res.data);
      }
    });
  } */

  addNewElement(action:string, obj:any) {
    action = 'Добавить элемент';
    obj.action = action;
    const dialogRef = this.dialog.open(AddElementFormComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.data.push({
      position: this.data.length + 1,
      name: res.data.name,
      weight: res.data.weight,
      symbol: res.data.symbol,
      id: this.data.length + 1,
      openingYear: res.data.openingYear,
      })

      console.log(this.data);
    })



  }

  editElement(action:string, obj:any) {
    const item = this.selectedRow$.getValue();
    obj = item;
    action = 'Изменить';
    obj.action = action;
    const dialogRef = this.dialog.open(AddElementFormComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((res) => {

      this.data.filter((value, key) => {
      if (value.id == res.data.id) {
        value.name = res.data.name;
        value.weight = res.data.weight;
        value.symbol = res.data.symbol;
        value.openingYear = res.data.openingYear;
      }
      return true;
    });
      console.log(this.data);
    })
  }

  deleteElement(action:string, obj:any) {
    const item = this.selectedRow$.getValue();
    obj = item;
    action = 'Удалить элемент';
    obj.action = action;
    const dialogRef = this.dialog.open(AddElementFormComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((res) => {

      this.data = this.data.filter(
      (value, key) => {
        return value.id != res.data.id;
      }
    );
      console.log(this.data);

    })
  }



  /* addNewElement(obj: any) {
    this.dataSource.filteredData.push({
      name: obj.name,
      position: this.dataSource.filteredData.length + 1,
      weight: obj.weight,
      symbol: obj.symbol,
      id: this.dataSource.filteredData.length + 1,
      openingYear: obj.openingYear,
    });
    this.dataSource._updateChangeSubscription();
  }

  editElement(obj: any) {
    this.dataSource.filteredData.filter((value, key) => {
      if (value.id == obj.id) {
        value.name = obj.name;
        value.weight = obj.weight;
        value.symbol = obj.symbol;
        value.openingYear = obj.openingYear;
      }
      return true;
    });
  }

  deleteElement(obj: any) {
    this.dataSource.filteredData = this.dataSource.filteredData.filter(
      (value, key) => {
        return value.id != obj.id;
      }
    );
  } */
}
