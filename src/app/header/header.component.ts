import { Component, Input } from '@angular/core';
import { AvatarData } from '../models/avatar-data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title = '';
  @Input() showbreadCrumbs = true;

  searchForm = new FormGroup({
    section: new FormControl(null, Validators.required),
    searchText: new FormControl(null, Validators.required),
  });
  searchSuggest: string[] = [];

  dataForUserpick: AvatarData = {
    photo: 'assets/мопс.jpg',
    name: 'Лаврентьев В. A.',
    position: 'Менеджер',
  };

  constructor(private router: Router) {}

  onSearch() {
    if (this.searchForm.invalid) {
      return;
    }

    const { section, searchText } = this.searchForm.value;
    if (!this.searchSuggest.includes(searchText)) {
      this.searchSuggest.unshift(searchText);
      localStorage.setItem('suggest', JSON.stringify(this.searchSuggest));
    }

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.router.navigateByUrl(section + '?').then(() => {
      this.router.navigated = false;
      this.router.navigate([section], {
        state: { searchText },
      });
    });
  }

  getSuggestItems(): string[] {
    return this.searchSuggest.slice(0, 5);
  }

  removeSuggestItem(itemText: string): void {
    const index = this.searchSuggest.findIndex((item) => itemText === item);
    this.searchSuggest.splice(index, 1);
    localStorage.setItem('suggest', JSON.stringify(this.searchSuggest));
  }
}
