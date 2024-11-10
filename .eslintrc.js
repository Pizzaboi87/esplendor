module.exports = {
  root: true,
  extends: ['plugin:@next/next/recommended', '@payloadcms'],
  ignorePatterns: ['**/payload-types.ts'],
  plugins: ['prettier', 'simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'off',
    'simple-import-sort/exports': 'off',
    'no-console': 'off',
  },
}
