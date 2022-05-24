import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnDestroy {
  dataForUserpick = {
    photo: '',
  };

  menuItems = [
    { title: 'Главный экран', icon: 'home', link: 'main' },
    { title: 'Проекты', icon: 'work_outline', link: 'projects' },
    {
      title: 'Объекты',
      icon: 'view_agenda',
      isExpand: false,
      children: [
        { title: 'Организации', link: 'organizations' },
        { title: 'Физические лица', link: 'individuals' },
        { title: 'Рабочие группы', link: 'workinglist' },
        { title: 'Проверки', link: 'checks' },
        { title: 'Подразделения', link: 'divisions' },
        { title: 'Документы', link: 'documents' },
      ],
    },
    {
      title: 'События',
      icon: 'event_note',
      link: '',
      isExpand: false,
      children: [
        { title: 'Активности', link: 'activities' },
        { title: 'Мероприятия', link: 'events' },
        { title: 'Поручения', link: 'tasks' },
      ],
    },
    {
      title: 'Аналитика',
      icon: 'assessment',
      link: '',
      isExpand: false,
      children: [
        { title: 'Связи между объектами', link: 'relations' },
        { title: 'Интерактивная карта стейкхолдеров', link: 'interactive-map' },
        { title: 'Отчеты', link: 'reports' },
      ],
    },
    { title: 'Пользователи', icon: 'people_outline', link: 'users' },
    {
      title: 'Администрирование',
      icon: 'build_circle',
      link: '',
      isExpand: false,
      children: [
        { title: 'Роли пользователей', link: 'UserRoles' },
        { title: 'Предоставление доступа', link: '' },
        { title: 'Справочники', link: 'references' },
        { title: 'Логирование', link: 'logging' },
        { title: 'Атрибуты объектов', link: '' },
      ],
    },
  ];

  bMenuItems = [{ title: 'Настройки', icon: 'settings', link: '/' }];

  activeLink: string = '';

  selectedItemIndex: number = 5;

  constructor(private _router: Router) {
    _router.events.subscribe((data) => {
      if (data instanceof NavigationStart) {
        this.activeLink = data.url.replace('/', '');
      }
    });
  }

  selectMenuItem(i: number): void {
    if (!this.menuItems[i].children) {
      this.navigate(this.menuItems[i]);
      return;
    }

    this.menuItems[i].isExpand = !this.menuItems[i].isExpand;

    if (
      this.selectedItemIndex !== undefined &&
      this.menuItems[i].isExpand &&
      this.selectedItemIndex !== i
    ) {
      this.menuItems[this.selectedItemIndex].isExpand = false;
    }

    this.selectedItemIndex = i;
  }

  navigate(item: any, isChildren = false): void {
    if (isChildren) {
    }

    this._router.navigate([item.link]);
  }

  ngOnDestroy(): void {}

  public onSidebarMouseLeave() {
    this.menuItems.forEach((item) => (item.isExpand = false));
  }
}
