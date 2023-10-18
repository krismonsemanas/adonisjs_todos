This is a [Adonis Js](https://adonisjs.com/) simple API project make a Todo List API. AdonisJS is a fully-featured backend framework for Node.js. The framework is created from ground-up with strong emphasis on developer ergonomics and ease of use.

It is one of the rarest framework in the Node.js community that ships with a suite of first party packages that helps you create and ship products without wasting hundreds of hours in assembling different npm packages.

# Get Started

Clone this repository

```bash
git clone https://github.com/krismonsemanas/adonisjs_todos.git
# or
git clone git@github.com:krismonsemanas/adonisjs_todos.git
```

## Install Depedencies

In your terminal into the clone results folder, for example:

```bash
cd adonis_todos

```

After that

```bash
yarn
#or npm install if you use npm
npm install
```

## Setup Environment

Copy .env.example to .env

```bash
cp .env.example .env

```

Setup database connection in .env file,

```
DB_CONNECTION=pg
PG_HOST=127.0.0.1
PG_PORT=5432
PG_USER=lucid
PG_PASSWORD=
PG_DB_NAME=lucid
```

## Migration & Seeder

Before migration and seeding, create a database with the name in the .env file.

Run migration

```bash
node ace migration:run
```

Run Seeder

```bash
node ace db:seed
```

## Start Server

Server running on port `3333`, `http://localhost:3333`

```bash
yarn dev
#or
npm run dev
```

Testing in postman or another tool.
For checking available routes run:

```bash
node ace list:routes
```
