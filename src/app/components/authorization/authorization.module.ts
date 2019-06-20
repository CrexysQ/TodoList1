import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthorizationComponent } from './authrozation.component';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './authorization-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule ({
  declarations: [
    AuthorizationComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})

export class AuthorizationModule {}
