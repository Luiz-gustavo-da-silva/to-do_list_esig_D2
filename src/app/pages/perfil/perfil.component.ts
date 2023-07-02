import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ThemeService } from 'src/app/services/theme-service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  email: string = "";
  nome: string = "";
  idade: number = 0;

  constructor(
    private api: ApiService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.getDataPerfil();
  }


  /**
   * Obtém todas as tarefas em aberto.
   */
  getDataPerfil() {
    this.api.getDataPerfil().subscribe({
      next: (res) => {
        const {email, senha, nome, idade} = res[0];
        this.email = email;
        this.nome = nome;
        this.idade = idade;
      },
      error: (err) => {
        alert('Erro ao buscar dados do perfil');
      },
    });
  }
}
