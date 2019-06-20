import { Component } from '@angular/core';
import { SetThemeService } from 'src/app/shared/services/set-theme.serivice';

@Component ({
  selector: 'app-system',
  templateUrl: './system.component.html'
})

export class SystemComponent  {
  constructor(public service: SetThemeService) { }
}
