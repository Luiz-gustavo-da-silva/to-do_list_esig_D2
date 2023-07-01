import { Component, ViewChild, OnInit } from '@angular/core';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { DialogDetailsComponent } from '../../components/dialog-details/dialog-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Task } from 'src/app/models/TaskModel';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-taskspage',
  templateUrl: './taskspage.component.html',
  styleUrls: ['./taskspage.component.scss']
})
export class TaskspageComponent implements OnInit {
  panelOpenState = false;
  title = 'Tarefas';
  taskFilterForm!: FormGroup;
  displayedColumns: string[] = [
    'title',
    'priority',
    'situation',
    'responsible',
    'deadline',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isCollapsed:boolean = false;
  menu: boolean = false;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private api: ApiService,
    public themeService: ThemeService
  ) {}
  


  /**
   * Inicializa o componente.
   */
  ngOnInit(): void {
    this.taskFilterForm = this.formBuilder.group({
      number: '',
      situation: '',
      titleOrDescription: '',
      responsible: '',
    });

    this.setupFormChangeListeners();
    this.getAllTask();
   
  }

  /**
   * Abre o modal de detalhes para exibir informações detalhadas sobre uma tarefa.
   * @param row A linha da tabela contendo os dados da tarefa.
   */
  showDetails(row: Task) {
    this.dialog.open(DialogDetailsComponent, {
      data: row,
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
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllTask();
        }
      });
  }

  /**
   * Limpa os filtros de pesquisa de tarefas e exibe todas as tarefas em andamento.
   */
  // cleanFilter() {
  //   this.taskFilterForm.reset();
  //   this.taskFilterForm.get('situation')?.setValue('selected');
  //   this.taskFilterForm.get('responsible')?.setValue('selected');
  //   this.getAllTask();
  // }


  setupFormChangeListeners() {
    this.taskFilterForm.valueChanges.subscribe(() => {
      this.researchFiltertask();
    });
  }

  /**
   * Realiza a pesquisa de tarefas com base nos filtros aplicados.
   */
  researchFiltertask() {
    if (this.taskFilterForm.value) {
      this.api.filterTask(this.taskFilterForm.value).subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
        },
        error: (err) => {
          alert('Erro ao filtrar tarefas');
          this.getAllTask();
        },
      });
    }
  }

  /**
   * Obtém todas as tarefas em aberto.
   */
  getAllTask() {
    this.api.getTask().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        alert('Erro ao buscar os registros');
      },
    });
  }

  /**
   * Exclui uma tarefa pelo seu ID.
   * @param id O ID da tarefa a ser excluída.
   */
  deleteTask(id: number) {
    this.api.deleteTask(id).subscribe({
      next: (res) => {
        alert('Tarefa excluída com sucesso!');
        this.getAllTask();
      },
      error: () => {
        alert('Erro ao excluir tarefa!');
      },
    });
  }

  /**
   * Abre o modal para editar uma tarefa.
   * @param row A linha da tabela contendo os dados da tarefa a ser editada.
   */
  editTask(row: Task) {
    // console.log(row);
    this.dialog
      .open(DialogComponent, {
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllTask();
        }
      });
  }

  /**
   * Conclui uma tarefa, marcando sua situação como concluída (false).
   * @param row As informações referentes à linha da tabela contendo os dados da tarefa a ser concluída.
   */
  completeTask(row: Task) {
    this.api.concludeTask(row, row.id).subscribe({
      next: (res) => {
        alert('Tarefa concluída com sucesso!');
        this.getAllTask();
      },
      error: () => {
        alert('Erro ao concluir tarefa!');
      },
    });
  }

  toggleMenu() {
    this.menu = !this.menu;
  }
}
