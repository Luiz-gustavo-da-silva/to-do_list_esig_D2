import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemeService } from 'src/app/services/theme-service';

/**
 * Componente modal para exibir detalhes.
 */
@Component({
  selector: 'app-dialog-details',
  templateUrl: './dialog-details.component.html',
  styleUrls: ['./dialog-details.component.scss']
})
export class DialogDetailsComponent implements OnInit {

  /**
   * Construtor do componente DialogDetailsComponent.
   * @param showData Os dados a serem exibidos no diálogo, injetados por MAT_DIALOG_DATA.
   * @param dialogRef A referência ao componente de diálogo atual, injetada por MatDialogRef.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public showData: any,
    public dialogRef: MatDialogRef<DialogDetailsComponent>,
    public themeService: ThemeService
  ) {}

  /**
   * Função de inicialização do componente.
   */
  ngOnInit(): void {
  }

  /**
   * Função para fechar o modal.
   */
  closeModal() {
    this.dialogRef.close();
  }
}
