<h1 align="center">Game of Life / Vue.js Implementation</h1>

[![Build Status](https://api.travis-ci.org/mathieu-ducrot/game-of-life.png?branch=master)](https://travis-ci.org/mathieu-ducrot/game-of-life)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/mathieu-ducrot/game-of-life/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/mathieu-ducrot/game-of-life/?branch=master)
[![Netlify Status](https://api.netlify.com/api/v1/badges/25eaee5d-58b5-4140-b91e-dc1d6c7fe4de/deploy-status)](https://app.netlify.com/sites/game-of-life-in-vue-mathieu-ducrot/deploys)

> The Game of Life from John Conway implemented with Vue.js

This project is a coding challenge that i made to test my skill on Vue 2 and some basic configuration with Nuxt and Bulma.

I started this project after watching the Vue Mastery courses and [Chris Fritz video on Visualizations using SVG, Canvas, and WebGL in Vue](https://youtu.be/a2jhqi3_Cdg?t=46).

Deploy on [GitHub Pages](https://mathieu-ducrot.github.io/game-of-life/) and [Netlify](https://game-of-life-in-vue-mathieu-ducrot.netlify.app/) ! 

## Documentation

The directory structure of this project was generated by [Nuxt 2](https://nuxtjs.org) with [Bulma](https://bulma.io/) for the UI framework.

### Local Dev Setup with Docker

_If you dont have Node on your machine and use Docker, then this section is for you. Else jump to next section._

* Recommended Docker version : 19
* Recommended GNU Make version : 4.1

```bash
# install dependencies
make docker-install

# serve with hot reload at localhost:3000
make docker-dev

# launch test
make docker-test

# generate static project
make docker-generate
```

### Dev & Build Setup with Node

* Recommended Node version : v13.9

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:3000
yarn dev

# build for production and launch server
yarn build
yarn start

# generate static project
yarn generate
```

## License

[MIT](https://github.com/mathieu-ducrot/game-of-life/blob/master/LICENSE)
