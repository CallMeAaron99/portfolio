import { Component, OnInit, SkipSelf } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(@SkipSelf() private themeService: ThemeService) { }

  ngOnInit(): void {
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
