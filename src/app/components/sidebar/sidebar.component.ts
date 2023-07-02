import { Component, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(public themeService: ThemeService) {}

  /**
   * Executa a ação de abrir ou fechar no menu.
   */
  actionMenu() {
    this.themeService.toggleMenu();
  }
}
