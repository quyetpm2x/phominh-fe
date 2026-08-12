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
    {
      // max-lines-per-function (base config: 60) targets tangled imperative logic. Marketing
      // page/presentational components are declarative JSX trees translated 1:1 from an approved
      // design (Homepage.dc.html) — length there tracks content volume, not complexity. Raised,
      // not disabled, so a component that's ALSO logic-heavy still gets flagged.
      files: ['components/**/*.tsx'],
      rules: {
        'max-lines-per-function': ['warn', { max: 150, skipBlankLines: true, skipComments: true }],
      },
    },
    {
      // Next.js page.tsx is the designated composition root for a route — one page, one default
      // export. The meaningful ceiling there is file length (max-lines: 300, unchanged), so match
      // the function-level cap to it instead of fragmenting a page into arbitrary sub-pieces.
      files: ['app/**/page.tsx'],
      rules: {
        'max-lines-per-function': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
      },
    },
  ],
};
