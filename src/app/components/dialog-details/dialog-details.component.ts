import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemeService } from 'src/app/services/theme-service';

@Component({
  selector: 'app-dialog-details',
  templateUrl: './dialog-details.component.html',
  styleUrls: ['./dialog-details.component.scss']
})
export class DialogDetailsComponent implements OnInit {

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
