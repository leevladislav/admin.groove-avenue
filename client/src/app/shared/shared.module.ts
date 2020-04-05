import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './components/loader/loader.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BackBtnComponent} from './back-btn/back-btn.component';
import {ModalHeaderComponent} from './modal/modal-header/modal-header.component';
import {MaterialModule} from './material/material.module';


@NgModule({
  declarations: [
    BackBtnComponent,
    ModalHeaderComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BackBtnComponent,
    ModalHeaderComponent,
    LoaderComponent,
    MaterialModule
  ]
})
export class SharedModule {
}
