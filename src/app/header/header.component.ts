import { AfterViewInit, Component } from '@angular/core';

import linkJson from '../../assets/json/links.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements AfterViewInit {

  links = linkJson;

  ngAfterViewInit(): void {
    showActiveTheme(getPreferredTheme());
  }

  onThemeBtnClicked(theme: string): void {
    setStoredTheme(theme);
    setTheme(theme);
    showActiveTheme(theme, true);
  }
}

const getStoredTheme = (): string | null => localStorage.getItem('theme');
const setStoredTheme = (theme: string): void => localStorage.setItem('theme', theme);

const getPreferredTheme = (): string => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setTheme = (theme: string): void => {
  if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
};

setTheme(getPreferredTheme());

const showActiveTheme = (theme: string, focus = false): void => {
  const themeSwitcher = document.getElementById('bd-theme');

  if (!themeSwitcher) {
    return;
  }

  const themeSwitcherText = document.getElementById('bd-theme-text');
  const activeThemeIcon = document.querySelector('.theme-icon-active path');
  const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);
  const svgOfActiveBtn = btnToActive?.querySelector('svg path')?.getAttribute('d');

  document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
    element.classList.remove('active');
    element.setAttribute('aria-pressed', 'false');
  })

  btnToActive?.classList.add('active');
  btnToActive?.setAttribute('aria-pressed', 'true');
  activeThemeIcon?.setAttribute('d', svgOfActiveBtn!);
  const themeSwitcherLabel = `${themeSwitcherText?.textContent} (${theme})`;
  themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);

  if (focus) {
    themeSwitcher.focus();
  }
};

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  const storedTheme = getStoredTheme();
  if (storedTheme !== 'light' && storedTheme !== 'dark') {
    setTheme(getPreferredTheme());
  }
});