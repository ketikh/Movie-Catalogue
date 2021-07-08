import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent,
  ],
  exports: [HeaderComponent],
  imports: [
    CommonModule,SharedModule
  ]
})
export class ShellModule { }
