import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderPageComponent} from './order-page.component';
import {OrderCategoriesComponent} from './order-categories/order-categories.component';
import {OrderPositionsComponent} from './order-positions/order-positions.component';
import {OrderCartComponent} from './order-cart/order-cart.component';

const routes: Routes = [
  {
    path: '',
    component: OrderPageComponent,
    children: [
      {
        path: '',
        component: OrderCategoriesComponent
      },
      {
        path: 'cart',
        component: OrderCartComponent
      },
      {
        path: ':id',
        component: OrderPositionsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrderPageRoutingModule {
}
