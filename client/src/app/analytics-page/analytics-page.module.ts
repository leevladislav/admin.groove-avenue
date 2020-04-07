import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnalyticsPageRoutingModule} from './analytics-page.routing.module';
import {AnalyticsPageComponent} from './analytics-page.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [AnalyticsPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    AnalyticsPageRoutingModule
  ]
})
export class AnalyticsPageModule {
}
