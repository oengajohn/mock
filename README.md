# NODE Mock Server

## Requirements
- `Node`[here](https://nodejs.org/en/download/)
- `MongoDB`[here](https://www.mongodb.com/try/download/community)
- `Docker` (optional) [here](https://github.com/oengajohn/mock/blob/main/docker-compose.yaml)

## Setup 
- Sets up the `package.json`
```console
npm init -y
```
- Install packages
```console
 npm install cors dotenv express mongoose nodemon
```
## Setup our start command
- Add start command for nodemon in the `scripts` section
  
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"nodemon app.js"
  },
```

## Setup Our App
create `app.js`

```console
npm install forever -g
forever start -c "npm start" ./
```
# Enpoints

- [/users](/users)
- [/posts](/posts)
- [/albums](/albums)
- [/todos](/todos)
- [/photos](/photos)
- [/comments](/comments)
- [/users/:userId/posts](/users/:userId/posts)
- [/users/:userId/todos](/users/:userId/todos)
- [/users/:userId/albums](/users/:userId/albums)
- [/posts/:postId/comments](/posts/:postId/comments)
- [/albums/:albumId/photos](/albums/:albumId/photos)