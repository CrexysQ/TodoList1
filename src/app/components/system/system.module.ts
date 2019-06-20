import { TaskComponent } from './task/task.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SystemComponent } from './system.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@NgModule ({
  declarations: [
    TaskComponent,
    SystemComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
  exports: []
})

export class SystemModule {
}
