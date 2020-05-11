import { Component } from '@angular/core';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BetterReddit';
  theme: string = 'light';

  constructor(private settingsService: SettingsService) {
    settingsService.theme.subscribe((theme) => {
      this.theme = theme;
    })
  }
}
