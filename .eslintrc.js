module.exports = {
  env: {
    browser: true, // allow browser global variables
    es6: true,
    node: true, // allow Node.js global variables and Node.js scoping
    jest: true, // allow Jest global variables
  },
  extends: [
    /**
     * Airbnb's ESLint config with TypeScript support
     * https://github.com/iamturns/eslint-config-airbnb-typescript#i-wish-this-config-would-support-
     * 
     * Contains and turns on the following ESLint Configs:
     * 
     * eslint-plugin-import - ESLint plugin with rules that help validate proper imports.
     * https://github.com/benmosher/eslint-plugin-import#rules
     * 
     * eslint-plugin-jsx-a11y - Static AST checker for a11y rules on JSX elements.
     * https://github.com/evcohen/eslint-plugin-jsx-a11y#supported-rules
     * 
     * eslint-plugin-react - Recommended React specific linting rules for ESLint
     * https://github.com/yannickcr/eslint-plugin-react#recommended
     * 
     * eslint-plugin-react-hooks - This ESLint plugin enforces the Rules of Hooks.
     * https://reactjs.org/docs/hooks-rules.html
     */
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:import/recommended', // TODO: cleanup lint rules

    /**
     * An ESLint plugin for linting ESLint plugins
     * https://github.com/not-an-aardvark/eslint-plugin-eslint-plugin#supported-rules
     */
    'plugin:eslint-plugin/recommended',

    /**
     * Best practices when disabling ESLint rules
     * https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/
     */
    'plugin:eslint-comments/recommended',

    /**
     * 'plugin:jest/recommended' plugin exports a recommended configuration that enforces good testing practices.
     * 'plugin:jest/style' adds some stylistic rules, such as `prefer-to-be-null`, which enforces usage of `toBeNull` over `toBe(null)`.
     * https://github.com/jest-community/eslint-plugin-jest#rules
     */
    'plugin:jest/recommended',
    'plugin:jest/style',

    /**
     * SonarJS rules for ESLint to detect bugs and suspicious patterns in your code.
     * https://github.com/SonarSource/eslint-plugin-sonarjs#eslint-plugin-sonarjs----
     */
    'plugin:sonarjs/recommended',

    /**
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md#when-not-to-use-it
     */
    "plugin:react/jsx-runtime",

    "plugin:storybook/recommended",

    /**
     * THESE PRETTIER RULES SHOULD ALWAYS BE LAST CONFIG IN EXTENDS ARRAY!
     * Turns off all ESLint rules that are unnecessary or might conflict with Prettier.
     * https://github.com/prettier/eslint-config-prettier
     */
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin',
    'jest',
    'jsx-a11y',
    'no-loops',
    'react',
    'react-hooks',
    'sonarjs',
  ],
  rules: {
    'spaced-comment': ['error', 'always', { 'markers': ['/'] }], // Allow triple slash comments used in *.d.ts files
    'no-loops/no-loops': 2, // https://github.com/buildo/eslint-plugin-no-loops#why
    'eslint-comments/disable-enable-pair': ['error', { 'allowWholeFile': true }], // Allow disabling for the whole file
    'eslint-comments/no-unlimited-disable': 'warn', // sometimes I want to build something w/o fixing all the linting
    'react/require-default-props': 0, // defaultProps will be deprecated. https://twitter.com/dan_abramov/status/1133878326358171650?s=20
    '@typescript-eslint/no-unused-expressions': 0, // disabling because can't do `this && that()`

    // Inspired by https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/
    'import/prefer-default-export': 'off',

    // Importing dev specific items in stories and tests.
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md
    "import/no-extraneous-dependencies": [
      "error",
      { "devDependencies": ["**/*.stories.tsx", "**/*.spec.tsx"] }
    ],
  },
  ignorePatterns: [
    'build/',
    'serviceWorker.ts',
  ],
};