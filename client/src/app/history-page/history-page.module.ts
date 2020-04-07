import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoryPageComponent} from './history-page.component';
import {HistoryListComponent} from './history-list/history-list.component';
import {HistoryFilterComponent} from './history-filter/history-filter.component';
import {SharedModule} from '../shared/shared.module';
import {HistoryPageRoutingModule} from './history-page.routing.module';


@NgModule({
  declarations: [
    HistoryPageComponent,
    HistoryListComponent,
    HistoryFilterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HistoryPageRoutingModule
  ]
})
export class HistoryPageModule {
}
