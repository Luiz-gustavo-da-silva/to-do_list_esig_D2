import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ThemeService } from 'src/app/services/theme-service';

/**
 * Componente de sidebar.
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() getAllTaskEvent = new EventEmitter<void>();

  /**
   * Construtor do componente.
   * @param dialog O serviço MatDialog para abrir o diálogo.
   */
  constructor(private dialog: MatDialog,  public themeService: ThemeService) {}

  /**
   * Função para abrir o modal de adição/atualização de tarefa.
   * Após o fechamento do diálogo, emite o evento "getAllTaskEvent" caso a ação tenha sido "save".
   */
  openDialog() {
    this.dialog
      .open(DialogComponent, {
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllTaskEvent.emit();
        }
      });
  }

  toggleHighContrastMode() {
    this.themeService.toggleHighContrastMode();
  }
}
