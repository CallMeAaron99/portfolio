import { AfterViewInit, Component, SkipSelf } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { LangService } from '../services/lang.service';
import authorInfoJson from '../../assets/json/authorInfo.json';
import { authorInfo } from '../interface/authorInfo.interface';
import { WindowStatus } from '../services/browser.service';

declare function hideOffcanvas(offcanvasId: string): void;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  offcanvasId: string = 'bdNavbar';
  authorInfo: authorInfo = authorInfoJson;

  constructor(@SkipSelf() private themeService: ThemeService, @SkipSelf() private langService: LangService, @SkipSelf() private windowStatus: WindowStatus) { }

  ngAfterViewInit(): void {
    if (!this.windowStatus.ready()) {
      return;
    }
    showActiveTheme(this.themeService.getPreferredTheme());
    showActiveLang(this.langService.getPreferredLang());
  }

  onNavClick = (): void => hideOffcanvas(this.offcanvasId);

  onThemeBtnClick(theme: string): void {
    this.themeService.setStoredTheme(theme);
    this.themeService.setTheme(theme);
    showActiveTheme(theme, true);
    hideOffcanvas(this.offcanvasId);
  }

  onLangBtnClick(lang: string): void {
    this.langService.setCookieLang(lang);
    showActiveLang(lang, true);
    this.langService.setLang(lang);
  }
}

// theme switch
const showActiveTheme = (theme: string, focus: boolean = false): void => {
  const themeSwitcher = document.getElementById('bd-theme');

  if (!themeSwitcher) {
    return;
  }

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

  if (focus) {
    themeSwitcher.focus();
  }
}

// language switch
const showActiveLang = (lang: string, focus = false): void => {
  const langSwitcher = document.getElementById('bd-lang');

  if (!langSwitcher) {
    return;
  }

  const langSwitcherText = document.getElementById('bd-lang-text');
  const btnToActive = document.querySelector(`[lang-code="${lang}"]`);
  const textContentOfActiveBtn = btnToActive!.textContent;

  document.querySelectorAll('[lang-code]').forEach(element => {
    element.classList.remove('active');
    element.setAttribute('aria-current', 'false');
  })

  btnToActive?.classList.add('active');
  btnToActive?.setAttribute('aria-pressed', 'true');
  langSwitcherText!.textContent = textContentOfActiveBtn;

  if (focus) {
    langSwitcher.focus();
  }
}
