import { Component } from '@angular/core';
import { SetThemeService } from 'src/app/shared/services/set-theme.serivice';

@Component ({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})

export class SystemComponent  {
  constructor(public themeService: SetThemeService) { }
}
