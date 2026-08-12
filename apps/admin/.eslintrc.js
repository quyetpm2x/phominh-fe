module.exports = {
  root: true,
  extends: ['@pho-minh/eslint-config', 'next/core-web-vitals'],
  ignorePatterns: ['.next/**', 'next-env.d.ts'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
