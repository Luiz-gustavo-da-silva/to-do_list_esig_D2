import { Component, ViewChild, OnInit } from '@angular/core';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-todopage',
  templateUrl: './todopage.component.html',
  styleUrls: ['./todopage.component.scss'],
})
export class TodopageComponent implements OnInit {

  title = 'Dashboard';

  numTasksEmAndamento: number = 0;
  numTasksConcluidas: number = 0;
  numTasksAtrasadas: number = 0;
  dot: boolean = false;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    public themeService: ThemeService
  ) {}


  ngOnInit(): void {
    this.getContadores();
  }

  /**
   * Obtém os contadores de tarefas do serviço API.
   */
  getContadores() {
    this.api.getContadores().subscribe({
      next: (res) => {
        this.numTasksEmAndamento = res.numTasksEmAndamento;
        this.numTasksConcluidas = res.numTasksConcluidas;
        this.numTasksAtrasadas = res.numTasksAtrasadas;

        if (this.numTasksAtrasadas > 0) {
          this.dot = true;
        }
      },
      error: () => {
        alert('Erro ao buscar os contadores da dashboard');
      },
    });
  }

  /**
   * Abre o modal para adicionar uma nova tarefa.
   */
  openDialog() {
    this.dialog
      .open(DialogComponent, {
      })
      .afterClosed()
      .subscribe(() => {
        this.getContadores();
      });
  }
}
