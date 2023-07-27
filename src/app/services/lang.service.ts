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

    const userLanguage = navigator.languages[1];
    if (userLanguage === 'zh') {
      if (navigator.language === 'zh-TW' || navigator.language === 'zh-HK') {
        return 'zh-TW';
      }
      return 'zh-CN';
    }
    return 'en-US';
  }

  setLang = (lang: string): void => {
    window.location.assign('/' + lang);
  }
  
}
