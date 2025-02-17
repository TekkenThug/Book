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
-   `TypeORM`
-   `PostgreSQL`
-   `MinIO`
-   `Swagger`

## Installation

Before you need install [Docker](https://www.docker.com/).

Create `.env` file with values from <a href="#env-variables">Environment Variables section</a>, based on `.env.example`.

After installation use bash script for building and starting containers:

```bash
bash scripts/local.sh
```

For using type checking and import resolving, you should install modules in `api` and `app` folder with `node.js v20.14.0`:

```bash
npm install
```

### S3 installation

After starting containers, you must log in MinIO by `S3_HOST`, using `S3_USER` and `S3_PASSWORD`, and create bucket with `S3_BUCKET` name. Then create a pair of access/secret keys, put in `.env` file `S3_ACCESS_KEY` and `S3_SECRET_KEY`.

### API documentation

Visit `{YOUR APP_URL}/api/v1/docs` for view Swagger page

<a name="env-variables"></a>

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

-   `APP_URL` - Hosted URL
-   `APP_CLIENT_URL` - Allowed client-side url
-   `APP_ENV` - Running node environment
-   `APP_PORT`- Running application's port
-   `DB_TYPE` - Type of database (postgres by default)
-   `DB_HOST` - Host of database
-   `DB_PORT` - Port of database
-   `DB_NAME` - Name of database
-   `DB_USER` - User of database
-   `DB_PASSWORD` - Password of database
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

## Roadmap

-   Make restore password
-   Make meeting rooms with WebRTC
-   Readable errors from validation
-   Unsubscribe from event
-   Delete event

## Changelog

This is latest version's changelog. For past updates see `CHANGELOG.md`

### `v0.3.0` - Unreleased

- `Changed` Rework API calls on axios
