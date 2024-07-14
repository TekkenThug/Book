<p align="center"><img src="https://i.ibb.co/n89g46j/orange-book-1f4d9.png" width="80" alt="Books logo"></p>

## About

Books - the platform for book clubs meetings

## Tech Stack

**Frontend:**

-   `Nuxt 3`
-   `TypeScript`
-   `PrimeVue`

**Backend:**

-   `Node.js`
-   `TypeScript`
-   `Express`
-   `PostgreSQL`
-   `Swagger`

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

-   `API_URL` - Hosted URL
-   `APP_WHITELIST` - Allowed client-side urls, separated by `;`
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
-   `JWT_EMAIL_VERIFY_EXPIRATION_MINUTES` - JWT email verify token expiration in minutes

## API docs

Visit `{YOUR API_URL}/api/v1/docs` for view Swagger page

## Roadmap

-   Make meeting rooms with WebRTC
-   Make event detailed page

-   Readable errors from validation
-   Make email unique on db level

## Changelog

### `v0.2.0`

- `Changed` Rework backend on Nest.js

### `v0.1.0` - 09.07.2024

- `Added` Registration
- `Added` Email verification
- `Added` Profile settings
- `Added` Search events by book title
- `Added` Registration to event
- `Added` List of subscribed events for user
- `Added` Ability to create events
