import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
];
