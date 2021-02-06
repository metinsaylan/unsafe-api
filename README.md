# Unsafe API

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
