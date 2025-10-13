import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user-screen',
  templateUrl: './new-user-screen.html',
  styleUrl: './new-user-screen.css',
  imports: [ReactiveFormsModule]
})
export class NewuserScreen {

  newUser: FormGroup;

  emailErrorMessage: string;
  passwordErrorMessage: string;
  successStatusMessage: string;
  errorStatusMessage: string;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    // Quando a tela iniciar.

    // Inicia o formulário.
    // Cria o campo obrigatório de email.
    // Cria o campo obrigatório de senha.
    this.newUser = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      confirmpassword: ["", [Validators.required]]
    });

    // Inicia com uma string vazia
    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
    this.successStatusMessage = "";
    this.errorStatusMessage = "";

  }

  async onCadastroClick() {

    console.log("usuario", this.newUser.value.usuario);
    console.log("email", this.newUser.value.email);
    console.log("insira a senha", this.newUser.value.password);
    console.log("confirme a senha", this.newUser.value.password);

    if (this.newUser.value.usuario == "") {

      // alert("Preencha o e-mail.");
      this.emailErrorMessage = "O campo de usuario e obrigatorio";
      return;

    }

    if (this.newUser.value.email == "") {

      this.passwordErrorMessage = "O campo de email é obrigatório.";
      return;

    }

    if (this.newUser.value.senha == "") {

      this.passwordErrorMessage = "O campo de senha é obrigatório.";
      return;
    }

    if (this.newUser.value.senha == "") {

      this.passwordErrorMessage = "confirme a senha.";
      return;
    }


    let response = await fetch("https://senai-gpt-api.azurewebsites.net/users", {
      method: "POST", // Enviar,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.newUser.value.username,
        email: this.newUser.value.email,
        password: this.newUser.value.password
      })
    });

    console.log("STATUS CODE", response.status);

    // Com base no status, verifique se as credenciais estão corretas e avise o usuário do resultado.

    if (response.status >= 200 && response.status <= 299) {

      this.successStatusMessage = "Cadastro realizado com sucesso!";

      window.location.href = "login";

    } else {

      alert("Credenciais incorretas.");

    }

    this.cd.detectChanges(); // Forçar uma atualização da tela.
  }


}
