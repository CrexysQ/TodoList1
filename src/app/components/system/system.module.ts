import { TaskComponent } from './task/task.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SystemComponent } from './system.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule ({
  declarations: [
    TaskComponent,
    SystemComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    SystemRoutingModule,
    SharedModule
  ]
})

export class SystemModule {
}
