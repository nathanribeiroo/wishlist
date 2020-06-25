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
- Localmente, com o banco de dados no *Docker* 
- Localmente


### Produção com Docker

O primeiro processo que é necessário é gerar uma build. Para isso, basta executar: 

```sh
yarn build
```

Depois de concluído, é preciso criar a imagem da pasta `/dist` e do `Mysql`.

```sh
docker-compose build
```
E agora é só iniciar com:
```sh
docker-compose up
```
> Atenção: A primeira vez que você executa `docker-compose up`, pode gerar um erro na criação do banco de dados, e não criar as tabelas corretamente. Percebi que o banco demora mais na primeira inicicialização, e com isso a aplicação inicia mais rápido. Mesmo definindo algumas variáveis no `docker-compose.yml`. **Se isso acontecer, é só iniciar a aplicação novamente**!

### Localmente, com o banco de dados no *Docker* 

Essa opção, você não precisa especificamente gerar uma `build`, apenas se você quiser executar atraves
