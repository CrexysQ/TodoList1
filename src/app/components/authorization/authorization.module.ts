import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './authorization-routing.module';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthorizationComponent } from './authrozation.component';

@NgModule ({
  declarations: [
    AuthorizationComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MatCardModule,
    MatFormFieldModule,
    BrowserModule
  ]
})

export class AuthorizationModule {}
