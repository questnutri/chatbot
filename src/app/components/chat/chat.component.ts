import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService, ChatMessage } from '../../services/chatbot.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, DatePipe, HttpClientModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  input = '';
  history: ChatMessage[] = [];
  loading = false;
  error?: string;

  constructor(private bot: ChatbotService) {}

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
