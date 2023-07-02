import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  menu: boolean = false;

  toggleMenu() {
    this.menu = !this.menu;
  }
}
