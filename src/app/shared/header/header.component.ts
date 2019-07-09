import { Component } from '@angular/core';
import { SetThemeService } from 'src/app/shared/services/set-theme.serivice';
import { TimerService } from 'src/app/shared/services/timer.service';
import { UserService } from '../services/users.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('dropDown', [
      state('hidden', style({
        height: '0',
        border: '1px solid transparent',
      })),
      state('opened', style({
        border: '1px solid rgba(128, 128, 128, 0.521)',
        height: '130px',
      })),
      transition('hidden => opened', animate(200)),
      transition('opened => hidden', animate(200))
    ])
  ]
})

export class HeaderComponent {
  public choice: string;
  public task: string;
  public hours: string;
  public minutes: string;
  public dropDownState: string = 'hidden';

  constructor(public themeService: SetThemeService,
              public timer: TimerService,
              private userService: UserService,
              private router: Router) {
    this.choice = this.themeService.theme;
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
    this.themeService.setTheme(e);
    this.choice = e;
 }

 public logOut(): void {
  this.userService.currentUser = null;
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('currentUser');
  this.router.navigate(['/login']);
 }

 dropDownOpen(){
   this.dropDownState = 'opened';
 }
 dropDownHidden() {
  this.dropDownState = 'hidden';
 }
}
