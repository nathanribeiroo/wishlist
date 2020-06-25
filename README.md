<p align="center">
  <img src="https://i.ibb.co/gTpRdPz/wishlist-1.png">
</p>

<h1 align="center">Wishlist API</h1>

<p align="center">
  Api para gerenciar Clientes e seus produtos favoritos.
</p>

## Características

* 👨🏻 Visualizar, criar, atualizar e deletar ***Clientes***.
* 📓 Cada Cliente tem uma ***lista de produtos favoritos*** e pode adicionar, visualizar e remover-los.
* 🔒 Api com autenticação [JWT](https://jwt.io/)
* 🐬 Banco de dados [MySql 8.0](https://dev.mysql.com/doc/relnotes/mysql/8.0/en/)
* ✍🏼 Desenvolvido utilizando [Typescript](https://www.typescriptlang.org/)
* 🧪 96% de code coverage com testes automatizados utilizando [Jest](https://jestjs.io/)
* 🐳 Aplicação em containers [Docker](https://www.docker.com/)

## Instalação

### Pré requisitos

Antes de tudo, é necessário ter os seguintes pré requisitos rodando em sua máquina:

* [Git](https://git-scm.com/)
* [NodeJs](https://nodejs.org)
* [MySql 8.0](https://dev.mysql.com/doc/relnotes/mysql/8.0/en/) *(Apenas se não for rodar no Docker)*
* [Yarn](https://yarnpkg.com/)
* [Docker](https://www.docker.com/)

### Clonando o projeto e iniciando o projeto

Com as dependencias instaladas, o próximo passo é abrir o terminal e clonar o projeto. 

```sh
git clone https://github.com/nathanribeiroo/wishlist.git

cd wishlist

yarn install 
```

## Rodando a api

A aplicação pode ser iniciada de três maneiras.

Escolha qual processo deseja seguir:

- [Produção com Docker](###-Produção-com-Docker)
- [Localmente, com o banco de dados no *Docker* ](###-Localmente,-com-o-banco-de-dados-no-*Docker*)
- [Localmente](###Localmente)


### Produção com Docker

Antes de iniciar, configure o arquivo `.env` para essa situação vendo [*aqui*](###-Executando-toda-aplicação-no-docker).

O primeiro processo que é necessário é gerar uma build. Para isso, basta executar: 

```sh
yarn build
```

Depois de concluído, é preciso criar a imagem da pasta `/dist` e do `Mysql`.

```sh
docker-compose up --build
```
E agora nas próximas vezes, só executar:
```sh
docker-compose up
```
> Atenção: A primeira vez que você executa `docker-compose up --build`, pode gerar um erro na criação do banco de dados, e não criar as tabelas corretamente. Percebi que o banco demora mais na primeira inicicialização, e com isso a aplicação inicia mais rápido. Mesmo definindo algumas variáveis no `docker-compose.yml`. **Se isso acontecer, é só iniciar a aplicação novamente** com o comando `docker-compose up`!

### Localmente, com o banco de dados no *Docker* 

Antes de iniciar, configure o arquivo `.env` para essa situação vendo [*aqui*](###-Executando-apenas-com-o-banco-de-dados-no-docker).

Nessa opção, você vai precisar apenas iniciar o `Mysql` no docker. Para isso execute:
  ```sh
  docker-compose up db
  ```  

Depois de ter iniciado, é só seguir os passos a seguir.

### Localmente

Depois do `Mysql` já está rodando, você pode executar a api de duas formas. A primeira como ambiente de desenvolvedor e a segunda é como produção.

- **Primeira forma** é executar como `dev`. Para isso, configure os padrões do arquivo `.env` para essa situação vendo *aqui* e depois execute.
  ```sh
  yarn dev
  ```  
- **Segunda forma** é executar como `prod`. Para isso, configure os padrões do arquivo `.env` para essa situação vendo *aqui* e depois execute.
  ```sh
  yarn build && yarn start
  ```  

## Configuração do Arquivo .env

O arquivo `.env` é onde estará as informações de conectividade e de ambiente. É ela que será alterado caso mude a forma de execução do projeto. A seguir está todas as variáveis listadas.
```ini
APP_SECRET=xxxx-xxxx-xxx # chave secreta para token jwt
EXPIRES_IN=3600 # tempo de expiração em segundos
DB_HOST=db # hostname do banco de dados
DB_USER=root # usuário do bando de dados
DB_PASS=root # senha do bando de dados
DB_NAME=wishlist # nome do banco de dados
PORT=3000 # porta do serviço back-end api
HOST=0.0.0.0 # host do serviço back-end api
APP_ENVIRNMENT=prod # ambiente de execução (prod | dev | test)
```

Com isso em mente, tem algumas variáveis que ao trocar a forma, ou ambiente de execução irão precisar ser alteradas. **MAS é importante não remover nenhuma variável. Apenas altera-las!**

### Executando toda aplicação no docker

As variáveis listadas abaixo deve seguir o seguinte padrão:
```ini
DB_HOST=db
DB_USER=root
DB_PASS=root
PORT=3000
HOST=0.0.0.0
APP_ENVIRNMENT=prod
```

### Executando apenas com o banco de dados no docker

As variáveis listadas abaixo deve seguir o seguinte padrão:
```ini
DB_HOST=localhost
DB_USER=root
DB_PASS=root
APP_ENVIRNMENT=prod # ou dev | test
```

### Executando localmente

As variáveis listadas abaixo deve seguir o seguinte padrão:
```ini
DB_HOST=localhost 
DB_USER=root # informe o usuário do seu server
DB_PASS=root # informe a senha do seu server
APP_ENVIRNMENT=prod # ou dev | test
```

## Como utilizar

Ao consumir a API, defina como padrão a base url como: 

`http://localhost:3000`


### Autenticação com Token JWT

**[POST]** `/login`

**RESQUEST BODY**
```json
{
	"email": "test@luizalabs.com",
	"password": "12345"
}
```
**RESPONSE - STATUS 200**
```json
{
  "email": "test@luizalabs.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```
**RESPONSE - STATUS 404**
```json
{
  "error": { "message": "user not found." }
}
```

#### informações
Para gerar um token válido, deixei por padrão apenas dois usários cadastrados no banco de dados. Sem a possibilidade de Adicionar. Apenas para validar a ideia.

Usuário para realizar *autenticação*:
| email               | senha |
|---------------------|------:|
| test@luizalabs.com  | 12345 |
| example@example.com |  1234 |


### CUSTOMERS

***Todas as próximas*** rotas será necessário se autenticar com o token criado no passo anterior. 

Para isso, informe-o em todas requisições no seguinte local:

**Authorization: Bearer** `<token>`

#### List 


**[GET]** `/customers`

**RESQUEST  NO BODY**
```json

```
**RESPONSE - STATUS 200**
```json
[
  {
    "id": "5a0d24..",
    "name": "...",
    "email": "...",
    "created_at": "...",
    "updated_at": "..."
  },
  ...
]
```
**RESPONSE - STATUS 404**
```json
{
  "error": { "message": "user not found." }
}
```

**[GET]** `/customers/<ID>`

**RESQUEST  NO BODY**
```json

```
**RESPONSE - STATUS 200**
```json
{
  "id": "5a0d24b3-b6bf-11ea-84b7-0242ac1a0002",
  "name": "Nome cliente",
  "email": "cliente@hotmail.com",
  "created_at": "2020-06-22T08:39:15.000Z",
  "updated_at": "2020-06-22T08:39:15.000Z"
}
```
**RESPONSE - STATUS 404**
```json
{
  "error": {
    "message": "customer not found."
  }
}
```
ou 
```json
{
  "error": {
    "status": 400,
    "message": "id customer invalid."
  }
}
```

