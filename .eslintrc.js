'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'indent': ['error', 2],
    'object-curly-spacing': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'react/react-in-jsx-scope': 'off',
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
  },
};
