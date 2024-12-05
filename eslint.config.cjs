module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['node_modules/', 'dist/'],

  files: ['./src/**/*.{js,jsx,ts,tsx}'], // Specify files to lint
  languageOptions: {
    parser: '@typescript-eslint/parser', // Use the appropriate parser if needed
  },

  rules: {
    // Add or override rules as necessary
    'no-unused-vars': 'warn',
    'react/prop-types': 'off',
  },
};
