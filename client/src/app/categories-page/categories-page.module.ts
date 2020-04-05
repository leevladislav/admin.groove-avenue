import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesPageRoutingModule} from './categories-page.routing.module';
import {CategoriesListComponent} from './categories-list/categories-list.component';
import {CategoriesPageComponent} from './categories-page.component';
import {CategoryComponent} from './categories-list/category/category.component';
import {SharedModule} from '../shared/shared.module';
import {PositionsListComponent} from './positions-list/positions-list.component';
import { PositionComponent } from './positions-list/position/position.component';


@NgModule({
  declarations: [
    CategoriesPageComponent,
    CategoriesListComponent,
    CategoryComponent,
    PositionsListComponent,
    PositionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoriesPageRoutingModule
  ],
  exports: [
    PositionsListComponent
  ]
})
export class CategoriesPageModule {
}
