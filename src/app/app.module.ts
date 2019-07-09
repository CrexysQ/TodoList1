import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SystemModule } from './components/system/system.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthorizationModule } from './components/authorization/authorization.module';

import { AppComponent } from './app.component';

import { SetThemeService } from '../app/shared/services/set-theme.serivice';
import { TimerService } from '../app/shared/services/timer.service';
import { FormsModule } from '@angular/forms';
import { UserService } from './shared/services/users.service';
import { AuthGuard } from './shared/services/auth.guard';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from './shared/shared.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SystemModule,
    AuthorizationModule,
    FormsModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    CollapseModule.forRoot()
  ],
  providers: [SetThemeService, TimerService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})


export class AppModule {
}
