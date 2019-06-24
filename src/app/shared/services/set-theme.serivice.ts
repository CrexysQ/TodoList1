import { UserService } from './users.service';

export class SetThemeService {
  public darkTheme = false;
  public lightTheme = true;
  public redTheme = false;
  public theme = '';

  constructor() {
    debugger;
    // this.theme = this.userService.currentUser.theme;
    // this.setTheme(this.theme);
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
  }
}
