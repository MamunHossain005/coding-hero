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
    plugins: ['prettier', '@typescript-eslint'],
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'no-unused-vars': 'off', // Disable base rule
      '@typescript-eslint/no-unused-vars': 'error', // Use TypeScript version
      'react/no-escape-entities': 'off',
    },
  }),
};

export default eslintConfig;
