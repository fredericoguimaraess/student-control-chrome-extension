# Extensão para controle de alunos

Esta aplicação é composta por um backend em Laravel e um frontend em Angular, e inclui funcionalidades de chat em tempo real usando Socket.IO.

## Estrutura do Projeto
Backend: Laravel, localizado na raiz do projeto.

Frontend: Angular, localizado na pasta frontend dentro do diretório raiz.

## Inicialização do Projeto
Clone o projeto e adeque as variáveis de acesso ao banco de dados no seu arquivo .env
Abra o terminal na raíz do projeto e execute os comandos a seguir:
- composer install
- npm install
- php artisan migrate --seed
- php artisan serve
- Abra outro terminal também na raíz do projeto e execute: node server.js

Abra o terminal no diretório frontend e execute os comandos:
- npm install
- ng serve
  

## Funcionalidades
Backend (Laravel):

Listar todos os alunos.

Criar um novo aluno.

Editar um aluno.

Excluir um aluno.

## Frontend (Angular):

Exibir a lista de alunos com nome e email.

Adicionar um novo aluno.

Editar um aluno.

Excluir um aluno.

Validação de campos (nome e email são obrigatórios).

Chat em tempo real entre alunos usando Socket.IO.

Captura de tela e compartilhamento via chat.
