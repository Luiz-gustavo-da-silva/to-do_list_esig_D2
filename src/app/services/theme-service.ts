import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isHighContrastMode = false;

  toggleHighContrastMode() {
    this.isHighContrastMode = !this.isHighContrastMode;
  }
}
