import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

interface IChat {

  chatTitle: string;
  id: number;
  userId: string;
}

interface IMessage {

  chat: number;
  id: number;
  text: string;
  userId: string;

}

@Component({
  selector: 'app-chat-screen',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat-screen.html',
  styleUrl: './chat-screen.css'
})
export class ChatScreen {

  chats: IChat[];
  chatSelecionado: IChat;
  mensagens: IMessage[];
  mensagemUsuario = new FormControl("");

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) { // constroi a classe
    // iniciacao de variaveis...

    this.chats = [];
    this.chatSelecionado = null!;
    this.mensagens = [];

  }

  ngOnInit() { // executado quando o angular esta pronto para rodar
    //buscar dados da API.

    this.getChats();

  }

  async getChats() {
    // metodo que busca os chats da API.
    let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/chats", {

      headers: {

        "Authorization": "Bearer " + localStorage.getItem("meuToken")

      }
    }));

    console.log("Chats", response);

    if (response) {

      this.chats = response as [];
    } else {

      console.log("erro ao buscar os chats");

    }

    this.cd.detectChanges();

  }

  async onChatClick(chatClicado: IChat) {

    console.log("Chat Clicado", chatClicado);

    this.chatSelecionado = chatClicado;
    // logica para buscar as mensagens.

    let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/messages?chatId=" +
      chatClicado.id, {

      headers: {

        "Authorization": "Bearer " + localStorage.getItem("meuToken")

      }
    }));

    console.log("MENSAGENS", response);

    this.mensagens = response as IMessage[];

    this.cd.detectChanges();

  }

  async enviarMensagem() {

    let novaMensagemUsuario = {

      chatId: this.chatSelecionado.id,
      UserId: localStorage.getItem("meuId"),
      text: this.mensagemUsuario.value

    };

    //salva a mensagem no banco de dados
    let novaMensagemUsuarioResponse = await firstValueFrom(this.http.post("https://senai-gpt-api.azurewebsites.net/messages", novaMensagemUsuario, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("meuToken")


      }
    }));

    //atualiza as mensagens da tela
    await this.onChatClick(this.chatSelecionado);

    // enviar a mensagem do usuario para IA responder 
    let respostaIAResponse = await firstValueFrom(this.http.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
      "contents": [
        {
          "parts": [
            {
              "text": this.mensagemUsuario.value
            }
          ]
        }
      ] 
   }, {
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": "AIzaSyDV2HECQZLpWJrqCKEbuq7TT5QPKKdLOdo"
    }
   })) as any;

   let novaRespostaIA = {

    chatId: this.chatSelecionado.id,
    userId: "chatbot",
    text: respostaIAResponse.candidates[0].content.parts[0].text
   }

   // salva a resposta da IA no banco de dadoss
    let novaRespostaIAResponse = await firstValueFrom(this.http.post("https://senai-gpt-api.azurewebsites.net/messages", novaRespostaIA, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("meuToken")
      }
    }));

    //atualiza as mensagens da tela
    await this.onChatClick(this.chatSelecionado);

  }

}


