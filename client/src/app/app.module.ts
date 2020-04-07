import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {TokenInterceptor} from './shared/classes/token.interceptor';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalInfoComponent} from './entry-components/modal-info/modal-info.component';
import {ModalConfirmComponent} from './entry-components/modal-confirm/modal-confirm.component';
import {ModalCropComponent} from './entry-components/modal-crop/modal-crop.component';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    ModalInfoComponent,
    ModalConfirmComponent,
    ModalCropComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ImageCropperModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  entryComponents: [
    ModalInfoComponent,
    ModalConfirmComponent,
    ModalCropComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
