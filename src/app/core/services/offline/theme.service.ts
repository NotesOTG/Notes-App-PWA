import { Injectable } from '@angular/core';
import { StorageService, StorageType } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  
  /**
   * The storage key
   */
  private readonly THEME_KEY = StorageType.THEME;

  /**
   * data type of the theme type in use
   */
  private theme: ThemeType;

  constructor(private storage: StorageService) {}

  /**
   * Sets the theme on app startup
   */
  public setThemeOnStart(): void {
    let storedTheme: ThemeType = this.storage.getFromStorage(this.THEME_KEY);
    const colorQueryList: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    
    if (storedTheme === null) {
      colorQueryList.matches ? this.setTheme(ThemeType.DARK) : this.setTheme(ThemeType.LIGHT);
    } else {
      this.setTheme(this.storage.getFromStorage(this.THEME_KEY));
    }

    colorQueryList.addEventListener("change", () => {
      colorQueryList.matches ? this.setTheme(ThemeType.DARK) : this.setTheme(ThemeType.LIGHT);
    });

    setTimeout(() => {
      document.body.classList.add('animate-colors-transition');
    });
  }

  /**
   * Sets the theme based on the supplied theme type
   * @param themeType The theme type
   */
  public setTheme(themeType: ThemeType): void {
    let bodyClass = document.body.classList;
    if (bodyClass.contains(this.theme)) {
      bodyClass.remove(this.theme);
    }    
    bodyClass.add(themeType);
    this.theme = themeType;
    this.storage.addToStorage(this.THEME_KEY, themeType);   
  }

  /**
   * Returns a boolean indicating if dark theme
   */
  public isThemeDark(): boolean {
    return this.theme === ThemeType.DARK;
  }

}

/**
 * The types of themes
 */
export enum ThemeType {
  DARK = "dark-theme", 
  LIGHT = "light-theme"
}