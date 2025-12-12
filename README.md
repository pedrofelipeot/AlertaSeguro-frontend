# 📱 Alerta Seguro

O **Alerta Seguro** é um aplicativo criado para monitorar ambientes usando um **ESP32 com sensor PIR**.  
Sempre que o sensor detecta movimento, o app recebe um alerta e registra o evento.  

O projeto foi pensado para pequenos estabelecimentos, mas pode ser usado em qualquer ambiente interno.

---

## 🔍 O que o app faz?

- Recebe alertas enviados pelo ESP32 quando há movimento.  
- Mostra um histórico com todos os eventos detectados.  
- Permite **cadastrar sensores**, **dias de funcionamento** e **horários de eventos**.  
- Possui **autenticação por e-mail** ou **Google**.  
- Funciona com **Firebase** (Auth, Firestore e FCM).  

> ⚠️ **Importante:**  
> As **notificações push só funcionam no celular** (Android).  
> No navegador, o app abre normalmente, mas **não recebe notificações**.

---

## 🧩 Como o sistema funciona

1. O **ESP32** tem um **sensor PIR**, que detecta movimento.  
2. Quando algo é detectado, o ESP32 envia uma requisição para o backend.  
3. O backend registra o evento no Firebase e envia uma notificação push.  
4. O usuário vê o alerta no aplicativo e também no histórico de eventos.

É um fluxo simples, feito para ser fácil de instalar e entender.

---

## 🚀 Como rodar o app no navegador

Mesmo sem notificações, você pode testar todas as telas e funcionalidades.

### 1. Clone o repositório

```bash
git clone https://github.com/pedrofelipeot/AlertaSeguro-frontend.git
```

### 2. Entre na pasta do app

```bash
cd alerta-seguro/app
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Rode o app no navegador

```bash
ionic serve
```

O app abrirá no navegador (geralmente em http://localhost:8100).

---

## 📡 Tecnologias usadas

- Firebase Authentication (login por e-mail e Google)
- Firestore (banco de dados do app)
- Firebase Cloud Messaging (notificações)
- Node.js (backend que recebe os dados do ESP32)
- ESP32 + Sensor PIR para detecção de movimento
- Ionic/Capacitor para o aplicativo

---

## 🎯 Objetivo

Criar uma solução simples e acessível para monitoramento de ambientes, permitindo que pequenos negócios recebam alertas em tempo real sobre movimentos em locais importantes.

---
