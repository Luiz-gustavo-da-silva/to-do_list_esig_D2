import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemeService } from 'src/app/services/theme-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

/**
 * Componente modal para adicionar ou atualizar uma tarefa.
 */
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  taskForm!: FormGroup;
  actionBtn: string = 'Criar tarefa';
  file: File | undefined = undefined; // Variável para armazenar o arquivo

  /**
   * Construtor do componente DialogComponent.
   * @param formBuilder O construtor do formulário reativo FormBuilder.
   * @param api O serviço ApiService para comunicação com a API.
   * @param editData Os dados de edição da tarefa, injetados por MAT_DIALOG_DATA.
   * @param dialogRef A referência ao componente de diálogo atual, injetada por MatDialogRef.
   */
  constructor(
    private msg: NzMessageService,
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    public themeService: ThemeService,
  ) {}

  /**
   * Função de inicialização do componente.
   * Inicializa o formulário com validação e preenche os valores de edição, se houver.
   */
  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      responsible: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      deadline: ['', Validators.required],
      file: [],
      situation: true,
    });

    if (this.editData) {
      this.actionBtn = 'Atualizar';
      this.taskForm.controls['id'].setValue(this.editData.id);
      this.taskForm.controls['title'].setValue(this.editData.title);
      this.taskForm.controls['responsible'].setValue(this.editData.responsible);
      this.taskForm.controls['description'].setValue(this.editData.description);
      this.taskForm.controls['priority'].setValue(this.editData.priority);
      this.taskForm.controls['deadline'].setValue(this.editData.deadline);
    }
  }

  /**
   * Função chamada ao adicionar uma tarefa.
   * Chama o serviço API para adicionar a tarefa.
   * Fecha o diálogo após a adição da tarefa.
   */
  addTask() {
    if (!this.editData) {
      if (this.taskForm.valid) {
        this.api.postTask(this.taskForm.value).subscribe({
          next: (res) => {
            alert('Tarefa adicionada com sucesso');
            this.taskForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Erro ao adicionar a tarefa');
          },
        });
      }
    } else {
      this.updateTask();
    }
  }

  /**
   * Função chamada ao atualizar uma tarefa.
   * Chama o serviço API para atualizar a tarefa.
   * Fecha o diálogo após a atualização da tarefa.
   */
  updateTask() {
    this.api.putTask(this.taskForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Tarefa atualizada com sucesso!');
        this.taskForm.reset();
        this.dialogRef.close('update');
      },
      error: (res) => {
        alert('Erro ao atualizar a tarefa!');
      },
    });
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
      this.file = file.originFileObj; // Armazena o arquivo selecionado na variável
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }
  
}
