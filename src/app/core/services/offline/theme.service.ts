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
  public async setThemeOnStart(): Promise<void> {
    let storedTheme: ThemeType = await this.storage.getTable(StorageType.THEME).get(0);
    const colorQueryList: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    if (storedTheme === (null || undefined)) {
      colorQueryList.matches ? this.setTheme(ThemeType.DARK) : this.setTheme(ThemeType.LIGHT);
    } else {
      this.setTheme(await this.storage.getTable(StorageType.THEME).get(0));
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
  public async setTheme(themeType: ThemeType): Promise<void> {
    let bodyClass = document.body.classList;
    if (bodyClass.contains(this.theme)) {
      bodyClass.remove(this.theme);
    }    
    bodyClass.add(themeType);
    this.theme = themeType;
    //this.storage.addToStorage(this.THEME_KEY, themeType);
    await this.storage.getTable(StorageType.THEME).clear();
    await this.storage.getTable(StorageType.THEME).add(themeType); 
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