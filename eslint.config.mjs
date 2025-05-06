import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = {
  ...compat.config({
    extends: [
      'next/core-web-vitals', 
      'plugin:prettier/recommended',  // Changed from 'prettier'
      'plugin:@typescript-eslint/recommended',
      'plugin:tailwindcss/recommended'
    ],
    plugins: ['prettier', 'tailwindcss'],
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'no-unused-vars': 'error',
      'react/no-escape-entities': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  }),
};

export default eslintConfig;
