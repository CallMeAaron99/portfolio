import { Injectable } from '@angular/core';

declare function getCookie(name: string): string;
declare function setCookie(name: string, value: string, days: number): void;

@Injectable({
  providedIn: 'root'
})
export class LangService {

  getCookieLang = (): string | null => getCookie('lang');
  setCookieLang = (lang: string): void => setCookie('lang', lang, 7);

  getPreferredLang = (): string => {
    const cookieLang = this.getCookieLang();
    if (cookieLang) {
      return cookieLang;
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
