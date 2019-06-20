import { Component } from '@angular/core';
import { TaskModule } from 'src/app/shared/models/index';
import { TimerService } from 'src/app/shared/services/timer.service';
import { Statuses } from 'src/app/shared/enums/taskStatuses.enum';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  public todoTaskText: string;
  public tasks: TaskModule[] = [];
  public task: string;
  public btnStatus: string;
  public isTaskStart: boolean;
  private prevTask: number;
  private currentTaskId: number;
  public minutes: string;
  public hours: string;

  constructor(private timer: TimerService) {
    this.tasks = JSON.parse(localStorage.getItem('currentUser'));
    this.todoTaskText = '';
    this.btnStatus = Statuses[1];
    this.isTaskStart = false;

    if (this.task) {
      for (const task of this.tasks) {
        if (task.taskStatus === 3) {
          this.btnStatus = Statuses[3];
        } else {
          task.taskStatus = 0;
        }
      }
    } else {
      this.tasks = [];
      return;
    }
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  public enter(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this.addTask();
    }
  }

  public addTask(): void {
    if (this.todoTaskText.trim() === '') {
      alert('Enter the task text');
    } else {
      this.tasks.push({
        status: false,
        text: this.todoTaskText,
        taskStatus: 0,
        taskTime: {
          hours: 0,
          minutes: 0
        }
      });
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    this.todoTaskText = '';
  }

  public deleteTask(idx: number): void {
    this.tasks.splice(idx, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  public deleteSelectedTasks(): void {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].status === true) {
        this.tasks.splice(i, 1);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        i -= 1;
      } else if (this.tasks[i] === this.tasks[this.tasks.length]) {
        break;
      }
    }
  }

  public onChange(event: Event, idx: number): void {
    const e = event.target as HTMLInputElement;
    this.tasks[idx].status = e.checked;
  }

  public selectAllTasks(): void {
    for (const task of this.tasks) {
      task.status = true;
    }
  }

  public unSelectAllTasks(): void {
    for (const task of this.tasks) {
      task.status = false;
    }
  }

  public startTimer(taskName: string, taskStatus: number, hours: number, minutes: number, taskId: number, ): void {
    this.currentTaskId = taskId;
    if (this.prevTask >= 0) {
      if (this.tasks[this.prevTask].taskStatus === 3) {
        this.tasks[this.prevTask].taskStatus = 3;
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      } else {
        this.tasks[this.prevTask].taskStatus = 0;
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    }

    this.timer.setTaskName(taskName);
    this.timer.startTimer(taskStatus);
    this.timer.startTaskTimer(taskStatus, hours, minutes);
    this.prevTask = taskId;
    this.timer.getTaskStatus().subscribe(value => {
      this.tasks[this.currentTaskId].taskStatus = value;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    });

    this.timer.getTaskTimerMinutes().subscribe(value => {
      this.minutes = ('0' + value).slice(-2);
      this.tasks[this.currentTaskId].taskTime.minutes = value;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    });

    this.timer.getTaskTimerHours().subscribe(value => {
      this.hours = ('0' + value).slice(-2);
      this.tasks[this.currentTaskId].taskTime.hours = value;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    });
  }
}
