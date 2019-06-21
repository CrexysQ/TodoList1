import { Component } from '@angular/core';
import { SetThemeService } from 'src/app/shared/services/set-theme.serivice';
import { TimerService } from 'src/app/shared/services/timer.service';
import { UserService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  public choice: string;
  public task: string;
  public hours: string;
  public minutes: string;

  constructor(public service: SetThemeService,
              public timer: TimerService,
              private userService: UserService,
              private router: Router) {
    this.choice = localStorage.getItem('theme');
    this.timer.getTaskName().subscribe((value) => {
      this.task = value;
    });

    this.timer.getTimerMinutes().subscribe((value) => {
      this.minutes = ('0' + value).slice(-2);
    });

    this.timer.getTimerHours().subscribe((value) => {
      this.hours = ('0' + value).slice(-2);
    });
  }

  public onChange(e: string) {
    this.service.setTheme(e);
 }

 public logOut(): void {
  this.userService.currentUser = null;
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('currentUser');
  this.router.navigate(['/login']);
 }
}
