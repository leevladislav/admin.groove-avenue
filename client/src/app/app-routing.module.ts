import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {AuthGuard} from './shared/classes/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'register',
        component: RegisterPageComponent
      }
    ]
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'overview',
        loadChildren: () => import('./overview-page/overview-page.module').then(m => m.OverviewPageModule)
      },
      {
        path: 'analytics',
        loadChildren: () => import('./analytics-page/analytics-page.module').then(m => m.AnalyticsPageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('./history-page/history-page.module').then(m => m.HistoryPageModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./order-page/order-page.module').then(m => m.OrderPageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./products-page/products-page.module').then(m => m.ProductsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
