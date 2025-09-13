/** @type {import("prettier").Config} */
export default {
  endOfLine: 'auto',
  tabWidth: 2,
  singleQuote: true,
  printWidth: 120,
  overrides: [
    {
      files: '*.scss',
      options: {
        singleQuote: false,
      },
    },
  ],
};
