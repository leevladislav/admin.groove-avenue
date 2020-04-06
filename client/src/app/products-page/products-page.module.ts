import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsPageRoutingModule} from './products-page.routing.module';
import {CategoriesListComponent} from './categories-list/categories-list.component';
import {ProductsPageComponent} from './products-page.component';
import {CategoryComponent} from './categories-list/category/category.component';
import {SharedModule} from '../shared/shared.module';
import {PositionsListComponent} from './positions-list/positions-list.component';
import {PositionComponent} from './positions-list/position/position.component';


@NgModule({
  declarations: [
    ProductsPageComponent,
    CategoriesListComponent,
    CategoryComponent,
    PositionsListComponent,
    PositionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsPageRoutingModule
  ],
  exports: [
    PositionsListComponent
  ]
})
export class ProductsPageModule {
}
