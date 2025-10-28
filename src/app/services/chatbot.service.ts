import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

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
