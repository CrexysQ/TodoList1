import { SystemComponent } from './system.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  { path: 'system',
    component: SystemComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'todo',
        component: TaskComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
