# Read Reddit, <a href="http://reddit.evanjon.es/" target="_blank">demo<a/>

> This is an SPA built with NodeJS/Express, VueJS 2.0 that features SSR, webpack HMR hot-reload, and other goodies.

## This project will guide through:
- Fetching data from a web service along with using an oath service
- Creating a http server that fetches data and renders a web app
- Creating an SPA w/ VueJS 2.0

## Requirements:
- Latest version of NPM
- Latest version of Node
- Use whatever you feel like. I haven't tested this in other version of NPM/Node, it might work.

## How to setup:
- Download the table reddit_users from evanjones.xyz/reddit_users.sql, and import it into your MySQL database
- Put your MySQL info in src/creds/mysql.js, there is an example file in the same directory called mysql.example.js
- Put your desired AES encryption key in src/creds/encryption.js, there is an example file in the same directory called encryption.example.js
- git clone this repo
- cd into the repo
- npm i && npm run dev (this project has HMR hot-reloading w/ webpacks)

## Deploying process: (this assumes we're using Heroku)
- npm run deploy

## That's it! Happy coding.