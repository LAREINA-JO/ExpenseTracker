const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettier = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const tsdocPlugin = require('eslint-plugin-tsdoc');

module.exports = [
  {
    ignores: [
      'node_modules',
      '.DS_Store',
      'dist',
      '.nyc_output',
      'lib',
      'tmp',
      'coverage',
      '.vscode',
      '*-error.log',
      '*-debug.log',
      '.idea',
      '*.js',
      '*.ts',
      '*.mts',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      tsdoc: tsdocPlugin,
      prettier,
    },
    rules: {
      'no-console': 'warn',
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'none',
          caughtErrors: 'none',
          ignoreRestSiblings: true,
          reportUsedIgnorePattern: false,
        },
      ],
      'no-undef': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/no-unresolved': 'off',
      'import/no-named-as-default-member': 'off',
      'import/namespace': 'off',
      'import/no-cycle': ['error', { ignoreExternal: true }],
      '@typescript-eslint/strict-boolean-expressions': [
        'warn',
        {
          allowNumber: false,
          allowString: true,
          allowNullableObject: true,
          allowNullableBoolean: true,
          allowNullableString: true,
          allowNullableEnum: false, // enum is possible 0
        },
      ],
    },
  },
];
