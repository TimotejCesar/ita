import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private themeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('light');
  theme = this.themeSubject.asObservable();

  private imageOnlySubject: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);
  imageOnly = this.imageOnlySubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  setTheme(theme: string) {
    this.themeSubject.next(theme);
    this.updateStorage({theme: theme});

  }

  setImageOnly(imagesOnly: boolean) {
    this.imageOnlySubject.next(imagesOnly);
    this.updateStorage({imagesOnly: imagesOnly});
  }

  updateStorage(settings) {
    let storageItem = JSON.parse(localStorage.getItem('settings'));

    if (!storageItem) {
      storageItem = {
        theme: settings.theme,
        imagesOnly: settings.imagesOnly
      };
    }
    else {
      storageItem.theme = settings.theme? settings.theme : storageItem.theme;
      storageItem.imagesOnly = settings.imagesOnly !== undefined? settings.imagesOnly : storageItem.imagesOnly;
    }

    localStorage.setItem('settings', JSON.stringify(storageItem));
  }

  loadFromStorage() {
    let storageItem = JSON.parse(localStorage.getItem('settings'));
    console.log("loaded", storageItem);
    if(storageItem) {
      if (storageItem.theme) this.setTheme(storageItem.theme);
      if (storageItem.imagesOnly) this.setImageOnly(storageItem.imagesOnly);
    }
  }
}
