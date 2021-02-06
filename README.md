# Unsafe API

This is a personal project for creating local API backends for automated tasks.
It is not intended to be used in production environments.

Main entity "Item" can be used for testing CRUD operations on MongoDB.

## Quick start
Copy `.env-sample` to `.env`, edit configuration.
Run following commands:
```
   npm install
   nodemon server
```

### Check status
http://localhost:4200/api/status

### Add item
POST http://localhost:4200/api/item
```
{
  "name": "hello world",
}
```

## Run Server as a Service

```
npm install pm2 -g
pm2 start server
```
