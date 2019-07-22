import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { UserService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public viewDate: Date = new Date();
  public events: CalendarEvent[] = [];
  public taskStartDate: Date = new Date();

  constructor(public usersService: UserService) {
    for (let task of usersService.currentUser.tasks) {
      this.taskStartDate = task.taskDate;
      let taskTitle: string = task.name;
      let dateForEvents = [{
        start: new Date(this.taskStartDate),
        title: taskTitle,
        allDay: true
      }];
      this.events.push({
        start: new Date(this.taskStartDate),
        title: taskTitle,
        allDay: true
      });
    }
  }

  ngOnInit() {
  }

}
