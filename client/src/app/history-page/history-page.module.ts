import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoryPageComponent} from './history-page.component';
import {HistoryListComponent} from './history-list/history-list.component';
import {HistoryFilterComponent} from './history-filter/history-filter.component';
import {SharedModule} from '../shared/shared.module';
import {HistoryPageRoutingModule} from './history-page.routing.module';
import {HistoryInfoComponent} from './history-list/history-info/history-info.component';


@NgModule({
  declarations: [
    HistoryPageComponent,
    HistoryListComponent,
    HistoryFilterComponent,
    HistoryInfoComponent
  ],
  entryComponents: [HistoryInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    HistoryPageRoutingModule
  ]
})
export class HistoryPageModule {
}
