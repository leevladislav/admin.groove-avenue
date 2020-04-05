import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoriesPageComponent} from './categories-page.component';
import {CategoriesListComponent} from './categories-list/categories-list.component';
import {CategoryComponent} from './categories-list/category/category.component';
import {PositionComponent} from './positions-list/position/position.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPageComponent,
    children: [
      {
        path: '',
        component: CategoriesListComponent
      },
      {
        path: 'create',
        component: CategoryComponent
      },
      {
        path: ':id/edit',
        component: CategoryComponent
      },
      {
        path: ':id/position/create',
        component: PositionComponent
      },
      {
        path: ':id/edit/position/:id/edit',
        component: PositionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CategoriesPageRoutingModule {
}
