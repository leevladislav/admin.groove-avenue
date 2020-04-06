import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewPageComponent} from './overview-page.component';
import {OverviewPageRoutingModule} from './overview-page.routing.module';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [OverviewPageComponent],
  imports: [
    CommonModule,
    OverviewPageRoutingModule,
    SharedModule
  ]
})
export class OverviewPageModule {
}
