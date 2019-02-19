# event-mgmt

Web Development with JavaScript

## Requirements
- Docker
- Node >=8.11
- Mongodb >=3.4.0

## First time setup
- Create `mongo-volume` directory in the root project
- Install project deps

  ```sh
  npm install
  ```
- Bootstrap the project using lerna

  ```sh
  npx lerna bootstrap
  ```
- copy `.env.example` into  `.env`, and change the values of variables

  ```sh
  cp ./apps/api/.env.example ./apps/api/.env
  ```

## Run the app
- Using docker compose:

  ```sh
  docker-compose up
  ```

## Connect to mongodb container
You can connect to 27018 with your mongodb client to see the data
