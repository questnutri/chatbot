import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ChatComponent } from './components/chat/chat.component';

export type ChatResponse = { conversationId: string; reply: string; rejected: boolean; reasons?: string[] };
export type ChatMessage = { from: 'user'|'bot'; text: string; at: Date };

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private conversationId?: string;
  constructor(private http: HttpClient) {}

  send(message: string): Observable<ChatMessage> {
    return this.http.post<ChatResponse>('/api/chatbot/message', { message, conversationId: this.conversationId })
      .pipe(map(res => {
        this.conversationId = res.conversationId;
        return { from: 'bot', text: res.reply, at: new Date() };
      }));
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatComponent],
  template: `<app-chat></app-chat>`
})
export class AppComponent {}
