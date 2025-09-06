import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { application } from 'express';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-login-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})

export class LoginScreenComponent {

  loginForm: FormGroup;

  emailErrorMessage: string;
  errorPassword: string;
  


  constructor(private fb: FormBuilder) {
    // quando a tela iniciar 
    // cria o campo obrigatorio de email
    // cria o campo obrigatorio de senha

    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });

    // inicia com uma string vazia
    this.emailErrorMessage = "";
    this.errorPassword = "";
  }

  async onLoginClick() {


    console.log("Email", this.loginForm.value.email);
    console.log("password", this.loginForm.value.password);

    if (this.loginForm.value.email == "") {
      // alert("Preencha o email.");
      this.emailErrorMessage = "O campo de email e obrigatorio. ";
    
    }

    // alert("Preencha a senha.");
    if (this.loginForm.value.password == "") {
      this.errorPassword = "Senha Incorreta";
      return;
    }


    let response = await fetch("https://senai-gpt-api.azurewebsites.net/login", {
      method: "POST",
      headers: {

        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      })
    });

    console.log("STATUS CODE", response.status)

    if (response.status >= 200 && response.status <= 299) {

      //alert("Credencial Correta");
    } else {

      //alert("Credencial Incorreta");

    }

  }


}
