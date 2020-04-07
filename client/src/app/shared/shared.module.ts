import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './components/loader/loader.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BackBtnComponent} from './back-btn/back-btn.component';
import {ModalHeaderComponent} from './modal/modal-header/modal-header.component';
import {MaterialModule} from './material/material.module';
import {ValidatorMessageComponent} from './validator-message/validator-message.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {CustomDateAdapter} from './custom-date-adapter';
import {CUSTOM_FORMATS} from '../app.constants';

@NgModule({
  declarations: [
    BackBtnComponent,
    ModalHeaderComponent,
    LoaderComponent,
    ValidatorMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    {provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_FORMATS},
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BackBtnComponent,
    ModalHeaderComponent,
    LoaderComponent,
    MaterialModule,
    ValidatorMessageComponent
  ]
})
export class SharedModule {
}
