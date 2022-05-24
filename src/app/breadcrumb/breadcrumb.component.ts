import {
  Component,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  Optional,
  SimpleChanges,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';

export const ROOT_CRUMB_LINK = new InjectionToken('Link to the site root');

export interface Breadcrumb {
  url: string | null;
  label: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnChanges {
  @Input() title = '';

  breadcrumbs!: Array<Breadcrumb>;

  home = 'Главное меню';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    @Inject(ROOT_CRUMB_LINK) @Optional() public rootLink: string
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['title']) {
      const { previousValue, currentValue } = changes['title'];

      if (previousValue !== currentValue) {
        this.breadcrumbs = this.getBreadcrumbs(this.route.root);

        if (this.title) {
          this.breadcrumbs.push({ label: this.title, url: null });
        } else {
          this.title = this.breadcrumbs.length
            ? this.breadcrumbs[this.breadcrumbs.length - 1].label
            : this.home;
        }
      }

      this.titleService.setTitle(this.title);
    }
  }

  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    // get the child routes
    const { children } = route;

    // return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    // iterate over each children
    for (const child of children) {
      // verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      // if route contain full breadcrumb
      if (child.snapshot.data['breadcrumbs']) {
        breadcrumbs.push(...child.snapshot.data['breadcrumbs']);
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      // verify the custom data property "breadcrumb" is specified on the route
      else if (!child.snapshot.data['breadcrumb']) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      // get the route's URL segment
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');

      // append route URL to URL
      url += `/${routeURL}`;

      // add breadcrumb
      const breadcrumb: Breadcrumb = {
        label: child.snapshot.data['breadcrumb'],
        url,
      };
      breadcrumbs.push(breadcrumb);

      // recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
