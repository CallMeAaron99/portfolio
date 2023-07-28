import { Component, OnInit, SkipSelf } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ThemeService } from './services/theme.service';
import { LangService } from './services/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Aaron Hong';

  constructor(private titleService: Title, @SkipSelf() private themeService: ThemeService, @SkipSelf() private langService: LangService) {
    this.titleService.setTitle($localize`${this.title}`);
  }

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
