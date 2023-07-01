import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isHighContrastMode = false;
  menu: boolean = false;
  
  toggleHighContrastMode() {
    this.isHighContrastMode = !this.isHighContrastMode;
  }

  toggleMenu() {
    this.menu = !this.menu;
  }
}
