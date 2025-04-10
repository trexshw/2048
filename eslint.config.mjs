// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: ['**/node_modules/*', '**/dist/*'],
  },
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
);
