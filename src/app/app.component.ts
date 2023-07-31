import { Component, OnInit, SkipSelf } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { WindowStatus } from './services/browser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(@SkipSelf() private themeService: ThemeService, @SkipSelf() private windowStatus: WindowStatus) { }

  ngOnInit(): void {
    if (this.windowStatus.ready()) {
      // set theme
      this.themeService.setTheme(this.themeService.getPreferredTheme());
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = this.themeService.getStoredTheme();
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
          this.themeService.setTheme(this.themeService.getPreferredTheme());
        }
      });
    }
  }
}
