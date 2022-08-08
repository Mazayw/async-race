module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    // Uses the recommended rules from @typescript-eslint/eslint-plugin
  ],

  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    project: './tsconfig.json',
  },
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['off'],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['off', 'only-multiline'],
    '@typescript-eslint/no-unused-vars': ['off'],
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
