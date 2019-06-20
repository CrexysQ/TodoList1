import { Component } from '@angular/core';
import { SetThemeService } from './shared/services/set-theme.serivice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  public title = 'TodoList';

  constructor() {}
}
