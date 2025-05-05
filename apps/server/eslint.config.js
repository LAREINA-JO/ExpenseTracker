const path = require('path');
const commonConfig = require('../../build-common-config/eslint.config');

module.exports = [
  ...commonConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js'],
    languageOptions: {
      parserOptions: {
        project: path.join(__dirname, './tsconfig.json'),
      },
    },
    plugins: {
    },
    rules: {
    }
  }
]
