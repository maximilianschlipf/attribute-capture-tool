// eslint-disable-next-line no-undef
module.exports = {
    env: {
      webextensions: true,
      browser: true,
      es2021: true,
      amd: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import/resolver': {
        node: {
          paths: ['src'],
          extensions: ['.js', '.ts'],
        },
      },
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    plugins: ['prettier', '@typescript-eslint'],
    rules: {
      'react/display-name': 'off',
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  };