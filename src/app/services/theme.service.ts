import { Injectable } from '@angular/core';
import { LocalStorage, WindowStatus } from './browser.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private windowStatus: WindowStatus, private localStorage: LocalStorage) { }

  getStoredTheme = (): string | null => this.localStorage.getItem('theme');
  setStoredTheme = (theme: string): void => this.localStorage.setItem('theme', theme);

  getPreferredTheme = (): string => {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    if (this.windowStatus.ready()) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  }

  setTheme = (theme: string): void => {
    if (this.windowStatus.ready()) {
      if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-bs-theme', theme);
      }
    }
  }
}
