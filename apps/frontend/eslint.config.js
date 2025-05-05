const path = require('path');
const commonConfig = require('../../build-common-config/eslint.config');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');

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
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
        'react/prop-types': 'off',
    }
  }
]
