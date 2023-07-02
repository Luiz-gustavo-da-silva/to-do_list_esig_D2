import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private router : Router, private api: ApiService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }


  // Esse método foi criado só para simular uma possível autenticação de um usuário  
  /**
   * Envia o formulário de login para autenticação.
   */
  submitLogin() {
    this.api.loginUser(this.loginForm.value).subscribe({
      next: (res) => {
        if (res[0]?.email && res[0]?.senha) {
          if (res[0]?.email === this.loginForm.value.email && res[0]?.senha === this.loginForm.value.senha) {
            this.router.navigate(['/taskspage']);
          } else {
            alert('Usuário não encontrado!!!');
          }
        } else {
          alert('Usuário não encontrado!!!');
        }
      },
      error: () => {
        alert('Error na requisição do login');
      },
    });
  }
}
