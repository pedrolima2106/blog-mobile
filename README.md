# 📱 Blog Mobile - Full Stack App

Aplicativo mobile completo de blog desenvolvido com **React Native + Expo** no frontend e **C# .NET + Entity Framework + SQL Server** no backend.

Projeto criado com foco em aprendizado prático de desenvolvimento Full Stack, autenticação, CRUD completo, controle de permissões por perfil e integração entre API e aplicação mobile.

---

# 🚀 Tecnologias utilizadas

## Frontend (Mobile)
- React Native
- Expo
- React Navigation
- Axios
- Context API
- JavaScript
- React Hooks

## Backend
- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- JWT Authentication
- REST API

---

# ✨ Funcionalidades

## Autenticação
✅ Login com autenticação JWT  
✅ Registro de usuários  
✅ Persistência de sessão  
✅ Logout  

---

## Controle de Perfis
### Admin
✅ Criar professores  
✅ Criar alunos  
✅ Editar usuários  
✅ Excluir usuários  
✅ Criar posts  
✅ Editar posts  
✅ Excluir posts  
✅ Gerenciar todos os posts  

### Professor
✅ Criar posts  
✅ Editar posts  
✅ Excluir posts  
✅ Visualizar alunos  

### Aluno
✅ Visualizar posts  
✅ Ler detalhes dos posts  

---

## Sistema de Posts
✅ Criar post  
✅ Editar post  
✅ Excluir post  
✅ Autor do post  
✅ Atualização automática da lista  
✅ Tela de detalhes do post  
✅ Gerenciamento completo dos posts  

---

## Gerenciamento de Usuários
✅ Listagem de alunos  
✅ Listagem de professores  
✅ Paginação  
✅ Criar novos usuários  
✅ Editar usuários  
✅ Excluir usuários  

---

# 📂 Estrutura do projeto

## Frontend
```bash
frontend/
 ┣ src/
 ┃ ┣ contexts/
 ┃ ┣ routes/
 ┃ ┣ screens/
 ┃ ┣ services/
 ┃ ┗ components/
```

## Backend
```bash
backend/
 ┣ Controllers/
 ┣ Models/
 ┣ Data/
 ┣ Migrations/
 ┗ Program.cs
```

---

# ⚙️ Como executar

## Backend

### 1. Clone o projeto
```bash
git clone https://github.com/seuusuario/blog-api.git
```

### 2. Entre na pasta
```bash
cd backend
```

### 3. Configure o banco SQL Server
Edite:

```bash
appsettings.json
```

com sua string de conexão.

### 4. Rode as migrations
```bash
dotnet ef database update
```

### 5. Inicie a API
```bash
dotnet run
```

API disponível em:

```bash
https://localhost:xxxx/api
```

---

## Frontend

### 1. Clone o projeto
```bash
git clone https://github.com/seuusuario/blog-mobile.git
```

### 2. Entre na pasta
```bash
cd frontend
```

### 3. Instale dependências
```bash
npm install
```

### 4. Configure a API
Edite:

```bash
src/services/api.js
```

colocando o IP da sua máquina.

Exemplo:

```javascript
baseURL: 'http://192.168.0.10:5000/api'
```

### 5. Execute
```bash
npx expo start
```

---

# 🔐 Perfis de teste

## Admin
```bash
Email: admin@teste.com
Senha: 123456
```

## Professor
```bash
Email: professor@teste.com
Senha: 123456
```

## Aluno
```bash
Email: aluno@teste.com
Senha: 123456
```

---

# 📸 Screenshots

Adicione imagens do app aqui.

Exemplo:

- Login
- Home
- Criar Post
- Gerenciar Posts
- Lista de Professores
- Lista de Alunos

---

# 🎯 Objetivo do projeto

Este projeto foi desenvolvido para praticar:

- Desenvolvimento Mobile
- Desenvolvimento Backend
- APIs REST
- Autenticação JWT
- CRUD completo
- Controle de permissões
- Integração frontend + backend
- Arquitetura Full Stack

---

# 👨‍💻 Autor

Pedro Santana

# API utilizada:

https://github.com/pedrolima2106/backend
