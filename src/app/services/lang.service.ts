import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  getStoredLang = (): string | null => localStorage.getItem('lang');
  setStoredLang = (lang: string): void => localStorage.setItem('lang', lang);

  getPreferredLang = (): string => {
    const storedLang = this.getStoredLang();
    if (storedLang) {
      return storedLang;
    }

    const userLanguage = navigator.language || navigator.languages[0];
    if (userLanguage.startsWith('zh')) {
      if (userLanguage === 'zh-TW' || userLanguage === 'zh-HK') {
        return 'zh-TW';
      }
      return 'zh-CN';
    }
    return 'en-US';
  }

  setLang = (lang: string): void => {
    window.location.replace('/' + lang);
  }

}
