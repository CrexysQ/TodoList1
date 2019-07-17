import { TaskComponent } from './task/task.component';
import { SystemComponent } from './system.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { CalendarComponent } from './calendar/calendar.component';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgDatepickerModule } from 'ng2-datepicker';

@NgModule ({
  declarations: [
    TaskComponent,
    SystemComponent,
    HeaderComponent,
    FooterComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    SystemRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgDatepickerModule
  ]
})

export class SystemModule {
}
