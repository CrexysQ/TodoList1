import { Component, HostListener } from '@angular/core';
import { Task } from 'src/app/shared/models/index';
import { TimerService } from 'src/app/shared/services/timer.service';
import { Statuses } from 'src/app/shared/enums/taskStatuses.enum';
import { UserService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  public todoTaskName: string;
  public todoTaskDesc: string;
  public tasks: Task[] = [];
  public task: string;
  public date: Date = new Date(Date.now());
  public btnStatus: string;
  public isTaskStart: boolean;
  private prevTask: number;
  private currentTaskId: number;
  public minutes: string;
  public hours: string;

  constructor(private timer: TimerService, private usersService: UserService) {
    if (localStorage.getItem('currentUser') !== undefined) {
    }
    this.tasks = usersService.currentUser.tasks;
    this.todoTaskName = '';
    this.todoTaskDesc = '';
    this.btnStatus = Statuses[1];
    this.isTaskStart = false;

    if (this.tasks !== undefined) {
      for (const task of this.tasks) {
        if (task.taskStatus === 3) {
          this.btnStatus = Statuses[3];
        } else {
          task.taskStatus = 0;
        }
      }
    } else {
      return;
    }
  }

  public enter(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this.addTask();
    }
  }

  public addTask(): void {
    if (this.todoTaskDesc.trim() === '' && this.todoTaskName.trim() === '') {
      alert('Fill the task');
    } else if (this.todoTaskDesc.trim() === '') {
      alert('Fill the task description');
    } else if (this.todoTaskName.trim() === '') {
      alert('Fill the task Name');
    } else {
      this.tasks.push({
        status: false,
        name: this.todoTaskName,
        description: this.todoTaskDesc,
        taskStatus: 0,
        taskDate: this.date,
        taskTime: {
          hours: 0,
          minutes: 0
        }
      });
      this.usersService.currentUser.tasks = this.tasks;
    }

    this.todoTaskDesc = '';
    this.todoTaskName = '';
    this.usersService.saveUserChanges();
  }

  public deleteTask(idx: number): void {
    this.tasks.splice(idx, 1);
    this.usersService.currentUser.tasks = this.tasks;
    this.usersService.saveUserChanges();
  }

  public deleteSelectedTasks(): void {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].status === true) {
        this.tasks.splice(i, 1);
        this.usersService.currentUser.tasks = this.tasks;
        i -= 1;
      } else if (this.tasks[i] === this.tasks[this.tasks.length]) {
        break;
      }
    }
    this.usersService.saveUserChanges();
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
        this.usersService.currentUser.tasks = this.tasks;
      } else {
        this.tasks[this.prevTask].taskStatus = 0;
        this.usersService.currentUser.tasks = this.tasks;
      }
    }

    this.timer.setTaskName(taskName);
    this.timer.startTimer(taskStatus);
    this.timer.startTaskTimer(taskStatus, hours, minutes);
    this.prevTask = taskId;
    this.timer.getTaskStatus().subscribe(value => {
      this.tasks[this.currentTaskId].taskStatus = value;
      this.usersService.currentUser.tasks = this.tasks;
    });

    this.timer.getTaskTimerMinutes().subscribe(value => {
      this.minutes = ('0' + value).slice(-2);
      this.tasks[this.currentTaskId].taskTime.minutes = value;
      this.usersService.currentUser.tasks = this.tasks;
    });

    this.timer.getTaskTimerHours().subscribe(value => {
      this.hours = ('0' + value).slice(-2);
      this.tasks[this.currentTaskId].taskTime.hours = value;
      this.usersService.currentUser.tasks = this.tasks;
    });

  }

  @HostListener('window:beforeunload', ['$event'])
  BeforeUnloadEvent() {
    this.usersService.saveUserChanges();
  }
}
