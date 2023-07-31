import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class WindowStatus {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    ready(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return true;
        }
        return false;
    }
}

@Injectable({
    providedIn: 'root'
})
export class LocalStorage {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    getItem(key: string): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(key);
        }
        return null;
    }

    setItem(key: string, value: string): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(key, value);
        }
    }
}
