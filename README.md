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
   git clone https://github.com/rsaadi28/how-many-cans.git
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

1. Execute o comando para subir os serviços do sistema (para windows é preciso ter o docker desktop rodando na maquina):

   ```bash
   npm run services:up
   ```

2. Exetute o projeto (Pode-se rodar direto o projeto pois já é criado os serviços nesse script):

   ```bash
   npm run dev
   ```

3. Execute as migrations em outro terminal:
   ```bash
   npm run migration:up
   ```

## **Executando os testes**

1. Executar somente uma vez:

   ```bash
   npm run test
   ```

2. Executar ao longo do desenvolvimento ideal para TDD
   ```bash
   npm run test:watch
   ```

## **Finalizando os serviços**

1. Para parar e remover os containers Docker quando não estiver mais utilizando o projeto:
   ```bash
   npm run services:down
   ```

## **Observações**

1. Para fins demostrativos criei uma estrutura de banco de dados que somente insere os resultados dos calculos;

## Autor

- **Rodrigo Saadi Dantas Teixeira** - [GitHub](https://github.com/rsaadi28)

## Agradecimentos

- Projeto voltado para avaliação técnica para a empresa Digital Republic;
- Agradeço pela oportunidade de mostrar meu trabalho;
