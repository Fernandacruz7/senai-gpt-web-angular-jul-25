import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  imports: [],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})

export class LoginScreenComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // quando a tela iniciar 
    // cria o campo obrigatorio de email
    // cria o campo obrigatorio de senha

    this.loginForm = this.fb.group({
      email: ["",[Validators.required]],
      password: ["",[Validators.required]]
    });

  }


}
