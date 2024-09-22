# Generated Application Local Setup

## Prerequisites

Generated applications come with a fully configured and configurable local
development environment. To get started, you will need to install [Docker](https://docs.docker.com/get-docker/).

If you haven't generated an app yet, you can use our [demo app](https://github.com/CodeDjenAi/demo-app.git)
to get familiar with the environment. You can always build your own app using
our open source [app base](https://github.com/CodeDjenAi/app-base.git), but to
unlock the full power of CodeDjen, you should generate your own app on [codedjen.com](https://codedjen.com).

If you're unsure how to do this, please refer to the [Getting Started](/getting-started) guide.

## First time setup

1. Clone the repository

```bash
# Replace github repo URL with your own upon code delivery
git clone https://github.com/CodeDjenAi/demo-app.git
```

2. Copy the local example .env file

```bash
cp .env.example .env
cp api/.env.example api/.env
cp ui/.env ui/.env.local
```

3. Start the local environment

```bash
docker compose up
```

## Accessing the local environment

You can find the docker compose file for the local environment in the root of the
repository (`docker-compose.yml`). The local environment consists of the following
services:

- **api**: Laravel API
  - Accessible at [http://localhost/api](http://localhost:9999/api) by default
- **ui**: Vue SPA
  - Accessible at [http://localhost](http://localhost:9999) by default
- **proxy**: Nginx reverse proxy
  - Routes requests to the appropriate service based on the URL

You can change your settings in the .env file in the root of the repository
(`.env.example.local`).

### Changing the application host

You can change the application host (URL) by changing the `APP_URL` variable in
the `.env` file. This will change the URL at which the application is accessible.

```sh
# APP_URL: Application URL (both frontend and backend).
# URL should be without trailing slash, and wihtout http/https prefix.
# Example: localhost
APP_URL=localhost
```

### Changing the application port

You can change the application port by changing the `APP_PORT` variable in the
`.env` file. This will change the port at which the application is accessible.

```sh
# APP_URL: Application port (both frontend and backend).
# Should be a valid port number.
# Example: 80
APP_PORT=80
```
