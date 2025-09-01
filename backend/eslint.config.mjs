import js from '@eslint/js';

const eslintConfig = [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        global: 'readonly',
      },
    },
    rules: {
      // Code quality rules
      'no-unused-vars': 'error',
      'no-console': 'off', // Allow console statements in development
      'prefer-const': 'error',
      'no-var': 'error',
      'no-undef': 'error',

      // Node.js specific rules
      'no-process-exit': 'error',
      'no-path-concat': 'error',

      // Best practices
      eqeqeq: 'error',
      curly: 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unused-expressions': 'error',
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      radix: 'error',
      'wrap-iife': 'error',
      yoda: 'error',
    },
  },
];

export default eslintConfig;
