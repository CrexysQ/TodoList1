import { SystemComponent } from './system.component';
import { TaskComponent } from './task/task.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'system',
    component: SystemComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'todo',
        component: TaskComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
