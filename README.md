# Storefront Backend Project

**Other Documentations:**

1. [Application APIs](README.api.md)
1. [DB Schema](README.db.md)

# Project Folder Structure

`/src/models` :at this file we handel Crud operation
`/src/controllers`: we call the functions from models and get or send the Information to database
`/src/routes` : at this file we handel endpoint and the routs and map the handlers to controller actions
`/src/tests` : here test files

## Prerequisites

1. node version v16.13.1
2. yarn package manager
3. postgresql database .
4. please create a new database for this project then add it to the .env file as I'll explain below.

## How to run ?

#### 1) npm install

### 2) create .env file (you can find a example in .env.example file)

### 3) migrate the database

`npm run migration:run`

### 5) start this app

`npm start`

#### 6) running tests

`npm run test`

### Other scripts

1. `npm run lint` to run eslint
1. `npm lint:fix` to run eslint with fix mode
1. `npm format` to run prettier
