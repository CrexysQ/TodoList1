import { SystemComponent } from './system.component';
import { TaskComponent } from './task/task.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';

const routes: Routes = [
  {path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
    {path: 'home', component: TaskComponent},
  ]}
];

@NgModule ({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class SystemRoutingModule {}
