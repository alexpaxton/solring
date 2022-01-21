module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  plugins: [
    require('prettier-plugin-organize-imports'),
    require('prettier-plugin-pkg'),
  ],
}
