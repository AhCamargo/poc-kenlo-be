# POC-KENLO-BE!

Nesse Projeto estamos utilizando:

> o NodeJS, Na versão do **NodeJS: 20.11.0**,
> o Banco de Dados é **MongoDB**,
> Typescript e
> ZOD

# Pacotes utilizados

> Dependências:
>
> express cors dotenv express-async-errors mongoose openai swagger-autogen swagger-ui-express zod
>
> Dependências de Desenvolvimento:
>
> @types/cors @types/express @types/jest @types/mongoose @types/node @types/supertest @types/swagger-ui-express jest supertest ts-jest ts-node-dev typescript

## Para rodar esse projeto, precisa ter o _Node_ e _Docker_ instalado em sua máquina:

Agora vamos criar a imagem do banco de dados local com o Docker:

> insira seu USERNAME e PASSWORD desejado, antes de rodar o comando abaixo.

> > docker run --name kenlo-mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=digitesuasenha -d mongo:4

# Crie seu arquivo .env

> **Atenção:** Não esqueça de criar/preencher seu arquivo _.env_ e copia o modelo de variaveis de ambiente que temos no _.example.env_

Depois é só rodar o npm run dev, caso dê certo terá que aparecer essa mensagem no terminal: **"Server is running on port: 3000"**
