import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Time } from '../models/time';
import { UserService } from './users.service';


@Injectable({
  providedIn: 'root'
})

export class TimerService {
  public task: BehaviorSubject<string> = new BehaviorSubject<string>('None');
  public taskStatus: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public behaviorHours: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public behaviorMinutes: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public TaskHours: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public TaskMinutes: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public time: Time;
  public seconds: number;
  public minutes: number;
  public hours: number;
  public taskSeconds: number;
  public taskMinutes: number;
  public taskHours: number;
  public timeCounter: any;
  public taskTimeCounter: any;

  constructor(private userSevice: UserService) {
    if (userSevice.currentUser !== undefined) {
      this.time = userSevice.currentUser.time;
    } else {
      return;
    }

    if (this.time !== undefined) {
      this.seconds = 0;
      this.minutes = userSevice.currentUser.time.minutes;
      this.hours = userSevice.currentUser.time.hours;
      this.taskSeconds = this.seconds;
      this.taskMinutes = 0;
      this.taskHours = 0;
      this.behaviorMinutes.next(this.minutes);
      this.behaviorHours.next(this.hours);
    } else {
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
      this.taskSeconds = this.seconds;
      this.taskMinutes = 0;
      this.taskHours = 0;
      this.behaviorMinutes.next(this.minutes);
      this.behaviorHours.next(this.hours);
      this.time = {
        hours: 0,
        minutes: 0
      };
    }
  }

  getTime() {
    if (this.userSevice.currentUser !== undefined) {
      this.time = this.userSevice.currentUser.time;
    } else {
      return;
    }

    if (this.time !== null) {
      this.seconds = 0;
      this.minutes = this.userSevice.currentUser.time.hours;
      this.hours = this.userSevice.currentUser.time.hours;
      this.taskSeconds = this.seconds;
      this.taskMinutes = 0;
      this.taskHours = 0;
      this.behaviorMinutes.next(this.minutes);
      this.behaviorHours.next(this.hours);
    } else {
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
      this.taskSeconds = this.seconds;
      this.taskMinutes = 0;
      this.taskHours = 0;
      this.behaviorMinutes.next(this.minutes);
      this.behaviorHours.next(this.hours);
      this.time = {
        hours: 0,
        minutes: 0
      };
    }
  }

  public getTaskStatus(): Observable<number> {
    return this.taskStatus.asObservable();
  }

  public setTaskName(taskName: string): void {
    this.task.next(taskName);
  }

  public getTaskName(): Observable<string> {
    return this.task.asObservable();
  }

  public getTaskTimerMinutes(): Observable<number> {
    return this.TaskMinutes.asObservable();
  }

  public getTaskTimerHours(): Observable<number> {
    return this.TaskHours.asObservable();
  }

  public getTimerMinutes(): Observable<number> {
    return this.behaviorMinutes.asObservable();
  }

  public getTimerHours(): Observable<number> {
    return this.behaviorHours.asObservable();
  }

  public startTimer(taskStatus: number): void {
    clearInterval(this.timeCounter);
    if (taskStatus === 0) {
      this.taskStatus.next(1);
      this.timeCounter = setInterval(() => {
        this.seconds = this.seconds + 1;

        if (this.seconds > 9) {
          this.seconds = 0;
          this.minutes += 1;
          this.behaviorMinutes.next(this.minutes);
          this.getTimerMinutes();

          if (this.minutes > 9) {
            this.minutes = 0;
            this.behaviorMinutes.next(this.minutes);
            this.getTimerMinutes();
            this.hours += 1;
            this.behaviorHours.next(this.hours);
            this.getTimerHours();
            if (this.hours > 11) {
              alert('It\'s time to go home');
              this.hours = 0;
              this.behaviorHours.next(this.hours);
            }
          }
        }
      }, 100);
    } else if (taskStatus === 1) {
      this.taskStatus.next(0);
      clearInterval(this.timeCounter);
      clearInterval(this.taskTimeCounter);
    }
    this.time.hours = this.hours;
    this.time.minutes = this.minutes;
    this.userSevice.currentUser.time = this.time;
    this.userSevice.saveUserChanges();
  }

  public startTaskTimer(taskStatus: number, hours: number, minutes: number): void {
    this.taskHours = hours;
    this.taskMinutes = minutes;
    this.TaskMinutes.next(minutes);
    this.TaskHours.next(hours);
    clearInterval(this.taskTimeCounter);

    if (taskStatus === 0) {
      this.taskTimeCounter = setInterval(() => {
        this.taskSeconds = this.taskSeconds + 1;

        if (this.taskSeconds > 9) {
          this.taskSeconds = 0;
          this.taskMinutes += 1;
          this.TaskMinutes.next(this.taskMinutes);
          this.getTaskTimerMinutes();

          if (this.taskMinutes > 9) {
            this.taskMinutes = 0;
            this.TaskMinutes.next(this.taskMinutes);
            this.getTaskTimerMinutes();
            this.taskHours += 1;
            this.TaskHours.next(this.taskHours);
            this.getTaskTimerHours();

            if (this.taskHours > 7) {
              alert('Max task\'s time');
              this.taskStatus.next(3);
              clearInterval(this.timeCounter);
              clearInterval(this.taskTimeCounter);
            }
          }
        }
      }, 100);
    }  else if (taskStatus === 1) {
      clearInterval(this.taskTimeCounter);
    }
  }
}
