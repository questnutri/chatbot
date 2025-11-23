---

# 🎨 **Chatbot Frontend – QuestNutri**

<p align="center">
  <img src="https://angular.io/assets/images/logos/angular/angular.svg" width="110" />
</p>

<p align="center">
  <b>Interface web em Angular para o Chatbot de Nutrição da QuestNutri.</b><br>
  Chat com histórico, tema dark, integração com o backend e UI minimalista.
</p>

---

# 📦 **1. Requisitos**

Certifique-se de ter instalado:

* **Node.js 18+**
* **NPM 9+**
* **Angular CLI**

  ```bash
  npm install -g @angular/cli
  ```

---

# 📥 **2. Clonar o projeto**

```bash
git clone https://github.com/questnutri/chatbot.git
cd chatbot
```

---

# 📚 **3. Instalar dependências**

Execute:

```bash
npm install
```

Se estiver usando validações, decorators ou serviços adicionais, instale também:

```bash
npm i class-validator class-transformer cors
npm i uuid
npm i axios
npm i dotenv
```

Dependências de desenvolvimento:

```bash
npm i -D @types/node @types/uuid @types/axios
```

---

# 🔌 **4. Configurar Proxy (API → Backend NestJS)**

O frontend usa o backend em:

```
http://localhost:3333
```

Seu arquivo **proxy.conf.json** deve estar assim:

```json
{
  "/api": {
    "target": "http://localhost:3333",
    "secure": false,
    "changeOrigin": true
  }
}
```

E no `package.json`:

```json
"start": "ng serve --proxy-config proxy.conf.json"
```

---

# ▶️ **5. Rodar o projeto**

```bash
npm run start
```

Acesse em:

```
http://localhost:4200
```

---

# 🔗 **6. Funcionamento da integração**

O frontend envia mensagens para o backend NestJS usando o serviço:

```ts
this.http.post('/api/chatbot/message', {
  message,
  conversationId
})
```

O backend responde com:

```json
{
  "conversationId": "uuid",
  "reply": "texto do bot",
  "rejected": false
}
```

---

# 📁 **7. Estrutura principal**

```
src/
 ├─ app/
 │   ├─ components/
 │   │   └─ chat/
 │   │        ├─ chat.component.ts
 │   │        ├─ chat.component.html
 │   │        └─ chat.component.css
 │   ├─ services/
 │   │   └─ chatbot.service.ts
 │   ├─ app.component.ts
 │   └─ app.module.ts (se necessário)
 ├─ assets/
 └─ main.ts
```

---

# 💬 **8. ChatbotService (resumo)**

```ts
send(message: string): Observable<ChatMessage> {
  return this.http.post<ChatResponse>('/api/chatbot/message', {
    message,
    conversationId: this.conversationId
  })
}
```

---

# 🌙 **9. Tema light/dark**

O usuário pode alternar entre temas:

```ts
toggleTheme() {
  this.dark = !this.dark;
  document.body.classList.toggle('dark-body', this.dark);
}
```

CSS adicional em `styles.css`:

```css
.dark-body {
  background: #111;
  color: #ddd;
}
```

---

# 🧪 **10. Testar com o backend**

Certifique-se de que o backend esteja rodando em:

```
http://localhost:3333
```

Para iniciar:

```bash
npm run start:dev
```

Testar no frontend:

```bash
npm run start
```

---
