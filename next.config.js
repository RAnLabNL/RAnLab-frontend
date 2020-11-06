'use strict';

const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  cssLoaderOptions: {
    url: false,
  },
  env: {
    AUTH0_DOMAIN: 'lesleychard.auth0.com',
    AUTH0_CLIENT_ID: 'bnyMiWB15Rz5CwsxTNnrN9v5ftHcdabj',
  },
});
