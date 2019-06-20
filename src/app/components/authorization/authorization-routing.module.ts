import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthorizationComponent } from './authrozation.component';

const authRoutes: Routes = [
  { path: '', component: AuthorizationComponent, children: [
    { path: 'registration', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
  ]}
];

@NgModule ({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AuthRoutingModule {

}
