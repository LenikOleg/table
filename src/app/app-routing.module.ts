import { TableWrapperComponent } from './table-wrapper/table-wrapper.component';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumbs: [
        {
          label: 'Таблица',
          url: null,
        },
      ],
    },
    component: ProjectsTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
