'use strict';

const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  cssLoaderOptions: {
    url: false,
  },
  env: {
    NEXT_PUBLIC_AUTH0_API_AUDIENCE: 'https://ranlab-api-mvp-xxvyt3l5wa-nn.a.run.app/',
    NEXT_PUBLIC_AUTH0_DOMAIN: 'lesleychard.auth0.com',
    NEXT_PUBLIC_AUTH0_CLIENT_ID: 'bnyMiWB15Rz5CwsxTNnrN9v5ftHcdabj',
    NEXT_PUBLIC_PRISMIC_REPO: 'ranlab', 
  }
});
