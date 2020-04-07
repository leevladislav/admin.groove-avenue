import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HistoryPageComponent} from './history-page.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryPageComponent,
    children: [
      // {
      //   path: '',
      //   component: OrderCategoriesComponent
      // },
      // {
      //   path: 'cart',
      //   component: OrderCartComponent
      // },
      // {
      //   path: ':id',
      //   component: OrderPositionsComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HistoryPageRoutingModule {
}
