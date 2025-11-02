import { Component, Renderer2, OnDestroy, ViewEncapsulation } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService, ChatMessage } from '../../services/chatbot.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, DatePipe, HttpClientModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnDestroy {
  input = '';
  history: ChatMessage[] = [];
  loading = false;
  error?: string;
  dark = false;

  constructor(private bot: ChatbotService, private renderer: Renderer2) {}

  toggleTheme() {
    this.dark = !this.dark;
    if (this.dark) {
      document.body.classList.add('dark-body');
    } else {
      document.body.classList.remove('dark-body');
    }
  }

  ngOnDestroy() {
    // remove o modo dark se o usuário sair do componente
    this.renderer.removeClass(document.body, 'dark-body');
  }

  async onSend() {
    const msg = this.input.trim();
    if (!msg) return;

    this.history.push({ from: 'user', text: msg, at: new Date() });
    this.input = '';
    this.loading = true; this.error = undefined;

    try {
      const botMsg = await this.bot.send(msg).toPromise();
      if (botMsg) this.history.push(botMsg);
    } catch (error:any) {
      console.log(error)
      this.error = 'Não consegui responder agora. Tente novamente.';
    } finally {
      this.loading = false;
    }
  }
}
