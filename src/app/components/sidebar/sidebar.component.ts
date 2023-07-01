import { Component, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  /**
   * Construtor do componente.
   * @param dialog O serviço MatDialog para abrir o diálogo.
   */
  constructor( public themeService: ThemeService) {}


  toggleHighContrastMode() {
    this.themeService.toggleHighContrastMode();
  }

  actionMenu(){
    this.themeService.toggleMenu();
  }
  
}
