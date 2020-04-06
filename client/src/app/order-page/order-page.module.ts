import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {OrderPageRoutingModule} from './order-page.routing.module';
import {OrderPageComponent} from './order-page.component';
import {OrderCategoriesComponent} from './order-categories/order-categories.component';
import {OrderPositionsComponent} from './order-positions/order-positions.component';
import {OrderCartComponent} from './order-cart/order-cart.component';


@NgModule({
  declarations: [
    OrderPageComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
    OrderCartComponent
  ],
  imports: [
    CommonModule,
    OrderPageRoutingModule,
    SharedModule
  ]
})
export class OrderPageModule {
}
