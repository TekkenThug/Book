<p align="center"><img src="https://i.ibb.co/n89g46j/orange-book-1f4d9.png" width="80" alt="Books logo"></p>

## About

Books - the platform for book clubs meetings

## Tech Stack

**Frontend:**

-   `Nuxt v3`
-   `TypeScript`

**Backend:**

-   `Node.js`
-   `Express`
-   `PostgreSQL`
-   `OpenAPI`
-   `TypeScript`

## Installation

Before you need install [Docker](https://www.docker.com/).

Create `.env` file with values from <a href="#env-variables">Environment Variables section</a>, based on `.env.example`.

After installation use bash script for building and starting containers

```bash
bash scripts/local.sh
```

<a name="env-variables"></a>

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

-   `API_URL`
-   `APP_WHITELIST` - allowed client-side urls, separated by `;`
-   `DB_HOST` - Host of database
-   `DB_PORT` - Port of database
-   `DB_NAME` - Name of database
-   `DB_USER` - User of database
-   `DB_PASSWORD` - Password of database
-   `NODE_ENV` - Running node environment
-   `PORT`- Running application`s port
-   `JWT_SECRET` - JWT secret key
-   `JWT_ACCESS_EXPIRATION_MINUTES` - JWT access token expiration in minutes
-   `JWT_REFRESH_EXPIRATION_DAYS` - JWT refresh token expiration in days

## Roadmap

-   Make create event page
-   Make private meeting rooms

## Changelog

### To be soon
