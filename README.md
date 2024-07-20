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
-   `Nest.js`
-   `PostgreSQL`
-   `MinIO`
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
-   `API_CLIENT_URL` - Allowed client-side url
-   `DB_TYPE` - Type of database (postgres by default)
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
-   `SMTP_HOST` - SMTP host
-   `SMTP_PORT` - SMTP port
-   `SMTP_USER` - SMTP user
-   `SMTP_PASSWORD` - SMTP password
-   `S3_HOST`
-   `S3_EXTERNAL_URL`
-   `S3_PORT`
-   `S3_BUCKET`
-   `S3_ACCESS_KEY`
-   `S3_SECRET_KEY`
-   `S3_USER`
-   `S3_PASSWORD`

## API docs

Visit `{YOUR API_URL}/api/v1/docs` for view Swagger page

## Roadmap

-   Make meeting rooms with WebRTC
-   Make event detailed page

-   Readable errors from validation

## Changelog

### `v0.2.0`

- `Added` User avatar loading
- `Added` Profile menu
- `Added` Message for empty events
- `Changed` Rework backend on Nest.js

### `v0.1.0` - 09.07.2024

- `Added` Registration
- `Added` Email verification
- `Added` Profile settings
- `Added` Search events by book title
- `Added` Registration to event
- `Added` List of subscribed events for user
- `Added` Ability to create events
