import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppComponent,      // ← standalone import
    ChatComponent      // ← standalone import
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
