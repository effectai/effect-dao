# Effect DAO

<https://dao.effect.network>

## Build Setup

```bash
# install dependenciese
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production and launch server
npm run build
npm run start

# generate static project
npm run generate
```

For a detailed explanation of how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Docker

If you have docker installed you can run the following command to start a development container:

```bash
docker compose up
```

## Node Version

To run this codebase you will need to use `v14` of Node.

```bash
# Install nvm (if you don't have it already)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

# Install node v14 (if you don't have it already)
nvm install v14

# Use node v14
nvm use v14
```

Alternatively, there is a [`.nvmrc`](https://github.com/nvm-sh/nvm#nvmrc) file in the root of the project that you can use with `nvm` to automatically switch to the correct version of Node.

```bash
nvm use
```
