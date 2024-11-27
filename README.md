# **How Many Cans**

Projeto desenvolvido para averiguação de habilidades para a empresa Digital Republic.

---

## **Requisitos**

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados

---

## **Instalação**

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd how-many-cans
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   ```bash
   .env.development
   ```

## **Como executar**

1. Execute as migrations:

   ```bash
   npm run migration:up
   ```

2. Podemos subir os servições com:
   ```bash
   npm run services:up
   ```
   Mas ao rodar o projeto em desenvolvimento já executado a criação do ambiente.
   ```bash
   npm run dev
   ```

## **inalizando os serviços**

1. Para parar e remover os containers Docker quando não estiver mais utilizando o projeto:
   ```bash
   npm run services:down
   ```
