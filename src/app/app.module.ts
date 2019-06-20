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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SystemModule,
    AuthorizationModule,
    FormsModule
  ],
  providers: [SetThemeService, TimerService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})


export class AppModule {
}
