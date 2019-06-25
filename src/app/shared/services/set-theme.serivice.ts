import { UserService } from './users.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SetThemeService {
  public darkTheme = false;
  public lightTheme = true;
  public redTheme = false;
  public theme = '';

  constructor(private userService: UserService) {
    if (userService.currentUser !== undefined) {
      this.theme = userService.currentUser.theme;
    } else {
      return;
    }
    this.setTheme(this.theme);
  }

  getThemeSettings() {
    if (this.userService.currentUser !== null) {
      this.theme = this.userService.currentUser.theme;
    } else {
      return;
    }
  }

  public setTheme(theme: string): void {
    if (theme === 'Dark') {
      this.darkTheme = true;
      this.redTheme = false;
      this.lightTheme = false;

    } else if (theme === 'Light' || theme === '') {
      this.lightTheme = true;
      this.darkTheme = false;
      this.redTheme = false;

    } else if (theme === 'Red') {
      this.redTheme = true;
      this.lightTheme = false;
      this.darkTheme = false;
    }
    this.userService.currentUser.theme = theme;
    this.userService.saveUserChanges();
  }
}
