/** @type {import('prettier').Config} */
export default {
  plugins: ['prettier-plugin-tailwindcss'],
  semi: false,
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  tailwindFunctions: ['cn', 'clsx', 'cva'],
  tailwindStylesheet: './app/assets/css/main.css',
  trailingComma: 'all',
}
