module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'warn',
    'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
    'max-lines-per-function': ['warn', { max: 60, skipBlankLines: true, skipComments: true }],
    'max-statements': ['error', 21],
    complexity: ['warn', 12],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    camelcase: ['error', { properties: 'never', allow: ['^_[a-z]'] }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/order': ['warn', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      alphabetize: { order: 'asc' },
    }],
  },
  // no-floating-promises cần type information (parserOptions.project) — chỉ áp dụng cho
  // .ts/.tsx, nếu không ESLint sẽ lỗi khi lint các file .js thuần (config, v.v).
  // App tiêu thụ package này khai báo parserOptions.project trong override cùng `files`.
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@typescript-eslint/no-floating-promises': 'error',
      },
    },
  ],
};
