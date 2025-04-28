# Understanding architectural decisions and the structure of the project

## Environment setup:

- [Node LTS](https://nodejs.org/en)
- [NPM](https://www.npmjs.com)

## How do I run it on my machine?

- Clone the project `git clone https://github.com/fabiodejesusfferreira/api-clients.git`
- Run `npm`
- Go to: **config.js** and:
  - Put your mongodb's connection link in the MongoDB_URL and create a random key for JWT_SECRET (if you want, use the following line in the terminal: ```node -e “console.log(require(‘crypto’).randomBytes(32).toString(‘hex’))”```)
- Run `node .`
- Done 🎉

## How do I make the requests?

Well, as the API is running on your machine (on port **8080**), go to your browser of choice or a software that does the tests and use any of the following endpoints:
**http://localhost:8080**
- /register
  - Body:
```json
{
 "name": "Fabio",
 "email": "fabiodejesus@dev.com.br",
 "password": "ilovemygirlfriend.S2"
}
```
Remember, this is just an example

- /login
  - Body:
```json
{
 "email": "fabiodejesus@dev.com.br",
 "password": "ilovemygirlfriend.S2"
}
```
Remember, this is just an example

- /list
  - Auth: When you log in, the API returns the token to validate the auth
