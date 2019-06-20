export class SetThemeService {
  public darkTheme = false;
  public lightTheme = true;
  public redTheme = false;

  constructor() {
    this.lightTheme = JSON.parse(localStorage.getItem('this.lightTheme'));
    this.redTheme =  JSON.parse(localStorage.getItem('this.redTheme'));
    this.darkTheme = JSON.parse(localStorage.getItem('this.darkTheme'));
  }

  public setTheme(theme: string): boolean {
    if (theme === 'Dark') {
      this.darkTheme = true;
      this.redTheme = false;
      this.lightTheme = false;

      localStorage.setItem(' this.lightTheme', JSON.stringify(this.lightTheme));
      localStorage.setItem('this.redTheme', JSON.stringify(this.redTheme));
      localStorage.setItem('this.darkTheme', JSON.stringify(this.darkTheme));
      localStorage.setItem('theme', theme);

      return this.darkTheme;

    } else if (theme === 'Light') {
      this.lightTheme = true;
      this.darkTheme = false;
      this.redTheme = false;

      localStorage.setItem('this.lightTheme', JSON.stringify(this.lightTheme));
      localStorage.setItem('this.redTheme', JSON.stringify(this.redTheme));
      localStorage.setItem('this.darkTheme', JSON.stringify(this.darkTheme));
      localStorage.setItem('theme', theme);

      return this.lightTheme;

    } else if (theme === 'Red') {
      this.redTheme = true;
      this.lightTheme = false;
      this.darkTheme = false;

      localStorage.setItem(' this.lightTheme', JSON.stringify(this.lightTheme));
      localStorage.setItem('this.redTheme', JSON.stringify(this.redTheme));
      localStorage.setItem('this.darkTheme', JSON.stringify(this.darkTheme));
      localStorage.setItem('theme', theme);

      return this.redTheme;
    }
  }
}
